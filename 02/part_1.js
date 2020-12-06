const readline = require("readline");
const fs = require("fs");

async function solutionPartOne() {
  const inputStream = fs.createReadStream("./input");

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  let numberOfValidPasswords = 0;
  for await (const line of rl) {
    const regex = /(?<min>\d+)-(?<max>\d+) (?<char>\w+): (?<password>\w+)/;
    const match = regex.exec(line);
    const { min, max, char, password } = match.groups;
    const occurrence = (password.match(new RegExp(char, "g")) || []).length;
    if (occurrence >= Number(min) && occurrence <= Number(max)) {
      numberOfValidPasswords++;
    }
  }

  return numberOfValidPasswords;
}

solutionPartOne().then(console.log);
