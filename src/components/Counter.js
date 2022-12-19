import React from "react";
import ReactAudioPlayer from "react-audio-player";
import soundfile from "./../assets/beep-12.mp3";

const Counter = (props) => {
  return (
    <div className="row counterWithLabel">
      <span className="" id="timer-label">
        {props.labelState}
      </span>
      <span className="" id="time-left">
        {
          new Date(props.timeLeft * 1000).toISOString().substring(14, 19)
          // date objec to string
        }
      </span>
      <ReactAudioPlayer src={soundfile} id="beep" />
    </div>
  );
};

export default Counter;
