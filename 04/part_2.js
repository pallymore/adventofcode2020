const readline = require("readline");
const fs = require("fs");

async function solution() {
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
// field: validator
const RULES = {
  byr: (year) =>
    year.length === 4 && Number(year) >= 1920 && Number(year) <= 2002,
  iyr: (year) =>
    year.length === 4 && Number(year) >= 2010 && Number(year) <= 2020,
  eyr: (year) =>
    year.length === 4 && Number(year) >= 2020 && Number(year) <= 2030,
  hgt: (height) => {
    const regex = /^(?<heightValue>\d+)(?<unit>(cm|in))/;
    const match = regex.exec(height);
    const { heightValue, unit } = match?.groups ?? {};
    if (!heightValue || !unit) return false;

    if (unit === "cm") {
      return Number(heightValue) >= 150 && Number(heightValue) <= 193;
    } else {
      return Number(heightValue) >= 59 && Number(heightValue) <= 76;
    }
  },
  hcl: (color) => {
    const regex = /^\#([a-zA-Z0-9]{6}$)/;
    return color.length === 7 && regex.exec(color);
  },
  ecl: (color) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
      (validColor) => validColor === color
    ),
  pid: (id) => id.length === 9 && /^[0-9]+$/.exec(id),
};

function validatePassword(passport) {
  const keys = Object.keys(passport);

  return Object.keys(RULES).every((field) => {
    return keys.includes(field) && RULES[field](passport[field]);
  });
}

solution().then(console.log);
