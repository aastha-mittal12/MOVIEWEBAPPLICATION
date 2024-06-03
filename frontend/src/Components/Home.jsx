import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './Home.css';
import MyPlaylist from './Myplaylist'; // Import the updated MyPlaylist component
import { omdbapi } from './services/helper';

const Home = () => {
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [noResults, setNoResults] = useState(false); // State to track if no results are found
  const [playlist, setPlaylist] = useState([]); // State for playlist
  let token = localStorage.getItem('token');

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch(); // Load initial movies only if searchQuery is not empty
    }

    // Fetch playlist from local storage or an API
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(savedPlaylist);
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${omdbapi}s=${searchQuery}`);
      const responseData = response.data;
      if (responseData.Response === "True") {
        setMovies(responseData.Search || []);
        setNoResults(false); // Reset noResults state if movies are found
      } else {
        setMovies([]); // Clear movies array
        setNoResults(true); // Set noResults state to true
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddToPlaylist = (movie) => {
    if (token) {
      navigate('/addtoplaylist', { state: { movie } });
    } else {
      alert('Login first');
    }
  };

  return (
    <div className='home-container'>
      <div className="search-bar">
        <input type="text" value={searchQuery} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Search movies..." />
        <button onClick={handleSearch}><FaSearch /></button>
      </div>
      {searchQuery.trim() === '' ? ( // Check if searchQuery is empty
        <MyPlaylist playlist={playlist}/> // Pass the playlist to MyPlaylist component
      ) : noResults ? ( // Display message when no results are found
        <div className="no-results">
          No movies found for "{searchQuery}". Please be more specific.
        </div>
      ) : movies.length > 0 ? ( // Render movies if there are movies
        <div className="movie-page">
          {movies.map((item) => {
            const { imdbID, Title, Poster, Year, Type } = item;
            return (
              <div className="card" key={imdbID} onMouseEnter={() => setHoveredMovie(imdbID)} onMouseLeave={() => setHoveredMovie(null)}>
                <Link to={`/movie/${imdbID}`}>
                  <div className="card-info">
                    <h2>{Title}</h2>
                    <div className="img">
                      <img src={Poster} alt="Image of the movie is not available" />
                    </div>
                  </div>
                </Link>
                {hoveredMovie === imdbID && (
                  <div className="movie-description">
                    <p><strong>Title:</strong> {Title}</p>
                    <p><strong>Year:</strong> {Year}</p>
                    <p><strong>Type:</strong> {Type}</p>
                  </div>
                )}
                <button onClick={() => handleAddToPlaylist(item)}>
                  <FaPlus /> Add to Playlist
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
