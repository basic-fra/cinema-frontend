import React, { useState, useEffect } from "react";
import { createHall } from "../../Services/CinemaHall";
import { getCinemas } from "../../Services/Cinema";
import "./HallForm.css";

const HallForm = ({ onHallCreated }) => {
  const [cinemaId, setCinemaId] = useState(""); 
  const [name, setName] = useState(""); // Cinema hall name
  const [capacity, setCapacity] = useState(""); // Hall capacity
  const [cinemas, setCinemas] = useState([]); // List of cinemas
  
  // Fetch cinemas on component load
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const data = await getCinemas();
        console.log("kina za popunjavanje liste u hall",data)
        setCinemas(data); // Populate dropdown with cinema data
      } catch (error) {
        console.error("Error fetching cinemas:", error);
        alert("Failed to load cinemas.");
      } 
    };

   fetchCinemas();
   }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHall = {  cinemaId, name, capacity }; //cinema_id:

    try {
      console.log("Submitting Hall:", newHall); // Debug payload
      await createHall(newHall);
      alert("Cinema hall added successfully!");
      onHallCreated(); // Notify parent to refresh
      setCinemaId(""); // Reset cinema_id field
      setName(""); // Reset name field
      setCapacity(""); // Reset capacity field
    } catch (error) {
      console.error("Error creating cinema hall:", error);
      alert("Failed to add cinema hall.");
    }
  };
  
  // Handle cinema selection from dropdown
  const handleCinemaSelection = (e) => {
    const selectedCinemaId = e.target.value;
    console.log("Selected Cinema ID:", selectedCinemaId);
    setCinemaId(selectedCinemaId); // Set the cinema_id from the selected cinema
  };

  return (
    <div>
       <h1>Hall Management</h1>
    <form className="hallForm" onSubmit={handleSubmit}>
      <h2>Add Hall</h2>
      {/* Dropdown list for selecting a cinema */}
      <select 
        value={cinemaId} // Bind the value of the dropdown to cinemaId
        onChange={handleCinemaSelection} // Handle change of selected cinema
      >
        {/* Conditionally render the first option */}
        <option value="" disabled>
          {cinemaId ? cinemas.find(cinema => cinema.cinemaId === parseInt(cinemaId))?.name : "Select a Cinema"}
        </option>
        {cinemas.map((cinema) => (
          <option key={cinema.cinemaId} value={cinema.cinemaId}>
            {cinema.name} - {cinema.location}
          </option>
        ))}
      </select>
      <br />

      {/* Name field */}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Allow manual editing of name
          required
        />
      </label>
      <br />

      {/* Capacity field */}
      <label>
        Capacity:
        <input
          type="text"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">
        Add Hall
      </button>
    </form>
    </div>
  );
};

export default HallForm;
