import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoute from './routes/weatherRoute.js';
import chatRoute from './routes/chatRoute.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoute);
app.use('/chatbot', chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
