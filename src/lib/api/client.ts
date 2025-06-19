import axios from "axios";

const API_BASE_URL = "https://104.248.45.73/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error:", error.request);
      return Promise.reject({ message: "Network error occurred" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);
