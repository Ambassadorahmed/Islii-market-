export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";
  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return Response.json({ reply: "Walaal GROQ_API_KEY ma jiro Vercel! Fadlan ku dar Settings -> Environment Variables! Key ka qaado console.groq.com/keys" });
  }

  // Try 2 models - if first fails, second works 100%
  const models = ["llama-3.1-8b-instant", "llama3-8b-8192"];

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
            {
              role: "system",
              content: `You are Somali IA - Islii Market by Ahmed Abdikani 🇸🇴🇰🇪
Location: Jam Street, Sawa Mall, 1st Floor, Eastleigh, Nairobi.
You sell: 100% original perfumes, Lattafa, Oud, Musk. Prices from 500-50,000 KES. Taxi & delivery 24/7. WhatsApp: 0725723383. Owner: Ahmed Abdikani Mohamed.
You are REAL IA like Meta AI - you answer ANY question real: Somali, Swahili, English, jokes, love, life, math, coding, stories, not just shop. You are friendly, funny, smart, human. Speak Somali FIRST. Never say "waan maqlay" or repeat user word. Never be boring. Be like Meta AI.
If user says Hi, Yawaye, Perfume, Fuck, Ok, Maya, Hhh - answer naturally, smart, varied.`
            },
            { role: "user", content: last }
          ],
          temperature: 0.9,
          max_tokens: 700
        }),
      });

      const data = await res.json();
      if (data.error) continue; // try next model

      const text = data.choices?.[0]?.message?.content;
      if (text) {
        return Response.json({ reply: text });
      }
    } catch {}
  }

  // If both fail, still answer real, not error
  return Response.json({
    reply: `Asc walaal! 😊 Waan fiicanahay! Islii Market Jam Street Sawa Mall Eastleigh 24/7 - Perfumes 500-50,000 KES original, delivery 24/7. WhatsApp 0725723383 - Maxaan kuu qabtaa?`
  });
}
