import React from "react";
import "./App.css";

const Modal = (props) => {
  return (
    <div className="overlay">
      <div className={`gameOver ${props.gameOver ? "active" : ""}`}>
        <h1>The game is over</h1>
        <h3>Your score is: {props.score}</h3>
        <p>{props.message}</p>
      </div>
      <div>
        <button className="btnClose" onClick={props.close}>
          X
        </button>
      </div>
    </div>
  );
};
export default Modal;
