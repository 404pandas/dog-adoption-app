// import { useState, useEffect } from "react";
// import axios from "axios";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";

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
      <Nav />

      <Outlet />
    </>
  );
}

export default App;
