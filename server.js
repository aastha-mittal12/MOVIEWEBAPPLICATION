const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Playlist = require('./models/Playlist');
const bodyparser=require('body-parser');
const  dotenv= require('dotenv')
dotenv.config()


const userRoutes = require('./apis/userRoutes');
const playlistRoutes = require('./apis/playlistRoutes');

const dburl= process.env.dburl;
mongoose.connect(dburl)
    .then(() => {
        console.log("DB connected Successfully");
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.json());
const reacturl= process.env.reacturl;
app.use(cors({ origin: [reacturl] }));

// seedDB();

app.use(userRoutes);
app.use(playlistRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`);
});
