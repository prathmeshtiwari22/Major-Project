const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');

router.use(cors());

router.post('/update-streak', async(req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const today = new Date();
        const lastVisit = new Date(user.lastVisit);
        const oneDay = 24 * 60 * 1000;

        if (!user.lastVisit) {
            user.streak = 1;
        } else if (Math.floor((today - lastVisit) / oneDay) === 1) {
            user.streak += 1;
        } else if (Math.floor((today - lastVisit) / oneDay) > 1) {
            user.streak = 1;
        }

        user.lastVisit = today;
        await user.save();

        res.json({ streak: user.streak });
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});

module.exports = router;