const express = require('express');
const jwt = require('jsonwebtoken'); // Import jwt for generating tokens
const bcrypt = require('bcryptjs'); // Import bcrypt for password comparison
const User = require('../models/User');

const router = express.Router();
const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for the secret

// Register Route
router.post('/register', async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use' });
        }

        const user = new User({ name, email, password }); // No need to hash here, it's handled in User model
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Login Route
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user._id, name: user.name }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

//UserName
router.get('/', async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.userId);

        res.json({
            name: user.name,
            email: user.email,
            password: user.password
        });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized access' });
    }
});

// UserInfo
router.post('/userinfo', async(req, res) => {
    try {
        console.log('Request body:', req.body); // Log incoming data
        const { bio, linkedIn, github, dob } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user information
        user.bio = bio;
        user.linkedIn = linkedIn;
        user.github = github;
        user.dob = dob;

        await user.save();

        console.log('User updated:', user); // Log the updated user
        res.status(200).json({ message: 'User info updated successfully' });
    } catch (error) {
        console.error('Error updating user info:', error);
        res.status(500).json({ message: 'Error updating user info', error });
    }
});


module.exports = router;