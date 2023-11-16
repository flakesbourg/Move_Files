import moveFiles from "./MoveFiles.js"
import { argv } from 'process';

let args = argv.slice(2, argv.length);

moveFiles(args);