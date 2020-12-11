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

  const builtInRating = Math.max(...adapters) + 3;

  const sortedAdapters = adapters.sort((a, b) => (a > b ? 1 : -1));

  const diffCounts = { 3: 1 };

  let prevJolts = 0;
  for (let i = 0; i < sortedAdapters.length; i++) {
    const jolts = sortedAdapters[i];
    const diff = jolts - prevJolts;
    diffCounts[diff] = (diffCounts[diff] || 0) + 1;

    prevJolts = jolts;
  }

  return diffCounts["1"] * diffCounts["3"];
}
