const fs = require("fs");

solution().then(console.log);

async function solution() {
  const [, busesString] = fs.readFileSync("./input").toString().split("\n");

  const buses = busesString.split(",");

  const { n, a } = buses.reduce(
    (results, bus, i) => {
      if (bus === "x") return results;

      results.a.push(0 - i);
      results.n.push(Number(bus));
      return results;
    },
    { n: [], a: [] }
  );

  console.log("Remainders A: ", a);
  console.log("Modulos B", n);
  console.log("X = A mod B");
  console.log("---");
  console.log(`Use the Chineses Remainder Calculator to get the results...`);
  console.log(`https://www.dcode.fr/chinese-remainder`);

  return "";
}
