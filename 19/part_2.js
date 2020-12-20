const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  const inputStream = fs.createReadStream("./input");
  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const rulesInput = fs
    .readFileSync("./rulesPart2")
    .toString()
    .split("\n")
    .filter((r) => !!r);

  const rules = rulesInput.reduce((rulesObj, line) => {
    const [key, rule] = line.split(": ");
    rulesObj[key] = rule;
    return rulesObj;
  }, {});

  let sum = 0;
  for await (const line of lines) {
    const unmatchedResults = findUnmatchedResults(rules, "0", line);
    // if there is a possibility that there are no unmatched
    if (unmatchedResults.some((r) => r === "")) {
      sum++;
    }
  }
  return sum;
}

function findUnmatchedResults(rules, rule, input) {
  if (rule.includes('"')) {
    if (input[0] === rule[1]) {
      return [input.slice(1)];
    } else {
      return [];
    }
  }

  if (rule.includes("|")) {
    return rule.split(" | ").reduce((results, group) => {
      const groupResult = findUnmatchedResults(rules, group, input);
      return [...results, ...groupResult];
    }, []);
  }

  if (rule.includes(" ")) {
    return rule.split(" ").reduce(
      (result, sRule) => {
        return [].concat(
          ...result.map((x) => findUnmatchedResults(rules, sRule, x))
        );
      },
      [input]
    );
  }

  // rule is a single number here
  return findUnmatchedResults(rules, rules[rule], input);
}
