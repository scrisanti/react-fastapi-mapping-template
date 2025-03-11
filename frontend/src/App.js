import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import "./App.css";

// Fix Leaflet marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Main Map Component
const MapView = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/locations")
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching locations:", error));
  }, []);

  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={4} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lon]} icon={customIcon}>
          <Popup>
            <h3>{loc.name}</h3>
            <p>{loc.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Home Page
const Home = () => (
  <div className="content">
    <h2>Welcome to the Mapping Application</h2>
    <p>Explore locations with detailed metadata on the interactive map.</p>
  </div>
);

// Main App Component
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
