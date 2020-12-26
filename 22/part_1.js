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

  let winner = null;

  while (!winner) {
    const [player1, player2] = players;
    if (player1.cards.length === 0) {
      winner = player2;
      break;
    }
    if (player2.cards.length === 0) {
      winner = player1;
      break;
    }
    const card1 = player1.cards.shift();
    const card2 = player2.cards.shift();
    if (card1 > card2) {
      player1.cards.push(card1);
      player1.cards.push(card2);
    } else {
      player2.cards.push(card2);
      player2.cards.push(card1);
    }
  }

  return calculateScore(winner.cards);
}

function calculateScore(cards) {
  let sum = 0;
  for (let i = 0; i < cards.length; i++) {
    sum += cards[i] * (cards.length - i);
  }
  return sum;
}

