const fs = require("fs");

async function solution() {
  const input = fs.readFileSync("./input").toString();

  const instructions = input.split("\n");
  instructions.pop(); // removes emtpy value caused by the extra line break at the end of the file

  // lineNumber: boolean
  const visitedLines = {};
  let terminated = false;
  let accumulator = 0;
  let lineNumber = 0;

  while (!terminated) {
    if (visitedLines[lineNumber]) {
      terminated = true;
      break;
    }

    visitedLines[lineNumber] = true;
    const line = instructions[lineNumber];

    const [instruction, valueString] = line.split(" ");
    const value = Number(valueString);

    if (instruction === "jmp") {
      lineNumber += value;
    } else {
      lineNumber++;
    }

    if (instruction === "acc") {
      accumulator += value;
    }
  }

  return accumulator;
}

solution().then(console.log);
