const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const actions = [];
  for await (const line of rl) {
    const [action, ...valueDigits] = line.split("");
    const value = Number(valueDigits.join(""));
    actions.push([action, value]);
  }

  let x = 0;
  let y = 0;
  let facing = "east";
  for (let i = 0; i < actions.length; i++) {
    const [action, value] = actions[i];

    if (action === "F") {
      const moveResult = move({ x, y, facing, value });
      x = moveResult.x;
      y = moveResult.y;
    }

    if (action === "N") {
      const moveResult = move({ x, y, facing: "north", value });
      x = moveResult.x;
      y = moveResult.y;
    }

    if (action === "W") {
      const moveResult = move({ x, y, facing: "west", value });
      x = moveResult.x;
      y = moveResult.y;
    }

    if (action === "E") {
      const moveResult = move({ x, y, facing: "east", value });
      x = moveResult.x;
      y = moveResult.y;
    }

    if (action === "S") {
      const moveResult = move({ x, y, facing: "south", value });
      x = moveResult.x;
      y = moveResult.y;
    }

    if (action === "R" || action === "L") {
      facing = rotate(facing, action, value);
    }
  }

  return Math.abs(x) + Math.abs(y);
}

const directions = ["north", "east", "south", "west"];

function rotate(facing, direction, degrees) {
  const currentIndex = directions.findIndex((d) => d === facing);
  const steps = Math.floor(degrees / 90) % 4;
  const nextIndex =
    direction === "R"
      ? (currentIndex + steps) % 4
      : (currentIndex + 4 - steps) % 4;

  return directions[nextIndex];
}

function move({ x, y, facing, value }) {
  if (facing === "east") {
    x += value;
  }

  if (facing === "west") {
    x -= value;
  }

  if (facing === "north") {
    y += value;
  }

  if (facing === "south") {
    y -= value;
  }

  return { x, y };
}
