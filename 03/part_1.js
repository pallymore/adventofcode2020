const readline = require("readline");
const fs = require("fs");

async function solutionPartOne() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const matrix = [];
  for await (const line of rl) {
    matrix.push(line.split(""));
  }

  let trees = 0;
  let x = 3;
  let y = 1;
  while (y < matrix.length) {
    const row = matrix[y];
    const xPosition = x < row.length ? x : x % row.length;

    if (row[xPosition] === "#") {
      trees++;
    }

    x += 3;
    y += 1;
  }

  return trees;
}

solutionPartOne().then(console.log);
