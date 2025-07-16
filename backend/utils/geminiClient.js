import axios from 'axios';

const gemini = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com',
  headers: { 'Content-Type': 'application/json' },
  params: { key: process.env.GEMINI_API_KEY }
});

export default gemini;
