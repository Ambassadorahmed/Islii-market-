export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";
  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return Response.json({ reply: "❌ GROQ_API_KEY missing! Add in Vercel Settings!" });
  }

  // Groq 2025 valid models - tries all
  const models = [
    "llama-3.3-70b-versatile",
    "llama-3.1-70b-versatile",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "mixtral-8x7b-32768",
    "gemma2-9b-it"
  ];

  for (const model of models) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: `You are Somali IA - Islii Market by Ahmed Abdikani Eastleigh Jam Street Sawa Mall. Sell perfumes 500-50k KES. WhatsApp 0725723383. Answer ANYTHING in Somali first, friendly, REAL like Meta AI. Never same sentence.` },
            { role: "user", content: last }
          ],
          temperature: 0.8,
          max_tokens: 500
        }),
      });

      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        return Response.json({ reply: data.choices[0].message.content });
      }
      // if error, try next model
      console.log(`Model ${model} failed:`, data.error);
    } catch (e) {
      continue;
    }
  }

  return Response.json({ reply: `Walaal Groq key might be revoked (you leaked gsk_MNGj...). Create NEW key at console.groq.com/keys, add to Vercel, Redeploy!` });
}
