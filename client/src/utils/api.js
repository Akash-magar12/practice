import axios from "axios";

const api = axios.create({
  // The base URL for your backend API
  baseURL: "http://localhost:3000/api",

  /**
   * CRITICAL FOR COOKIES:
   * 1. This must be set to 'true' so the browser includes cookies in the request.
   * 2. On the Backend, CORS must also have { credentials: true }.
   * 3. If this is missing, req.cookies will be empty on the server!
   */
  withCredentials: true,
});

export default api;
