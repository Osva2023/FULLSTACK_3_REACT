import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToServer } from './db/conn.js';
import agentRoutes from './routes/agent.route.js';
import loginRoute from './routes/login.route.js';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(agentRoutes);
app.use('/', loginRoute);

// Connect to MongoDB before starting the server
connectToServer().then(async () => {
  const { default: userRoutes } = await import('./routes/user.route.js');
  app.use(userRoutes);
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});