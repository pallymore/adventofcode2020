const readline = require("readline");
const fs = require("fs");

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const ids = [];
  for await (const line of rl) {
    const rowInput = line.slice(0, 7);
    const columnInput = line.slice(7);
    const id = getRow(rowInput) * 8 + getColumn(columnInput);
    ids.push(id);
  }

  const orderedIds = ids.sort((a, b) => (a > b ? 1 : -1));

  let missingId = 0;
  for (let i = 1; i < orderedIds.length - 1; i++) {
    const current = orderedIds[i];
    const prev = orderedIds[i - 1];
    if (current - prev === 2) {
      missingId = current - 1;
    }
  }

  return missingId;
}

function getRow(input) {
  let start = 0;
  let end = 127;

  input.split("").forEach((char) => {
    switch (char) {
      case "F":
        end = Math.floor((start + end) / 2);
        break;
      case "B":
        start = Math.ceil((start + end) / 2);
        break;
    }
  });

  return start;
}

function getColumn(input) {
  let start = 0;
  let end = 7;

  input.split("").forEach((char) => {
    switch (char) {
      case "L":
        end = Math.floor((start + end) / 2);
        break;
      case "R":
        start = Math.ceil((start + end) / 2);
        break;
    }
  });

  return start;
}

solution().then(console.log);
