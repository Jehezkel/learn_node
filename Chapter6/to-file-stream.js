import { Writable } from "stream";
import { writeFile } from "fs/promises";
import { mkdirp } from "mkdirp";
import { dirname } from "path";

export class toFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }
  _write(chunk, encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb);
  }
}
