import React, { useState, useEffect } from "react";
import { getHalls, getHallById, deleteHall } from "../../Services/CinemaHall";
import "./CallHall.css";

const CallHall = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [HallId, setHallId] = useState(""); // State for the ID input
  const [selectedHall, setSelectedHall] = useState(null); // State for fetched cinema

  // Fetch all halls
  const fetchHalls = async () => {
    try {
      setLoading(true);
      const data = await getHalls();
      setHalls(data);
    } catch (error) {
      console.error("Error fetching halls:", error);
      alert("Failed to load cinema halls.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a cinema hall by ID
  const handleFetchById = async () => {
    if (!HallId.trim()) {
      alert("Please enter a valid cinema hall ID.");
      return;
    }

    try {
      const hall = await getHallById(HallId.trim());
      setSelectedHall(hall);
    } catch (error) {
      console.error("Error fetching cinema hall by ID:", error);
      alert("Failed to fetch cinema hall. Make sure the ID is correct.");
      setSelectedHall(null);
    }
  };

  // Delete a cinema hall by ID
  const handleDelete = async (id) => {
    const deleteId = id || HallId.trim(); // Use provided ID or input field
    if (!deleteId) {
      alert("Please provide a valid cinema hall ID to delete.");
      return;
    }

    try {
      await deleteHall(deleteId);
      alert("Cinema hall deleted successfully!");
      fetchHalls(); // Refresh the cinema hall list
      setSelectedHall(null); // Clear selected cinema hall details if deleted
      setHallId(""); // Clear the input field
    } catch (error) {
      console.error("Error deleting cinema hall:", error);
      alert("Failed to delete cinema hall. Make sure the ID is correct.");
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  if (loading) {
    return <p>Loading cinema halls...</p>;
  }

  return (
    <div>
      <div className="availableHalls">
      <h2>Available cinema halls</h2>
      
      {/* Dropdown list */}
      <select 
  value={selectedHall ? selectedHall.HallId : ""}
  onChange={(e) => {
    const selectedId = e.target.value;
    const cinemaHall = halls.find((cinemaHall) => cinemaHall.HallId === parseInt(selectedId));
    setSelectedHall(cinemaHall);
  }}
>
  <option value="" disabled>Select hall</option>
  {halls.map((cinemaHall) => (
    <option key={cinemaHall.HallId} value={cinemaHall.HallId}>
      {cinemaHall.name} - capacity: {cinemaHall.capacity}
    </option>
  ))}
</select>
</div>

      {/* Fetch Cinema hall by ID */}
      <div className="getHallById">
      <h3>Get cinema hall by ID </h3>
      <div>
        <input
          type="text"
          placeholder="Enter hall ID"
          value={HallId}
          onChange={(e) => setHallId(e.target.value)}
        />
        <button onClick={handleFetchById}>Fetch hall by ID</button>
      </div>

      {selectedHall && (
  <div>
    <h4>Fetched Hall Details:</h4>
    <p>
      <strong>Name:</strong> {selectedHall.name}
    </p>
    <p>
      <strong>Capacity:</strong> {selectedHall.capacity}
    </p>
    <p>
      <strong>Cinema ID:</strong> {selectedHall.cinemaId}
    </p>
    <button className="deleteButton" onClick={() => handleDelete(selectedHall.HallId)}>
      Delete Hall
    </button>
  </div>
)}
</div>
    </div>
  );
};

export default CallHall;
