import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { login } from "../api/authRoutes"; // Adjust import path as needed
import { store } from "../store";
import { setLoading, setError } from "../store/searchSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setLocalError] = useState(""); // Local state for validation errors
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setLocalError("");
    store.dispatch(setError(""));

    // ✅ Validate name
    if (!name.trim()) {
      setLocalError("Please enter a name!");
      return;
    }

    // ✅ Validate email
    if (!email.trim()) {
      setLocalError("Please enter an email!");
      return;
    }

    // ✅ Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const message = await login(name, email); // Call API
      setStatusMessage(message);
      navigate("/search");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage)); // Dispatching the error message as string
      setLocalError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth='sm'
      className='flex flex-col items-center justify-center min-h-screen body'
    >
      <Box className='p-8 shadow-lg rounded-lg w-full container'>
        <Typography variant='h4' className=' text-center mb-6'>
          Login
        </Typography>
        <form onSubmit={handleLogin} className='space-y-6'>
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
                  "hover:shadow-lg focus:shadow-lg transition-shadow duration-300",
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
                  "hover:shadow-lg focus:shadow-lg transition-shadow duration-300",
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
    </Container>
  );
};

export default Login;
