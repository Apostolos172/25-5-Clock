import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import TimeIntervalControls from "./components/TimeIntervalControls";
import Timer from "./components/Timer";
import "./css/style.css";
import { minToSec } from "./util.js";

//let intervalOfTimeLeft;

function App() {

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
    // value: "25:00",
    //value: minToSec(1),
    value: minToSec(25),
  };
  const [timerState, setTimerState] = useState(initialTimerState);
  const [startStopButtonPressedState, setStartStopButtonPressedState] =
    useState("Stop");

  // const test = () => {
  //   console.log("test");
  //   setTimeout(test, 1000);
  // };

  const updateState = useCallback(() => {
    setTimerState((timerState) => {
      // console.log(timerState.value);
      let newValue = timerState.value - 1;
      if (newValue < 0 && timerState.label === "Session") {
        // τέλειωσε το session, ξεκίνα διάλλειμμα
        //let breakLength = document.getElementById("break-length").innerHTML;
        let breakLength = stateBreakLengthControl;
        console.log(document.getElementById("beep"));
        document.getElementById("beep").play();
        return { label: "Break", value: minToSec(breakLength) };
      } else if (newValue < 0 && timerState.label === "Break") {
        // τέλειωσε το διάλλειμμα, ξεκίνα το session
        //let sessionLength = document.getElementById("session-length").innerHTML;
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
    //document.getElementById("break-length").innerHTML = "5";
    //document.getElementById("session-length").innerHTML = "25";
    setStateBreakLengthControl(5);
    setStateSessionLengthControl(25);
    let audio = document.getElementById("beep");
    //console.log(audio);
    //audio.pause();
    audio.currentTime = 0;
    //audio.stop();
  };

  const startStopButtonPressed = (event) => {
    console.log(event.currentTarget);
    // αρχικά πρέπει να παίρνω την τιμή του timerState και να αρχίσω να μειώνω
    setStartStopButtonPressedState((previousState) => {
      console.log(startStopButtonPressedState);
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
