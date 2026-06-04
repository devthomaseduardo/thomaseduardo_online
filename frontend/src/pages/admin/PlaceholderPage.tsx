import React from 'react';

export function PlaceholderPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
      
      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-full bg-[#222]" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Módulo em Construção</h3>
        <p className="text-zinc-400 max-w-md">
          A interface de {title.toLowerCase()} está sendo estruturada para fornecer a melhor experiência operacional.
        </p>
      </div>
    </div>
  );
}
