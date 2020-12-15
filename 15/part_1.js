solution().then(console.log);

async function solution() {
  // const input = [3, 1, 2];
  const input = [0, 12, 6, 13, 20, 1, 17];

  const mem = input.reduce((m, n, i) => {
    m[`${n}`] = [i + 1];
    return m;
  }, {});

  // let lastNumber = input[input.length - 1];
  let lastNumber = 17;
  for (let turn = input.length + 1; turn <= 2020; turn++) {
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

    if (mem[lastNumber]) {
      mem[lastNumber].push(turn);
    } else {
      mem[lastNumber] = [turn];
    }
  }

  return lastNumber;
}
