export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { messages } = req.body;

    const groqMessages = [
      {
        role: 'system',
        content: `You are a prompt engineering expert. Take the user's messy brain dump and transform it into a clear, specific, powerful prompt they can paste into any AI tool like Claude or ChatGPT. Preserve the user's exact intent. Output ONLY the final polished prompt. No explanation, no preamble, no labels.`
      },
      ...messages
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        max_tokens: 1000,
        messages: groqMessages
      })
    });

    const data = await response.json();
    console.log('Groq response:', JSON.stringify(data));
    return res.status(200).json(data);

  } catch(e) {
    console.error('Error:', e.message);
    return res.status(500).json({ error: { message: e.message } });
  }
}
