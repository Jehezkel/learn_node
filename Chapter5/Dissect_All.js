const tasks = Array(100)
  .fill()
  .map((v, i) => ({
    name: `task ${i}`,
    delay: Math.floor(Math.random() * 10000),
  }));
function myDelay(task) {
  const promise = new Promise((res) =>
    setTimeout(() => res(`Task with name: ${task.name} executed`), task.delay)
  );
  return promise;
}

function myAll(promises) {
  const resPromis = new Promise(async (res) => {
    for (const promise in promises) {
      console.log("uga buga");
      await promise;
    }
    res("done");
  });
  return resPromis;
}

const promises = tasks.map((t) => myDelay(t));
myAll(promises).then((x) => console.log("asd"));
// Promise.all(promises).then((x) => console.log("all done", x));
