import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import "./card.css";

const Card = (props) => {
  const isReveal = useSelector((state) => state.status.isReveal);

  const imgSrc = useMemo(() => {
    return isReveal
      ? props.card.image
      : "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png";
  }, [isReveal, props.card.image]);

  return (
    <div>
      <img alt="card" className="card" src={imgSrc} />
    </div>
  );
};

export default Card;
