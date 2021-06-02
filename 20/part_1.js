const readline = require("readline");
const fs = require("fs");

solution().then(calcSolution).then(console.log);

// There are only 8 states for a tile and image: rotate 90, rotate 90, rotate 90, flip (any direction), rotate 90, rotate 90, rotate 90.

async function solution() {
  const input = fs.readFileSync("./testInput").toString().split("\n\n");
  // const input = fs.readFileSync("./input").toString().split("\n\n");

  const ids = [];
  const images = input.reduce((imgs, tileBlock) => {
    const lines = tileBlock.split("\n");
    const tileLine = lines.shift();
    const idRegex = /^Tile (?<id>\d+):$/g;
    const tileId = idRegex.exec(tileLine).groups.id;
    ids.push(tileId);
    imgs[tileId] = lines
      .filter((l) => l.length > 0)
      .map((line) => line.split(""));
    return imgs;
  }, {});

  let resultIds = []; // 3x3 matrix?
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    resultIds = [id];

    let nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }

    rotateImage(id, images);
    nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }
    rotateImage(id, images);
    nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }
    rotateImage(id, images);
    nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }

    flipImage(id, images);
    nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }

    rotateImage(id, images);
    nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }
    rotateImage(id, images);
    nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }
    rotateImage(id, images);
    nextId = findNextId(resultIds, images);
    while (nextId != null) {
      resultIds.push(nextId);
      nextId = findNextId(resultIds, images);
    }
    if (resultIds.length === ids.length) {
      return resultIds;
    }

    console.log(resultIds);
  }

  // solution found
  if (resultIds.length === ids.length) {
    printMatrix(resultIds);
  } else {
    console.log("no solution");
  }

  console.log(resultIds);

  return resultIds;
}

function findNextId(resultIds, images) {
  const restIds = Object.keys(images).filter((id) => !resultIds.includes(id));

  for (let i = 0; i < restIds.length; i++) {
    const id = restIds[i];
    // if can be next, return id
    if (canMatch(id, resultIds, images)) {
      return id;
    }
    rotateImage(id, images);
    if (canMatch(id, resultIds, images)) {
      return id;
    }
    rotateImage(id, images);
    if (canMatch(id, resultIds, images)) {
      return id;
    }
    rotateImage(id, images);
    if (canMatch(id, resultIds, images)) {
      return id;
    }
    // flip once
    flipImage(id, images);
    if (canMatch(id, resultIds, images)) {
      return id;
    }
    rotateImage(id, images);
    if (canMatch(id, resultIds, images)) {
      return id;
    }
    rotateImage(id, images);
    if (canMatch(id, resultIds, images)) {
      return id;
    }
    rotateImage(id, images);
    if (canMatch(id, resultIds, images)) {
      return id;
    }
  }

  // not possible
  return null;
}

function test(images) {
  const resultIds = ["1951", "2311", "3079", "2729"];
  // const resultIds = ["1951", "2311", "3079", "2729", "1427"];
  const id = "1427";
  // rotateImage(id, images);
  // rotateImage(id, images);
  // rotateImage(id, images);
  verticalFlip(id, images);
  verticalFlip("2729", images);
  // printImage(images["2729"]);
  let can = canMatch(id, resultIds, images);
  //printImage(images[id]);
  //printImage(images[id]);
  console.log(can);
}

function canMatch(id, resultIds, images) {
  const totalImages = Object.keys(images).length;
  const edgeSize = Math.sqrt(totalImages);
  const currentPosition = resultIds.length;
  const currentRow = Math.floor(currentPosition / edgeSize);
  const currentCol = currentPosition % edgeSize;
  const topImageId =
    currentRow === 0 ? null : resultIds[currentPosition - edgeSize];
  const leftImageId = currentCol === 0 ? null : resultIds[currentPosition - 1];

  console.log("---");
  console.log("currentId", id);
  console.log("topId", topImageId);
  console.log("leftId", leftImageId);

  const image = images[id];
  let matches = 0;
  if (topImageId == null) {
    matches++;
  } else {
    const topImage = images[topImageId];
    const bottomRowOfTop = topImage[topImage.length - 1].join("");
    const top = image[0].join("");
    console.log("--");
    console.log(top);
    console.log(bottomRowOfTop);
    console.log("--");
    if (bottomRowOfTop === top) {
      matches++;
    }
  }
  if (leftImageId == null) {
    matches++;
  } else {
    const leftImage = images[leftImageId];
    const rightSideOfLeftImage = leftImage.map((l) => l[l.length - 1]).join("");
    const left = image.map((i) => i[0]).join("");
    console.log("--");
    console.log(left);
    console.log(rightSideOfLeftImage);
    console.log("--");
    if (left === rightSideOfLeftImage) {
      matches++;
    }
  }

  console.log(matches);
  console.log("---");

  return matches === 2;
}

//
function flipImage(id, images) {
  images[id] = images[id].map((row) => {
    return row.reverse();
  });
}

function verticalFlip(id, images) {
  images[id] = images[id].reverse();
}

function rotateImage(id, images) {
  const newImage = [];
  const image = images[id];
  for (let i = 0; i < image[0].length; i++) {
    const row = [];
    for (let j = image.length - 1; j >= 0; j--) {
      row.push(image[j][i]);
    }
    newImage.push(row);
  }
  images[id] = newImage;
}

function printImage(image) {
  image.forEach((line) => console.log(line.join("")));
}

function printMatrix(ids) {
  const edge = Math.sqrt(ids.length);
  for (let i = 0; i < edge; i++) {
    const line = [];
    for (let j = 0; j < edge; j++) {
      line.push(ids.shift());
    }
    console.log(line.join(" "));
  }
}

function calcSolution(ids) {
  const matrix = [];
  const edge = Math.sqrt(ids.length);
  for (let i = 0; i < edge; i++) {
    const line = [];
    for (let j = 0; j < edge; j++) {
      line.push(ids.shift());
    }
    matrix.push(line);
  }

  const f = matrix[0];
  const l = matrix[edge - 1];
  return f[0] * f[edge - 1] * l[0] * l[edge - 1];
}
