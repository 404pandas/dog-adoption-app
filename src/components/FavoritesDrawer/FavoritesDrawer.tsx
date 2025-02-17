import { useState } from "react";
import "./FavoritesDrawer.css"; // Import the CSS file for the animations
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Match from "../Match/Match";
import "./favoritesDrawer.css";

const FavoritesDrawer = () => {
  const favorites = useSelector((state: RootState) => state.match.favorites);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='favorites-container'
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Favorite button */}
      <button
        className='favorite-button'
        onMouseEnter={() => setIsHovered(true)}
      >
        Favorites
      </button>

      {/* Drawer */}
      <div
        className={`favorites-drawer ${isHovered ? "slide-up" : "slide-down"}`}
      >
        <h2 className='favorites-title'>Your Favorites</h2>
        <ul className='favorites-list'>
          {favorites.length > 0 ? (
            favorites.map((dog, index) => (
              <li key={index} className='favorite-item'>
                {dog}
              </li>
            ))
          ) : (
            <li className='favorite-item'>
              No favorites yet! Try searching to find dogs!
            </li>
          )}
        </ul>
        <Match />
      </div>
    </div>
  );
};

export default FavoritesDrawer;
