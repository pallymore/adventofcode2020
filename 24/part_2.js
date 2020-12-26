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

  let blackTiles = {};

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

  for (let day = 0; day < 100; day++) {
    blackTiles = getNextTiles(blackTiles);
  }

  return Object.keys(blackTiles).length;
}

function getNextTiles(blackTiles) {
  const nextBlackTiles = {};

  const [qBound, rBound] = getBounds(blackTiles);

  for (let q = 0 - qBound - 1; q <= qBound + 1; q++) {
    for (let r = 0 - rBound - 1; r <= rBound + 1; r++) {
      const key = [q, r].join();
      const isBlack = blackTiles[key];
      const blackN = countBlackN(blackTiles, q, r);
      if (isBlack) {
        // more than 2, or === 0 -> white
        if (blackN > 0 && blackN <= 2) {
          nextBlackTiles[key] = true;
        }
      } else {
        if (blackN === 2) {
          nextBlackTiles[key] = true;
        }
      }
    }
  }

  return nextBlackTiles;
}

// dumb!
function countBlackN(blackTiles, q, r) {
  let count = 0;
  const nw = [q, r - 1];
  const se = [q, r + 1];
  const sw = [q - 1, r + 1];
  const w = [q - 1, r];
  const e = [q + 1, r];
  const ne = [q + 1, r - 1];
  [nw, se, sw, w, e, ne].forEach((n) => {
    if (blackTiles[n.join()]) {
      count++;
    }
  });
  return count;
}

function getBounds(blackTiles) {
  let q = 0;
  let r = 0;
  Object.keys(blackTiles)
    .map((k) => k.split(",").map(Number))
    .forEach(([qi, ri]) => {
      q = Math.max(Math.abs(qi), q);
      r = Math.max(Math.abs(ri), r);
    });
  return [q, r];
}

// solution("./testInput").then(console.log);
solution("./input").then(console.log);
