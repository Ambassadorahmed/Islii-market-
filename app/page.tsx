'use client';
import { useChat } from 'ai/react';
export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <main style={{maxWidth:600, margin:'0 auto', padding:20}}>
      <h1>🇸🇴 Somali IA - Islii Market 🇰🇪</h1>
      <p>Eastleigh 24/7 - Perfumes, Taxi, Delivery</p>
      <div style={{border:'1px solid #ddd', height:420, overflowY:'auto', padding:10, borderRadius:12}}>
        {messages.length===0 && <p>Walaal soo dhawoow! Weydii: Qiimaha Black Car? Taxi book? Delivery?</p>}
        {messages.map(m=>(
          <div key={m.id} style={{margin:'12px 0', textAlign: m.role==='user'?'right':'left', background: m.role==='user'?'#e0f2ff':'#f5f5f5', padding:8, borderRadius:8}}>
            <b>{m.role==='user'?'You':'IA'}:</b> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{display:'flex', gap:8, marginTop:12}}>
        <input value={input} onChange={handleInputChange} placeholder="Qor: Haye, Mambo, Black Car price?" style={{flex:1, padding:12, borderRadius:8, border:'1px solid #ccc'}} />
        <button style={{padding:'12px 18px', background:'black', color:'white', borderRadius:8}}>Dir</button>
      </form>
      <a href="https://wa.me/254725722020" style={{display:'block', textAlign:'center', background:'#25D366', color:'white', padding:12, borderRadius:8, marginTop:12, textDecoration:'none'}}>WhatsApp: 0725722020</a>
      <p style={{fontSize:11, textAlign:'center', marginTop:10}}>Jam Street, Sawa Mall, Eastleigh | 100% Original | Ahmed Perfumes</p>
    </main>
  );
}
