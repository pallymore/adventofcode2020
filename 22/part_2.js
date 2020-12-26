const fs = require("fs");

solution().then(console.log);

async function solution() {
  const decks = fs
    .readFileSync("./input")
    .toString()
    .split("\r\n\r\n")
    .filter((l) => !!l);

  const players = [];
  decks.forEach((d) => {
    const [player, cardsStr] = d.split(":\r\n");
    players.push({ player, cards: cardsStr.split("\r\n").map(Number) });
  });

  const [player1, player2] = players;

  const winner = recursiveCombat(player1, player2);
  return calculateScore(winner.cards);
}

function recursiveCombat(player1, player2) {
  let prevGames = {};
  let winner;

  while (!winner) {
    let id = roundId(player1, player2);

    if (prevGames[id]) {
      winner = player1;
      break;
    }
    prevGames[id] = true;

    const card1 = player1.cards.shift();
    const card2 = player2.cards.shift();

    let roundWinner;
    if (player1.cards.length >= card1 && player2.cards.length >= card2) {
      const player1Cards = player1.cards.slice(0, card1);
      const player2Cards = player2.cards.slice(0, card2);
      roundWinner = recursiveCombat(
        { ...player1, cards: player1Cards },
        { ...player2, cards: player2Cards }
      );
    } else {
      roundWinner = card1 > card2 ? player1 : player2;
    }

    if (roundWinner.player === player1.player) {
      player1.cards.push(card1);
      player1.cards.push(card2);
    } else {
      player2.cards.push(card2);
      player2.cards.push(card1);
    }

    if (player2.cards.length === 0) {
      winner = player1;
    } else if (player1.cards.length === 0) {
      winner = player2;
    }
  }

  return winner;
}

function calculateScore(cards) {
  let sum = 0;
  for (let i = 0; i < cards.length; i++) {
    sum += cards[i] * (cards.length - i);
  }
  return sum;
}

function roundId(player1, player2) {
  return [...player1.cards, "|", ...player2.cards].join(",");
}

