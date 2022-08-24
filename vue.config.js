/* eslint-disable */
module.exports = {
    // lintOnSave: false,
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
      proxy:'http://r2d2.roboticamisiones.com/'
    },
    publicPath: process.env.NODE_ENV === 'production'
      ? '/preinscriptosxmunicipio/'
      : '/',
      outputDir: 'docs'
  };