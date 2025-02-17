import { useSelector, useDispatch } from "react-redux";
import { matchDog, fetchDogsByIds } from "../../api/dogRoutes"; // Add getDogById API call
import { setMatch } from "../../store/matchSlice";
import { RootState } from "../../store";

import "./match.css";
import { useState } from "react";
import type { FavoriteDog } from "../../types/dog";

const Match = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.match.favorites);
  const match = useSelector((state: RootState) => state.match.match);

  const [displayMatch, setDisplayMatch] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const handleMatchClick = async (
    favoriteDogs: { id: string; name: string }[]
  ) => {
    if (!favoriteDogs.length) return;

    setIsMatching(true); // Start animation effect
    let index = 0;

    const ids = favoriteDogs.map((dog) => dog.id); // Extract IDs for API request

    // Start cycling effect
    const cycleInterval = setInterval(() => {
      setDisplayMatch(favoriteDogs[index]?.name || "Finding...");
      index = (index + 1) % favoriteDogs.length;
    }, 100);

    try {
      const matchedId = await matchDog(ids); // Get matched dog ID
      const matchedDogs: FavoriteDog[] = await fetchDogsByIds([matchedId]); // Fetch the dog's details

      if (matchedDogs.length > 0) {
        dispatch(setMatch(matchedDogs[0].name)); // Store dog's name in Redux

        // Stop the cycling effect and show the real match
        clearInterval(cycleInterval);
        setTimeout(() => {
          setIsMatching(false);
          setDisplayMatch(matchedDogs[0].name);
        }, 1000);
      } else {
        clearInterval(cycleInterval);
        setIsMatching(false);
        setDisplayMatch("No match found");
      }
    } catch (error) {
      console.error("Matching failed:", error);
      clearInterval(cycleInterval);
      setIsMatching(false);
      setDisplayMatch("Error matching dog");
    }
  };
  return (
    <div>
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
