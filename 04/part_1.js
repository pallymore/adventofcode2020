const readline = require("readline");
const fs = require("fs");

async function solutionPartOne() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  let validPassports = 0;
  let currentPassport = {};
  for await (const line of rl) {
    if (line.length === 0) {
      const isValid = validatePassword(currentPassport);
      if (isValid) validPassports++;

      currentPassport = {};
    } else {
      line.split(" ").map((pair) => {
        const [key, value] = pair.split(":");
        currentPassport[key] = value;
      });
    }
  }

  // last passport
  const isValid = validatePassword(currentPassport);
  if (isValid) validPassports++;

  return validPassports;
}

// ignore 'cid' for now
const EXPECTED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function validatePassword(passport) {
  const keys = Object.keys(passport);

  return EXPECTED_FIELDS.every((field) => keys.includes(field));
}

solutionPartOne().then(console.log);
