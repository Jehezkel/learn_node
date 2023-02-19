import { writeFile, access, readFile, appendFile } from "fs";
function concatFiles(dest, cb, ...srcFiles) {
  if (!srcFiles.length) return cb(null);

  console.log("Src files param: ", srcFiles);
  const currFileName = srcFiles[0];
  console.log("currFile: ", currFileName);

  readFileFunc(currFileName, (error, content) => {
    if (error) return cb(error);
    saveFile(dest, content, (error) => {
      if (error) return cb(error);
      concatFiles(dest, cb, ...srcFiles.slice(1));
    });
  });
}

function readFileFunc(filePath, cb) {
  readFile(filePath, (error, res) => {
    if (error) return cb(error);
    cb(null, res);
  });
}
function saveFile(filePath, content, cb) {
  access(filePath, (error) => {
    if (error && error.code === "ENOENT") {
      console.log("new file write");
      writeFile(filePath, content, (error) => {
        if (error) return cb(error);
        return cb(null);
      });
      return;
    }
    console.log("appending to file", filePath);
    appendFile(filePath, content, "utf-8", (error) => {
      if (error) return cb(error);
      cb(null);
    });
  });
}
concatFiles(
  "resultFile.txt",
  (error) => {
    if (error) return console.log("Error occured :< :", error);
    console.log("All done...");
  },
  "file1.txt",
  "file2.txt",
  "file3.txt"
);
