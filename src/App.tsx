import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from 'react-router-dom';


function App() {
  const [results, setResults] = useState("");
  // const [dogs, setdogs] = useState([])

  useEffect(() => {
    const testLogin = async () => {
      try {
        const response = await axios.post(
          'https://frontend-take-home-service.fetch.com/auth/login',
          {
            name: 'mary',
            email: 'mary.panda.jackson@gmail.com',
          },
          // { withCredentials: true } 
        );

        setResults('Login Successful! 🎉');
        console.log('Login successful:', response);
      } catch (error) {
        setResults('Login Failed. ❌');
        console.error('Login failed', error);
      }
    };
 const testDogs = async () => {
      try {
        const response = await axios.get(
          'https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true }
        )
        console.log(response)
      } catch (error) {
    
        console.error('dogs:', error);
      }
    }
    testLogin();
    testDogs()
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold underline bg-gray-800'>
        Is Tailwind.js working?
      </h1>
      <h2 className='text-2xl font-bold bg-gray-800'>
        Testing login
      </h2>
      <p>{results}</p>
      <Outlet />

    </>
  );
}

export default App;
