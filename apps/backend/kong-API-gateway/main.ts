import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.MGMT_PORT || 4000;

app.get('/health', (_, res) => res.send('Kong Gateway OK'));

app.listen(port, () => {
  console.log(`Kong Gateway health server running on port ${port}`);
});
