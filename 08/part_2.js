const fs = require("fs");

async function solution() {
  const input = fs.readFileSync("./input").toString();

  const instructions = input.split("\n");
  instructions.pop(); // removes emtpy value caused by the extra line break at the end of the file

  for (let lineNo = 0; lineNo < instructions.length; lineNo++) {
    const line = instructions[lineNo];
    const { instruction, value } = extractInstruction(line);
    if (instruction === "acc") {
      continue;
    }

    const newInstruction = instruction === "nop" ? "jmp" : "nop";
    const copy = [...instructions];
    copy[lineNo] = [newInstruction, value].join(" ");

    const { accumulator, exitCode } = runProgram(copy);
    if (exitCode === 0) {
      return accumulator;
    }
  }

  // error: no possible fix return -Infinity
  return -Infinity;
}

// returns accumulator & exitCode: 0: success, -1: error
function runProgram(instructions) {
  const visitedLines = {};
  let accumulator = 0;
  let lineNumber = 0;

  while (true) {
    if (visitedLines[lineNumber]) {
      return { accumulator, exitCode: -1 };
    }
    if (lineNumber === instructions.length) {
      return { accumulator, exitCode: 0 };
    }

    visitedLines[lineNumber] = true;
    const line = instructions[lineNumber];
    const { instruction, value } = extractInstruction(line);

    if (instruction === "jmp") {
      lineNumber += value;
    } else {
      lineNumber++;
    }

    if (instruction === "acc") {
      accumulator += value;
    }
  }
}

function extractInstruction(line) {
  const [instruction, valueString] = line.split(" ");
  const value = Number(valueString);
  return { instruction, value };
}

solution().then(console.log);
