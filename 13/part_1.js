const fs = require("fs");

solution().then(console.log);

async function solution() {
  const [timeStr, busesString] = fs
    .readFileSync("./input")
    .toString()
    .split("\n");

  const buses = busesString.split(",");

  const busIds = buses.filter((b) => b !== "x").map(Number);

  const earliest = Number(timeStr);

  let time = earliest;

  while (true) {
    for (let i = 0; i < busIds.length; i++) {
      const id = busIds[i];
      if (time % id === 0) {
        return id * (time - earliest);
      }
    }
    time++;
  }

  return null;
}
