// valid.controller.js
import { validateToken } from '../services/validServices.js';
import Session from '../db/schemas/session.Schema.js';

export const validateTokenController = async (req, res) => {
    const { token } = req.query;

    try {
        const validation = await validateToken(token);

        if (validation.valid) {
            const session = await Session.findOne({ sessionToken: token });

            if (session) {
                const { first_name, last_name, id } = session.user;
                res.json({ status: 'ok', data: { valid: true, user: { first_name, last_name, id }, message: null } });
            } else {
                res.json({ status: 'ok', data: { valid: false, user: null, message: 'Invalid session token' } });
            }
        } else {
            res.json({ status: 'ok', data: { valid: false, user: null, message: 'Invalid session token' } });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', data: null, message: 'Internal Server Error' });
    }
};
