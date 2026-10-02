export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!key) {
    return Response.json({ reply: "Walaal key ma jiro Vercel! Fadlan ku dar GOOGLE_GENERATIVE_AI_API_KEY Production!" });
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are Somali IA - Islii Market Eastleigh 24/7, Jam Street Sawa Mall, Eastleigh Kenya. You sell perfumes 100% original, Black Car, taxi, delivery. WhatsApp 0725723383. Owner Ahmed Abdikani Mohamed. Speak Somali first, friendly like Meta AI, funny, helpful. User says: ${last}. Answer short, Somali, with price if asked.` }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 400 }
      }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Walaal soo dhawoow Islii Market! Maxaan kuu qabtaa?";
    return Response.json({ reply: text });
  } catch (e:any) {
    return Response.json({ reply: `Walaal soo dhawoow! Islii Market 24/7 Jam Street Sawa Mall - Ask me anything & perfumes available here! WhatsApp 0725723383. Error: ${e.message}` });
  }
}
