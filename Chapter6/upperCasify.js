import { Transform } from "stream";

const upperCasify = new Transform({
  transform(chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase());
    cb();
  },
});
const reversify = new Transform({
  transform(chunk, enc, cb) {
    this.push([...chunk.toString()].reverse().join(""));
    cb();
  },
});
process.stdin.pipe(upperCasify).pipe(reversify).pipe(process.stdout);
