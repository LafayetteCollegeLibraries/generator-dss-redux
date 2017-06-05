// Tests for the actionCreators. Out of the box, we're using `chai`s set
// of `expect` APIs, though this can be modified. Tests look like:
//
//     describe('store/<%= name %>/actions', function () {
//       describe('#doSomething', function () {
//         it('works!', function () {
//           const store = mockStore(initialState)
//           const result = store.dispatch(actions.doSomething())
//           expect(result.payload).to.not.be.null
//         })
//       })
//     })


import { expect } from 'chai'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './actions'
import { initialState } from './reducer'

const mockStore = configureStore([thunk])
const store = mockStore({search: initialState})

// use this to define some actions run after each suite of tests is run
const cleanup = () => {
  store.clearActions()
}

describe('store/<%= name %>/actions', function () {
  afterEach(cleanup)
})
