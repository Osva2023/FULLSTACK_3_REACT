// login.controller.js
import User from '../db/schemas/user.Schema.js';
import { generateSessionToken } from '../services/authenService.js';
import Session from '../db/schemas/session.Schema.js';
import cookie from 'cookie';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generar el token de sesión
        const sessionToken = generateSessionToken(user._id);

        // Configurar la cookie
        const cookieOptions = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (24 horas)
            // Otras opciones de cookie según sea necesario
        };

        // Establecer la cookie en la respuesta
        res.setHeader('Set-Cookie', cookie.serialize('sessionToken', sessionToken, cookieOptions));

        // Guardar la sesión en la base de datos
        const session = new Session({
            sessionToken,
            userId: user._id,
        });
        await session.save();

        // Enviar una respuesta de éxito
        res.status(200).json({ message: 'Logged in successfully', first_name: user.first_name });
    } catch (err) {
        // Manejar errores, por ejemplo, enviar una respuesta de error
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
