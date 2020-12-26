const fs = require("fs");

async function solution(inputFile) {
  // const lines = fs
  //   .readFileSync(inputFile)
  //   .toString()
  //   .split("\n")
  //   .filter((l) => !!l);

  // let subjectNumber = 1;
  // let value = 1;
  // const loopSize = 100;

  // for (let i = 0; i < loopSize; i++) {
  //   value = (value * subjectNumber) % 20201227;
  // }

  const subjectNumber = 7;

  // testInputs
  // const cardPK = 5764801;
  // const doorPK = 17807724;

  // input
  const cardPK = 18356117;
  const doorPK = 5909654;

  const cardLoopSize = getLoopSize(subjectNumber, cardPK);
  const doorLoopSize = getLoopSize(subjectNumber, doorPK);

  // console.log(cardLoopSize);
  // console.log(doorLoopSize);
  const cardKey = getEncryptionKey(doorPK, cardLoopSize);
  const doorKey = getEncryptionKey(cardPK, doorLoopSize);

  return [cardKey, doorKey];
}

function getLoopSize(subjectNumber, PK) {
  let value = 1;
  let loop = 0;
  while (value != PK) {
    loop++;
    value = (value * subjectNumber) % 20201227;
  }
  return loop;
}

function getEncryptionKey(subjectNumber, loopSize) {
  let value = 1;

  for (let i = 0; i < loopSize; i++) {
    value = (value * subjectNumber) % 20201227;
  }

  return value;
}

// solution('./testInput').then(console.log);
solution("./input").then(console.log);
