import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/locations")
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching locations:", error));
  }, []);

  return (
    <div className="content">
      <h2>Welcome to the Mapping Application</h2>
      <p>Explore locations with detailed metadata on the interactive map.</p>

      <h3>Locations</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>View on Map</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id}>
              <td>{loc.name}</td>
              <td>{loc.description}</td>
              <td>
                <Link to={`/map?lat=${loc.lat}&lon=${loc.lon}`}>
                  View on Map
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
