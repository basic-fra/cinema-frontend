import React, { useState } from "react";
import "./App.css";
import "./Components/LogOutButton.css";
import CallCinema from "./Components/Cinema/CallCinema";
import CallHall from "./Components/Hall/CallHall";
import CallMovie from "./Components/Movie/CallMovie";
import HallForm from "./Components/Hall/HallForm";
import CallPersons from "./Components/Person/CallPerson";
import handleLogout from "./Components/LogOutButton";
import UCallCinema from "./Components/UserCinema/UCallCinema";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Track user role (admin/user)

  const handleLogin = (role) => {
    setRole(role);
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    if (role === "admin") {
      return (
        <div>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
          <CallCinema />
          <HallForm />
          <CallHall />
          <CallMovie />
        </div>
      );
    } else if (role === "user") {
      return (
        <div>
          <UCallCinema />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {!isLoggedIn ? (
        <CallPersons onLogin={handleLogin} />
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default App;
