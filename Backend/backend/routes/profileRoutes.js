const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Set up directory for uploads
const uploadsDir = path.join(__dirname, 'uploads');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Set up multer for image handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Save to the uploads directory
    },
    filename: (req, file, cb) => {
        const userId = req.body.userId || 'default'; // Get userId from request body, fallback to 'default'
        const uniqueName = `${userId}-${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Set the file name to be unique per user
    },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

// Route to handle profile image upload
router.post('/upload-profile-image', upload.single('profileImage'), (req, res) => {
    try {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image' });
    }
});

router.get('/profileImage', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const imagePath = `uploads/${userId}-profileImage.png`; // Assuming image saved as png
    if (fs.existsSync(imagePath)) {
        return res.json({ profileImage: `/${imagePath}` });
    } else {
        return res.status(404).json({ message: 'No profile image found' });
    }
});


module.exports = router;