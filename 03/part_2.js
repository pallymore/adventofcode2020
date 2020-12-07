const readline = require("readline");
const fs = require("fs");

async function solutionPartTwo() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const matrix = [];
  for await (const line of rl) {
    matrix.push(line.split(""));
  }

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  return slopes.reduce((result, [stepRight, stepDown]) => {
    return result * countTrees(matrix, stepRight, stepDown);
  }, 1);
}

function countTrees(matrix, stepRight, stepDown) {
  let trees = 0;
  let x = stepRight;
  let y = stepDown;

  while (y < matrix.length) {
    const row = matrix[y];
    const xPosition = x < row.length ? x : x % row.length;

    if (row[xPosition] === "#") {
      trees++;
    }

    x += stepRight;
    y += stepDown;
  }

  return trees;
}

solutionPartTwo().then(console.log);
