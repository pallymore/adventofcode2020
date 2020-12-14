const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  //const inputStream = fs.createReadStream("./testInput");
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
      const address = Number(regexp.exec(command).groups.addr);
      const paddedAddress = leftPadWith0s(decToBin(address));
      const maskedAddress = applyMask(paddedAddress, mask);

      const addresses = findAddresses(maskedAddress);

      addresses.forEach((addrBin) => {
        const addrDec = binToDec(addrBin);
        memory[addrDec] = Number(value);
      });
    }
  }

  return Object.values(memory).reduce((sum, value) => {
    sum += value;
    return sum;
  }, 0);
}

function findAddresses(maskedAddress) {
  const bits = maskedAddress.split("");
  const firstXIndex = bits.findIndex((b) => b === "X");

  if (firstXIndex < 0) {
    return [maskedAddress];
  }

  const permutationOne = [...bits];
  const permutationZero = [...bits];
  permutationOne[firstXIndex] = "1";
  permutationZero[firstXIndex] = "0";

  return [
    ...findAddresses(permutationOne.join("")),
    ...findAddresses(permutationZero.join("")),
  ];
}

function applyMask(binary, mask) {
  let newBinary = binary.split("");
  for (let i = 0; i < binary.length; i++) {
    if (mask[i] === "1") {
      newBinary[i] = "1";
    }
    if (mask[i] === "X") {
      newBinary[i] = "X";
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
