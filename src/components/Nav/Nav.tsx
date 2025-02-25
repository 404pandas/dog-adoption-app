// external modules
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

// local modules
import "./nav.css";
import { setReduxCredentials } from "../../store/authSlice";
import { logout } from "../../api/authRoutes";
import { RootState } from "../../store";

const Nav = () => {
  // state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxCredentials = useSelector(
    (state: RootState) => state.auth.reduxCredentials
  );

  // logic
  const handleLogout = async () => {
    const message = await logout();
    dispatch(setReduxCredentials(false));
    navigate("/");
    console.log(message);
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/search");
  };

  return (
    <div className='nav px-5 py-8'>
      {" "}
      <div className='nav-left'>
        <Button variant='contained' color='primary' onClick={handleHomeClick}>
          <HomeIcon />
        </Button>
        <h1 className='header-title'>Dog Adopt</h1>
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
