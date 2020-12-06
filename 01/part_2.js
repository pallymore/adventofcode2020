const fs = require("fs");

const input = fs.readFileSync("./input", "utf8").split("\n");
input.pop(); //last row is empty
const data = input.map(Number).sort((a, b) => (a > b ? 1 : -1));

const SUM = 2020;

let pointer = 0;
let answer;

while (pointer < data.length - 2) {
  const currentNumber = data[pointer];
  const restSum = SUM - currentNumber;
  const restArray = data.slice(pointer, data.length);

  const partOneSolution = findPartOneSolution(restArray, restSum);
  if (partOneSolution >= 0) {
    answer = currentNumber * partOneSolution;
    break;
  }

  pointer++;
}

console.log(answer);

function findPartOneSolution(array, targetSum) {
  let left = 0;
  let right = array.length - 1;

  while (left !== right) {
    const currentSum = array[left] + array[right];
    if (currentSum === targetSum) {
      return array[left] * array[right];
    }
    if (currentSum > targetSum) {
      right--;
    }
    if (currentSum < targetSum) {
      left++;
    }
  }

  return -1;
}
