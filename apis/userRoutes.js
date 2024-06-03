const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt=require('bcrypt');
const generateAuthToken=require('../jwtTokenGenerator');

// Register
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//login
router.post('/login', async (req, res) => {
    console.log("req received");
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateAuthToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
