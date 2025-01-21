import React, { useState, useEffect } from "react";
import { getMovies } from "../../Services/Movie";
import "./CallMovie.css"; // Import the CSS file for styling

const CallMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // For navigation

  const posterImages = [
    require("../Images/lotr1.jpg"), 
    require("../Images/lotr2.jpg"), 
    require("../Images/lotr3.jpg"), 
    require("../Images/avatar.jpg"), 
  ];

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleNext = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="movie-container">
      <h1>Movie Management</h1>
      <h2>Available Movies</h2>
      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        <div className="movie-list-container">
          <div className="movie-list" style={{ transform: `translateX(-${currentIndex * 250}px)` }}>
            {movies.map((movie, index) => (
              <div
                key={index}
                className={`movie-box ${
                  index === currentIndex ? "focus" : "dimmed"
                }`}
              >
                <div className="movie-card">
                  <div className="movie-front">
                    <img
                      src={posterImages[index]} 
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <h3 className="movie-title">{movie.title}</h3>
                  </div>
                  <div className="movie-back">
                    <p className="movie-description">{movie.description}</p>
                    <p className="movie-duration">Duration: {movie.duration} min</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="nav-buttons">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              &lt;
            </button>
            <button onClick={handleNext} disabled={currentIndex === movies.length - 1}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallMovie;
