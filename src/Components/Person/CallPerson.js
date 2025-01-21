import React, { useState, useEffect } from "react";
import { getPersons } from "../../Services/Person";
import "./CallPerson.css";

const CallPersons = ({ onLogin }) => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Fetch persons in useEffect
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const data = await getPersons(); // Call your service to fetch persons
        setPersons(data); // Set the fetched persons in the state
      } catch (error) {
        alert("Failed to load persons.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersons();
  }, []);

  const handleCheckPerson = () => {
    const personExists = persons.some(
      (person) => person.name === name && person.password === password
    );

    if (personExists) {
      if (name === "Frane Basic") {
        alert("Admin login successful!");
        onLogin("admin"); // Pass "admin" role to onLogin
      } else {
        alert("User login successful!");
        onLogin("user"); // Pass "user" role to onLogin
      }
    } else {
      alert("Invalid credentials. Please try again.");
    }

    setName("");
    setPassword("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="personList">
        <h2>List of persons:</h2>
        {persons.length === 0 ? (
          <p>No persons available.</p>
        ) : (
          <ul>
            {persons.map((person, index) => (
              <li key={index}>{person.name}</li>
            ))}
          </ul>
        )}
      </div>

      <h3>Log in</h3>
      <div className="loginForm">
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleCheckPerson}>Log in</button>
      </div>
    </div>
  );
};

export default CallPersons;
