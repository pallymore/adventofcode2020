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

  return countBagsCanContain(ruleSet, "shiny gold");
}

function countBagsCanContain(ruleSet, targetBag) {
  return Object.keys(ruleSet).reduce((sum, bag) => {
    if (canContain(ruleSet, bag, targetBag)) {
      sum++;
    }
    return sum;
  }, 0);
}

function canContain(ruleSet, bag, targetBag) {
  const rules = ruleSet[bag];
  if (!rules) return false;
  if (Object.keys(rules).includes(targetBag)) return true;

  return Object.keys(rules).some((innerBag) =>
    canContain(ruleSet, innerBag, targetBag)
  );
}

solution().then(console.log);
