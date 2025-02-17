// external modules
import axios from "axios";

// local modules
import { store } from "../store";
import { setReduxCredentials } from "../store/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// attempt to globally set credentials?
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Automatically applies to all requests
// });

// ─── LOGIN ────────────────────────────────────────
// Endpoint: POST /auth/login
// Description: Authenticates a user and returns a session token.

// Body Parameters:
// - name  (string)  → The user’s name
// - email (string)  → The user’s email

// Example Request Body:
// {
//     "name": "John Doe",
//     "email": "john@example.com"
// }

// Response:
// - Status: 200 OK
// - Headers:
//   - Set-Cookie: fetch-access-token (Expires in 1 hour)

export const login = async (name: string, email: string): Promise<string> => {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/login`,
      { name, email },
      { withCredentials: true }
    );
    store.dispatch(setReduxCredentials(true));

    return `Login Successful! Welcome, ${name}!`;
  } catch (error) {
    console.error("Login failed", error);
    return "Login Failed. Please contact us!";
  }
};

// ─── LOGOUT ───────────────────────────────────────
// Endpoint: POST /auth/logout
// Description: Ends the user session and invalidates the auth cookie.

// Example Request:
// (No body required)

// Response:
// - Status: 200 OK
// - Effect: The `fetch-access-token` cookie will be invalidated.
export const logout = async (): Promise<string> => {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    console.log("Logout successful");
    store.dispatch(setReduxCredentials(false));

    return "Logged out successfully!";
  } catch (error) {
    console.error("Logout failed", error);
    return "Logout failed. Try again!";
  }
};
