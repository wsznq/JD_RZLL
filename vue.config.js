const path = require("path");
const fs = require("fs");
const vuxLoader = require("vux-loader");
// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const glob = require('glob-all')

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/",

  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,

  // When building in multi-pages mode, the webpack config will contain different plugins
  // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
  // Make sure to run vue inspect if you are trying to modify the options for those plugins.
  pages: {
    index: {
      // entry for the pages
      entry: "src/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // chunks to include on this pages, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: ''
  },

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: ["vux-ui"]
    });
  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: config => {
    config.plugin("define").tap(args => {
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
      return args;
    });

    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("static", resolve("src/static"));

    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization.splitChunks({
      cacheGroups: {}
    });

    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    config.module
      .rule("eslint")
      .exclude.add("/Users/maybexia/Downloads/FE/community_built-in/src/lib")
      .end();
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // options here will be passed to css-loader
    modules: false,
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        // 向全局less样式传入共享的全局变量
        data: `@import "@/assets/common.less";`
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,

    //host: '192.168.0.32',
    host: "192.168.101.234",

    port: 3000,

    https: false,

    hotOnly: false,

    proxy: null,

    before: app => {}
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require("os").cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
};
