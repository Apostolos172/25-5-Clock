import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";

const PeriodOfTime = (props) => {
  let labelContent;
  switch (props.elementsIds.label) {
    case "break-label":
      labelContent = "Break Length";
      break;
    case "session-label":
      labelContent = "Session Length";
      break;
    default:
      labelContent = props.elementsIds.label;
      break;
  }

  // const [state, setState] = useState("");

  return (
    <div className={props.col + " period-of-time"}>
      <div id={props.elementsIds.label} className="row label">
        <span>{labelContent}</span>
      </div>
      <div className="row">
        <button onClick={props.onclick} id={props.elementsIds.decrement_control} className="col-sm-5">
          <FontAwesomeIcon icon={faDownLong} />
        </button>
        <span id={props.elementsIds.length} className="col-sm-2">
          {props.state}
        </span>
        <button onClick={props.onclick} id={props.elementsIds.increment_control} className="col-sm-5">
          <FontAwesomeIcon icon={faUpLong} />
        </button>
      </div>
    </div>
  );
};

export default PeriodOfTime;
