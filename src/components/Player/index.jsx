import React from "react";
import Card from "../Card";

const Player = (props) => {
  const { index, player } = props;
  return (
    <div className={`player-${index}`}>
      <p className="lead">{player.username}</p>
      <main className="d-flex">
        {player.cards.map((card) => {
          return <Card card={card} key={card.code} />;
        })}
      </main>
    </div>
  );
};

export default Player;
