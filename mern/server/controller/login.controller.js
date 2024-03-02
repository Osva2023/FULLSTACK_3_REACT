// login.controller.js
import User from '../db/schemas/user.Schema.js';
import { generateSessionToken } from '../services/authenService.js';

import cookie from 'cookie';

 // LOGIC TO LOGIN THE USER
export const loginUser = async (req, res) => {
    console.log('Received login request:', req.body);      // debugin pruposes
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        console.log('Fetched user from the database:', user); // debugin pruposes
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const sessionToken = generateSessionToken(user._id);
        

        const cookieOptions = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, 
        };
        res.setHeader('Set-Cookie', cookie.serialize('sessionToken', sessionToken, cookieOptions));
        
        
        res.status(200).json({ status: 'ok', message: 'Logged in successfully', first_name: user.first_name, sessionToken, user_id: user._id });
    } catch (err) {
        
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
 


