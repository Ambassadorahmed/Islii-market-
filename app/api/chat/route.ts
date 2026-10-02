export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";
  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return Response.json({ reply: `❌ ERROR: GROQ_API_KEY missing! Vercel Settings -> Env Vars -> Add GROQ_API_KEY -> Redeploy! Current env keys: ${Object.keys(process.env).filter(k=>k.includes('GROQ')).join(',') || 'none'}` });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are Somali IA - Islii Market Eastleigh Jam Street Sawa Mall. Sell perfumes 500-50k KES. WhatsApp 0725723383. Answer in Somali first, friendly, varied, REAL. Never repeat same sentence." },
          { role: "user", content: last }
        ],
        temperature: 0.8,
        max_tokens: 400
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return Response.json({ reply: `Groq API Error ${res.status}: ${JSON.stringify(data)} | Key starts: ${groqKey.substring(0,8)}...` });
    }

    return Response.json({ reply: data.choices?.[0]?.message?.content || "No content from Groq" });

  } catch (e:any) {
    return Response.json({ reply: `Fetch Exception: ${e.message} | Stack: ${e.stack?.slice(0,200)}` });
  }
}
