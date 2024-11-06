import React from "react";
import "../styles/Score.css"; // Import the corresponding CSS file

const Score = () => {
  return React.createElement(
    "div",
    null,
    React.createElement("div", { className: "chart" }),
    React.createElement(
      "div",
      { className: "labels" },
      React.createElement("div", { className: "label-cps" }, "CPS"),
      React.createElement("div", { className: "label-reaction" }, "REACTION"),
      React.createElement("div", { className: "label-aim" }, "AIM")
    )
  );
};

export default Score;
