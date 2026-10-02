export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = (messages[messages.length-1]?.content || "").toLowerCase();

  let reply = "";

  if (last.includes("asc") || last.includes("salaam") || last.includes("setahy") || last.includes("sxp") || last.includes("hi") || last.includes("hey")) {
    const replies = [
      "Asc walaal! 🙏 Waan fiicanahay alhamdulillah! Adiga sidee tahay? Islii Market 24/7 waan joognaa!",
      "Wa Alaikum Salaam walaal! Walaal soo dhawoow Islii Market! Jam Street Sawa Mall! Maxaan kuu qabtaa?",
      "Sxp walaal! 😊 Alhamdulillah waan fiicanahay! Eastleigh 24/7 ayaan joognaa - perfume ama Black Car ma rabtaa?"
    ];
    reply = replies[Math.floor(Math.random()*replies.length)];
  } else if (last.includes("xage") || last.includes("where") || last.includes("location")) {
    reply = "I'm ahmed IA of Islii market 🇸🇴 🇰🇪 Jam Street, Sawa Mall, Eastleigh, Nairobi! Selling 100% Original Perfumes - Ahmed Perfumes. WhatsApp: 0725723383 - 24/7 open! 📍";
  } else if (last.includes("perfume") || last.includes("car") || last.includes("udgoon") || last.includes("price") || last.includes("qiimo")) {
    reply = "Haa walaal! Black Car, Lattafa, Oud, Musk 100% original waan haynaa! Qiimo: 1500-4500 KES. Sawa Mall shop kayga kaalay ama WhatsApp 0725723383 - delivery Nairobi oo dhan! 🌸";
  } else if (last.includes("taxi") || last.includes("delivery") || last.includes("geyn")) {
    reply = "Haa walaal taxi & delivery 24/7 waan haynaa Eastleigh! Nairobi oo dhan waan geynaa! WhatsApp 0725723383 - Ahmed ayaa ku qaabilaya!";
  } else {
    reply = `Walaal "${last}" - waan fahmay! 🙏 Islii Market 24/7 Jam Street Sawa Mall ayaan joognaa - ask me anything & perfumes original. Su'aal kale ma qabtaa? WhatsApp: 0725723383`;
  }

  return Response.json({ reply });
}
