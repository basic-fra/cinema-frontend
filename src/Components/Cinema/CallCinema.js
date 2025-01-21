import React, { useState, useEffect } from "react";
import { getCinemas, getCinemaById, deleteCinema } from "../../Services/Cinema";
import CinemaForm from "./CinemaForm";
import "./CallCinema.css";

const CallCinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cinemaId, setCinemaId] = useState(""); // State for the ID input
  const [selectedCinema, setSelectedCinema] = useState(null); // State for fetched cinema

  const [dropdownSelectedCinemaId, setDropdownSelectedCinemaId] = useState("");

  // Fetch all cinemas
  const fetchCinemas = async () => {
    try {
      setLoading(true);
      const data = await getCinemas();
      setCinemas(data);
    } catch (error) {
      console.error("Error fetching cinemas:", error);
      alert("Failed to load cinemas.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a cinema by ID
  const handleFetchById = async () => {
    if (!cinemaId.trim()) {
      alert("Please enter a valid cinema ID.");
      return;
    }

    try {
      const cinema = await getCinemaById(cinemaId.trim());
      setSelectedCinema(cinema);
    } catch (error) {
      console.error("Error fetching cinema by ID:", error);
      alert("Failed to fetch cinema. Make sure the ID is correct.");
      setSelectedCinema(null);
    }
  };

  // Delete a cinema by ID
  const handleDelete = async (id) => {
    const deleteId = id || cinemaId.trim(); // Use provided ID or input field
    if (!deleteId) {
      alert("Please provide a valid cinema ID to delete.");
      return;
    }

    try {
      await deleteCinema(deleteId);
      alert("Cinema deleted successfully!");
      fetchCinemas(); // Refresh the cinema list
      setSelectedCinema(null); // Clear selected cinema details if deleted
      setCinemaId(""); // Clear the input field
    } catch (error) {
      console.error("Error deleting cinema:", error);
      alert("Failed to delete cinema. Make sure the ID is correct.");
    }
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  if (loading) {
    return <p>Loading cinemas...</p>;
  }

  return (
    <div>
      <CinemaForm onCinemaCreated={fetchCinemas} />
      <div className="availableCinema">
        <h2>Available Cinemas</h2>
    
        {/* Dropdown list */}

    <select
      value={dropdownSelectedCinemaId} // Bind dropdown to its own state
      onChange={(e) => {
        const selectedId = e.target.value;
        setDropdownSelectedCinemaId(selectedId); // Update dropdown state
        const cinema = cinemas.find((cinema) => cinema.cinemaId === parseInt(selectedId));
        setSelectedCinema(cinema); // Set selected cinema
      }}
    >
        <option value="" disabled> Select a Cinema </option>
        {cinemas.map((cinema) => (
          <option key={cinema.cinemaId} value={cinema.cinemaId}>
             {cinema.name} - {cinema.location}
          </option>
        ))}
      </select>
      </div>

      {/* Fetch Cinema by ID */}
      <div className="getCinemaById">
      <h3>Get Cinema by ID </h3>
      <div>
        <input
          type="text"
          placeholder="Enter Cinema ID"
          value={cinemaId}
          onChange={(e) => setCinemaId(e.target.value)}
        />
        <button onClick={handleFetchById}>Fetch Cinema by ID</button>
      </div>

      {/* Show details of the selected cinema */}
      {selectedCinema && (
        <div>
          <h4>Fetched Cinema Details:</h4>
          <p><strong>ID:</strong> {selectedCinema.cinemaId}</p>
          <p><strong>Name:</strong> {selectedCinema.name}</p>
          <p><strong>Location:</strong> {selectedCinema.location}</p>
          {/* Show delete button only if a cinema is fetched */}
          <button className="deleteButton" onClick={() => handleDelete(selectedCinema.cinemaId)}>
            Delete Cinema
          </button>
        </div>
      )}
      </div>

    </div>
  );
};

export default CallCinema;
