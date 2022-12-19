import React, { useState } from "react";

const Counter = (props) => {
  // const [labelState, setLabelState] = useState("");

  return (
    <div className="row counterWithLabel">
      <span className="" id="timer-label">{props.labelState}</span>
      <span className="" id="time-left">{props.timeLeft}</span>
    </div>
  );
};

export default Counter;
