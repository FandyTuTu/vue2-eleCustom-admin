module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        plugins: "@/plugins"
      }
    }
  },
  // 公共路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "assets",
  lintOnSave: false,
  // 我用的only，打包后小些
  // compiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  // css相关配置
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // npm run serve后自动打开页面
    host: "0.0.0.0", // 匹配本机IP地址(默认是0.0.0.0)
    port: 7758, // 开发服务器运行端口号
    proxy: {
      "/api": {
        target: "https://xx.com/", //要访问的
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
