const fs = require("fs");

async function solution() {
  const input = fs.readFileSync("./input").toString();

  const groups = input.split("\n\n");

  let sum = 0;
  groups.forEach((group) => {
    const answerCounts = {};
    const persons = group.split("\n").filter((line) => !!line);

    persons.forEach((line) => {
      line.split("").forEach((key) => {
        answerCounts[key] = (answerCounts[key] || 0) + 1;
      });
    });

    Object.keys(answerCounts).forEach((key) => {
      const count = answerCounts[key];
      if (count === persons.length) {
        sum++;
      }
    });
  });

  return sum;
}

solution().then(console.log);
