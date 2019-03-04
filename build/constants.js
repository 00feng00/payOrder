var argv = require('yargs').argv;
var port = argv.port
console.log("process.env.NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV == "production") {
    port = 9000
} else {
    port = 8889
}
exports.port = port
