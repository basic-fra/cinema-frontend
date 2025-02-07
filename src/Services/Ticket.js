import axios from "axios";

const API_BASE_URL = "http://localhost:5234/api/Ticket"; // Adjust the port if different

// Create a new cinema
export const createTicket = async (ticket) => {
  try {
    const response = await axios.post(API_BASE_URL, ticket);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

export const getTickets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error
  }
}