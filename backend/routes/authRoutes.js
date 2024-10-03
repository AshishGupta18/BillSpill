// routes/auth.js
import express from 'express';
import User from '../models/User.js'; // Adjust the import path if necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Create a token (optional, if you want to implement JWT)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token }); // Send the token back to the frontend
  } catch (error) {
    console.error('Signup error:', error); // Log the error
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;