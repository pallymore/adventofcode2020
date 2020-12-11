const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const seatMap = [];
  for await (const line of rl) {
    const row = line.split("");
    seatMap.push(row);
  }

  let runResult = runSeatingProcess(seatMap);

  let i = 0;
  while (i < 3) {
    i++;
    runResult = runSeatingProcess(runResult.newSeatMap);
  }

  while (true) {
    if (!runResult.seatsChanged) {
      break;
    }
    runResult = runSeatingProcess(runResult.newSeatMap);
  }

  printSeats(runResult.newSeatMap);

  return countOccupied(runResult.newSeatMap);
}

function runSeatingProcess(seatMap) {
  let seatsChanged = false;
  let newSeatMap = [];

  for (let x = 0; x < seatMap.length; x++) {
    newSeatMap[x] = [...seatMap[x]];

    for (let y = 0; y < seatMap[x].length; y++) {
      let state = seatMap[x][y];
      let nextState = nextSeatState(x, y, seatMap);

      if (state !== nextState) {
        seatsChanged = true;
        newSeatMap[x][y] = nextState;
      }
    }
  }

  return {
    newSeatMap,
    seatsChanged,
  };
}

function nextSeatState(x, y, seatMap) {
  let seat = seatMap[x][y];
  const occupiedSeats = countAdjacentOccupiedSeats(x, y, seatMap);

  if (seat === "L" && occupiedSeats === 0) {
    return "#";
  }

  if (seat === "#" && occupiedSeats >= 5) {
    return "L";
  }

  return seat;
}

function countAdjacentOccupiedSeats(x, y, seatMap) {
  let count = 0;
  const width = seatMap[x].length;

  let row;
  let col;
  // top
  for (row = x - 1; row >= 0; row--) {
    const seat = seatMap[row][y];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
  }

  // top-left
  for (row = x - 1, col = y - 1; row >= 0 && col >= 0; row--) {
    const seat = seatMap[row][col];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
    col--;
  }

  // top-right
  for (row = x - 1, col = y + 1; row >= 0 && col < width; row--) {
    const seat = seatMap[row][col];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
    col++;
  }

  // left
  for (col = y - 1; col >= 0; col--) {
    const seat = seatMap[x][col];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
  }

  // right
  for (col = y + 1; col < width; col++) {
    const seat = seatMap[x][col];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
  }

  // bottom
  for (row = x + 1; row < seatMap.length; row++) {
    const seat = seatMap[row][y];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
  }

  // bottom-left
  for (row = x + 1, col = y - 1; row < seatMap.length && col >= 0; row++) {
    const seat = seatMap[row][col];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
    col--;
  }

  // bottom-right
  for (
    row = x + 1, col = y + 1;
    row < seatMap.length && col < seatMap[row].length;
    row++
  ) {
    const seat = seatMap[row][col];
    if (seat !== ".") {
      if (seat === "#") count++;
      break;
    }
    col++;
  }

  return count;
}

function printSeats(seatMap) {
  seatMap.forEach((row) => {
    console.log(row.join(""));
  });
}

function countOccupied(seatMap) {
  let count = 0;

  seatMap.forEach((row) => {
    row.forEach((seat) => {
      if (seat === "#") {
        count++;
      }
    });
  });

  return count;
}
