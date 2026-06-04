import React from 'react';
import { Search, MoreHorizontal, MessageSquare, Star, Reply } from 'lucide-react';
import { useAdminFetch } from '../../components/admin/useAdminFetch';

export function Messages() {
  const { data: messages, loading, error } = useAdminFetch<any[]>('/messages');
  const rows = Array.isArray(messages) ? messages : [];
  const firstMessage = rows[0] || null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Mensagens</h1>
          <p className="text-zinc-500 text-sm">Comunicação centralizada com clientes e alertas do sistema.</p>
        </div>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden flex flex-col md:flex-row h-[70vh]">
        <div className="w-full md:w-1/3 border-r border-[#222] flex flex-col">
          <div className="p-4 border-b border-[#222]">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Buscar mensagens..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none" />
            </div>
          </div>

          {loading && <div className="p-4 text-sm text-zinc-400">Carregando mensagens...</div>}
          {error && <div className="p-4 text-sm text-red-500">Erro ao carregar mensagens: {error}</div>}

          <div className="overflow-y-auto flex-1">
            {rows.map((message, i) => {
              const time = message.createdAt ? new Date(message.createdAt).toLocaleString('pt-BR') : '-';
              const subject = message.subject || message.content?.slice(0, 40) || 'Sem assunto';
              const snippet = message.content?.slice(0, 80) || '-';
              const isUnread = !message.read;

              return (
                <div key={message.id} className={`p-4 border-b border-[#222] cursor-pointer hover:bg-[#111] transition-colors ${i === 0 ? 'bg-[#111]' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-medium ${isUnread ? 'text-white' : 'text-zinc-400'}`}>{message.senderName || message.client?.name || message.project?.name || 'Sistema'}</span>
                    <span className="text-xs text-zinc-500">{time}</span>
                  </div>
                  <h4 className={`text-xs mb-1 ${isUnread ? 'text-white font-semibold' : 'text-zinc-400'}`}>{subject}</h4>
                  <p className="text-xs text-zinc-500 truncate">{snippet}</p>
                </div>
              );
            })}
            {!loading && rows.length === 0 && (
              <div className="p-4 text-sm text-zinc-500">Nenhuma mensagem disponível.</div>
            )}
          </div>
        </div>

        <div className="hidden md:flex flex-1 flex-col bg-[#050505]">
          <div className="p-6 border-b border-[#222] flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{firstMessage?.subject || 'Selecionar mensagem'}</h2>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="text-white font-medium">{firstMessage?.senderName || firstMessage?.client?.name || 'Sistema'}</span>
                <span>•</span>
                <span>{firstMessage?.createdAt ? new Date(firstMessage.createdAt).toLocaleString('pt-BR') : '-'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-zinc-500 hover:text-amber-500 transition-colors"><Star className="w-5 h-5 fill-amber-500 text-amber-500" /></button>
              <button className="text-zinc-500 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="p-6 flex-1 text-sm text-zinc-300 leading-relaxed space-y-4">
            <p>{firstMessage?.content || 'Selecione uma mensagem à esquerda para ver o conteúdo detalhado.'}</p>
          </div>

          <div className="p-6 border-t border-[#222]">
            <div className="bg-[#111] border border-[#222] rounded-lg p-4">
              <textarea
                className="w-full bg-transparent text-sm text-zinc-300 placeholder:text-zinc-600 resize-none focus:outline-none mb-4"
                rows={3}
                placeholder="Escreva sua resposta..."
              ></textarea>
              <div className="flex justify-between items-center">
                <div className="text-xs text-zinc-500">Pressione Cmd+Enter para enviar</div>
                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
                  <Reply className="w-4 h-4" /> Enviar Resposta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
