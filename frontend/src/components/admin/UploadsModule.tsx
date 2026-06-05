import React, { useState } from "react";
import { UploadCloud, Folder, File, Download, Image as ImageIcon, FileText, Search, Database, HardDrive, Share2 } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

export function UploadsModule() {
  const { projects: data, loading } = useAdminData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'images', 'docs'

  const allFiles = data.flatMap(p => (p.files ?? []).map((f: any) => ({ ...f, project: p })))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  let filtered = allFiles.filter(f => {
    const isImg = f.url?.endsWith(".png") || f.url?.endsWith(".jpg") || f.url?.endsWith(".webp");
    if (filter === 'images') return isImg;
    if (filter === 'docs') return !isImg;
    return true;
  });

  if (search) {
    filtered = filtered.filter(f => 
      f.filename?.toLowerCase().includes(search.toLowerCase()) || 
      f.project?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="w-full py-10 px-6 md:px-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Drive & Assets</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Armazenamento Centralizado</p>
        </div>
        <label className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0 cursor-pointer">
          <UploadCloud className="w-4 h-4" /> Novo Upload
          <input type="file" className="hidden" />
        </label>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Col: Storage KPIs & Upload Zone (1 Col) */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2"><HardDrive className="w-4 h-4" /> Uso de Armazenamento</h3>
            
            <div className="mb-6">
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold tracking-tight text-white">4.2<span className="text-lg text-white/40">GB</span></span>
                <span className="text-[10px] font-mono text-white/40">de 10GB</span>
              </div>
              <div className="h-2 bg-[#050505] rounded-full overflow-hidden border border-white/[0.04]">
                <div className="h-full bg-gradient-to-r from-[#009EE3] to-purple-500 rounded-full w-[42%]" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#009EE3]" /><span className="text-white/70">Imagens</span></div>
                <span className="text-white font-mono">2.1 GB</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /><span className="text-white/70">Documentos</span></div>
                <span className="text-white font-mono">1.8 GB</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-white/70">Outros</span></div>
                <span className="text-white font-mono">300 MB</span>
              </div>
            </div>
          </div>

          {/* Quick Drop Zone */}
          <div className="bg-gradient-to-br from-white/[0.02] to-[#050505] border border-white/[0.06] border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#009EE3]/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-[#050505] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xl">
              <UploadCloud className="w-5 h-5 text-[#009EE3]" />
            </div>
            <p className="text-sm font-medium text-white/90 mb-1">Arraste arquivos aqui</p>
            <p className="text-[10px] font-mono text-white/40">Imagens, vídeos e PDFs</p>
          </div>
        </div>

        {/* Right Col: Explorer (3 Cols) */}
        <div className="lg:col-span-3 bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col min-h-[600px]">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 bg-[#050505]">
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {[
                { id: 'all', label: 'Todos os Arquivos', icon: Database },
                { id: 'images', label: 'Imagens & Mídia', icon: ImageIcon },
                { id: 'docs', label: 'Documentos', icon: FileText },
              ].map(t => (
                <button key={t.id} onClick={() => setFilter(t.id)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-colors shrink-0 flex items-center gap-2 ${
                    filter === t.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}>
                  <t.icon className="w-3.5 h-3.5" /> {t.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar arquivo..."
                className="w-full bg-[#0B0B0B] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
            </div>
          </div>

          {/* Grid de Arquivos */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center h-full text-white/20 font-mono text-xs">Carregando cofre...</div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Folder className="w-10 h-10 text-white/10 mb-3" />
                <p className="text-white/40 text-sm">Nenhum arquivo encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(f => {
                  const isImg = f.url?.endsWith(".png") || f.url?.endsWith(".jpg") || f.url?.endsWith(".webp");
                  return (
                    <div key={f.id} className="bg-[#050505] border border-white/[0.06] rounded-xl overflow-hidden group hover:border-white/[0.15] transition-all flex flex-col">
                      <div className="w-full aspect-[4/3] bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden">
                        {isImg ? (
                          <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url(${f.url})` }} />
                        ) : (
                          <FileText className="w-8 h-8 text-white/10 group-hover:text-white/30 transition-colors" />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"><Download className="w-4 h-4" /></button>
                          <button className="w-8 h-8 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"><Share2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium text-white/90 truncate mb-1" title={f.filename || "Arquivo Sem Nome"}>{f.filename || "Arquivo Sem Nome"}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] font-mono text-white/40 truncate pr-2">{f.project?.name || "Global"}</p>
                          <p className="text-[9px] font-mono text-white/20 shrink-0">{new Date(f.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
