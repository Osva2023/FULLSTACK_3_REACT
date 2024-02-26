// login.routes.js
import express from 'express';
import { loginUser } from '/Users/gloriagomez/osvaldo/Codeboxx/FULLSTACK_2_MERN/mern/server/controller/login.controller.js';

const router = express.Router();

router.post('/api/login', loginUser);

export default router;

