// import { useState, useEffect } from "react";
// import axios from "axios";
import { Outlet } from 'react-router-dom';



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
      <h1 className='text-3xl font-bold underline bg-gray-800'>
        Is Tailwind.js working?
      </h1>
      <h2 className='text-2xl font-bold bg-gray-800'>
        Testing login
      </h2>
      {/* <p>{results}</p> */}
      <Outlet />

    </>
  );
}

export default App;
