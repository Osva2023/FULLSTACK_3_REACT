// session.routes.js
import express from 'express';
import { createSession } from '../controller/session.controller.js';

const router = express.Router();

router.post('/api/session/:user_id', createSession);

export default router;