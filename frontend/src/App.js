import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Fix marker issue with Leaflet in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const App = () => {
  const [locations, setLocations] = useState([]);


  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/locations")
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={4} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(loc => (
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

export default App;
