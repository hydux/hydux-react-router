import React from 'react'
import { Router, Switch } from 'react-router'
import { History, TransitionPromptHook } from 'history'
import { Cmd, AppProps, App } from 'hydux'
import PropTypes from 'prop-types'

const CHANGE_LOCATION = '@@hydux-react-router/CHANGE_LOCATION'
let history: History = null as any
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

export default function withReactRouter<S, A>(history: History) {
  return app => (props: AppProps<S, A>) => app({
    ...props,
    init: () => {
      let result = props.init()
      if (!(result instanceof Array)) {
        result = [result, Cmd.none]
      }
      return [{ ...(result[0] as any), location: history.location }, result[1]]
    },
    actions: {
      ...(props.actions as object),
      history: {
        go: n => history.go(n),
        goBack: () => history.goBack(),
        goForward: () => history.goForward(),
        push: (path: string, state?) => history.push(path, state),
        replace: (path: string, state?) => history.replace(path, state),
        getRawHistory: () => history,
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
