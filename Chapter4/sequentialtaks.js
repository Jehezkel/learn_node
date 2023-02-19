function asyncOperation(cb) {
  process.nextTick(cb);
}

function task1(cb) {
  console.log("Task:task1 scheduled");
  asyncOperation(() => {
    setTimeout(() => {
      console.log("task1 executed");
      task2(cb);
    }, 2000);
  });
}

function task2(cb) {
  console.log("Task:task2 scheduled");
  asyncOperation(() => {
    setTimeout(() => {
      console.log("task2 executed");
      task3(cb);
    }, 2000);
  });
}

function task3(cb) {
  console.log("Task:task3 scheduled");
  asyncOperation(() => {
    setTimeout(() => {
      console.log("task3 executed");
      cb();
    }, 2000);
    // finally executes the callback
  });
}

task1(() => {
  // executed when task1, task2 and task3 are completed
  console.log("tasks 1, 2 and 3 executed");
});
