import React from 'react';
import { Search, Filter, MoreHorizontal, MessageSquare, Star, Reply } from 'lucide-react';

const mockMessages = [
  { id: '1', sender: 'Carlos Mendes', subject: 'Dúvida sobre a proposta T3RN-004', snippet: 'Olá Thomas, lendo a proposta me surgiu uma dúvida sobre o prazo...', status: 'Unread', time: '10:45 AM', isStarred: true },
  { id: '2', sender: 'Ana Silva', subject: 'Revisão do Layout aprovada', snippet: 'Podemos prosseguir com o desenvolvimento da interface...', status: 'Read', time: 'Ontem', isStarred: false },
  { id: '3', sender: 'Sistema de Deploy', subject: 'Deploy falhou: Indústria BR', snippet: 'Ocorreu um erro ao rodar as migrations de banco de dados...', status: 'Unread', time: '15 Mai', isStarred: true },
  { id: '4', sender: 'LogisTech Suporte', subject: 'Acesso liberado aos servidores', snippet: 'Segue em anexo as credenciais temporárias para o ambiente de...', status: 'Read', time: '12 Mai', isStarred: false },
];

export function Messages() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Mensagens</h1>
          <p className="text-zinc-500 text-sm">Comunicação centralizada com clientes e alertas do sistema.</p>
        </div>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden flex flex-col md:flex-row h-[70vh]">
        
        {/* Sidebar Mensagens */}
        <div className="w-full md:w-1/3 border-r border-[#222] flex flex-col">
          <div className="p-4 border-b border-[#222]">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Buscar mensagens..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {mockMessages.map((m, i) => (
              <div key={m.id} className={`p-4 border-b border-[#222] cursor-pointer hover:bg-[#111] transition-colors ${i === 0 ? 'bg-[#111]' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-medium ${m.status === 'Unread' ? 'text-white' : 'text-zinc-400'}`}>{m.sender}</span>
                  <span className="text-xs text-zinc-500">{m.time}</span>
                </div>
                <h4 className={`text-xs mb-1 ${m.status === 'Unread' ? 'text-white font-semibold' : 'text-zinc-400'}`}>{m.subject}</h4>
                <p className="text-xs text-zinc-500 truncate">{m.snippet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* View Mensagem */}
        <div className="hidden md:flex flex-1 flex-col bg-[#050505]">
          <div className="p-6 border-b border-[#222] flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{mockMessages[0].subject}</h2>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="text-white font-medium">{mockMessages[0].sender}</span>
                <span>•</span>
                <span>{mockMessages[0].time}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-zinc-500 hover:text-amber-500 transition-colors"><Star className="w-5 h-5 fill-amber-500 text-amber-500" /></button>
              <button className="text-zinc-500 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </div>
          
          <div className="p-6 flex-1 text-sm text-zinc-300 leading-relaxed space-y-4">
            <p>Olá Thomas,</p>
            <p>Lendo a proposta me surgiu uma dúvida sobre o prazo de entrega da fase 2. Se anteciparmos a aprovação do design, conseguimos adiantar o deploy em 1 semana?</p>
            <p>Aguardo retorno para seguirmos com a assinatura.</p>
            <p>Abraço,<br/>Carlos Mendes</p>
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
