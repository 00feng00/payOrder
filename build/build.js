/*
*tar -xzvf
*
root
DiYee.Tech159753
https://www.diyeetech.com
* */


var buildConfig = require('./webpack.build')
var webpack = require('webpack')

/*设置 发布域名*/
var argv = require('yargs').argv;
console.log(argv.domain)
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const betterProgress = require('better-webpack-progress');

buildConfig.plugins.push(new ProgressPlugin(betterProgress({
    mode: 'compact',  // or 'detailed'
})))

// buildConfig.output.publicPath = argv.domain || 'http://localhost:3000'
buildConfig.output.publicPath ="/"


const compiler = webpack(buildConfig);




// compiler.plugin('run', (compilation) => {
//     console.log(compilation)
//     process.stdout.write(compilation.toString());
// })


compiler.run(function (err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    const info = stats.toJson({
        assets: false,
        hash: true,
        colors: true,
    });
    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
    console.log("build 完成")
    process.stdout.write(stats.toString() + "\n");

})