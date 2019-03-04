var baseConfig = require("./webpack.base.js");
var webpack = require("webpack");
var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var mode = process.env.NODE_ENV,
    devMode = mode !== 'production';
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
baseConfig.module.rules = baseConfig.module.rules.concat([
    {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: [path.resolve("./src")]
    },
    {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    importLoaders: 1,
                    module: true,
                    sourceMap: false,
                    localIdentName: "[local]_[hash:base64:5]",
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    plugins: [
                        require("precss")(),
                        require("postcss-nested-import"),
                        require('postcss-functions')({
                            functions: {
                                px2rem: function ($px, $fontSize) {
                                    var $fontSize = $fontSize || 100
                                    return ($px / $fontSize) + "rem"
                                }
                            }
                        })
                    ]
                }
            },
        ],
    },
]);
var plugins = baseConfig.plugins.concat(new Visualizer())
var config = {
    mode: "production",
    externals: baseConfig.externals,
    entry: baseConfig.entry,
    output: baseConfig.output,
    resolve: baseConfig.resolve,
    module: baseConfig.module,
    plugins: plugins,
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: true,
                    chunks: 'all',
                    minChunks: 5,
                }
            }
        },
        minimize: true,
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    },
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            }),
            /*css 压缩*/
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};
config.plugins.push(new MiniCssExtractPlugin({
    filename: "styles/[name].css",
    chunkFilename: "[id].css"
}));
config.plugins.push(
    new HtmlWebpackPlugin({
        template: `./src/assets/index.html`
    })
);

module.exports = config;
