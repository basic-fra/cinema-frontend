import axios from "axios";

const API_BASE_URL = "http://localhost:5234/api/Cinema"; // Adjust the port if different

// Fetch all cinemas
export const getCinemas = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Cinemas fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    throw error;
  }
};

// Create a new cinema
export const createCinema = async (cinema) => {
  try {
    const response = await axios.post(API_BASE_URL, cinema);
    return response.data;
  } catch (error) {
    console.error("Error creating cinema:", error);
    throw error;
  }
};

// Fetch a cinema by ID
export const getCinemaById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cinema by ID:", error);
    throw error;
  }
};

// Delete a cinema by ID
export const deleteCinema = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cinema:", error);
    throw error;
  }
};
