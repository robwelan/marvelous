// from https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'

import { routerReducer, routerMiddleware } from 'react-router-redux'

// Import our app specific reducers
import * as reducers from './redux/global-state'

// Import our redux thunk middleware
import ReduxThunk from 'redux-thunk'

// Create history
const history = createHistory()

// Import our App
import App from './App'

//import our Styles
import './index.css'

const middleware = routerMiddleware(history),

      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,

      store = createStore(
        combineReducers({
          ...reducers,
          router: routerReducer
        }),
        composeEnhancers(applyMiddleware(
          middleware,
          ReduxThunk
        ))
      )

ReactDOM.render (
  <Provider store={store}>

    <Router>
      <div>

        <App />

      </div>
    </Router>

  </Provider>,
  document.getElementById('root')
)
