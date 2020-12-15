const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const memory = {};
  let mask;
  for await (const line of rl) {
    const [command, value] = line.split(" = ");
    if (command === "mask") {
      mask = value;
    } else {
      const regexp = /^mem\[(?<addr>\d+)\]/;
      const address = regexp.exec(command).groups.addr;
      const binary = leftPadWith0s(decToBin(Number(value)), 36);
      const masked = processNumber(binary, mask);

      memory[address] = masked;
    }
  }

  return Object.values(memory).reduce((sum, value) => {
    sum += binToDec(value);
    return sum;
  }, 0);
}

function processNumber(binary, mask) {
  let newBinary = binary.split("");
  for (let i = 0; i < binary.length; i++) {
    if (mask[i] !== "X") {
      newBinary[i] = mask[i];
    }
  }
  return newBinary.join("");
}

function leftPadWith0s(str, bits = 36) {
  const zeroes = bits - str.length;

  for (let i = 0; i < zeroes; i++) {
    str = `0${str}`;
  }

  return str;
}

function decToBin(number) {
  return (number >> 0).toString(2);
}

function binToDec(binaryString) {
  return Number.parseInt(binaryString, 2);
}
