const fs = require("fs");

async function loadLines(fileName) {
  return fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .filter((l) => l.length > 0);
}

async function part1(lines) {
  const originalCups = lines[0].split("").map(Number);

  const min = Math.min(...originalCups);
  const max = Math.max(...originalCups);

  let cups = [...originalCups];
  let pickedUp = [];
  let currentCupIndex = 0;
  let currentCupValue = cups[currentCupIndex];

  for (let r = 0; r < 100; r++) {
    currentCupValue = cups[currentCupIndex];

    if (currentCupIndex > cups.length - 4) {
      const numbersLeft = cups.length - 1 - currentCupIndex;
      pickedUp = [
        ...cups.slice(currentCupIndex + 1),
        ...cups.slice(0, 3 - numbersLeft),
      ];
    } else {
      pickedUp = cups.slice(currentCupIndex + 1, currentCupIndex + 4);
    }

    cups = cups.filter((c) => !pickedUp.includes(c));

    let destinationIndex = -1;
    let destinationValue = currentCupValue - 1;
    while (destinationIndex < 0) {
      destinationIndex = cups.findIndex((c) => c === destinationValue);
      if (destinationIndex >= 0) {
        break;
      }

      destinationValue--;
      if (destinationValue < min) {
        destinationValue = max;
      }
    }

    cups = [
      ...cups.slice(0, destinationIndex + 1),
      ...pickedUp,
      ...cups.slice(destinationIndex + 1),
    ];

    currentCupIndex = cups.findIndex((c) => c === currentCupValue) + 1;
    currentCupIndex = currentCupIndex % cups.length;
  }
  const indexOfOne = cups.findIndex((c) => c === 1);
  const resultCups = [
    ...cups.slice(indexOfOne + 1),
    ...cups.slice(0, indexOfOne),
  ];
  return resultCups.join("");
}

const inputFile = "./input";
// const inputFile = "./testInput";

loadLines(inputFile).then(part1).then(console.log);
