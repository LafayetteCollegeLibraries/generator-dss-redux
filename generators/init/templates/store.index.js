import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
<% if (includeRouter) {%>import { routerMiddleware } from 'react-router-redux' <% } else { %>
// if using `react-router`, uncomment the next line
// import { routerMiddleware } from 'react-router-redux'
<% } %>
import rootReducer from './reducers'
<% if (includeRouter) {%>import history from '../history'<%} %>
// for each reducer, you should also export the initialState, ex:
// import { initialState as search } from './search/reducer'

const initialState = {

}

const middleware = [thunk<% if (includeRouter) { %>, routerMiddleware(history),<% } %>]

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware.apply(null, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}
