import { readFile } from "fs";
function readJSONThrows(filename, callback) {
  readFile(filename, "utf8", (err, data) => {
    if (err) {
      callback(err);
    }
    try {
      const parsedData = JSON.parse(data);
      callback(null, parsedData);
    } catch (error) {
      callback(error);
    }
  });
}
function wrapperFunction(fileName) {
  readJSONThrows(fileName, (err, data) => {
    if (err) return console.log("Error from callback \n", err);
    console.log(`regular end for file: ${fileName} \n `, data);
  });
}
wrapperFunction("invalid_json.json");
wrapperFunction("package.json");
