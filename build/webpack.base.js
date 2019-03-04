var webpack = require("webpack");
var path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const argv = require("yargs").argv;
const CopyPlugin = require('copy-webpack-plugin')
var dev_mode = "'/api'";
const config = {
    entry: {
        index: path.resolve("./src/app.js")
    },
    resolve: {},
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        redux: "Redux",
        echarts: "echarts",
        konva: "Konva",
        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_' // indicates global variable
        },
        axios: "axios",
        mockjs: "mockjs",
        'moment': "moment",
        'antd-mobile': 'antdMobile',
        'antd-mobile': 'antd-mobile'
    },
    output: {
        path: path.resolve(__dirname, "../dist/client/"),
        filename: "[name]/[name].js",
        // 添加 chunkFilename
        chunkFilename: "[name].[chunkhash:5].chunk.js"
    },
    resolve: {
        extensions: [".js", ".tsx", ".jsx", ".json", ".css"],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=../images/[name].[ext]?[hash]',
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve("./"),
            exclude: ["server"],
            verbose: true,
            dry: false
        }),
        new CopyPlugin([
            { from: path.resolve(__dirname, "../src/assets"), to: path.resolve(__dirname, "../dist/client") },
        ]),
        new webpack.DefinePlugin({
            NODE_ENV: "'" + process.env.NODE_ENV + "'",
            DEV_MODAL: argv.devmodal,
            DOMAIN: "'" + argv.domain + "'",
            __API__: dev_mode,
            UPLOAD_ACTION: "'https://upload-z2.qiniup.com'",
            IMAGE_DOMAIN:
                argv.devmodal + "" != "dev_end"
                    ? "'/'"
                    : "'https://qn.diyeetech.com'"
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /antd$/),
    ]
};


module.exports = config;
