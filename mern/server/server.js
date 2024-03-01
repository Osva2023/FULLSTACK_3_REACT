import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToServer } from './db/conn.js';
import agentRoutes from './routes/agent.route.js';
import loginRoute from './routes/login.route.js';
import validRouter from './routes/valid.router.js';
import sessionRoutes from './routes/session.route.js';
import printMiddleware from './controller/printer.middleware.js';
import  transactionRouter from './routes/transaction.route.js';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(printMiddleware);
app.use('/', loginRoute);
app.use( sessionRoutes);
app.use(validRouter)
app.use(agentRoutes);
app.use(transactionRouter);

// Connect to MongoDB before starting the server
connectToServer().then(async () => {
  const { default: userRoutes } = await import('./routes/user.route.js');
  app.use(userRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});