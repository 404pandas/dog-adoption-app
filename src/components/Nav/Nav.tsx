import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWithCredentials } from "../../store/authSlice"; // Redux action to set withCredentials state
import { logout } from "../../api/authRoutes"; // Modularized logout function
import { Button } from "@mui/material"; // Material-UI Button
import { RootState } from "../../store"; // Import RootState to use the selector
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const withCredentials = useSelector(
    (state: RootState) => state.auth.withCredentials
  ); // Get withCredentials from Redux store

  const handleLogout = async () => {
    // Call the logout function from the modularized API
    const message = await logout();
    console.log(message);

    // Dispatch action to update withCredentials to false after logout
    dispatch(setWithCredentials(false));
  };

  const handleLogin = () => {
    // Redirect to /login route when Login button is clicked
    navigate("/login");
  };

  return (
    <div className='nav'>
      <Button
        onClick={withCredentials ? handleLogout : handleLogin} // Conditional function for click
        variant='contained'
        color={withCredentials ? "secondary" : "primary"} // Change color based on login state
      >
        {withCredentials ? "Logout" : "Login"}{" "}
        {/* Button text changes based on state */}
      </Button>
    </div>
  );
};

export default Nav;
