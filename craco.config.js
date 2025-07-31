// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // remove CssMinimizerPlugin so CSS isn't mangled
      if (webpackConfig.optimization && webpackConfig.optimization.minimizer) {
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          plugin => plugin.constructor.name !== 'CssMinimizerPlugin'
        );
      }
      return webpackConfig;
    },
  },
};
