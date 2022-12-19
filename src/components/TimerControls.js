import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const TimerControls = (props) => {
  return (
    <div className="row timer-controls">
      <button id="start_stop" onClick={props.startStopButtonPressed}>
        <FontAwesomeIcon icon={faPlay} />
        {/* <i class="fa-solid fa-play"></i> */}
      </button>
      <button id="reset" onClick={props.resetPressed}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
};

export default TimerControls;
