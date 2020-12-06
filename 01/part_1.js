const fs = require("fs");

const input = fs.readFileSync("./input", "utf8").split("\n");
input.pop(); //last row is empty
const data = input.map(Number).sort((a, b) => (a > b ? 1 : -1));

const SUM = 2020;

let answer;
let left = 0;
let right = data.length - 1;

while (left !== right) {
  const currentSum = data[left] + data[right];
  if (currentSum === SUM) {
    answer = data[left] * data[right];
    break;
  }
  if (currentSum > SUM) {
    right--;
  }
  if (currentSum < SUM) {
    left++;
  }
}

console.log(answer);
