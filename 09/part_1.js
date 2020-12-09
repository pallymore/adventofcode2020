const readline = require("readline");
const fs = require("fs");

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const numbers = [];
  for await (const line of rl) {
    numbers.push(Number(line));
  }

  for (let i = 25; i < numbers.length; i++) {
    const prevNumbers = numbers.slice(i - 25, i);
    const currentNumber = numbers[i];

    if (!pairExists(prevNumbers, currentNumber)) {
      return currentNumber;
    }
  }

  // no answer
  return Infinity;
}

function pairExists(array, sum) {
  const arr = array.sort((a, b) => (a > b ? 1 : -1));

  let left = 0;
  let right = arr.length - 1;

  while (left !== right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === sum) {
      return true;
    }
    if (currentSum > sum) {
      right--;
    }
    if (currentSum < sum) {
      left++;
    }
  }

  return false;
}

solution().then(console.log);
