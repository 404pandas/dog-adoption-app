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

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    try {
      const message = await login(name, email); // Call API
      setStatusMessage(message);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage)); // Dispatching the error message as string
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth='sm'
      className='flex flex-col items-center justify-center min-h-screen test'
    >
      <Box className='p-8 bg-gray-900 shadow-lg rounded-lg w-full'>
        <Typography variant='h4' className='text-white text-center mb-6'>
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
              className='bg-gray-800 text-white rounded-md'
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
              className='bg-gray-800 text-white rounded-md'
              InputProps={{
                className:
                  "hover:shadow-lg focus:shadow-lg transition-shadow duration-300",
              }}
            />
          </FormControl>

          {/* Status Message */}
          {statusMessage && (
            <Typography
              color={statusMessage.includes("Successful") ? "primary" : "error"}
            >
              {statusMessage}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type='submit'
            variant='contained'
            fullWidth
            className='bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-300'
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
