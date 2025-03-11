import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Fix Leaflet marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapView = () => {
  const [locations, setLocations] = useState([]);
  const [searchParams] = useSearchParams();

  const defaultCenter = [40.7128, -74.0060];
  const selectedLat = parseFloat(searchParams.get("lat"));
  const selectedLon = parseFloat(searchParams.get("lon"));

  const mapCenter = selectedLat && selectedLon
    ? [selectedLat, selectedLon]
    : defaultCenter;

  useEffect(() => {
    axios.get("http://backend:8000/locations")
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching locations:", error));
  }, []);

  return (
    <MapContainer center={mapCenter} zoom={selectedLat ? 10 : 4} style={{ height: "500px", width: "100%" }}>
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

export default MapView;
