import { EventEmitter } from "events";
import { readFile } from "fs";
const regexEvents = {
  error: "error",
  fileaRead: "fileRead",
  found: "found",
  findStart: "findStart",
};
class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file) {
    this.files.push(file);
    return this;
  }
  find() {
    this.emit(regexEvents.findStart, this.files);
    // process.nextTick(() => this.emit(regexEvents.findStart, this.files));
    for (const file of this.files) {
      readFile(file, "utf-8", (err, content) => {
        if (err) {
          return this.emit(regexEvents.error, err);
        }
        this.emit(regexEvents.fileaRead, file);
        const match = content.match(this.regex);
        if (match) {
          console.log("cos jest");
          match.forEach((elem) => this.emit(regexEvents.found, file, elem));
        }
      });
    }
    return this;
  }
}
const instanceOfFind = new FindRegex(/no test \w+/g);
// ["data.txt", "package.json", "asd.txt"].forEach((f) =>
//   instanceOfFind.addFile(f)
// );
instanceOfFind
  .addFile("data.txt")
  .addFile("package.json")
  .addFile("xD")
  .on(regexEvents.fileaRead, (fileName) =>
    console.log(`reading file ${fileName}`)
  )
  .on(regexEvents.error, (error) => console.log(`error occured ${error}`))
  .on(regexEvents.found, (file, elem) =>
    console.log(`found file ${file} with elements \n  ${elem}`)
  )
  .find()
  .on(regexEvents.findStart, (files) =>
    console.log(`Process started with files \n ${files}`)
  );
setTimeout(() => console.log("Next invoke"), 0);
// instanceOfFind.find();
