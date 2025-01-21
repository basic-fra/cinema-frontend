import axios from "axios";

const API_BASE_URL = "http://localhost:5234/api/Movie"; // Adjust the port if different

// Fetch all cinemas
export const getMovies = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Movies fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};