var baseConfig = require("./webpack.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var path = require("path");
var _ = require("lodash");
var newEntrys = {};
_.map(baseConfig.entry, (item, key) => {
    newEntrys[key] = [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        item
    ];
});
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
/*设置 发布域名*/
var argv = require("yargs").argv;
baseConfig.output.publicPath = "/";
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

baseConfig.module.rules = baseConfig.module.rules.concat([
    {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: [path.resolve("./src")]
    },
    {
        test: /\.(css)$/,
        use: [
            // MiniCssExtractPlugin.loader,
            { loader: "style-loader", },
            {
                loader: "css-loader",
                options: {
                    importLoaders: 1,
                    module: true,
                    sourceMap: true,
                    localIdentName: "[local]_[hash:base64:5]"
                }
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
    /*  {
         test: /\.(less)$/,
         use: [
             MiniCssExtractPlugin.loader,
             {
                 loader: "css-loader",
             },
             { loader: 'less-loader', options: { javascriptEnabled: true } },
         ],
     }, */
    
])
    ;
var config = {
    mode: "development",
    // devtool: 'source-map',
    devtool: "cheap-module-eval-source-map",
    entry: newEntrys,
    externals: baseConfig.externals,
    output: baseConfig.output,
    resolve: baseConfig.resolve,
    module: baseConfig.module,
    plugins: baseConfig.plugins,
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
    }
};

var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
config.plugins.push(new HtmlWebpackPlugin({
    template: `./src/assets/index.html`,
    alwaysWriteToDisk: true
}));
config.plugins.push(new HtmlWebpackHarddiskPlugin());
/* config.plugins.push(new MiniCssExtractPlugin({
    filename: 'stylesheets/index.css',
})); */

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
