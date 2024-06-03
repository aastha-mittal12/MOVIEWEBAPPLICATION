import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { MdAddCircle } from "react-icons/md";
import { FaPlus, FaChevronDown, FaEyeSlash } from 'react-icons/fa'; 
import './Addtoplaylist.css';
import { useNavigate } from 'react-router-dom';
import { base_url } from './services/helper';

const AddToPlaylist = () => {
  const location = useLocation();
  const { movie } = location.state;
  let navigate = useNavigate()

  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [showOption, setShowOption] = useState(''); 
  const [playlistPrivacy, setPlaylistPrivacy] = useState('private');
  const token = localStorage.getItem('token');
  let userId = '';

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken._id;
  }

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${base_url}/playlists`, {
        params: { userId },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const addMovieToPlaylist = async (playlistId) => {
    try {
      await axios.post(`${base_url}/playlists/${playlistId}/add-movie`, { movieId: movie.imdbID });
      alert('Movie added to playlist successfully!');
      navigate('/myplaylist')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(' Movie already exists in the playlist');
      } else {
        console.error('Error adding movie to playlist:', error);
        alert('Failed to add movie to playlist');
      }
    }
  };
  
  const createPlaylistAndAddMovie = async () => {
    const playlistData = {
      name: newPlaylistName,
      description: newPlaylistDescription,
      public: playlistPrivacy === 'public',
      movieIds: [movie.imdbID],
      userId,
    };

    try {
      await axios.post(`${base_url}/playlists`, playlistData);
      alert('Playlist created successfully and movie added!');
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      fetchPlaylists();
      navigate('/myplaylist')
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert('Failed to create playlist');
    }
  };

  return (
    <div className="add-to-playlist-container">
      <h2 style={{textAlign:'center'}}>Add Movie to Playlist</h2>

      {playlists.length === 0 && <p  style={{color:'white', textAlign:'center'}}>No existing playlists found. Create a new playlist below.</p>}

      {playlists.length > 0 && (
        <div className="existing-playlists">
          <button className="toggle-btn" onClick={() => setShowOption('existing')}>
            {showOption === 'existing'? <FaEyeSlash /> : <FaChevronDown />} {showOption === 'existing'? 'Hide Existing Playlists' : 'Add to Existing Playlist'}
          </button>

          {showOption === 'existing' && (
            <div>
              <select className="playlist-select" value={selectedPlaylistId} onChange={(e) => setSelectedPlaylistId(e.target.value)}>
                <option value="">Select a playlist</option>
                {playlists.map((playlist) => (
                  <option key={playlist._id} value={playlist._id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
              {/* Pass the playlist._id as an argument */}
              <button className="add-btn" onClick={() => addMovieToPlaylist(selectedPlaylistId)}>Add <MdAddCircle /></button>
            </div>
          )}
        </div>
      )}

      {showOption!== 'existing' && (
        <button className="toggle-btn" onClick={() => setShowOption('new')}>
          {showOption === 'new'? 'Hide New Playlist Form' : 'Create New Playlist'}
        </button>
      )}

      {showOption === 'new' && (
        <div className="new-playlist-form">
          <input
            type="text"
            className="input-field"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="Enter Playlist Name"
            required
          />
          <br></br>
          <br></br>
          <input
            type="text"
            className="input-field"
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
            placeholder="Enter Playlist Description"
            required
          />
          <select className="privacy-select" value={playlistPrivacy} onChange={(e) => setPlaylistPrivacy(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <br></br>
          <br></br>
          <button className="create-btn" onClick={createPlaylistAndAddMovie}> Create and Add <MdAddCircle /></button>
        </div>
      )}

    </div>
  );
};

export default AddToPlaylist;
