import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import TimeIntervalControls from "./components/TimeIntervalControls";
import Timer from "./components/Timer";
import "./css/style.css";

function App() {
  const initialTimerState = {
    label: "Session",
    // value: "25:00",
    value: 25,
  };
  const [timerState, setTimerState] = useState(initialTimerState);
  const [startStopButtonPressedState, setStartStopButtonPressedState] =
    useState("Stop");

  // const test = () => {
  //   console.log("test");
  //   setTimeout(test, 1000);
  // };

  const updateState = () => {
    setTimerState((timerState) => {
      // console.log(timerState.value);
      let newValue = timerState.value - 1;
      if (newValue < 0 && timerState.label === "Session") {
        // τέλειωσε το session, ξεκίνα διάλλειμμα
        let breakLength = document.getElementById("break-length").innerHTML;
        return { label: "Break", value: breakLength };
      } else if (newValue < 0 && timerState.label === "Break") {
        // τέλειωσε το διάλλειμμα, ξεκίνα το session
        let sessionLength = document.getElementById("session-length").innerHTML;
        return { label: "Session", value: sessionLength };
      }
      return { ...timerState, value: newValue };
    });
    console.log("setTimeout" + startStopButtonPressedState)
    if(startStopButtonPressedState==="Stop") {
      //setTimeout(updateState, 1000);
      // setInterval()
    } else {
      // do nothing
    }
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
    // if(startStopButtonPressedState==="Stop") {
      //setTimeout(updateState, 1000);
      setInterval(updateState, 1000);
    // }
    
  };

  return (
    <div className="App container">
      <h1 style={{'color':"blue"}}>25 + 5 Clock</h1>
      <TimeIntervalControls></TimeIntervalControls>
      <Timer
        labelState={timerState.label}
        timeLeft={timerState.value}
        startStopButtonPressed={startStopButtonPressed}
      ></Timer>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
