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

  const ship = { x: 0, y: 0 };
  const waypoint = { x: 10, y: 1 };

  for (let i = 0; i < actions.length; i++) {
    const [action, value] = actions[i];

    if (action === "F") {
      ship.x += waypoint.x * value;
      ship.y += waypoint.y * value;
    }

    if (action === "N") {
      move(waypoint, "north", value);
    }

    if (action === "W") {
      move(waypoint, "west", value);
    }

    if (action === "E") {
      move(waypoint, "east", value);
    }

    if (action === "S") {
      move(waypoint, "south", value);
    }

    if (action === "R" || action === "L") {
      rotateWp(waypoint, action, value);
    }
  }

  return Math.abs(ship.x) + Math.abs(ship.y);
}

function move(obj, direction, value) {
  if (direction === "east") {
    obj.x += value;
  }

  if (direction === "west") {
    obj.x -= value;
  }

  if (direction === "north") {
    obj.y += value;
  }

  if (direction === "south") {
    obj.y -= value;
  }

  return obj;
}

function rotateWp(waypoint, direction, degrees) {
  const { x, y } = waypoint;

  if (
    (degrees === 90 && direction === "R") ||
    (degrees === 270 && direction === "L")
  ) {
    waypoint.x = y;
    waypoint.y = -x;
  }

  if (degrees === 180) {
    waypoint.x = -x;
    waypoint.y = -y;
  }

  if (
    (degrees === 270 && direction === "R") ||
    (degrees === 90 && direction === "L")
  ) {
    waypoint.x = -y;
    waypoint.y = x;
  }

  return waypoint;
}
