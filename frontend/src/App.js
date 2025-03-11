import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MapView from "./components/MapView";
import "./App.css";

const App = () => (
  <Router>
    <div className="app-container">
      <header>
        <h1>My Mapping Application</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/map">Map</Link>
        </nav>
      </header>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </div>

      <footer>
        <p>&copy; 2025 My Mapping Application. All rights reserved.</p>
      </footer>
    </div>
  </Router>
);

export default App;
