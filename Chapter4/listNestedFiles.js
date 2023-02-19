import fs from "fs";

function listNestedFiles(dir, cb) {
  console.log("Triggered function listNested for directory: ", dir);
  fs.readdir(dir, (error, res) => {
    if (error) return cb(error);
    analyzeDirectory(dir, res, (error, res) => {
      if (error) return cb(error);
      return cb(null, res);
    });
  });
}
function analyzeDirectory(dir, itemsList, cb) {
  let result = [];
  //   keep track of concurrent jobs done
  let done = 0;
  //   transform fnames to fullDir
  const fullNamesList = itemsList.map((i) => `${dir}/${i}`);
  function iterate(index) {
    if (!fullNamesList[index]) return null;
    const currentItem = fullNamesList[index];
    fs.stat(currentItem, (err, res) => {
      if (err) return cb(err);
      if (res.isDirectory()) {
        listNestedFiles(currentItem, cb);
      }
      if (res.isFile()) result.push(currentItem);
      if (++done === itemsList.length) return cb(null, result);
      return null;
    });
    iterate(++index);
  }
  iterate(0);
}

listNestedFiles(".", (error, list) => {
  if (error) console.log("error occured", error);
  console.log(list);
});
