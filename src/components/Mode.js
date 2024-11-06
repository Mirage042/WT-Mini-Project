import React from "react";
import { Link } from "react-router-dom";
import "../styles/Mode.css"; // Import the corresponding CSS file

const Mode = () => {
  return (
    <div className="container">
      <Link to="/clicking-speed">
        <button className="btn-cps">Clicks Per Second</button>
      </Link>
      <Link to="/aim-practice">
        <button className="btn-aim">Aim Practice</button>
      </Link>
      <Link to="/reaction-time">
        <button className="btn-react">Reaction Time</button>
      </Link>
      <Link to="/previous-scores">
        <button className="btn-prev-score">Previous Scores</button>
      </Link>
    </div>
  );
};

export default Mode;
