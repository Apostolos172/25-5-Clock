import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useCallback } from "react";
import TimeIntervalControls from "./components/TimeIntervalControls";
import Timer from "./components/Timer";
import "./css/style.css";
import { minToSec } from "./util.js";

function App() {

  // state
  const initialStateBreakLengthControl = 5;
  const [stateBreakLengthControl, setStateBreakLengthControl] = useState(
    initialStateBreakLengthControl
  );
  const initialStateSessionLengthControl = 25;
  const [stateSessionLengthControl, setStateSessionLengthControl] = useState(
    initialStateSessionLengthControl
  );

  const initialTimerState = {
    label: "Session",
    //value: minToSec(1),
    value: minToSec(25),
  };
  const [timerState, setTimerState] = useState(initialTimerState);
  const [startStopButtonPressedState, setStartStopButtonPressedState] =
    useState("Stop");

  const updateState = useCallback(() => {
    // update timerState
    setTimerState((timerState) => {
      let newValue = timerState.value - 1;
      if (newValue < 0 && timerState.label === "Session") {
        // τέλειωσε το session, ξεκίνα διάλλειμμα
        let breakLength = stateBreakLengthControl;
        //console.log(document.getElementById("beep"));
        document.getElementById("beep").play();
        return { label: "Break", value: minToSec(breakLength) };
      } else if (newValue < 0 && timerState.label === "Break") {
        // τέλειωσε το διάλλειμμα, ξεκίνα το session
        let sessionLength = stateSessionLengthControl;
        document.getElementById("beep").play();
        return { label: "Session", value: minToSec(sessionLength) };
      }
      return { ...timerState, value: newValue };
    });
  }, [stateBreakLengthControl, stateSessionLengthControl]);

  useEffect(() => {
    let intervalOfTimeLeft;
    if (startStopButtonPressedState === "Start") {
      intervalOfTimeLeft = setInterval(updateState, 1000);
    } else {
      clearInterval(intervalOfTimeLeft);
    }
    return () => clearInterval(intervalOfTimeLeft);
  }, [startStopButtonPressedState, updateState]);

  const resetPressed = (event) => {
    //console.log(event.currentTarget);
    setTimerState(initialTimerState);
    setStateBreakLengthControl(initialStateBreakLengthControl);
    setStateSessionLengthControl(initialStateSessionLengthControl);
    let audio = document.getElementById("beep");
    //console.log(audio);
    audio.currentTime = 0;
    audio.pause();
  };

  const startStopButtonPressed = (event) => {
    //console.log(event.currentTarget);
    setStartStopButtonPressedState((previousState) => {
      //console.log(startStopButtonPressedState);
      //console.log(previousState);
      if (previousState === "Stop") {
        return "Start";
      }
      return "Stop";
    });
  };

  return (
    <div className="App container">
      <h1 style={{ color: "blue" }}>25 + 5 Clock</h1>
      <TimeIntervalControls
        setStateBreakLengthControl={setStateBreakLengthControl}
        setStateSessionLengthControl={setStateSessionLengthControl}
        stateBreakLengthControl={stateBreakLengthControl}
        stateSessionLengthControl={stateSessionLengthControl}
      ></TimeIntervalControls>
      <Timer
        labelState={timerState.label}
        timeLeft={timerState.value}
        startStopButtonPressed={startStopButtonPressed}
        resetPressed={resetPressed}
      ></Timer>
    </div>
  );
}

export default App;
