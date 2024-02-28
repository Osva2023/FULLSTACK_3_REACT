// server/services/validServices.js

import Session from '../db/schemas/session.Schema.js';

const validateToken = async (token) => {
  try {
    const session = await Session.findOne({ session_token: token });

    if (session) {
      const { first_name, last_name, id } = session.user;
      return { valid: true, user: { first_name, last_name, id } };
    } else {
      return { valid: false, user: null };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

export { validateToken };
