import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Error = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const handleHomeClick = () => {
    navigate("/search"); // Navigate to /search when HomeIcon button is clicked
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen body'>
        <h2>Page not found!</h2>{" "}
        <h3 onClick={handleHomeClick}> Please return home.</h3>
      </div>
    </>
  );
};

export default Error;
