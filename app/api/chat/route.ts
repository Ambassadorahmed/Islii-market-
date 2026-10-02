export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  const prompt = `You are Somali IA - Islii Market Eastleigh 24/7, Jam Street Sawa Mall. Perfumes 100% original, Black Car, taxi, delivery. WhatsApp 0725723383, owner Ahmed. Speak Somali first, friendly, funny, helpful. User: ${last}`;

  // Models Google hadda aqoonsanayo 2026
  const models = ["gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash-lite", "gemini-1.5-flash"];

  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 500 }
        }),
      });
      const data = await res.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return Response.json({ reply: data.candidates[0].content.parts[0].text });
      }
    } catch {}
  }

  // Haddii dhammaan fail gareeyaan - hadana ku jawaab sida aniga
  return Response.json({
    reply: `Asc walaal! 🙏 Walaal soo dhawoow Islii Market 24/7 Jam Street Sawa Mall, Eastleigh! Black Car & perfumes 100% original waan haynaa! Maxaan kuu qabtaa? WhatsApp: 0725723383 - Ahmed Abdikani`
  });
}
