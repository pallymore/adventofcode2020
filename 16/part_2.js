const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  // test data
  // const notes = `class: 0-1 or 4-19\nrow: 0-5 or 8-19\nseat: 0-13 or 16-19`;
  // const inputStream = fs.createReadStream("./testInput");
  // real input
  const notes = fs.readFileSync("./inputRules").toString();
  const inputStream = fs.createReadStream("./inputTickets");

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

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const validTickets = [];
  for await (const line of rl) {
    const numbers = line.split(",").map(Number);
    let isValid = true;
    numbers.forEach((number) => {
      if (Object.values(ruleSet).every((validator) => !validator(number))) {
        isValid = false;
      }
    });
    if (isValid) {
      validTickets.push(numbers);
    }
  }

  const possibilities = {};
  validTickets.forEach((ticket) => {
    ticket.forEach((fieldValue, position) => {
      Object.keys(ruleSet).forEach((rule) => {
        const validator = ruleSet[rule];
        possibilities[position] = possibilities[position] || {
          valid: new Set(),
          invalid: new Set(),
        };
        if (!validator(fieldValue)) {
          possibilities[position].invalid.add(rule);
          possibilities[position].valid.delete(rule);
        } else if (!possibilities[position].invalid.has(rule)) {
          possibilities[position].valid.add(rule);
        }
      });
    });
  });

  const positionRules = Object.keys(possibilities).reduce(
    (rules, position) => ({
      ...rules,
      [position]: possibilities[position].valid,
    }),
    {}
  );

  reduceRules(positionRules);

  // const ticket = [11,12,13];
  const ticket = [
    151,
    139,
    53,
    71,
    191,
    107,
    61,
    109,
    157,
    131,
    67,
    73,
    59,
    79,
    113,
    167,
    137,
    163,
    149,
    127,
  ];
  // look for the six fields on your ticket that start with the word departure. What do you get if you multiply those six values together?
  //
  const result = ticket.reduce((res, value, index) => {
    // get first value from set;
    const field = [...positionRules[index]][0];
    if (/^departure/.test(field)) {
      return res * value;
    }
    return res;
  }, 1);

  return result;
}

// reduces the number of rules in the set to 1 for every field
// { position: Set(rules) } // { 0: { 'seat' } }
function reduceRules(positionRules) {
  // keep track of the fields that have already been processed
  const processed = new Set();

  // loop until every field has only 1 or less possibilities
  while (Object.values(positionRules).some((set) => set.size > 1)) {
    const firstRuleWithNoAlternatives = Object.keys(positionRules).find(
      (position) =>
        !processed.has(position) && positionRules[position].size === 1
    );
    processed.add(firstRuleWithNoAlternatives);
    const value = [...positionRules[firstRuleWithNoAlternatives]][0];
    Object.keys(positionRules).forEach((position) => {
      if (position !== firstRuleWithNoAlternatives) {
        positionRules[position].delete(value);
      }
    });
  }

  return positionRules;
}
