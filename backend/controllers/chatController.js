import gemini from '../utils/geminiClient.js';

export const handleChat = async (req, res) => {
  const { query, city } = req.body;

  try {
    const prompt = `You are an expert weather assistant. Based on current weather in ${city}, help this person:\n\n"${query}"\n\nGive useful advice especially for farmers, workers or travelers.`;

    const geminiRes = await gemini.post(
      '/models/gemini-pro:generateContent', // ✅ FIXED path (no v1beta prefix here)
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    console.log('Gemini Response:', JSON.stringify(geminiRes.data, null, 2)); // ✅ DEBUG log

    const response = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No advice available.";
    res.json({ response });
  } catch (err) {
    console.error('Gemini Chat Error:', err.message); // ✅ Show reason
    res.status(500).json({ error: 'Gemini chatbot error' });
  }
};
