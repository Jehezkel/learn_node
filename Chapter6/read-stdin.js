// process.stdin
//   .on("readable", () => {
//     let chunk;
//     while ((chunk = process.stdin.read()) !== null) {
//       console.log(`Chink read${chunk.length} bytes:${chunk.toString()}`);
//     }
//   })
//   .on("end", () => console.log("end of stream"));

(async () => {
  for await (const chunk of process.stdin) {
    console.log("new data ");
    console.log(`chink read ${chunk.length}: ${chunk.toString()}`);
  }
  console.log("end of stream");
})();
