module.exports = {
  outputDir: "../public/",
  productionSourceMap: false,
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'WeatherBox';
      return args;
    });
  }
};