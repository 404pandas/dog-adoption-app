// external modules
import axios from "axios";

// local modules
import { RootState } from "../store";
import { store } from "../store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    const { withCredentials } = store.getState().auth; // Get from Redux

    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { name, email },
      { withCredentials }
    );
    console.log("Login successful:", response);
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
export {};
