import { join } from "path";
// import { toFileStream } from "./to-file-stream.js";
// const tfs = new toFileStream();
import { Writable } from "stream";
import { mkdirp } from "mkdirp";
import { writeFile } from "fs/promises";
import { dirname } from "path";
const tfs = new Writable({
  objectMode: true,
  write(chunk, encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb);
  },
});

tfs.write({
  path: join("files", "file1.txt"),
  content: "Hello",
});
tfs.write({
  path: join("files", "file2.txt"),
  content: "Node.js",
});
tfs.write({
  path: join("files", "file3.txt"),
  content: "streams",
});
tfs.end(() => console.log("All files created"));
