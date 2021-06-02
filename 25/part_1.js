const fs = require("fs");

async function solution() {
  const subjectNumber = 7;

  // input
  const cardPK = 18356117;
  const doorPK = 5909654;

  const cardLoopSize = getLoopSize(subjectNumber, cardPK);
  const doorLoopSize = getLoopSize(subjectNumber, doorPK);

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
solution().then(console.log);
