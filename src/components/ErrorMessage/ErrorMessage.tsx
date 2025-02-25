// external modules
import { useSelector } from "react-redux";

// local modules
import { RootState } from "../../store"; // Import RootState type

const ErrorMessage = () => {
  // state
  const error = useSelector((state: RootState) => state.search.error);

  return (
    <div>
      {error ? (
        <div className='error-message'>
          <p>{`Error: ${error}. Please login!`}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
