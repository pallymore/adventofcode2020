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
    const regex = /(?<pos1>\d+)-(?<pos2>\d+) (?<char>\w+): (?<password>\w+)/;
    const match = regex.exec(line);
    const { pos1, pos2, char, password } = match.groups;
    const charAt1 = password[Number(pos1) - 1];
    const charAt2 = password[Number(pos2) - 1];
    if (
      (charAt1 === char && charAt2 !== char) ||
      (charAt1 !== char && charAt2 === char)
    ) {
      numberOfValidPasswords++;
    }
  }

  return numberOfValidPasswords;
}

solutionPartOne().then(console.log);
