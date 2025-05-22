const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/Auth');
const streakRouter = require('./routes/Streakmanage');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/userAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Mongodb');
}).catch(err => {
    console.error('Mongodb connection error:', err);
});

// Routes
app.use('/api', authRoutes);
app.use('/api', streakRouter);
app.use('/api', profileRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});