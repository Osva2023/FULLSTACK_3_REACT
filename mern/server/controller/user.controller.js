import User from "../db/schemas/user.Schema.js";

// CONTROLLER WITH THE LOGIC TO CREATE A USER
export const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
