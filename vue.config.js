const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // Fonts rule
    config.module
      .rule('fonts')
      .test(/\.(woff|woff2|eot|ttf|otf)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'fonts/[name].[hash:8].[ext]',
      });

    // Images rule
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]',
      });
  },
});