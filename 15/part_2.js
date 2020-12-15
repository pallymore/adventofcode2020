solution().then(console.log);

async function solution() {
  const input = [0, 12, 6, 13, 20, 1, 17];

  const mem = input.reduce((m, n, i) => {
    m[`${n}`] = [i + 1];
    return m;
  }, {});

  let lastNumber = input[input.length - 1];
  for (let turn = input.length + 1; turn <= 30000000; turn++) {
    const lastTurns = mem[lastNumber];
    if (lastTurns == null || lastTurns.length === 1) {
      // first time
      lastNumber = 0;
    } else {
      // has spoken before
      const turn2 = lastTurns[lastTurns.length - 1];
      const turn1 = lastTurns[lastTurns.length - 2];
      lastNumber = turn2 - turn1;
    }

    mem[lastNumber] = mem[lastNumber] || [];
    mem[lastNumber] = mem[lastNumber].slice(mem[lastNumber].length - 1);
    mem[lastNumber].push(turn);
  }

  return lastNumber;
}
