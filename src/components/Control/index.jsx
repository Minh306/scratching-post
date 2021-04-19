import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Control = () => {
  const dispatch = useDispatch();

  const drawCards = async () => {
    /**
     * 1.Call api lấy 12 lá
     * 2. dispatch action lên player,
     * draw mỗi player 3 lá
     */
    const res = await axios({
      url: `https://deckofcardsapi.com/api/deck/${deckCard.deck_id}/draw/?count=12`,
      method: "GET",
    });
    dispatch({ type: "DRAW_CARDS", payload: res.data.cards });
  };

  const revealCards = () => {
    dispatch({
      type: "REVEAL_CARDS",
    });
  };

  const deckCard = useSelector((state) => state.card.deckCard);
  const playerList = useSelector((state) => state.player.playerList);
  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button className="btn btn-success mr-2">Shuffle</button>
        <button onClick={drawCards} className="btn btn-info mr-2">
          Draw
        </button>

        <button onClick={revealCards} className="btn btn-primary mr-2">
          Reveal
        </button>
      </div>
      <div className="d-flex">
        {playerList.map((player) => {
          return (
            <div key={player.username} className="border px-3 text-center">
              <p>{player.username}</p>
              <p> {player.totalPoint.toLocaleString()} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Control;
