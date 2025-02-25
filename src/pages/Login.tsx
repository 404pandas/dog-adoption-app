// external modules
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

// local modules
import { login } from "../api/authRoutes";
import { store } from "../store";
import { setLoading, setError } from "../store/searchSlice";

const Login = () => {
  // state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setLocalError] = useState("");
  const navigate = useNavigate();

  // logic
  // login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLocalError("");
    store.dispatch(setError(""));

    if (!name.trim()) {
      setLocalError("Please enter a name!");
      return;
    }

    if (!email.trim()) {
      setLocalError("Please enter an email!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const message = await login(name, email);
      setStatusMessage(message);
      navigate("/search");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
      setLocalError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen body'>
      <Box className='p-8 shadow-lg rounded-lg w-3/4 container'>
        <Typography variant='h4' className=' text-center mb-6'>
          Login
        </Typography>
        <form onSubmit={handleLogin} className='space-y-6 '>
          {/* Name Field */}
          <FormControl fullWidth>
            <TextField
              label='Name'
              variant='outlined'
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=' rounded-md'
              InputProps={{
                className:
                  "hover:shadow-lg focus:shadow-lg transition-shadow duration-300 form-input",
              }}
            />
          </FormControl>

          {/* Email Field */}
          <FormControl fullWidth>
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=' rounded-md'
              InputProps={{
                className:
                  "hover:shadow-lg focus:shadow-lg transition-shadow duration-300 form-input",
              }}
            />
          </FormControl>

          {/* Error Message */}
          {error && (
            <Typography color='error' className='text-center'>
              {error}
            </Typography>
          )}

          {/* Status Message */}
          {statusMessage && (
            <Typography
              color={statusMessage.includes("Successful") ? "primary" : "error"}
              className='text-center'
            >
              {statusMessage}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type='submit'
            variant='contained'
            fullWidth
            className='py-2 rounded-md transition-all duration-300'
          >
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
