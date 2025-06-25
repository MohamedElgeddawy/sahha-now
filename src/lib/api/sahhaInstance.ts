import axios from "axios";
import { store } from "../redux/store";
import { clearCredentials, setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://104.248.45.73/api";

// Create an Axios instance
const sahhaInstance = axios.create({
  baseURL: API_URL, // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedRequestsQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedRequestsQueue = [];
};

// Request interceptor
sahhaInstance.interceptors.request.use(
  (config) => {
    // Add auth token or other headers
    const token = store.getState().auth.accessToken; // Or use a context/store
    if (token && config.headers["without-token"] !== "true") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
sahhaInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 401 and the request is not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If a token refresh is in progress, add this request to the queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return sahhaInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Start token refresh process
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        // If token refresh succeeds, process all queued requests
        if (newAccessToken) {
          processQueue(null, newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return sahhaInstance(originalRequest);
        }
      } catch (refreshError) {
        // If token refresh fails, reject all queued requests
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default sahhaInstance;

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/token/refresh`, {
      refreshToken: store.getState().auth.refreshToken, // Assuming refreshToken is stored in the redux store
    });
    store.dispatch(
      setCredentials({
        refreshToken: data.refreshToken,
        accessToken: data.accessToken,
      })
    );

    return data.accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    store.dispatch(clearCredentials());
    return null;
  }
};
