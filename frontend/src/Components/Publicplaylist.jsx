import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import './PublicPlaylist.css';
import { base_url } from './services/helper';

const PublicPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch public playlists from the API
    axios.get(`${base_url}/public-playlists`)
      .then(async response => {
        const playlistsData = response.data;
        // Fetch user details for each playlist
        const playlistsWithUsernames = await Promise.all(playlistsData.map(async playlist => {
          const userResponse = await axios.get(`${base_url}/users/${playlist.userId}`);
          const user = userResponse.data;
          return { ...playlist, username: user.username };
        }));
        setPlaylists(playlistsWithUsernames);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error fetching playlists: {error.message}</div>;
  }

  return (
    <div className="public-playlists">
      <h1>Public Playlists</h1>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist._id} className="playlist-item">
             <Link to={`/playlist/${playlist._id}`}><h2>{playlist.name}</h2></Link>
            <Link to={`/playlist/${playlist._id}`} className="main-info">
              <div className="text">
                <p>{playlist.description}</p>
                <p>Created by: {playlist.username}</p>
              </div>
              <div className="playlist-actions">
                <Link to={`/playlist/${playlist._id}`} className="action-icon">
                  <FaInfoCircle /> Details
                </Link>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PublicPlaylist;
