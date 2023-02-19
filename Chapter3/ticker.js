import { EventEmitter } from "events";
function ticker(number, cb) {
  const emiter = new EventEmitter();
  let totalTicks = 0;
  const initialTick = true;
  const tickTime = 50;

  if (initialTick)
    process.nextTick(() => {
      if (Date.now() % 5 === 0) {
        const error = new Error("timestamp divisable");
        emiter.emit("error", error);
        cb(error, null);
      }
      emiter.emit("tick") && totalTicks++;
    });

  function tickerLogic() {
    emiter.emit("tick");
    totalTicks++;
    if ((totalTicks - initialTick) * tickTime < number)
      setTimeout(tickerLogic, tickTime);
    else cb(null, totalTicks);
  }
  setTimeout(tickerLogic, tickTime);
  return emiter;
}

ticker(150, (error, someValue) => {
  if (error) return console.log("Error from callback ", error);
  console.log("last tick ", someValue);
})
  .on("tick", () => console.log("tick"))
  .on("error", (error) => console.log("error from emiter ", error));
