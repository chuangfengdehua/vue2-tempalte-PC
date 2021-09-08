/**
 * 补全css前缀：npm i postcss-loader autoprefixer@8.0.0 -D
 *    删除根目录下.browserslistrc文件
 *    在package.json中添加 browserslist: [...] 配置
 *    重启项目
 * 建议在项目即将结束时配置，否则不好调试
 * */
module.exports = {
  plugins: {
    autoprefixer: {}
  }
}
