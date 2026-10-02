export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!key) {
    return Response.json({ reply: "Walaal key ma jiro Vercel! Fadlan ku dar GOOGLE_GENERATIVE_AI_API_KEY!" });
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `
You are Somali IA - Islii Market Eastleigh 24/7 🇸🇴🇰🇪
Jam Street, Sawa Mall, Eastleigh.
Sell: perfumes 100% original, All types of perfumes, Mxad ubahantahy, Ask me anything.
WhatsApp: 0725723383
Owner: Ahmed Abdikani Mohamed 🇸🇴🇰🇪.
Speak SOMALI first, friendly like Meta AI, funny, helpful.
User says: ${last}
Answer short, Somali, with price if ask perfume.
` }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 400 }
      }),
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error.message);
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Walaal soo dhawoow Islii Market! Maxaan kuu qabtaa?";
    return Response.json({ reply: text });
  } catch (e:any) {
    return Response.json({ reply: `Walaal soo dhawoow! Islii Market 24/7 Jam Street Sawa Mall. Black Car & perfumes 100% original available! WhatsApp 0725723383. (Error: ${e.message.slice(0,100)})` });
  }
}
