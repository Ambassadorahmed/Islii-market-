"use client";
import { useState } from "react";

export default function Page() {
  const [msgs, setMsgs] = useState<{role:string, text:string}[]>([]);
  const [input, setInput] = useState("");

  async function send() {
    if(!input.trim()) return;
    const userMsg = {role:"You", text:input};
    setMsgs(m=>[...m, userMsg]);
    const toSend = input;
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ messages: [{role:"user", content: toSend}] }),
      });
      const data = await res.json();
      setMsgs(m=>[...m, {role:"Bot", text: data.reply || data.text || "Walaal soo dhawoow Islii Market!"}]);
    } catch(e:any){
      setMsgs(m=>[...m, {role:"Bot", text: "Islii Market 24/7 Jam Street Sawa Mall - WhatsApp 0725722020"}]);
    }
  }

  return (
    <main style={{padding:20, maxWidth:600, margin:"0 auto", fontFamily:"sans-serif"}}>
      <h1>🇸🇴 Somali IA - Eastleigh Market 🇰🇪</h1>
      <p>Eastleigh 24/7 - Perfumes, Taxi, Delivery</p>
      <div style={{border:"1px solid #ccc", borderRadius:12, minHeight:300, padding:10, margin:"10px 0"}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{background: m.role==="You"?"#dbeafe":"#dcfce7", padding:8, borderRadius:12, margin:"6px 0", textAlign: m.role==="You"?"right":"left"}}>
            <b>{m.role}:</b> {m.text}
          </div>
        ))}
      </div>
      <div style={{display:"flex", gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Write: Hey, Mambo, Black Car price?" style={{flex:1, padding:12, borderRadius:8, border:"1px solid #ccc"}}/>
        <button onClick={send} style={{background:"black", color:"white", padding:"0 20px", borderRadius:8}}>Send</button>
      </div>
      <a href="https://wa.me/254725722020" style={{display:"block", background:"#25D366", color:"white", textAlign:"center", padding:12, borderRadius:8, marginTop:12, textDecoration:"none"}}>WhatsApp: 0725723383</a>
      <p style={{fontSize:12, textAlign:"center", marginTop:8}}>Jam Street, Sawa Mall, Eastleigh | 100% Original | Ahmed Perfumes</p>
    </main>
  );
}
