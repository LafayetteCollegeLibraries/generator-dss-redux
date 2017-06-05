import { combineReducers } from 'redux'
<% if (includeRouter) {%>import { routerReducer } from 'react-router-redux'<% } %>

// import each reducer, ex:
// import search from './search/reducer'

// add each reducer to the following object

const reducers = {
  <% if (includeRouter) { %>routing: routerReducer,<% } %>
}

export default combineReducers(reducers)
