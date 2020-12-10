const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const adapters = [];
  for await (const line of rl) {
    adapters.push(Number(line));
  }

  const sortedAdapters = adapters.sort((a, b) => (a > b ? 1 : -1));

  return countWays(0, [0, ...sortedAdapters], {});
}

function countWays(index, sortedAdapters, waysDict) {
  if (index === sortedAdapters.length - 1) {
    return 1;
  }

  if (waysDict[index] != null) {
    return waysDict[index];
  }

  let totalWays = 0;
  for (let next = index + 1; next <= index + 3; next++) {
    if (sortedAdapters[next] - sortedAdapters[index] <= 3) {
      nextWays = countWays(next, sortedAdapters, waysDict);
      totalWays += nextWays;
    }
  }

  waysDict[index] = totalWays;

  return totalWays;
}
