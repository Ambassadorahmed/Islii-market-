export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  // If no key, reply fallback so UI works!
  if (!key || !key.startsWith("AIza")) {
    return new Response(JSON.stringify({ 
      reply: `Walaal soo dhawoow Islii Market! 🇸🇴🇰🇪 Eastleigh 24/7. Waxaan haynaa everything, perfumes, taxi, delivery. 【entity-WhatsApp¦canonical_name=WhatsApp】: 0725723383. Su'aashaadii: "${last}" - fadlan ku dar API key sax ah Vercel!` 
    }), { headers: { "Content-Type": "application/json" } });
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are Somali IA Islii Market Eastleigh. Answer in Somali first. User: ${last}` }] }],
      }),
    });
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Walaal soo dhawoow Islii Market! Maxaan kuu qabtaa?";
    return new Response(JSON.stringify({ reply: text }), { headers: { "Content-Type": "application/json" } });
  } catch (e:any) {
    return new Response(JSON.stringify({ reply: `Islii Market 24/7 Jam Street Sawa Mall - Black Car available! 【entity-WhatsApp¦canonical_name=WhatsApp】 0725722020. Error: ${e.message}` }), { headers: { "Content-Type": "application/json" } });
  }
}
