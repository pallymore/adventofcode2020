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

  if (seat === "#" && occupiedSeats >= 4) {
    return "L";
  }

  return seat;
}

function countAdjacentOccupiedSeats(x, y, seatMap) {
  let count = 0;

  if (seatMap[x - 1] && seatMap[x - 1][y - 1] === "#") {
    count++;
  }
  if (seatMap[x - 1] && seatMap[x - 1][y] === "#") {
    count++;
  }
  if (seatMap[x - 1] && seatMap[x - 1][y + 1] === "#") {
    count++;
  }
  if (seatMap[x][y - 1] === "#") {
    count++;
  }
  if (seatMap[x][y + 1] === "#") {
    count++;
  }

  if (seatMap[x + 1]) {
    if (seatMap[x + 1][y - 1] === "#") {
      count++;
    }
    if (seatMap[x + 1][y] === "#") {
      count++;
    }
    if (seatMap[x + 1][y + 1] === "#") {
      count++;
    }
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
