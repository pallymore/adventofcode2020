const readline = require("readline");
const fs = require("fs");

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const ruleSet = {};
  for await (const line of rl) {
    const [bag, rules] = line.split(" bags contain ");
    ruleSet[bag] = ruleSet[bag] || {};

    rules.split(",").forEach((rule) => {
      const regex = /(?<count>\d+)\s+(?<bagName>(\w+\s*)+) bag/;
      const match = regex.exec(rule);
      if (!match) return;
      const { count, bagName } = match.groups;
      ruleSet[bag][bagName] = Number(count);
    });
  }

  return countBags(ruleSet, "shiny gold");
}

function countBags(ruleSet, targetBag) {
  const bagContents = ruleSet[targetBag];

  return Object.keys(bagContents).reduce((sum, bag) => {
    const multiplier = bagContents[bag];
    sum += multiplier + multiplier * countBags(ruleSet, bag);

    return sum;
  }, 0);
}

solution().then(console.log);
