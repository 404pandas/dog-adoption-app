import React, { useState } from "react";
import "./FavoritesDrawer.css"; // Import the CSS file for the animations

const FavoritesDrawer = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Hardcoded list of favorite dog names
  const favoriteDogs = [
    "Buddy",
    "Bella",
    "Charlie",
    "Max",
    "Luna",
    "Rocky",
    "Sadie",
    "Daisy",
    "Milo",
    "Lucy",
    "Toby",
    "Jack",
    "Chloe",
  ];

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
          {favoriteDogs.map((dog, index) => (
            <li key={index} className='favorite-item'>
              {dog}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoritesDrawer;
