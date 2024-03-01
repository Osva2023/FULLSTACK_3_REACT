// controller/valid.controller.js
import { validateToken } from '../services/validServices.js';

export const validateTokenController = async (req, res) => {
  console.log('validateTokenController is called');
  const { token } = req.query;
  console.log ('Received token:', token);                     // debugin pruposes

  try {
    const validation = await validateToken(token);
    console.log ('Validation result:', validation);           // debugin pruposes

    if (validation.valid) {
      res.json({
        status: 'ok',
        data: {
          valid: true,
          user: validation.user,
          message: null
        }
      });
    } else {
      res.json({
        status: 'ok',
        data: {
          valid: false,
          user: null,
          message: 'Invalid session token'
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'An error occurred while validating the token'
    });
  }
};