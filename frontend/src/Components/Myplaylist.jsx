import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Fixing the import for jwtDecode
import { FaInfoCircle } from 'react-icons/fa'; // Removed FaPlay as it's not used
import './MyPlaylist.css';
import { base_url } from './services/helper';

const MyPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUserIdFromToken = (token) => {
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken._id;
      }
      return null;
    };

    const userId = getUserIdFromToken(token);
    if (userId) {
      fetchPlaylists(userId);
    }
  }, [token]);

  const fetchPlaylists = async (userId) => {
    try {
      const response = await axios.get(`${base_url}/playlists/user/${userId}`);
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  return (
    <div className="my-playlists">
      <h1>My Playlists</h1>
      {playlists.length === 0 ? (
        <div className="no-playlists" style={{color:'white' , textAlign:'center'}}>You haven't created any playlist yet. Create some! Go and search your Favs !</div>
      ) : (
        playlists.map((playlist) => (
          <Link to={`/playlist/${playlist._id}`} key={playlist._id} className="playlist-item">
            <h2>{playlist.name}</h2>
            <div className="playlist-actions">
              <Link to={`/playlist/${playlist._id}`} className="action-icon">
                <FaInfoCircle /> Details
              </Link>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MyPlaylist;
