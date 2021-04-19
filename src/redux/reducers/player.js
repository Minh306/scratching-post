let initialState = {
  playerList: [
    {
      username: "Player 1",
      email: "player1@gmail.com",
      phone: "1829839030",
      totalPoint: 25000,
      cards: [],
    },
    {
      username: "Player 2",
      email: "player2@gmail.com",
      phone: "8849839939",
      totalPoint: 25000,
      cards: [],
    },
    {
      username: "Player 3",
      email: "player3@gmail.com",
      phone: "894589485",
      totalPoint: 25000,
      cards: [],
    },
  ],
};

const checkSpecialCase = (cards) => {
  const specialCards = ["KING", "JACK", "QUEEN"];

  for (let card of cards) {
    if (!specialCards.includes(card.value)) {
      return false;
    }
  }

  return true;
};

const mapCardToPoint = (card) => {
  const specialCards = ["KING", "JACK", "QUEEN"];
  if (card.value === "ACE") return 1;

  if (specialCards.includes(card.value)) return 10;

  return +card.value;
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_PLAYER":
      state.playerList = [...state.playerList, payload];
      return { ...state };
    case "DRAW_CARDS":
      // payload => [] 12 lá
      // state.playerList => [] 4 player
      const clonePlayerList = [...state.playerList];
      const totalPlayer = clonePlayerList.length; // =>4

      for (let i in payload) {
        const playerIndex = i % totalPlayer;
        clonePlayerList[playerIndex].cards.push(payload[i]);
      }
      return { ...state, playerList: clonePlayerList };
    case "REVEAL_CARDS": {
      //logic tính điểm
      // 1.check special case
      // 2.tính điểm
      //   2.1 viết hàm chuyển đổi điểm
      //   2.2 cộng điểm 3 lá % 10
      //   2.3 tìm max
      //   2.4 cộng điểm cho max, trừ điểm player còn lại
      let specialCases = [];
      let max = 0;
      let maxPlayers = [];
      const clonePlayerList = [...state.playerList];

      for (let player of clonePlayerList) {
        if (checkSpecialCase(player.cards)) {
          specialCases.push(player);
        } else {
          let totalPoint = player.cards.reduce((total, card) => {
            return total + mapCardToPoint(card);
          }, 0);

          totalPoint = totalPoint % 10;

          if (totalPoint > max) {
            max = totalPoint;
            maxPlayers = [player];
          } else if (totalPoint === max) {
            maxPlayers.push(player);
          }
        }
      }

      const winners = specialCases.length ? specialCases : maxPlayers;
      const winPoint = 20000 / winners.length - 5000;
      // duyệt ds player, kiểm tra player nào nằm trong ds chiến thắng => cộng điểm , ngược lại trừ điểm
      for (let i in clonePlayerList) {
        const foundedPlayer = winners.find(
          (winner) => winner.username === clonePlayerList[i].username
        );

        if (foundedPlayer) {
          clonePlayerList[i].totalPoint += winPoint;
        } else {
          clonePlayerList[i].totalPoint -= 5000;
        }
      }

      return { ...state, playerList: clonePlayerList };
    }

    default:
      return state;
  }
};

export default reducer;

//high order function: map, filter , find, findIndex

// max = 0 => 6 > 0 => max = 6 => player2 max
//max = 6 => 8 > 6 => max = 8 =>player 1 max
