import fs from "fs";
import path from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename } from "./utils.js";

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    // [1]
    if (err && err.code === "ENOENT") {
      console.log(`Downloading ${url} into ${filename}`);
      downloadSite(url, filename, cb);
    } else {
      cb(null, filename, false);
    }
  });
}

function downloadSite(url, filename, cb) {
  superagent.get(url).end((err, res) => {
    // [2]
    if (err) {
      return cb(err);
    } else {
      saveFile(filename, res.text, cb);
    }
  });
}
function saveFile(filename, content, cb) {
  mkdirp(path.dirname(filename), (err) => {
    // [3]
    if (err) {
      return cb(err);
    } else {
      fs.writeFile(filename, content, (err) => {
        // [4]
        if (err) {
          return cb(err);
        } else {
          cb(null, filename, true);
        }
      });
    }
  });
}
