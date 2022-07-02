/**
 Implement the function run() that executes async tasks with a concurrency limit.
 Only CONCURRENT_LIMIT tasks can be running at the same time. When one finishes, another one can be started.
 */

const CONCURRENT_LIMIT = 3

const sleep = (milliseconds = 1) => new Promise((resolve) => setTimeout(resolve, milliseconds))

const worker = async (id) => {
  console.log(`working on ${id}`)
  await sleep(1000 * Math.random())
  console.log(`${id} is completed`)
}

const run = async (tasks) => {
  // TODO

  let concurrentTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    // we are waiting for our concurrency permission until next queued job is resolved or rejected
    while (concurrentTasks >= CONCURRENT_LIMIT) {
      await sleep(1)
    }

    // we say that we are fine to keep going from next job
    concurrentTasks++;

    worker(tasks[i])
      .finally(() => {
        // we say that our job is either resolved or rejected and we can take another job into queue
        concurrentTasks--;
      })
  }
}

run(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])


/*
sample output:

> node index.js

working on a
working on b
working on c
b is completed
working on d
a is completed
working on e
c is completed
working on f
d is completed
working on g
g is completed
working on h
f is completed
working on i
e is completed
working on j
j is completed
i is completed
h is completed
* */
