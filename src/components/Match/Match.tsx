// external modules
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// local modules
import "./match.css";
import type { FavoriteDog } from "../../types/dog";
import { matchDog, fetchDogsByIds } from "../../api/dogRoutes";
import { setMatch } from "../../store/matchSlice";
import { RootState } from "../../store";

const Match = () => {
  // state
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.match.favorites);
  const match = useSelector((state: RootState) => state.match.match);
  const [displayMatch, setDisplayMatch] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  // logic
  const handleMatchClick = async (
    favoriteDogs: { id: string; name: string }[]
  ) => {
    if (!favoriteDogs.length) return;

    setIsMatching(true);
    let index = 0;

    const ids = favoriteDogs.map((dog) => dog.id);

    const cycleInterval = setInterval(() => {
      setDisplayMatch(favoriteDogs[index]?.name || "Finding...");
      index = (index + 1) % favoriteDogs.length;
    }, 100);

    try {
      const matchedId = await matchDog(ids);
      const matchedDogs: FavoriteDog[] = await fetchDogsByIds([matchedId]);

      if (matchedDogs.length > 0) {
        dispatch(setMatch(matchedDogs[0].name));

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
