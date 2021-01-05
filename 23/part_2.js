const fs = require("fs");

async function loadLines(fileName) {
  return fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .filter((l) => l.length > 0);
}

// use linked list instead of arrays?
async function part2(lines) {
  const originalCups = lines[0].split("").map(Number);

  let min = Math.min(...originalCups);
  let max = Math.max(...originalCups);

  // cup value -> nextValue
  const firstCup = originalCups[0];
  let cupsMap = {
    [firstCup]: null,
  };
  let lastLabel;
  for (let i = 1; i < originalCups.length; i++) {
    const label = originalCups[i];
    const prevLabel = originalCups[i - 1];
    cupsMap[prevLabel] = label;
    cupsMap[label] = null;
    lastLabel = label;
  }
  for (let i = max + 1; i <= 1000000; i++) {
    cupsMap[lastLabel] = i;
    cupsMap[i] = null;
    lastLabel = i;
    if (i === 1000000) {
      cupsMap[i] = firstCup;
    }
  }
  max = 1000000;

  let currentCup = firstCup;
  for (let r = 0; r < 10000000; r++) {
    // pick up 3
    const next1 = cupsMap[currentCup];
    const next2 = cupsMap[next1];
    const next3 = cupsMap[next2];

    // remove them from the circle
    cupsMap[currentCup] = cupsMap[next3];

    // find destination
    let destination = Number(currentCup) - 1;
    destination = destination < min ? max : destination;
    while ([next1, next2, next3].includes(destination)) {
      destination--;
      if (destination < min) {
        destination = max;
      }
    }

    // add the picked up cups back
    const originalDestinationNext = cupsMap[destination];
    cupsMap[destination] = next1;
    cupsMap[next2] = next3;
    cupsMap[next3] = originalDestinationNext;

    // go to next cup
    currentCup = cupsMap[currentCup];
  }

  const c1 = cupsMap[1];
  const c2 = cupsMap[c1];
  return c1 * c2;
}

const inputFile = "./input";
// const inputFile = "./testInput";
loadLines(inputFile).then(part2).then(console.log);
