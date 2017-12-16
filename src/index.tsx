import React from 'react'
import { Router, Switch } from 'react-router'
import { History, Location } from 'history'
import { Cmd, AppProps, App, Init,
  View, Subscribe, OnUpdate } from 'hydux'
import { ActionsType } from 'hydux/lib/types'
import PropTypes from 'prop-types'

const CHANGE_LOCATION = '@@hydux-react-router/CHANGE_LOCATION'
export { History, Location, Switch }
export type RouterActions<Actions> = Actions & {
  history: {
    push(path: string, state?: any): void,
    replace(path: string, state?: any): void,
    go(n: number): void,
    goBack(): void,
    goForward(): void,
  }
}
export type RouterState<State> = State & {
  location: Location
}

export function ConnectedSwitch(props, { router }) {
  return (
    <Switch location={router.route.location} {...props}>
      {props.children}
    </Switch>
  )
}

(ConnectedSwitch as any).contextTypes = {
  router: PropTypes.object.isRequired
}

export type PropsWithRouter<State, Actions> = {
  init: Init<State, Actions>;
  view: View<State, RouterActions<Actions>>;
  actions: ActionsType<State, RouterActions<Actions>>;
  subscribe?: Subscribe<State, Actions>;
  onRender?: (view: any) => void;
  onError?: (err: Error) => void;
  onUpdate?: OnUpdate<State, Actions>;
}

export default function withReactRouter<S, A>(history: History) {
  return (app: App<RouterState<S>, RouterActions<A>>) => (props: PropsWithRouter<S, A>) => app({
    ...props,
    init: () => {
      let result = props.init()
      if (!(result instanceof Array)) {
        result = [result, Cmd.none]
      }
      return [{ ...(result[0] as any), location: history.location }, result[1]]
    },
    actions: {
      ...props.actions as any,
      history: {
        go: n => history.go(n),
        goBack: () => history.goBack(),
        goForward: () => history.goForward(),
        push: (path: string, state?) => history.push(path, state),
        replace: (path: string, state?) => history.replace(path, state),
      },
      [CHANGE_LOCATION]: location => state => ({ ...state, location })
    },
    view: state => actions => {
      const view = props.view(state)(actions)
      return <Router history={history}>{view}</Router>
    },
    subscribe: state => {
      let cmd = props.subscribe ? props.subscribe(state) : Cmd.none
      return Cmd.batch(
        cmd,
        Cmd.ofSub(actions => {
          history.listen(actions[CHANGE_LOCATION] as any)
        })
      )
    }
  })
}
