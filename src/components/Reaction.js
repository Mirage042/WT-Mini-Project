import React, { useState, useEffect } from "react";
import "../styles/Reaction.css"; // Import the corresponding CSS file

const Reaction = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [color, setColor] = useState("#6a85dc"); // Initial color: blue
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let timer;
    if (isGameActive) {
      // Start the color change after a random delay
      timer = setTimeout(() => {
        setColor("#f07171"); // Change to red
        setStartTime(Date.now()); // Record the time when the color changes
      }, Math.random() * 3000 + 1000); // Random delay between 1-4 seconds
    }

    return () => clearTimeout(timer); // Cleanup on unmount or game change
  }, [isGameActive]);

  const handleClick = () => {
    if (color === "#f07171") {
      // If the button is red, calculate reaction time
      setReactionTime(Date.now() - startTime);
      setIsGameActive(false); // End game
      setColor("#6a85dc"); // Reset color to blue
    } else {
      alert("You clicked too soon! Wait for the box to turn red.");
    }
  };

  return (
    <div className="reaction-container">
      <h1>
        Click the Box When it Changes from{" "}
        <span style={{ color: "#6a85dc" }}>Blue</span> to{" "}
        <span style={{ color: "#f07171" }}>Red</span>
      </h1>
      {!isGameActive && (
        <button
          className="btn-reaction-start"
          onClick={() => setIsGameActive(true)}
          style={{ marginTop: "20px" }}
        >
          Start Game
        </button>
      )}
      <button
        className="reaction-gallery"
        style={{
          backgroundColor: color,
          color: color === "#f07171" ? "#f5a3a3" : "#a7bbff", // Change text color when red
        }}
        onClick={handleClick}
      >
        {isGameActive ? "Click Me!" : "Click Once to Initiate"}
      </button>
      {reactionTime !== null && (
        <p className="reaction-result">
          Your reaction time is {reactionTime} milliseconds!
        </p>
      )}
    </div>
  );
};

export default Reaction;
