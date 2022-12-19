import React from "react";
import ReactAudioPlayer from "react-audio-player";
import soundfile from "./../assets/beep-12.mp3";

const minTommss = (sec) => {
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  if (seconds === 0) {
    seconds = "00";
  }
  if (seconds.toString()[1] === undefined) {
    seconds = "0" + seconds;
  }
  if (minutes.toString()[1] === undefined) {
    minutes = "0" + minutes;
  }
  return `${minutes}:${seconds}`;
};

const Counter = (props) => {
  // const [labelState, setLabelState] = useState("");

  return (
    <div className="row counterWithLabel">
      <span className="" id="timer-label">
        {props.labelState}
      </span>
      <span className="" id="time-left">
        {minTommss(props.timeLeft)}
      </span>
      <ReactAudioPlayer src={soundfile} id="beep" />
    </div>
  );
};

export default Counter;
