// userRoutes.js
import express from 'express';
import {registerUser} from '../controller/user.controller.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);

// Agrega más rutas según tus necesidades

export default userRoutes;
