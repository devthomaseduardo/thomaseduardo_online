import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import posthog from 'posthog-js';
import { API_URL } from '../config';

export const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/v2/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'site_premium_form' }),
      });

      const text = await res.text();
      let data = { error: 'Falha desconhecida' };
      try {
        data = text ? JSON.parse(text) : data;
      } catch (e) {
        // Not JSON
      }

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      // 🎯 Dispara evento de conversão pro PostHog!
      posthog.capture('lead_generated', {
        source: 'site_premium_form',
        email: form.email,
        name: form.name
      });

      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0A0A0A] border border-[#18181B] rounded-3xl p-12 text-center"
      >
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Mensagem Transmitida</h3>
        <p className="text-zinc-400 leading-relaxed">
          Sua solicitação foi processada. <br />
          Um e-mail de confirmação foi enviado para você. <br />
          Entrarei em contato em breve.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm font-mono text-white hover:text-zinc-400 transition-colors"
        >
          Enviar outra mensagem
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-4">Nome</label>
          <input 
            required
            type="text"
            placeholder="Seu nome"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:bg-white/[0.05] focus:border-white/20 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-4">E-mail</label>
          <input 
            required
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:bg-white/[0.05] focus:border-white/20 transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-4">WhatsApp (Opcional)</label>
        <input 
          type="text"
          placeholder="+55 11 90000-0000"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:bg-white/[0.05] focus:border-white/20 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-4">Como posso ajudar?</label>
        <textarea 
          required
          rows={5}
          placeholder="Descreva seu projeto ou necessidade..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:bg-white/[0.05] focus:border-white/20 transition-all resize-none"
        />
      </div>

      {status === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-rose-400 text-xs font-medium bg-rose-400/5 p-4 rounded-xl border border-rose-400/10"
        >
          <AlertCircle className="w-4 h-4" />
          {errorMsg}
        </motion.div>
      )}

      <button 
        disabled={status === 'loading'}
        type="submit"
        className="w-full group flex items-center justify-center gap-3 bg-white text-black px-8 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-all rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {status === 'loading' ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" /> Transmitindo...
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2"
            >
              Iniciar Conversa <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </form>
  );
};
