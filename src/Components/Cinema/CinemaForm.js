import React, { useState } from "react";
import { createCinema } from "../../Services/Cinema";
import "./CinemaForm.css"; 

const CinemaForm = ({ onCinemaCreated }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCinema = { name, location };
    try {
      console.log("Submitting Cinema:", newCinema); 
      await createCinema(newCinema);
      alert("Cinema added successfully!");
      onCinemaCreated();
      setName("");
      setLocation("");
    } catch (error) {
      console.error("Error creating cinema:", error);
      alert("Failed to add cinema.");
    }
  };

  return (
    <div>
    <h1>Cinema Management</h1>
    <form className="cinemaForm" onSubmit={handleSubmit}>
      <h2>Add Cinema</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Add Cinema</button>
    </form>
    </div>
  );
};

export default CinemaForm;
