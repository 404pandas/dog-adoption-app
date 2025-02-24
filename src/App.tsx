// import { useState, useEffect } from "react";
// import axios from "axios";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import the theme you just created

function App() {
  // const [results, setResults] = useState("");
  // const [dogs, setdogs] = useState([])

  //  const testDogs = async () => {
  //       try {
  //         const response = await axios.get(
  //           'https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true }
  //         )
  //         console.log(response)
  //       } catch (error) {

  //         console.error('dogs:', error);
  //       }
  //     }
  //     testDogs()

  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />

        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
