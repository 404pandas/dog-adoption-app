import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Import RootState type

const ErrorMessage = () => {
  const error = useSelector((state: RootState) => state.search.error);

  return (
    <div>
      {error ? (
        <div className='error-message'>
          {/* Render the error message here */}
          <p>{`Error: ${error}. Please login!`}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
