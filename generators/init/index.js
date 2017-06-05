const Generator = require('yeoman-generator')
const utils = require('../utils')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('app-path', {
      desc: 'Path to main application file',
      type: String,
    })

    this.option('app-selector', {
      desc: 'HTML selector target for app',
      default: '#app',
      type: String,
    })

    this.option('skip-router', {
      alias: 'r',
      desc: 'Exclude react-router redux bindings?',
      type: Boolean,
    })

    this.option('skip-tests', {
      alias: 't',
      desc: 'Exclude redux test helpers?',
      type: Boolean,
    })

    this.option('skip-conflict', {
      desc: 'Write redux-wrapped app to `src/index.redux.js`, if `src/index.js` exists',
      type: Boolean,
    })
  }

  prompting () {
    const opts = this.options
    const prompts = []

    if (opts['app-path'] === undefined) {
      prompts.push(
        {
          type: 'input',
          name: 'app-path',
          message: 'module path to main app',
          default: './src/screens/Main',
        }
      )
    }

    if (opts['skip-router'] === undefined) {
      prompts.push(
        {
          type: 'confirm',
          name: 'skip-router',
          message: 'Exclude react-router redux bindings?',
          default: false,
        }
      )
    }

    if (opts['skip-tests'] === undefined) {
      prompts.push(
        {
          type: 'confirm',
          name: 'skip-tests',
          message: 'Exclude redux test helpers?',
          default: false,
        }
      )
    }

    const indexExists = this.fs.exists(this.destinationPath('./src/index.js'))

    if (indexExists && opts['skip-conflict'] === undefined) {
      prompts.push(
        {
          type: 'confirm',
          name: 'skip-conflict',
          message: 'Looks like `src/index.js` exists: skip prompt to overwrite and output to `src/index.redux.js`?',
          default: false,
        }
      )
    }

    if (prompts.length === 0) {
      return
    }

    return this.prompt(prompts).then(answers => {
      if (answers['app-path'] !== undefined) {
        this.options['app-path'] = answers['app-path']
      }

      if (answers['skip-router'] !== undefined) {
        this.options['skip-router'] = answers['skip-router']
      }

      if (answers['skip-tests'] !== undefined) {
        this.options['skip-tests'] = answers['skip-tests']
      }

      if (answers['skip-conflict'] !== undefined) {
        this.options['skip-conflict'] = answers['skip-conflict']
      }
    })
  }

  installing () {
    const deps = this._getDependencies()
    this.npmInstall(deps, { save: true })

    if (this.options['skip-tests']) {
      return
    }

    const devDeps = this._getDevDependencies()
    this.npmInstall(devDeps, { 'save-dev': true })
  }

  writing () {
    const opts = this.options
    const skipConflict = opts['skip-conflict']
    const hasIndex = this.fs.exists(this.destinationPath('./src/index.js'))

    const indexFilename = (skipConflict && hasIndex) ? 'index.redux.js' : 'index.js'

    this.fs.copyTpl(
      this.templatePath('index.redux.js'),
      this.destinationPath(`./src/${indexFilename}`),
      {
        mainAppPath: opts['app-path'].replace(/^\.\/src\//, './'),
        appHTMLSelector: opts['app-selector'],
      }
    )

    if (opts['skip-router']) {
      this.fs.copy(
        this.templatePath('history.js'),
        this.destinationPath('./src/history.js')
      )
    }

    this.fs.copy(
      this.templatePath('actions.js'),
      this.destinationPath('./src/store/actions.js')
    )

    this.fs.copyTpl(
      this.templatePath('reducers.js'),
      this.destinationPath('./src/store/reducers.js'),
      { includeRouter: !opts['skip-router'] }
    )

    this.fs.copyTpl(
      this.templatePath('store.index.js'),
      this.destinationPath('./src/store/index.js'),
      { includeRouter: !opts['skip-router'] }
    )
  }

  _getDependencies () {
    const core = [
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-actions',
    ]

    if (this.options['skip-router']) {
      return core
    }

    return core.concat([
      'history',
      'react-router-redux',
    ])
  }

  _getDevDependencies () {
    const core = [
      'redux-mock-store',
    ]

    return core
  }
}
