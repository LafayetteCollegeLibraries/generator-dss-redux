// Define action-creators here, using `redux-actions`. By default,
// we're importing the `createAction` function, which takes a
// string `type` as its first parameter and a `payloadCreator` function
// as its second. (see: https://github.com/acdlite/redux-actions#createactiontype-payloadcreator--identity-metacreator)
// The default `payloadCreator` is an identity function (`function (i) { return i }`)
// and, to be honest, has served perfectly fine so far.
//
// example:
//
//     export const doSomething = createAction('do something')
//
// Out of the box, we've also set up the reducer with the `redux-thunk`
// middleware, which allows us to define actions as `thunkified`, which
// is very useful for async things, such as making AJAX requests.
// To use these, create a function that returns a function with the signature
// `(dispatch, getState) => {}`.
//
// example:
//
//   export const doSomethingAsync = opts => (dispatch, getState) => {
//     const state = getState()
//     // do something
//
//     dispatch(doSomething(/* props */))
//   }
//
// NOTE:
// -----
// Be sure to import the actions you wish to pass to the main app to the
// `../actions.js` module, otherwise every actionCreator you define will
// not be accessible from your app.

import { createAction } from 'redux-actions'

