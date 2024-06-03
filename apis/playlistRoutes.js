const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const User = require('../models/User');

// GET all playlists for a specific user
router.get('/playlists', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const playlists = await Playlist.find({ userId });
    res.status(200).json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create playlist
router.post('/playlists', async (req, res) => {
  try {
    const { name, description, public, movieIds, userId } = req.body;
    const playlist = new Playlist({ name, description, public, movieIds, userId });
    await playlist.save();
    await User.findByIdAndUpdate(userId, { $push: { playlists: playlist._id } });
    res.status(201).json({ message: 'Playlist created successfully', playlist });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add movie to playlist
router.post('/playlists/:playlistId/add-movie', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { movieId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Check if the movie is already in the playlist
    if (playlist.movieIds.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already exists in the playlist' });
    }

    // If not, add the movie to the playlist
    playlist.movieIds.push(movieId);
    await playlist.save();
    res.status(200).json({ message: 'Movie added to playlist', playlist });
  } catch (error) {
    console.error('Error adding movie to playlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET playlists by user ID
router.get('/playlists/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await Playlist.find({ userId });
    res.status(200).json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET playlist details by ID
router.get('/playlists/:playlistId', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.status(200).json(playlist);
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// public 
router.get('/public-playlists', async (req, res) => {
  try {
    const publicPlaylists = await Playlist.find({ public: true });
    res.status(200).json(publicPlaylists);
  } catch (error) {
    console.error('Error fetching public playlists:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
