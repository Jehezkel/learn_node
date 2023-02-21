import { createServer } from "http";
import Chance from "chance";
const chance = new Chance();
const server = createServer((req, res) => {
  if (req.method !== "GET") {
    res.writeHead(400, "WTF");
    return res.end();
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  function generateMore() {
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = chance.string({
        length: 25 * 1024 - 1,
      })[181];
      // (1)
      // (2)Coding with Streams
      const shouldContinue = res.write(`${randomChunk}\n`);
      if (!shouldContinue) {
        console.log("back-pressure");
        return res.once("drain", generateMore);
      }
      // (3)
    }
    res.end("\n\n");
  }
  generateMore();
  res.on("finish", () => console.log("All data sent"));
});
server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
