import React from 'react'
import { Cmd, noop, ActionsType, ActionType } from 'hydux'
const initState = { count: 0 }
const init = () => initState
const actions = {
  down: () => state => ({ count: state.count - 1 }),
  up: () => state => ({ count: state.count + 1 }),
  upN: n => state => ({ count: state.count + n }),
  upLater: (() => (state) => (actions) =>
    [ state,
      Cmd.ofPromise(
        n => {
          return new Promise(resolve =>
            setTimeout(() => resolve(n), 1000))
        },
        10,
        actions.upN) ])
}

const view = (state: State, actions: Actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onClick={actions.down}>–</button>
    <button onClick={actions.up}>+</button>
    <button onClick={actions.upLater}>+ later</button>
  </div>
)

export default { init, actions, view }
export type Actions = typeof actions
export type State = typeof initState
