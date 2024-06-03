const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    public: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    },
    movieIds: {
      type: [String], // store an array of movie IDs
      required: true
    }
  });

  const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
