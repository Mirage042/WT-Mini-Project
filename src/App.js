import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Mode from "./components/Mode";
import AimPracticePage from "./components/Aim"; // Make sure this is the correct component
import ReactionTimePage from "./components/Reaction"; // Adjust accordingly
import ClickingSpeedPage from "./components/Clicker"; // Adjust accordingly
// Add other necessary imports similarly

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/menu"
          element={isLoggedIn ? <Mode /> : <Navigate to="/" />}
        />
        <Route
          path="/aim-practice"
          element={isLoggedIn ? <AimPracticePage /> : <Navigate to="/" />}
        />
        <Route
          path="/reaction-time"
          element={isLoggedIn ? <ReactionTimePage /> : <Navigate to="/" />}
        />
        <Route
          path="/clicking-speed"
          element={isLoggedIn ? <ClickingSpeedPage /> : <Navigate to="/" />}
        />
        {/* <Route
          path="/graph"
          element={isLoggedIn ? <GraphPage /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
