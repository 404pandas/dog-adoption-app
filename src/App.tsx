import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold underline bg-gray-800'>
        Is Express.js working?
      </h1>
      <h2>{message}</h2>
    </>
  );
}

export default App;
