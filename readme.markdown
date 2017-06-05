
generator-dss-redux
===================

[Yeoman][1] generator to work with React/Redux apps within DSS.

usage (so far)
--------------

```
git clone https://github.com/LafayetteCollegeLibraries/generator-dss-redux
cd generator-dss-redux
npm link
```

then

```
cd /path/to/react/project
yo dss-redux:init
# ~ or ~ #
yo dss-redux:add
```

### `yo dss-redux:init`

Adds [`redux`][2] bindings to a React project. Creates a new `src/index.js` file
to use as the app's base (`--skip-conflict` mode names this file
`src/index.redux.js`).

```
❯ yo dss-redux:init --help
Usage:
  yo dss-redux:init [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers                                             Default: false
        --skip-install   # Do not automatically install dependencies                                  Default: false
        --app-path       # Path to main application file
        --app-selector   # HTML selector target for app                                               Default: #app
  -r,   --skip-router    # Exclude react-router redux bindings?
  -t,   --skip-tests     # Exclude redux test helpers?
        --skip-conflict  # Write redux-wrapped app to `src/index.redux.js`, if `src/index.js` exists
```

### `yo dss-redux:add`

Adds a redux model directory to the `src/store` directory, which looks like:

```
❯ yo dss-redux:add model && tree src/store/model
# ... yeoman output, then ... #
src/store/model
├── actions.js
├── actions.test.js
├── endpoints.js
├── endpoints.test.js
├── reducer.js
└── reducer.test.js

0 directories, 6 files
```

```
❯ yo dss-redux:add --help
Usage:
  yo dss-redux:add [options] <name>

Options:
  -h,   --help            # Print the generator's options and usage
        --skip-cache      # Do not remember prompt answers                                  Default: false
        --skip-install    # Do not automatically install dependencies                       Default: false
        --skip-endpoints  # Skip adding an `endpoints.js` file (used for API interactions)  Default: false
        --skip-tests      # Skip adding a `.test.js` file for each model type               Default: false

Arguments:
  name  # redux model name  Type: String  Required: true
```

[1]: http://yeoman.io
[2]: http://redux.js.org
