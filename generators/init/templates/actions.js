// By default, we're expecting `/src/store/actions` to
// be a collection of public (re: app) facing methods
// (API interactions, for example), and not actual
// action-creators. This is to keep the app's props
// free from a lot of methods that aren't used within
// the React app itself.

// example:
// export { method1, method2 } from './search/actions.js'

