import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Loader2, X } from 'lucide-react';
import { API_URL } from '../config';

export const ProjectChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    {role: 'ai', content: 'Olá! Posso te ajudar a entender os projetos do Thomas. O que gostaria de saber?'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', content: userMsg}]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/public/chat`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {role: 'ai', content: data.reply}]);
    } catch {
      setMessages(prev => [...prev, {role: 'ai', content: 'Desculpe, não consegui processar sua pergunta agora.'}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="p-4 bg-white text-black rounded-full shadow-xl hover:scale-105 transition-transform">
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="w-[350px] h-[500px] bg-[#080808] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold">Assistente de Projetos</h3>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-white/50" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-white/10 ml-auto w-3/4' : 'bg-white/5 w-3/4'}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="p-3 text-white/50 text-sm"><Loader2 className="w-4 h-4 animate-spin inline" /></div>}
          </div>
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Pergunte sobre os projetos..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <button onClick={sendMessage} className="p-2 bg-emerald-500 rounded-lg"><Send className="w-4 h-4" /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
