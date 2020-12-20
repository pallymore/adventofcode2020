const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  const inputStream = fs.createReadStream("./input");
  const rulesInput = fs
    .readFileSync("./rules")
    .toString()
    .split("\n")
    .filter((r) => !!r);

  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const rules = {};
  rulesInput.forEach((line) => {
    const [key, rule] = line.split(": ");
    rules[key] = rule;
  });

  const validMessages = parseRules(rules, "0");

  let sum = 0;
  for await (const line of lines) {
    if (validMessages.includes(line)) {
      sum++;
    }
  }

  return sum;
}

// return array of possibilities
function parseRules(rules, key, mem = {}) {
  if (mem[key]) {
    return mem[key];
  }

  const rule = rules[key];
  if (rule.includes('"')) {
    mem[key] = [rule[1]];
    return mem[key];
  }
  const groups = rule.split(" | ");

  const validCombos = groups.reduce((combos, group) => {
    const keys = group.split(" ");

    let results = [];
    for (let i = 0; i < keys.length; i++) {
      const groupRules = parseRules(rules, keys[i], mem);
      if (results.length > 0) {
        results = permutations(results, groupRules);
      } else {
        results = groupRules;
      }
    }

    return [...combos, ...results];
  }, []);

  mem[key] = validCombos;
  return mem[key];
}

function permutations(r1, r2) {
  const results = [];
  r1.forEach((item1) => {
    r2.forEach((item2) => {
      results.push([item1, item2].join(""));
    });
  });
  return results;
}
