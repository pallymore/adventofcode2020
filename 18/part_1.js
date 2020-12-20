const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  // const inputStream = fs.createReadStream("./testInput");
  const inputStream = fs.createReadStream("./input");

  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  let sum = 0;
  for await (const line of lines) {
    const tokens = line.split("").filter((t) => !!t && t != " ");
    sum += processTokens(tokens);
  }

  return sum;
}

function processTokens(tokens) {
  const numbers = [];
  const ops = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (["*", "+"].includes(t)) {
      ops.push(t);
      continue;
    }

    let n1;
    if (t === "(") {
      let pairs = 1;
      const subTokens = [];
      while (pairs !== 0) {
        i++;
        const nextT = tokens[i];
        if (nextT === ")") {
          pairs--;
          if (pairs !== 0) subTokens.push(nextT);
          continue;
        }
        if (nextT === "(") {
          pairs++;
          subTokens.push(nextT);
          continue;
        }

        subTokens.push(nextT);
      }

      n1 = processTokens(subTokens);
    } else {
      n1 = Number(t);
    }

    if (ops.length > 0) {
      const op = ops.pop();
      const n2 = numbers.pop();
      numbers.push(calc(n1, n2, op));
    } else {
      numbers.push(n1);
    }
  }

  return numbers.pop();
}

function calc(n1, n2, op) {
  if (op === "+") return n1 + n2;
  if (op === "*") return n1 * n2;
}
