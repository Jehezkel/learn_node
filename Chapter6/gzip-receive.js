import { createWriteStream } from "fs";
import { createServer } from "http";
import { basename, join } from "path";
import { createGunzip } from "zlib";
import { createDecipheriv, randomBytes } from "crypto";

const secret = randomBytes(24);
console.log("Generated secret: ", secret.toString("hex"));
const server = createServer((req, res) => {
  const filename = basename(req.headers["x-filename"]);
  const destFilenaem = join("received_files", filename);
  const iv = Buffer.from(req.headers["x-initialization-vector"], "hex");
  console.log(` File reqiested received : ${filename}`);
  req
    .pipe(createDecipheriv("aes192", secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilenaem))
    .on("finish", () => {
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("OK\n");
      console.log(`file saved: ${destFilenaem}`);
    });
});
const port = 3000;
server.listen(port, () => console.log(`listening on http://localhost:${port}`));
