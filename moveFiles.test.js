const { moveFiles } = require('./MoveFiles.js');
const { vol } = require("memfs");
const { chdir, cwd } = require("process");
const path = require("node:path");

jest.mock("fs");

describe(moveFiles, () => {
    beforeEach(() => {
        vol.reset();
        chdir('/');
        vol.mkdirSync("test_source");
        vol.mkdirSync("test_target");
        vol.openSync(path.join("test_source", "test.pdf"), "w");
        vol.openSync(path.join("test_source", "test.png"), "w");
    });

    test('wrong number of arguments', () => {
        expect(() => moveFiles(["test_source"])).toThrow("Arguments are missing");
        expect(() => moveFiles(["test_source", "test_target"])).toThrow("Arguments are missing");
    });

    test('right number of arguments but argumets are invalid ', () => {
        expect(() => moveFiles(["test", "test_target", "test"])).toThrow("Source or Target Folder dont exist");
        expect(() => moveFiles(["test_source", "test", "test"])).toThrow("Source or Target Folder dont exist");
        expect(() => moveFiles(["test", "test", "test"])).toThrow("Source or Target Folder dont exist");
    })
    
    test('right number of arguments and valid folders but no valid file extensions', () => {
        expect(moveFiles(["test_source", "test_target", "test"])).toBe(0);
        expect(moveFiles(["test_source", "test_target", "test", "test2"])).toBe(0);
    })

    test('move pdf from source to target', () => {
        expect(moveFiles(["test_source", "test_target", "pdf"])).toBe(1);
    })

    test('move pdf from source to target (second file extension is pdf)', () => {
        expect(moveFiles(["test_source", "test_target", "test", "pdf"])).toBe(1);
    })

    test('move pdf and png from source to target', () => {
        expect(moveFiles(["test_source", "test_target", "png", "pdf"])).toBe(2);
    })
});
