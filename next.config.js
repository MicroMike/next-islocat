const withCSS = require('@zeit/next-css')
const withImages = require('next-images')


module.exports = withImages(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[name]__[local]__[hash:base64:5]",
  }
}))