const Generator = require('yeoman-generator')
const utils = require('../utils')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('name', {
      desc: 'redux model name',
    })

    this.option('skip-endpoints', {
      desc: 'Skip adding an `endpoints.js` file (used for API interactions)',
      default: false,
      type: Boolean,
    })

    this.option('skip-tests', {
      desc: 'Skip adding a `.test.js` file for each model type',
      default: false,
      type: Boolean,
    })
  }

  prompting () {
    if (this.options.name !== 'undefined') {
      return
    }

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of model',
      }
    ]).then(answers => {
      this.options.name = answers.name
    })
  }

  writing () {
    const outBase = `./src/store/${this.options.name}`

    const skipEndpoints = this.options['skip-endpoints']
    const skipTest = this.options['skip-tests']

    const name = this.options.name

    const tplOpts =  {
      name,
    }

    this.fs.copyTpl(
      this.templatePath('actions.js'),
      this.destinationPath(`${outBase}/actions.js`),
      tplOpts
    )

    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`${outBase}/reducer.js`),
      tplOpts
    )

    if (!skipEndpoints) {
      this.fs.copyTpl(
        this.templatePath('endpoints.js'),
        this.destinationPath(`${outBase}/endpoints.js`),
        tplOpts
      )
    }

    if (!skipTest) {
      this.fs.copyTpl(
        this.templatePath('actions.test.js'),
        this.destinationPath(`${outBase}/actions.test.js`),
        tplOpts
      )

      this.fs.copyTpl(
        this.templatePath('reducer.test.js'),
        this.destinationPath(`${outBase}/reducer.test.js`),
        tplOpts
      )

     if (!skipEndpoints) {
        this.fs.copyTpl(
          this.templatePath('endpoints.test.js'),
          this.destinationPath(`${outBase}/endpoints.test.js`),
          tplOpts
        )
      }
    }
  }

  end () {
    this.log()
    this.log('~*~ NOTES ~*~')
    this.log('-----///-----')
    this.log('* Be sure to import and add the initialState to the store in `src/store/index.js`')
    this.log('* Import any app-required actions to `src/store/actions.js`')
    this.log('* Import and add the reducer to the rootReducer at `src/store/reducer.js')
  }
}
