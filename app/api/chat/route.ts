export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length-1]?.content || "Salaam";

  try {
    // FREE AI - no key needed - answers anything real like Meta AI
    const res = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        messages: [
          {
            role: "system",
            content: `You are Ahmed's Somali IA - Islii Market Eastleigh 24/7 🇸🇴🇰🇪 Jam Street Sawa Mall, Nairobi. You sell 100% original perfumes: Black Car, Lattafa, Oud, Musk. Prices 1500-4500 KES. Taxi & delivery 24/7. WhatsApp 0725723383. Owner Ahmed Abdikani Mohamed. You speak Somali FIRST, friendly, funny, like Meta AI. You answer ANY question real, not just shop - you are smart like ChatGPT but Somali. If user says 【entity-Maya¦canonical_name=Maya】, Hhh, Ok, No, Name, Sodawow, Setahy, Xage, Sxp - reply naturally, don't repeat "waan fahmay". Be human, varied, helpful.`
          },
          { role: "user", content: last }
        ],
        temperature: 0.8,
        max_tokens: 500
      }),
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;

    if (text) {
      return Response.json({ reply: text });
    }
    throw new Error("no text");

  } catch (e) {
    // Fallback smart - not same sentence!
    const low = last.toLowerCase();
    if (low.includes("【entity-maya¦canonical_name=Maya】")) return Response.json({ reply: "【entity-Maya¦canonical_name=Maya】 walaal? 😅 Haa waan fahmay - wax kale ma rabtaa? Perfume ama delivery?" });
    if (low.includes("hhh") || low.includes("lol") || low.includes("haha")) return Response.json({ reply: "Hahaha 😂 Walaal waad qoslisay! Maxaa qosolka keenay? Islii Market ayaa ku jirnaa 24/7!" });
    if (low.includes("ok")) return Response.json({ reply: "Ok walaal! 👍 Haddii wax u baahan tahay iisoo sheeg - WhatsApp 0725723383" });
    if (low.includes("name")) return Response.json({ reply: "Magacaygu waa Ahmed IA - Somali IA of Islii Market! 🇸🇴 Adiga magacaa? Waxaan ahay Islii Market bot - Jam Street Sawa Mall!" });
    if (low.includes("sodawow") || low.includes("sodawoow")) return Response.json({ reply: "Soo dhawoow walaal! 🙏 Islii Market ku soo dhawoow! Jam Street Sawa Mall, Eastleigh - 100% original perfumes!" });
    if (low.includes("setahy") || low.includes("s tahay") || low.includes("sidee")) return Response.json({ reply: "Alhamdulillah waan fiicanahay walaal! 😊 Adiga sidee tahay? Islii Market 24/7 waan joognaa!" });
    if (low.includes("xage") || low.includes("where")) return Response.json({ reply: "Jam Street, Sawa Mall, 1st Floor, Eastleigh, Nairobi! 📍 Open 24/7 - WhatsApp 0725723383" });

    return Response.json({ reply: `Walaal "${last}" - haa waan maqlay! Islii Market 24/7 ayaan joognaa - su'aal kale ma qabtaa?` });
  }
}
