import React, { useState, useEffect } from "react";
import { getCinemas } from "../../Services/Cinema";
import handleLogout from "../LogOutButton"; // Import log out functionality
import "./UCallCinema.css";

const UCallCinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [showLogout, setShowLogout] = useState(false); // Track toolbar menu

  // Fetch all cinemas
  const fetchCinemas = async () => {
    try {
      setLoading(true);
      const data = await getCinemas();
      setCinemas(data);
    } catch (error) {
      alert("Failed to load cinemas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  const handleSelection = (event) => {
    setSelectedCinema(event.target.value);
    console.log(`Selected cinema: ${event.target.value}`);
  };

  if (loading) {
    return <p>Loading cinemas...</p>;
  }

  return (
    <div>
    <div className="container">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="left">
          <h1 className="title">Cinema</h1>
        </div>

        <div className="right">
          <div className="cart">
            <button className="cart-button">&#128722; {/* Shopping cart icon */}</button>
          </div>
          <div className="menu">
            <button
              className="menu-bar"
              onClick={() => setShowLogout((prev) => !prev)}
            >
              &#9776; {/* Hamburger icon */}
            </button>
            </div>
            </div>
            </div>
            </div>
            <div className="logOut">
            {showLogout && (
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            )}
      </div>
        
      {/* Dropdown */}
      <div className="dropdown">
        <select value={selectedCinema} onChange={handleSelection}>
          <option value="" disabled>
            -- Select Cinema --
          </option>
          {cinemas.map((cinema) => (
            <option key={cinema.id} value={cinema.id}>
              {cinema.name}
            </option>
          ))}
        </select>
      </div>
    
    </div>
  );
};

export default UCallCinema;
