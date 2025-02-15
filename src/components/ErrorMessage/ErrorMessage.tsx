import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Import RootState type

const ErrorMessage = () => {
  const error = useSelector((state: RootState) => state.search.error);

  return (
    <div>
      {error ? (
        <div className='error-message'>
          {/* Render the error message here */}
          <p>{`Error: ${
            error instanceof Error
              ? error.message
              : "Something went wrong. Please contact the administrator."
          }`}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
