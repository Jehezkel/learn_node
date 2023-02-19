import fs from "fs";

// 1. list directory
// 2. iterate items and check type
// 3a if file ---> reach & search
// 3b if dir push on call with step 1
// 4 after finished --> return list of files to list dir and decrement in progress
function recursiveFind(dir, keyword, cb) {
  let currentFinds = 0;
  currentFinds++;
  let result = [];
  analyseDir(dir, (error, res, newrun) => {
    if (error) return cb(error);
    if (newrun) {
      currentFinds++;
      console.log(currentFinds);
      return;
    }
    result = result.concat(res);
    // console.log("adding my new res", res);
    currentFinds--;
    console.log(currentFinds);
    if (currentFinds === 0) return cb(null, result);
  });
}

function analyseDir(dir, cb) {
  fs.readdir(dir, (error, res) => {
    if (error) return cb(error);
    const fullNameList = res.map((i) => `${dir}/${i}`);
    getItemsInfo(fullNameList, cb);
  });
}

function getItemsInfo(fullNames, cb) {
  let result = [];
  let done = 0;
  function iterate(index) {
    if (index >= fullNames.length) {
      if (done >= fullNames.length) return cb(null, result);
      return null;
    }
    const currentItem = fullNames[index];
    fs.stat(currentItem, (error, res) => {
      if (error) return cb(error);
      ++done;
      if (res.isDirectory()) {
        cb(null, null, true);
        analyseDir(currentItem, cb);
      }
      //simply add read with regex check and push only items with keyword
      if (res.isFile()) result.push(currentItem);
      if (done >= fullNames.length) return cb(null, result);
    });
    iterate(++index);
  }
  iterate(0);
}
recursiveFind(".", "asda", (error, res) => {
  if (error) return console.error(error);
  console.log("FINAL ", res);
});
