// userController.js
import User from '../db/schemas/user.Schema.js';

export const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      password, // Note: In a real application, make sure to hash the password before saving it to the database
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
