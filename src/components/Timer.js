import React from "react";
import Counter from "./Counter";
import TimerControls from "./TimerControls";

const Timer = (props) => {
  return (
    <div className="row timer">
      <Counter
        labelState={props.labelState}
        timeLeft={props.timeLeft}
      ></Counter>
      <TimerControls
        startStopButtonPressed={props.startStopButtonPressed}
        resetPressed={props.resetPressed}
      />
    </div>
  );
};

export default Timer;
