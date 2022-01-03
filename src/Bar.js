import React from "react";
import "./bar.css";

const Bar = (props) => {
  return (
    <div
      className="bar-container"
      style={{
        left: props.left,
        width: props.width,
      }}
    >
      <div
        className="bar-name"
        style={{
          position: "absolute",
          bottom: `calc( ${props.height} * .9)`,
          color: "black",
        }}
      >
        {props.name}
      </div>
      <div
        style={{
          position: "absolute",
          height: `calc(${props.height} * .9)`,
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          bottom: 0,
        }}
      >
        <div className="bar-scorebar" style={props.style}>
          <div className="bar-score">{props.score}</div>
          <div className="bar-score">Commits</div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
