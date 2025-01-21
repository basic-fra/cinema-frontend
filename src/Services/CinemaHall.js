import axios from "axios";

const API_BASE_URL = "http://localhost:5234/api/CinemaHall"; 

// Fetch all cinema hall
export const getHalls = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching halls:", error);
    throw error;
  }
};

// Create a new cinema hall
export const createHall = async (cinemaHall) => {
  try {
    console.log("Sending data to API:", cinemaHall); // Debugging
    const response = await axios.post(API_BASE_URL, cinemaHall);
    console.log("API response:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error creating cinema:", error);
    throw error;
  }
};

// Fetch a cinema hall by ID
export const getHallById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cinema hall by ID:", error);
    throw error;
  }
};

// Delete a cinema hall by ID
export const deleteHall = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cinema hall:", error);
    throw error;
  }
};
