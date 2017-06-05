// Action functions created with `redux-actions#createAction` modify the
// `toString` method to return the action type. This allows us to use
// computed property names in the `handleActions` object argument to set up
// our reducer without having to use a specially-created constant.
// example:
//
//     export default handleActions({
//       [actions.searchForSomething]: (state, action) => {
//         // do something
//         return state
//       }
//     }, initialState)
//
//  see:
//    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
//    - https://github.com/acdlite/redux-actions#createactiontype-payloadcreator--identity-metacreator
//
// NOTE:
// -----
// Be sure to import the reducer to the `rootReducer` located in `../reducers.js`,
// and add the `initialState` to the store definition within `../index.js`.

import { handleActions } from 'redux-actions'
import * as actions from './actions'

export const initialState = {

}

export default handleActions({

  // [actions.doSomething]: (state, action) => {}

}, initialState)
