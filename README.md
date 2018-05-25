# hydux-react-router
ReactRouter integration for hydux.

## Install
```sh
yarn add hydux hydux-react hydux-react-router # or npm i hydux hydux-react hydux-react-router
```

## Usage


```js
import _app from 'hydux'
import withPersist from 'hydux/lib/enhancers/persist'
import withReact from 'hydux-react'
import React from 'react'
import { ActionsType } from 'hydux/lib/types'
import withReactRouter, { ConnectedSwitch } from '../../../src/index'
import { Link, Route, Redirect } from 'react-router-dom'
import { createHashHistory } from 'history'
import Counter from './counter'
import './polyfill.js'
console.log('Link', Link)
const history = createHashHistory()
// let app = withPersist<State, Actions>({
//   key: 'time-game/v1'
// })(_app)
let app = withReact<State, Actions>()(_app)
app = withReactRouter<State, Actions>(history)(app)

if (process.env.NODE_ENV === 'development') {
  const devTools = require('hydux/lib/enhancers/devtools').default
  const logger = require('hydux/lib/enhancers/logger').default
  const hmr = require('hydux/lib/enhancers/hmr').default
  app = logger()(app)
  app = devTools()(app)
  app = hmr()(app)
}

const actions = {
  counter: Counter.actions
}

const state = {
  counter: Counter.init()
}

type Actions = typeof actions
type State = typeof state
const NoMatch = () => <div>404</div>
const Home = () => <div>Home</div>
const Users = () => <div>Users</div>

const view = (state: State, actions: Actions) => (
  <main>
    <style>{`
        a {
          margin-right: 5px;
        }
    `}</style>
    <h1>Router example</h1>
    <Link to="/">Home</Link>
    <Link to="/users">Users</Link>
    <Link to="/accounts">Accounts</Link>
    <Link to="/counter">Counter</Link>
    <Link to="/404">404</Link>
    <ConnectedSwitch>
      <Route exact path="/" component={Home}/>
      <Route path="/users" component={Users}/>
      <Redirect from="/accounts" to="/users"/>
      <Route path="/counter" render={() => Counter.view(state.counter)(actions.counter)} />
      <Route component={NoMatch}/>
    </ConnectedSwitch>
  </main>
)

export default app({
  init: () => state,
  actions,
  view,
})

```

## Counter App

```sh
git clone https://github.com/hydux/hydux-react.git
cd examples/counter
yarn # or npm i
npm start
```

Now open http://localhost:8080 and hack!

##` License

MIT
