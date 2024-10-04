// server.js
import express from 'express';
import { json } from 'body-parser';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import cors from 'cors';
import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(json());

// In-memory user storage (for demo purposes)
let users = [];

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = { username, email, password: hashedPassword };
    users.push(newUser);

    // Create a token
    const token = sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token
    const token = sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});