import React, { useState } from "react";
import PeriodOfTime from "./PeriodOfTime";

const breakLengthControl = {
  label: "break-label",
  decrement_control: "break-decrement",
  increment_control: "break-increment",
  length: "break-length",
};

const sessionLengthControl = {
  label: "session-label",
  decrement_control: "session-decrement",
  increment_control: "session-increment",
  length: "session-length",
};

const TimeIntervalControls = (props) => {
  const initialStateBreakLengthControl = 5;
  const [stateBreakLengthControl, setStateBreakLengthControl] = useState(initialStateBreakLengthControl);
  const initialStateSessionLengthControl = 25;
  const [stateSessionLengthControl, setStateSessionLengthControl] =
    useState(initialStateSessionLengthControl);

  const passedValue = (value, previousvalue) => {
    // check the limits of break and session lengths
    if (value > 60 || value <= 0) {
      return previousvalue;
    }
    return value;
  };

  const increaseDecresePressed = (event) => {
    // console.log(event);
    // console.log(event.currentTarget);
    // console.log(event.currentTarget);
    console.log(event.currentTarget.id);
    // to do
    // έχεις το id, με ένα switch αλλάζεις κατάλληλο state καταλλήλως και θα πάει να το αλλάξει
    switch (event.currentTarget.id) {
      case "break-decrement":
        setStateBreakLengthControl((previousState) => {
          return passedValue(previousState - 1, previousState);
        });
        break;
      case "break-increment":
        setStateBreakLengthControl((previousState) => {
          return passedValue(previousState + 1, previousState);
        });
        break;
      case "session-decrement":
        setStateSessionLengthControl((previousState) => {
          return passedValue(previousState - 1, previousState);
        });
        break;
      case "session-increment":
        setStateSessionLengthControl((previousState) => {
          return passedValue(previousState + 1, previousState);
        });
        break;
      default:
        setStateSessionLengthControl((previousState) => {
          return previousState;
        });
        setStateBreakLengthControl((previousState) => {
          return previousState;
        });
    }
    // let el = document.getElementById(event.currentTarget.id).nextSibling;
    // el = document.getElementById(event.currentTarget.id).previousSibling;
    // console.log(el);
  };

  return (
    <div className="timeIntervalControls row">
      <PeriodOfTime
        onclick={increaseDecresePressed}
        state={stateBreakLengthControl}
        elementsIds={breakLengthControl}
        col="col-sm-6"
      ></PeriodOfTime>
      <PeriodOfTime
        onclick={increaseDecresePressed}
        state={stateSessionLengthControl}
        elementsIds={sessionLengthControl}
        col="col-sm-6"
      ></PeriodOfTime>
    </div>
  );
};

export default TimeIntervalControls;
