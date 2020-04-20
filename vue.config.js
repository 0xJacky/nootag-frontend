const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pages: {
        surface: {
          // page 的入口
          entry: 'src/pages/surface/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'nooTag 无派科技',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'surface']
        },
        manage: {
            entry: 'src/pages/manage/main.js',
            template: 'public/index.html',
            filename: 'manage.html',
            title: 'nooTag 无派科技 | 管理系统',
            chunks: ['chunk-vendors', 'chunk-common', 'manage']
        }
    },

    devServer: {
        proxy: 'https://nootag-api.app'
    },

    productionSourceMap: false,

    css: {
        loaderOptions: {
            css: {},
            postcss: {},
            less: {
                javascriptEnabled: true
            }
        },
        requireModuleExtension: true
    },

    configureWebpack: config => {
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
        if (process.env.NODE_ENV === 'production') {
            config.performance = {
                hints: 'warning',
                // 入口起点的最大体积
                maxEntrypointSize: 50000000,
                // 生成文件的最大体积
                maxAssetSize: 30000000,
                // 只给出 js 文件的性能提示
                assetFilter: function (assetFilename) {
                    return assetFilename.endsWith('.js')
                }
            }
        }
    },

    chainWebpack: (config) => {
        config.resolve.alias.set('~', resolve('src/pages'))
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    }
}
