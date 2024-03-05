//VALIDATION ROUTER
import express from 'express';
import { validateTokenController } from '../controller/valid.controller.js';

const router = express.Router();

router.get('/validate_token', validateTokenController);

export default router;
