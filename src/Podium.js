import React from "react";
import Bar from "./Bar.js";
import "./podium.css";
//props: top3
//       array of playerData of length 3
//       playerData = {name: "", local_score: ""}
//props: max_height

const Podium = ({ days }) => {
  const max = Math.max(...days);
  const min = Math.min(...days);
  const heights = days.map((day) => {
    return `${(95 * day) / max}%`;
  });
  const p = 1;
  const offset = (100 - p) / days.length;
  const lefts = days.map((n, i) => `${p + offset * i}%`);
  const width = `${offset - p}%`;
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const minStyle = {
    background: "#ff7c32",
    boxShadow: "inset 20px 20px 60px #d9692b, inset -20px -20px 60px #ff8f3a",
  };

  const maxStyle = {
    background: "#0192B1",
    boxShadow: "inset 20px 20px 60px #017c96, inset -20px -20px 60px #01a8cc",
  };

  const defaultStyle = {
    background: "#e41d67",
    boxShadow: "inset 20px 20px 60px #c21958, inset -20px -20px 60px #ff2176",
  };
  return (
    <div id="podium">
      {days.map((day, i) => {
        return (
          <Bar
            name={daysOfTheWeek[i]}
            key={i}
            left={lefts[i]}
            style={
              day === min ? minStyle : day === max ? maxStyle : defaultStyle
            }
            width={width}
            height={heights[i]}
            backgroundColor={"orange"}
            score={day}
          ></Bar>
        );
      })}
    </div>
  );
};

export default Podium;
