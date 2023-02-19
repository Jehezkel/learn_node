import { EventEmitter } from "events";

const tasks = Array(2000)
  .fill()
  .map((v, i) => ({
    name: "Task " + i,
    taskDurMs: Math.floor(Math.random() * 10000),
  }));
const startEmiter = new EventEmitter();
startEmiter.setMaxListeners(8724);
console.log(tasks);
function asyncExecuteTasks(cb) {
  let completed = 0;
  function countDown(seconds) {
    console.log("TIME LEFT: ", seconds);
    if (seconds === 0) {
      console.log("emitting start");
      return startEmiter.emit("START");
    } else {
      setTimeout(() => countDown(--seconds), 1000);
    }
  }
  function iterate(index) {
    if (index >= tasks.length) {
      console.log("all tasks scheduled");
      return countDown(5);
    }
    const currentElement = tasks[index];
    console.log("scheduling task: ", currentElement.name);
    startEmiter.on("START", () =>
      setTimeout(() => taskCb(currentElement), currentElement.taskDurMs)
    );
    // ;
    iterate(++index);
  }
  function taskCb(currentElement) {
    console.log(
      `Executed: ${currentElement.name} with time ${currentElement.taskDurMs}`
    );
    completed++;
    if (completed === tasks.length) return cb();
  }
  iterate(0);
}
console.time("execTime");
asyncExecuteTasks(() => {
  console.log("all tasks done");
  console.timeLog("execTime");
});
