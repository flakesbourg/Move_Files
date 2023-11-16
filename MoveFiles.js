const fs = require("fs");
const path = require("node:path");

function moveFiles(input) {
    if (input.length < 3) {
        throw new Error("Arguments are missing: node index.mjs SOURCE_DIR TARGET_DIR FILEEXTENSION");
    }
    
    let source_dir = input[0];
    let target_dir = input[1];
    let file_extensions = [];
    for (let i = 2; i < input.length; i++) {
        let extension = input[i];
        if (extension.charAt(0) !== ".") {
            extension = "." + extension;
        }
        file_extensions.push(extension);
    }
    
    if (!fs.existsSync(source_dir) || !fs.existsSync(target_dir)) {
        throw new Error("Source or Target Folder dont exist");
    }
    if (!fs.lstatSync(source_dir).isDirectory() | !fs.lstatSync(target_dir).isDirectory()) {
        throw new Error("Source or Target folder are not a directory");
    }

    let filenames = fs.readdirSync(source_dir);
    let filesMoved = 0;
    
    filenames.forEach(file => {
        if (file_extensions.includes(path.extname(file))) {
            let source_path = path.join(source_dir, file);
            let target_path = path.join(target_dir, file)
            fs.copyFileSync(source_path, target_path);

            if (fs.existsSync(target_path)) {
                fs.rmSync(source_path);
                if (!fs.existsSync(source_path)) {
                    filesMoved = filesMoved + 1;
                }
            }
        }
    })

    return filesMoved;
}

module.exports = {moveFiles};
