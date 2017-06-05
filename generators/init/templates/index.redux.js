import React from 'react'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'

import * as actions from './store/actions'
import store from './store'

import App from '<%= mainAppPath %>'

const mapStateToProps = state => ({
  // example:
  // search: state.search,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const Connected = connect(mapStateToProps, mapDispatchToProps)(App)

const wrapped = (
  <Provider store={store}>
    <Connected />
  </Provider>
)

const selector = '<%= appHTMLSelector %>'

ReactDOM.render(wrapped, document.querySelector(selector))
