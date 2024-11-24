// server/controllers/authController.js

const User = require('../models/user'); // Import the User model
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Secret key for JWT (store this in an environment variable in production)
const JWT_SECRET = 'your_jwt_secret_key'; // Change this to a secure key

// Register a new user
exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // Save user ID for future use
        req.userRole = decoded.role; // Save user role for future use
        next();
    });
};