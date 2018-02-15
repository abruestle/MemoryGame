import React from "react";
import "./GameCard.css";

const GameCard = props => (
  <div className="card">
    <div className="img-container">
      <img  className="img-fluid" alt={props.breed} src={props.image} onClick={() => props.selectCard(props.id)} />
    </div>
  </div>
);

export default GameCard;
