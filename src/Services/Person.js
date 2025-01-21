// src/Services/login.js
import axios from "axios";

// Set your backend URL for login authentication
const API_BASE_URL = "http://localhost:5234/api/Person"; // Modify based on your API

// Function to authenticate user
export const getPersons = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      console.log("Persons fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching persons:", error);
      throw error;
    }
};
