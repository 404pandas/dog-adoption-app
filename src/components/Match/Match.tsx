import { useSelector, useDispatch } from "react-redux";
import { matchDog } from "../../api/dogRoutes";
import { setMatch } from "../../store/matchSlice";
import { RootState } from "../../store";

import "./match.css";
import { useState } from "react";
const Match = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.match.favorites);

  const match = useSelector((state: RootState) => state.match.match);
  const [displayMatch, setDisplayMatch] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const handleMatchClick = async (ids: string[]) => {
    if (!ids.length) return;

    setIsMatching(true); // Start animation effect
    let index = 0;

    // Start cycling effect
    const cycleInterval = setInterval(() => {
      setDisplayMatch(ids[index]);
      index = (index + 1) % ids.length;
    }, 100);

    try {
      const results = await matchDog(ids);
      dispatch(setMatch(results));

      // Stop the cycling effect and show the real match
      clearInterval(cycleInterval);
      setTimeout(() => {
        setIsMatching(false);
        setDisplayMatch(results);
      }, 1000);
    } catch (error) {
      console.error("Matching failed:", error);
      clearInterval(cycleInterval);
      setIsMatching(false);
      setDisplayMatch("Error matching dog");
    }
  };
  return (
    <div>
      {" "}
      <button
        className='match-button'
        onClick={() => handleMatchClick(favorites)}
      >
        Match me!
      </button>
      {isMatching ? (
        <h3 className='match-results'>
          Comparing the following match: {displayMatch}...
        </h3>
      ) : match ? (
        <h3 className='match-results'>You've been matched with: {match}!</h3>
      ) : null}
    </div>
  );
};

export default Match;
