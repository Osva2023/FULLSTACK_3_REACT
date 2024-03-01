import { v4 as uuidv4 } from 'uuid';
import Session from '../db/schemas/session.Schema.js';

export const createSession = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Generate a session token as a UUID
    const sessionToken = uuidv4();

    await Session.deleteMany({ userId });

    // Save the session in the database with an expiration date
    const session = new Session({
      sessionToken,
      userId,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    });

    await session.save();

    console.log('Saved session to the database:', session); // Debugging purposes

    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'ok', data: { token: sessionToken }, message: 'Session saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the session' });
  }
};