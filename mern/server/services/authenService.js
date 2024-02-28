import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateSessionToken = (userId) => {
    const secretKey = process.env.SECRET_KEY || 'your-secret-key';      //change these later 
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
    return token;
};

export  {
    generateSessionToken,
};
