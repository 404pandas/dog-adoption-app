// external modules
import axios from "axios";

// local modules
import { store } from "../store";
import { setReduxCredentials } from "../store/authSlice";
import { setError } from "../store/searchSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── LOGIN ────────────────────────────────────────
// Endpoint: POST /auth/login

export const login = async (name: string, email: string): Promise<string> => {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/login`,
      { name, email },
      { withCredentials: true }
    );
    store.dispatch(setReduxCredentials(true));
    store.dispatch(setError(null));
    return `Login Successful! Welcome, ${name}!`;
  } catch (error) {
    console.error("Login failed", error);
    return `Login Failed. Please contact us: ` + error;
  }
};

// ─── LOGOUT ───────────────────────────────────────
// Endpoint: POST /auth/logout

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
