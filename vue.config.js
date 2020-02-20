module.exports = {
  chainWebpack: config => {
    config.module
      .rule('sass')
      .use('sass-loader')
      .loader('sass-loader')
      .tap(options => {
        options.indentedSyntax = true
        options.implementation = require('sass')
        return options
      })
  }
}
