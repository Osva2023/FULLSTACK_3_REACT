// server/services/validServices.js

import Session from '../db/schemas/session.Schema.js';
import User from '../db/schemas/user.Schema.js';

export const validateToken = async (token) => {
  const session = await Session.findOne({ sessionToken: token });

  if (!session) {
    return { valid: false };
  }

  const user = await User.findById(session.userId);
  if (!user) {
    return { valid: false };
  }

  return {
    valid: true,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      id: user._id
    }
  };
};