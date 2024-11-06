import React, { useState, useEffect } from "react";
import "../styles/Clicker.css";

const Clicker = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Set test duration (10 seconds)
  const [rippleStyle, setRippleStyle] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsGameOver(true);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleButtonClick = (e) => {
    if (!isActive && !isGameOver) {
      setIsActive(true);
      setClickCount(1);
      setTimeLeft(10);
    } else if (isActive) {
      setClickCount((prevCount) => prevCount + 1);
    }

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRippleStyle({
      left: `${x}px`,
      top: `${y}px`,
      opacity: 1,
    });

    setTimeout(() => setRippleStyle({ opacity: 0 }), 500);
  };

  const handleTryAgain = () => {
    setClickCount(0);
    setTimeLeft(10);
    setIsGameOver(false);
    setIsActive(false);
  };

  return (
    <div className="clicker-container">
      <h1>Click Speed Test</h1>
      <div className="button-wrapper">
        <button
          className="clicker-button"
          onClick={handleButtonClick}
          disabled={isGameOver}
        >
          {isGameOver
            ? `Your speed is ${clickCount / 10} clicks per second`
            : isActive
            ? "Click Me as Fast as You Can!"
            : "Start Clicking"}
          <span className="ripple" style={rippleStyle}></span>
        </button>
      </div>
      {isGameOver && (
        <button className="try-again-button" onClick={handleTryAgain}>
          Try Again
        </button>
      )}
      {!isGameOver && <p>Time Left: {timeLeft} seconds</p>}
    </div>
  );
};

export default Clicker;
