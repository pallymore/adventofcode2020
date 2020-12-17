const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  //const inputStream = fs.createReadStream("./testInput");
  const inputStream = fs.createReadStream("./input");

  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const initialSlice = [];
  for await (const line of lines) {
    initialSlice.push(line.split(""));
  }

  let cubes = [initialSlice];

  for (let i = 0; i < 6; i++) {
    const expandedCubes = expandCube(cubes);
    let nextCubes = expandCube(cubes);

    nextCubes.forEach((slice, z) => {
      nextCubes[z].forEach((line, x) => {
        for (let y = 0; y < nextCubes[z][x].length; y++) {
          nextCubes[z][x][y] = nextState(x, y, z, expandedCubes);
        }
      });
    });

    cubes = nextCubes;
  }

  printSlices(cubes);

  return countTotalActive(cubes);
}

function printSlices(slices) {
  slices.forEach((matrix, i) => {
    console.log(`z = ${i - Math.floor(slices.length / 2)}`);
    matrix.forEach((line) => console.log(line.join("")));
    console.log("");
  });
}

function countActive2D(slice, x, y) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y + 1],
    [x + 1, y - 1],
  ].reduce((sum, [nX, nY]) => {
    if (isActive(slice, nX, nY)) {
      sum++;
    }

    return sum;
  }, 0);
}

function isActive(slice, x, y) {
  return slice?.[x]?.[y] === "#";
}

function nextState(x, y, z, slices) {
  const currentSlice = slices[z];
  const prevSlice = slices[z - 1];
  const nextSlice = slices[z + 1];

  let totalActive = countActive2D(currentSlice, x, y);
  // console.log(x, y, z, totalActive);
  if (prevSlice) {
    totalActive += isActive(prevSlice, x, y) ? 1 : 0;
    totalActive += countActive2D(prevSlice, x, y);
  }
  if (nextSlice) {
    totalActive += isActive(nextSlice, x, y) ? 1 : 0;
    totalActive += countActive2D(nextSlice, x, y);
  }

  const isCurrentPosActive = isActive(currentSlice, x, y);
  if (isCurrentPosActive) {
    if (totalActive === 2 || totalActive === 3) {
      return "#";
    } else {
      return ".";
    }
  } else {
    if (totalActive === 3) {
      return "#";
    } else {
      return ".";
    }
  }
}

function countTotalActive(slices) {
  return slices.reduce((totalSum, slice) => {
    return (
      totalSum +
      slice.reduce((sliceSum, line) => {
        return (
          sliceSum +
          line.reduce((lineSum, char) => {
            if (char === "#") lineSum++;
            return lineSum;
          }, 0)
        );
      }, 0)
    );
  }, 0);
}

function emptySlice(xSize, ySize) {
  const slice = [];
  for (let x = 0; x < xSize; x++) {
    const line = emptyLine(ySize);
    slice.push(line);
  }
  return slice;
}

function emptyLine(size) {
  const line = [];
  for (let y = 0; y < size; y++) {
    line.push(".");
  }
  return line;
}

function expandCube(cube) {
  const row = cube[0].length + 2;
  const col = cube[0][0].length + 2;

  const newCube = [emptySlice(row, col), ...cube, emptySlice(row, col)];
  for (let i = 1; i < newCube.length - 1; i++) {
    newCube[i] = [emptyLine(col), ...newCube[i], emptyLine(col)];

    for (let j = 1; j < newCube[i].length - 1; j++) {
      newCube[i][j] = [".", ...newCube[i][j], "."];
    }
  }
  return newCube;
}
