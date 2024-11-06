import React, { useEffect, useState, useRef } from "react";
import "../styles/Aim.css";

const Aim = () => {
  const aimGalleryRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7);
  const [testStarted, setTestStarted] = useState(false);
  const positionTimerRef = useRef(null);

  const getCenterPosition = () => {
    if (aimGalleryRef.current) {
      const galleryWidth = aimGalleryRef.current.clientWidth;
      const galleryHeight = aimGalleryRef.current.clientHeight;
      return {
        x: galleryWidth / 2 - 50,
        y: galleryHeight / 2 - 50,
      };
    }
    return { x: 0, y: 0 };
  };

  const getRandomPosition = () => {
    if (aimGalleryRef.current) {
      const galleryWidth = aimGalleryRef.current.clientWidth;
      const galleryHeight = aimGalleryRef.current.clientHeight;
      const x = Math.floor(Math.random() * (galleryWidth - 100));
      const y = Math.floor(Math.random() * (galleryHeight - 100));
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const resetTargetPosition = () => {
    setPosition(getRandomPosition());
  };

  const startTest = () => {
    setTestStarted(true);
    setScore(0);
    setTimeLeft(7);
    resetTargetPosition();

    positionTimerRef.current = setInterval(resetTargetPosition, 750);

    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownTimer);
          clearInterval(positionTimerRef.current);
          setTestStarted(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTargetClick = () => {
    if (!testStarted) {
      startTest();
    } else {
      setScore((prev) => prev + 1);
      resetTargetPosition();
      clearInterval(positionTimerRef.current);
      positionTimerRef.current = setInterval(resetTargetPosition, 750);
    }
  };

  useEffect(() => {
    if (aimGalleryRef.current) {
      setPosition(getCenterPosition());
    }
  }, [aimGalleryRef.current]);

  return (
    <div className="aim-container">
      <h1>Click the Target</h1>
      {testStarted ? (
        <>
          <h2>Score: {score}</h2>
          <h2>Time Left: {timeLeft}</h2>
        </>
      ) : (
        <>
          {timeLeft === 0 ? (
            <>
              <h2>Time's up! Your score: {score}</h2>
              <button className="btn-restart" onClick={startTest}>
                Restart Test
              </button>
            </>
          ) : (
            <h2>Click the target to start the test</h2>
          )}
        </>
      )}
      <div
        className="aim-gallery"
        ref={aimGalleryRef}
        style={{
          position: "relative",
          width: "80vw",
          height: "80vh",
        }}
      >
        <img
          className="target"
          src="target.png"
          alt="target"
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            width: "100px",
            height: "100px",
          }}
          onClick={handleTargetClick}
        />
      </div>
    </div>
  );
};

export default Aim;
