const fs = require("fs");

async function solution(inputPath) {
  const input = fs
    .readFileSync(inputPath)
    .toString()
    .split("\n")
    .filter((l) => !!l);

  const directions = [];
  for (let i = 0; i < input.length; i++) {
    const tileDirection = [];
    const line = input[i].split("");

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      switch (char) {
        case "e":
        case "w":
          tileDirection.push(char);
          break;
        default:
          tileDirection.push([char, line[j + 1]].join(""));
          j++;
          break;
      }
    }
    directions.push(tileDirection);
  }

  const blackTiles = {};

  // https://www.redblobgames.com/grids/hexagons/
  // Axial Coordinates
  directions.forEach((td) => {
    let q = 0;
    let r = 0;
    td.forEach((d) => {
      switch (d) {
        case "e":
          q++;
          break;
        case "se":
          r++;
          break;
        case "sw":
          q--;
          r++;
          break;
        case "w":
          q--;
          break;
        case "nw":
          r--;
          break;
        case "ne":
          q++;
          r--;
          break;
        default:
          throw new Error("invalid direction", d);
      }
    });
    const tile = [q, r].join();
    if (blackTiles[tile]) {
      delete blackTiles[tile];
    } else {
      blackTiles[tile] = true;
    }
  });

  return Object.keys(blackTiles).length;
}

// solution("./testInput").then(console.log);
solution("./input").then(console.log);
