const autoprefixer = require('autoprefixer')
const flexbugsFixes = require('postcss-flexbugs-fixes')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    flexbugsFixes,
    postcssPresetEnv(),
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
}
