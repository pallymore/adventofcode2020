const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  // const notes = `class: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50`;
  //const ticket = "7,1,14";
  const notes = fs.readFileSync("./inputRules").toString();

  const ruleSet = notes
    .split("\n")
    .filter((l) => !!l)
    .reduce((rules, line) => {
      const [field, rule] = line.split(": ");
      const [ruleA, ruleB] = rule.split(" or ");

      return {
        ...rules,
        [field]: (value) => {
          const [minA, maxA] = ruleA.split("-");
          const [minB, maxB] = ruleB.split("-");
          return (
            (value >= Number(minA) && value <= Number(maxA)) ||
            (value >= Number(minB) && value <= Number(maxB))
          );
        },
      };
    }, {});

  //const inputStream = fs.createReadStream("./testInput");
  const inputStream = fs.createReadStream("./inputTickets");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  let errorRate = 0;
  for await (const line of rl) {
    const numbers = line.split(",").map(Number);
    numbers.forEach((number) => {
      if (Object.values(ruleSet).every((validator) => !validator(number))) {
        errorRate += number;
      }
    });
  }

  return errorRate;
}
