import { readFile, writeFile } from "fs/promises";
import { mkdirp } from "mkdirp";
import { dirname } from "path";
import { getPageLinks, urlToFilename } from "./utils.js";
import superagent from "superagent";

function download(url, filename) {
  console.log(`Downloading ${url}`);
  let content;
  return superagent
    .get(url)
    .then((res) => {
      content = res.text;
      return mkdirp(dirname(filename));
    })
    .then(() => writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved :${url} as filename ${filename}`);
      return content;
    });
}
function spiderLinks(currentUrl, content, nesting) {
  let promise = Promise.resolve();
  if (nesting === 0) return promise;
  const links = getPageLinks(currentUrl, content);
  //   this is just chaining promises from null one to each appending next spider for new link
  //   for (const link of links) {
  //     promise = promise.then(() => spider(link, nesting - 1));
  //   }
  const promises = links.map((l) => spider(l, nesting - 1));
  //all accepts array of promises and returns them wrapped as single to resolve
  return Promise.all(promises);
  //   return promise;
}

export function spider(url, nesting) {
  const filename = urlToFilename(url);
  return readFile(filename, "utf-8")
    .catch((err) => {
      if (err.code !== "ENOENT") throw err;
      return download(url, filename);
    })
    .then((content) => spiderLinks(url, content, nesting));
}
