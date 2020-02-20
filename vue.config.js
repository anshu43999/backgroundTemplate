module.exports = {
  publicPath: "./",
  // publicPath: process.env.NODE_ENV === "binheSportSystem" ? "./" : "/",
  outputDir: "dist",
  assetsDir : 'static',
  filenameHashing: false,
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      //配置代理
      // '/api':{
      //     target: 'http://wechatspq.free.idcfengye.com/binheSportSystem/',
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/api': '/'
      //     }
      // }
      "/sexLady": {
        target: "https://spq.free.idcfengye.com/binheSportSystem/",
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          "^/sexLady": "/"
        }
      }
    }
  }
};
