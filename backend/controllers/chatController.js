import gemini from '../utils/geminiClient.js';

export const handleChat = async (req, res) => {
  const { query, city } = req.body;

  try {
    const prompt = `You are an expert weather assistant. Based on current weather in ${city}, help this person:\n\n"${query}"\n\nGive useful advice especially for farmers, workers or travelers.`;

    const geminiRes = await gemini.post(
      '/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    // 🔥 Log Gemini's full response for debugging
    console.log('Gemini Response:', JSON.stringify(geminiRes.data, null, 2));

    const response =
      geminiRes?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      '⚠️ No advice from Gemini. Try asking differently!';

    res.json({ response });
  } catch (err) {
    console.error('Gemini Chat Error:', err.message);
    res.status(500).json({ error: 'Gemini chatbot error' });
  }
};
