import React from "react";

const Circles = (props) => {
  return (
    <div
      className={`circle ${props.active ? "active" : ""}`}
      style={{ pointerEvents: props.display ? "all" : "none" }}
      onClick={props.click}
    ></div>
  );
};

export default Circles;
