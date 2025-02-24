import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/authRoutes"; // Modularized logout function
import { Button } from "@mui/material"; // Material-UI Button
import { RootState } from "../../store"; // Import RootState to use the selector
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import HomeIcon from "@mui/icons-material/Home";

import "./nav.css";
import { setReduxCredentials } from "../../store/authSlice";
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const reduxCredentials = useSelector(
    (state: RootState) => state.auth.reduxCredentials
  ); // Get reduxCredentials from Redux store

  const handleLogout = async () => {
    // Call the logout function from the modularized API
    const message = await logout();
    dispatch(setReduxCredentials(false));
    navigate("/");
    console.log(message);
  };

  const handleLogin = () => {
    // Redirect to /login route when Login button is clicked
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/search"); // Navigate to /search when HomeIcon button is clicked
  };

  return (
    <div className='nav px-5 py-8'>
      {" "}
      <div className='nav-left'>
        <Button variant='contained' color='primary' onClick={handleHomeClick}>
          <HomeIcon />
        </Button>
        <h1>Dog Adoption App</h1>
      </div>
      <Button
        onClick={reduxCredentials ? handleLogout : handleLogin} // Conditional function for click
        variant='contained'
        color={reduxCredentials ? "secondary" : "primary"} // Change color based on login state
      >
        {reduxCredentials ? "Logout" : "Login"}{" "}
        {/* Button text changes based on state */}
      </Button>
    </div>
  );
};

export default Nav;
