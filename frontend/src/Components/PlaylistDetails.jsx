import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './PlaylistDetails.css'; // Import CSS file for custom styling
import { base_url, omdbapi } from './services/helper';

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPlaylistDetails(id);
  }, [id]);

  const fetchPlaylistDetails = async (playlistId) => {
    try {
      const playlistResponse = await axios.get(`${base_url}/playlists/${playlistId}`);
      setPlaylist(playlistResponse.data);

      const movieDetails = await Promise.all(
        playlistResponse.data.movieIds.map(async (movieId) => {
          const movieResponse = await axios.get(`${omdbapi}i=${movieId}`);
          return movieResponse.data;
        })
      );
      setMovies(movieDetails);
    } catch (error) {
      console.error('Error fetching playlist details:', error);
    }
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playlist-details-container">
      <h2 className="playlist-name">{playlist.name}</h2>
      <p className="playlist-description">{playlist.description}</p>
      <div className="movie-list moviedetails">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="cardplaylist">
            <img src={movie.Poster} className="card-img-top" alt={`${movie.Title} poster`} />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">Year: {movie.Year}</p>
              <p className="card-text">IMDB Rating: {movie.imdbRating}</p>
              <p className="card-text">{movie.Plot}</p>
              <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary details">Details</Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;
