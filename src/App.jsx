import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=fbe01fa6';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search || []);
  };

  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  return (
    <div className="app">
      <h1>🎬 MovieFinder</h1>

      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
        />
        <button onClick={() => searchMovies(searchTerm)}>🔍</button>
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
