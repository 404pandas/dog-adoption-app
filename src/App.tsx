import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [results, setResults] = useState("");

  useEffect(() => {
    const testLogin = async () => {
      try {
        const response = await axios.post(
          'https://frontend-take-home-service.fetch.com/auth/login',
          {
            name: 'mary',
            email: 'mary.panda.jackson@gmail.com',
          },
          { withCredentials: true } // Ensures cookies are sent/received (included in API reference)
        );

        setResults('Login Successful! 🎉');
        console.log('Login successful:', response);
      } catch (error) {
        setResults('Login Failed. ❌');
        console.error('Login failed', error);
      }
    };

    testLogin();
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
    </>
  );
}

export default App;
