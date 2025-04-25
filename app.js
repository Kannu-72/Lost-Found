const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect("mongodb://Smiling_79:smiling@ac-zafj1lg-shard-00-00.uphg8xz.mongodb.net:27017,ac-zafj1lg-shard-00-01.uphg8xz.mongodb.net:27017,ac-zafj1lg-shard-00-02.uphg8xz.mongodb.net:27017/?replicaSet=atlas-xrms7k-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));

// Serve login.html on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve register.html on /register
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Register user
app.post('/register', async (req, res) => {
    const { name, username, email, phone, password } = req.body;

    try {
        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already registered!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
        });

        // Save the user to DB
        await newUser.save();

        // Redirect to login page after successful registration
        res.redirect('/');

    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Registration failed!' });
    }
});

// Login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Send success message and redirect to index.html
        res.status(200).json({ message: 'Login successful!' });
        // Ideally, you should generate a token here (JWT) for subsequent requests.
        // res.redirect('/index.html'); // If you want to redirect to an index page after login

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed!' });
    }
});

// Optional admin-only manual insert (for testing or scripts)
async function insert({ name, username, email, phone, password }) {
    try {
        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log('User with this email already exists.');
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
        });

        // Save the user to DB
        await user.save();
        console.log('✅ User inserted successfully!');
    } catch (error) {
        console.error('❌ Error inserting user:', error);
    }
}

// Example user insertion (comment this out if you don't need it)
// insert({
//     name: 'Ananya',
//     username: 'anu_79',
//     email: 'konduriananya.2005@gmail.com',
//     phone: '123456789',
//     password: 'ananya@123'
// });

// Start server
http.listen(3000, () => {
    console.log('🚀 Server is running on http://localhost:3000');
});
