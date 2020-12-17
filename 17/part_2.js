const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  // const inputStream = fs.createReadStream("./testInput");
  const inputStream = fs.createReadStream("./input");

  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const inputs = [];
  for await (const line of lines) {
    inputs.push(line.split(""));
  }

  // map `${x,y,z,w} = true` for active positions
  let activeMap = {};
  for (let x = 0; x < inputs.length; x++) {
    for (let y = 0; y < inputs[x].length; y++) {
      const active = inputs[x][y] === "#";
      if (active) {
        activeMap[`${x},${y},0,0`] = true;
      }
    }
  }

  let xRange = [0, inputs.length];
  let yRange = [0, inputs[0].length];
  let zRange = [0, 1];
  let wRange = [0, 1];

  for (let i = 0; i < 6; i++) {
    let nextMap = {};
    xRange[0]--;
    xRange[1]++;
    yRange[0]--;
    yRange[1]++;
    zRange[0]--;
    zRange[1]++;
    wRange[0]--;
    wRange[1]++;

    for (let w = wRange[0]; w < wRange[1]; w++) {
      for (let z = zRange[0]; z < zRange[1]; z++) {
        for (let y = yRange[0]; y < yRange[1]; y++) {
          for (let x = xRange[0]; x < xRange[1]; x++) {
            const key = `${x},${y},${z},${w}`;
            const nCount = countActive(x, y, z, w, activeMap);
            const isActive = activeMap[key];
            if ((isActive && nCount === 2) || nCount === 3) {
              nextMap[key] = true;
            }
          }
        }
      }
    }

    activeMap = nextMap;
  }

  return Object.values(activeMap).length;
}

function countActive(x, y, z, w, activeMap) {
  let total = 0;
  for (let cw = w - 1; cw <= w + 1; cw++) {
    for (let cz = z - 1; cz <= z + 1; cz++) {
      for (let cx = x - 1; cx <= x + 1; cx++) {
        for (let cy = y - 1; cy <= y + 1; cy++) {
          if (
            (cx !== x || cy !== y || cz !== z || cw !== w) &&
            activeMap[`${cx},${cy},${cz},${cw}`]
          ) {
            total++;
          }
        }
      }
    }
  }
  return total;
}
