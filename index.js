const { moveFiles } = require('./MoveFiles.js');
const { argv } = require('process');

let args = argv.slice(2, argv.length);

try{
    moveFiles(args);
} catch (err) {
    console.log(err);
}