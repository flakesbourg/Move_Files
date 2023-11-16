# SortingDownloads

A nodeJs project, to move all files with certain file extension, from one directory to another.


## Usage

```bash
node index.js SOURCE_DIRECTORY TARGET_DIRECTORY FILE_EXTENSION [FILE_EXTENSION_1 FILE_EXTENSION_2 ...]
```
- **SOURCE_DIRECTORY**: This is the directory where all files with a certain file extension get moved from
- **TARGET_DIRECTORY**: This is the director where all the files get moved to
- **FILE_EXTENSION**: List of file extensions seperated with a whitespace

## Tests

The tests are realized via jest and use the **memf** package to create a virtual file system to test the moveFiles function.
The tests can be run with: <br/>
```bash
npm test
```
