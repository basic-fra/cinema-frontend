import axios from "axios";

const API_BASE_URL = "http://localhost:5234/api/Movie"; // Adjust the port if different

// Fetch all movies
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

// Create a new Movies
export const createMovie = async (movie) => {
  try {
    const response = await axios.post(API_BASE_URL, movie);
    return response.data;
  } catch (error) {
    console.error("Error creating Movie:", error);
    throw error;
  }
};

// Fetch a cinema by ID
export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Movie by ID:", error);
    throw error;
  }
};

// Delete a cinema by ID
export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Movie:", error);
    throw error;
  }
};