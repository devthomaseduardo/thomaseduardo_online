import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Search, Send, RefreshCw, ExternalLink, Clock, CheckCheck, AlertCircle } from "lucide-react";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

export function MensagensModule() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [thread, setThread] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/messages`, { headers: hdrs() });
      if (r.ok) setMessages(await r.json());
    } finally { setLoading(false); }
  };

  const loadThread = async (msg: any) => {
    setSelected(msg);
    setThread([]);
    if (!msg.projectId) { setThread([msg]); return; }
    const r = await fetch(`${API}/projects/${msg.projectId}/messages`, { headers: hdrs() });
    if (r.ok) setThread(await r.json());
    setTimeout(() => threadRef.current?.scrollTo({ top: 99999, behavior: 'smooth' }), 100);
  };

  React.useEffect(() => { load(); }, []);

  const sendReply = async () => {
    if (!reply.trim() || !selected?.projectId) return;
    setSending(true);
    try {
      const r = await fetch(`${API}/projects/${selected.projectId}/messages`, {
        method: 'POST',
        headers: hdrs(),
        body: JSON.stringify({ senderType: 'internal', senderName: 'Admin', content: reply }),
      });
      if (!r.ok) throw new Error((await r.json()).error);
      setReply('');
      loadThread(selected);
      showToast('Mensagem enviada.');
    } catch (e: any) { showToast(e.message); }
    setSending(false);
  };

  const filtered = messages.filter(m =>
    m.senderName?.toLowerCase().includes(search.toLowerCase()) ||
    m.content?.toLowerCase().includes(search.toLowerCase()) ||
    m.project?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-[9999] bg-[#0B0B0B] border border-white/10 px-5 py-3 rounded-xl text-sm text-white shadow-2xl flex items-center gap-3">
            <MessageSquare className="w-4 h-4 text-[#009EE3]" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-8 xl:px-12 py-8 flex items-center justify-between border-b border-white/[0.06] bg-[#050505] shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Central de Mensagens</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Comunicação com Clientes</p>
        </div>
        <button onClick={load} className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
          <RefreshCw className="w-4 h-4 text-white/40" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lista de Conversas */}
        <div className="w-80 shrink-0 border-r border-white/[0.06] flex flex-col bg-[#050505]">
          <div className="p-4 border-b border-white/[0.06]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar conversa..."
                className="w-full bg-[#0B0B0B] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors cursor-text" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/[0.03] rounded-xl animate-pulse" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="w-8 h-8 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">Nenhuma mensagem.</p>
              </div>
            ) : (
              filtered.map(msg => (
                <button key={msg.id} onClick={() => loadThread(msg)}
                  className={`w-full p-4 text-left border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors cursor-pointer ${selected?.id === msg.id ? 'bg-white/[0.05] border-l-2 border-l-[#009EE3]' : ''}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-medium truncate ${!msg.read ? 'text-white' : 'text-white/60'}`}>
                      {msg.senderName || msg.client?.name || msg.project?.name || 'Sistema'}
                    </p>
                    <span className="text-[10px] text-white/30 font-mono shrink-0">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('pt-BR') : ''}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 truncate">{msg.project?.name && <span className="text-[#009EE3]/60">[{msg.project.name}] </span>}{msg.content}</p>
                  {!msg.read && <div className="w-2 h-2 rounded-full bg-[#009EE3] mt-2" />}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Thread/Detalhes */}
        {selected ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#070707]">
            {/* Thread Header */}
            <div className="p-6 border-b border-white/[0.06] flex items-center justify-between shrink-0">
              <div>
                <p className="text-white font-semibold">{selected.senderName || selected.client?.name || 'Sistema'}</p>
                <p className="text-white/40 text-xs font-mono">{selected.project?.name ? `Projeto: ${selected.project.name}` : 'Mensagem direta'}</p>
              </div>
              {selected.project?.name && (
                <a href="#" className="flex items-center gap-1.5 text-xs text-[#009EE3] hover:underline cursor-pointer">
                  Ver projeto <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Messages */}
            <div ref={threadRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {thread.map(m => {
                const isAdmin = m.senderType === 'internal';
                return (
                  <div key={m.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${isAdmin ? 'bg-white text-black' : 'bg-white/[0.06] text-white border border-white/[0.06]'}`}>
                      {!isAdmin && <p className="text-[10px] font-mono text-white/40 mb-1">{m.senderName || 'Cliente'}</p>}
                      <p>{m.content}</p>
                      <p className={`text-[10px] mt-1 ${isAdmin ? 'text-black/30' : 'text-white/30'}`}>
                        {new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        {isAdmin && <CheckCheck className="inline w-3 h-3 ml-1" />}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Box */}
            {selected.projectId ? (
              <div className="p-6 border-t border-white/[0.06] shrink-0">
                <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-xl p-4">
                  <textarea value={reply} onChange={e => setReply(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) sendReply(); }}
                    placeholder="Escreva sua resposta... (Ctrl+Enter para enviar)" rows={3}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/20 resize-none outline-none cursor-text" />
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[10px] text-white/20 font-mono">Ctrl+Enter · Enviar</span>
                    <button onClick={sendReply} disabled={sending || !reply.trim()}
                      className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-40 cursor-pointer">
                      <Send className="w-3.5 h-3.5" /> {sending ? 'Enviando...' : 'Responder'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 border-t border-white/[0.06] shrink-0">
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <AlertCircle className="w-4 h-4" /> Esta mensagem não está vinculada a um projeto.
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#070707]">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/30 text-sm">Selecione uma conversa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
