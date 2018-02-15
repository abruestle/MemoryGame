import React from "react";
import "./GameCard.css";

const GameCard = props => (
  <div className="thumbnail card" onClick={() => props.selectCard(props.id)}>
    <img  className="image-same-height" alt={props.breed} src={props.image} onClick={() => props.selectCard(props.id)} />
  </div>
);

export default GameCard;

// <div class="thumbnail">
// <img alt="Bootstrap Thumbnail First" src="http://lorempixel.com/output/people-q-c-600-200-1.jpg" />
// <div class="caption">
// </div>
// </div>