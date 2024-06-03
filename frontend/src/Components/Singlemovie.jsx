import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaFilm, FaUser, FaClock, FaStar } from 'react-icons/fa'; // Import icons from react-icons library
import './SingleMovie.css'; // Import the CSS file for custom styling
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { omdbapi } from './services/helper';
const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  let navigate= useNavigate()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${omdbapi}i=${id}`);
        setMovie(response.data); // Assuming response.data contains movie details
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie || movie.Response === "False") {
    return <div>Movie not found</div>;
  }

  const { Title, Poster, Year, Plot, Genre, Director, Actors, Runtime, Rated } = movie;

  return (
    <div className="single-movie-container">
      <div className="imgbox">
        <img src={Poster} className="card-img-top" alt={Title} />
      </div>
      <div className="infobox">
        <h5 className="card-title">{Title}</h5>
        <p className="card-text"><FaCalendarAlt /> Year: {Year}</p>
        <p className="card-text"><FaFilm /> Genre: {Genre}</p>
        <p className="card-text"><FaUser /> Director: {Director}</p>
        <p className="card-text"><FaUser /> Actors: {Actors}</p>
        <p className="card-text"><FaClock /> Runtime: {Runtime}</p>
        <p className="card-text"><FaStar /> Rated: {Rated}</p>
        <p className="card-text">Plot: {Plot}</p>
        <button onClick={() => navigate('/addtoplaylist', { state: { movie } })}> <FaPlus /> Add to Playlist</button>
      </div>
    </div>
  );
};

export default SingleMovie;
