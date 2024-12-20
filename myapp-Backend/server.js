const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS

const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS for all routes
app.use(cors());  // This line enables CORS

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Forofficeuse@28',
    database: 'learningportal'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
});

// Signup route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Validate that all fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    // Check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ status: 'error', message: 'Server error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ status: 'error', message: 'Email is already in use' });
        }

        // Hash the password before saving it
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ status: 'error', message: 'Error processing password' });
            }

            // Insert the user into the database
            const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ status: 'error', message: 'Failed to register user' });
                }

                res.status(200).json({ status: 'success', message: 'User created successfully' });
            });
        });
    });
});






// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate that username and password are provided
    if (!username || !password) {
        return res.status(400).json({ status: 'error', message: 'Username and password are required' });
    }

    // Query to fetch user by username
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Server error' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ status: 'error', message: 'Error comparing password' });
                }

                if (isMatch) {
                    // Passwords match, login successful
                    return res.status(200).json({ status: 'success', message: 'Login successful' });
                } else {
                    // Invalid credentials
                    return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
                }
            });
        } else {
            // User not found
            return res.status(400).json({ status: 'error', message: 'User not found' });
        }
    });
});


// Server listening on port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
