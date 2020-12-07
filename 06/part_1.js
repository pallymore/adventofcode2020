const fs = require("fs");

async function solution() {
  const input = fs.readFileSync("./input").toString();

  const groups = input.split("\n\n");

  let sum = 0;
  groups.forEach((group) => {
    const answerKeys = new Set();
    group.split("\n").forEach((line) => {
      line.split("").forEach((key) => {
        answerKeys.add(key);
      });
    });
    sum += answerKeys.size;
  });

  return sum;
}

solution().then(console.log);
