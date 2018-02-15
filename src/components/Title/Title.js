import React from "react";
import "./Title.css";

const Title = props => {
    return (
    <div class="page-header">
        <h1>
            {props.title} <small>{props.comment}</small>
        </h1>
    </div>
    )};

export default Title;
