import { readFile } from "fs";

const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    cb(cache.get(filename));
  } else {
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });
  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}
function createFileReader(filename) {
  const listeners = [];
  return {
    onDataReady: (listener) => {
      listeners.push(listener);
      // Call inconsistentRead after listeners are registered to ensure they are notified of any cached data
      inconsistentRead(filename, (value) => {
        listeners.forEach((listener) => listener(value));
      });
    },
  };
}
const reader1 = createFileReader("data.txt");
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`);
  const reader2 = createFileReader("data.txt");
  reader2.onDataReady((data) => console.log(`second call data:${data}`));
});
