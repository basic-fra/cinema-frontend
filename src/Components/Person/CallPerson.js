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
    const adminExists = persons.some(
      (person) => person.name === name && person.password === password && person.role === "admin"
    );

    const userExists = persons.some(
      (person) => person.name === name && person.password === password && person.role === "user"
    );

    const user = persons.find(
      (p) => p.name === name && p.password === password
    );

    console.log("person",user);

    if (adminExists) {
      if (name === "Frane Basic" && password ==="frane123" ) {
        alert("Admin login successful!");
        onLogin("admin"); // Pass "admin" role to onLogin
      } 
    } else if (userExists) {
      localStorage.setItem("user", JSON.stringify({ id: user.personId, name: user.name }));
      alert("User login successful!");
      onLogin("user"); // Pass "admin" role to onLogin
    } else {
      alert("Invalid credentials.");
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
              <li key={index}>Name:{person.name} ,Pass:{person.password}, Role:{person.role}</li>
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
