import React, { useState } from "react";
import { motion } from "motion/react";
import {
  LayoutGrid, Layers, Users, FileText, CreditCard, GitBranch,
  MessageSquare, Settings, Search, Bell, Shield, Star,
  TrendingUp, TrendingDown, Upload, Check, ChevronRight, ArrowRight, Zap
} from "lucide-react";
import adminHero from "../assets/admin-hero.png";

const NAV = [
  { id:"overview",    label:"Overview",    icon:LayoutGrid   },
  { id:"projects",    label:"Projects",    icon:Layers       },
  { id:"clients",     label:"Clients",     icon:Users        },
  { id:"proposals",   label:"Proposals",   icon:FileText     },
  { id:"financial",   label:"Financial",   icon:CreditCard   },
  { id:"contracts",   label:"Contracts",   icon:Shield       },
  { id:"deployments", label:"Deployments", icon:GitBranch    },
  { id:"leads",       label:"Leads",       icon:Star         },
  { id:"messages",    label:"Messages",    icon:MessageSquare},
  { id:"team",        label:"Team",        icon:Users        },
  { id:"settings",    label:"Settings",    icon:Settings     },
];

const KPIS = [
  { label:"Active Projects",  value:"7",       trend:"+2",   up:true,  icon:Layers      },
  { label:"Monthly Revenue",  value:"R$18.5k", trend:"+18%", up:true,  icon:TrendingUp  },
  { label:"Pending Revenue",  value:"R$34.2k", trend:"+12%", up:true,  icon:CreditCard  },
  { label:"Open Proposals",   value:"4",       trend:"-1",   up:false, icon:FileText    },
  { label:"Deployments",      value:"23",      trend:"+5",   up:true,  icon:GitBranch   },
  { label:"Active Clients",   value:"11",      trend:"+3",   up:true,  icon:Users       },
];

const FEED = [
  { icon:Upload,       label:"Material submitted",  client:"Sleep House",   time:"2m ago",  color:"text-sky-400"     },
  { icon:CreditCard,   label:"Payment confirmed",   client:"Portal Nexio",  time:"3h ago",  color:"text-emerald-400" },
  { icon:GitBranch,    label:"Deploy completed",    client:"Sleep House",   time:"5h ago",  color:"text-violet-400"  },
  { icon:Check,        label:"Proposal approved",   client:"Homma Design",  time:"8h ago",  color:"text-emerald-400" },
  { icon:Star,         label:"Lead received",       client:"Via WhatsApp",  time:"1d ago",  color:"text-amber-400"   },
  { icon:Shield,       label:"Contract signed",     client:"Pixel Labs",    time:"1d ago",  color:"text-white"       },
];

const PROJECTS = [
  { name:"Sleep House Campinas", stage:"Development", progress:72, status:"Active",   color:"bg-emerald-400", rev:"R$4.9k", due:"Jun 20" },
  { name:"Homma Design System",  stage:"Review",      progress:91, status:"Review",   color:"bg-amber-400",   rev:"R$7.2k", due:"Jun 10" },
  { name:"Portal Nexio",         stage:"Dev",         progress:38, status:"Dev",      color:"bg-sky-400",     rev:"R$12k",  due:"Jul 15" },
  { name:"Pixel Labs Platform",  stage:"Planning",    progress:15, status:"Planning", color:"bg-violet-400",  rev:"R$9.5k", due:"Aug 1"  },
];

const DEADLINES = [
  { project:"Homma Design System",  due:"Jun 10", days:6,  urgent:true  },
  { project:"Sleep House Campinas", due:"Jun 20", days:16, urgent:false },
  { project:"Portal Nexio",         due:"Jul 15", days:41, urgent:false },
];

const MONTHS = ["J","F","M","A","M","J"];
const BARS   = [38, 52, 47, 68, 72, 90];

import { RotatingText } from "../components/RotatingText";

export default function AdminDashboard() {
  const [active, setActive] = useState("overview");

  return (
    <div className="h-screen bg-[#060606] text-[#e0e0e0] font-sans flex overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className="w-[220px] shrink-0 border-r border-white/[0.05] flex flex-col bg-[#060606]">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/[0.05] shrink-0">
          <div className="w-7 h-7 flex items-center justify-center rounded-sm shrink-0">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="block text-[12px] font-semibold leading-none"><RotatingText /></span>
            <span className="block text-[9px] font-mono text-white/20 uppercase tracking-wider mt-0.5">Dev de Software</span>
          </div>
        </div>

        {/* Label */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/15">Centro de Operações</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5">
          {NAV.map(n => {
            const Icon = n.icon;
            const on = active === n.id;
            return (
              <button key={n.id} onClick={() => setActive(n.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-all text-left ${on ? "bg-white/[0.08] text-white font-medium" : "text-white/30 hover:text-white/60 hover:bg-white/[0.03]"}`}>
                <Icon className={`w-3.5 h-3.5 shrink-0 ${on ? "text-white" : "text-white/20"}`} />
                {n.label}
                {n.id === "messages" && <span className="ml-auto text-[9px] bg-white text-black font-bold px-1.5 py-0.5 rounded-sm">3</span>}
              </button>
            );
          })}
        </nav>

        {/* Plan card */}
        <div className="mx-3 mb-3 p-3 border border-white/[0.07] bg-[#0a0a0a] rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Studio Pro</span>
          </div>
          <p className="text-[10px] text-white/20 leading-relaxed">Todos os módulos ativos</p>
        </div>

        {/* Profile */}
        <div className="p-3 border-t border-white/[0.05] shrink-0">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.03] cursor-pointer transition-all">
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-medium truncate"><RotatingText /></span>
              <span className="block text-[9px] text-white/25 font-mono">Admin</span>
            </div>
            <ChevronRight className="w-3 h-3 text-white/20" />
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Nav */}
        <header className="h-16 border-b border-white/[0.05] flex items-center gap-3 px-6 bg-[#060606] shrink-0">
          <div className="flex items-center gap-2 bg-[#0c0c0c] border border-white/[0.07] rounded-xl px-3 py-2 w-56">
            <Search className="w-3.5 h-3.5 text-white/20 shrink-0" />
            <input placeholder="Buscar operação..." className="bg-transparent text-[12px] text-white placeholder:text-white/20 focus:outline-none w-full" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            {[
              { l:"New Client",   icon:Users    },
              { l:"New Proposal", icon:FileText },
              { l:"New Project",  icon:Layers   },
            ].map(q => {
              const Icon = q.icon;
              return (
                <button key={q.l} className="flex items-center gap-1.5 px-3 py-2 border border-white/[0.07] hover:border-white/[0.14] text-white/30 hover:text-white/60 text-[10px] font-mono rounded-lg transition-all">
                  <Icon className="w-3 h-3" />{q.l}
                </button>
              );
            })}
            <button className="relative w-9 h-9 flex items-center justify-center border border-white/[0.07] rounded-lg hover:border-white/[0.14] transition-all">
              <Bell className="w-4 h-4 text-white/30" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full" />
            </button>
          </div>
        </header>

        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto">

          {/* ── HERO with BG image ── */}
          <section className="relative overflow-hidden border-b border-white/[0.05] min-h-[160px] flex items-center">
            <img src={adminHero} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/80 to-transparent" />
            <div className="relative z-10 px-8 py-10">
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 block mb-2">
                  {new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}
                </span>
                <h1 className="text-[clamp(28px,3.5vw,52px)] font-bold tracking-tighter leading-none mb-1">Bom dia, Thomas.</h1>
                <p className="text-[13px] text-white/30">Sua operação está ativa. <span className="text-emerald-400 font-medium">7 projetos em execução.</span></p>
              </motion.div>
            </div>
          </section>

          {/* ── KPI GRID ── */}
          <section className="px-8 py-6 border-b border-white/[0.05]">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              {KPIS.map((k,i) => {
                const Icon = k.icon;
                return (
                  <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                    className="p-5 border border-white/[0.07] bg-[#0a0a0a] rounded-xl hover:border-white/[0.12] transition-all group">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-4 h-4 text-white/20" />
                      <span className={`text-[10px] font-mono flex items-center gap-0.5 ${k.up ? "text-emerald-400" : "text-red-400"}`}>
                        {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{k.trend}
                      </span>
                    </div>
                    <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-white/20 mb-1">{k.label}</span>
                    <span className="block text-[26px] font-bold tracking-tighter leading-none">{k.value}</span>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── CONTENT GRID ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] divide-x divide-white/[0.05]">

            {/* LEFT */}
            <div className="divide-y divide-white/[0.05]">

              {/* Active Projects */}
              <section className="px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25">Active Projects</span>
                  <button className="text-[9px] font-mono text-white/20 hover:text-white/50 flex items-center gap-1 transition-colors">All <ChevronRight className="w-3 h-3" /></button>
                </div>
                <div className="space-y-2">
                  {PROJECTS.map((p,i) => (
                    <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.06 }}
                      className="flex items-center gap-4 p-4 border border-white/[0.07] bg-[#0a0a0a] rounded-xl hover:border-white/[0.14] transition-all group">
                      <div className={`w-1.5 h-10 rounded-full shrink-0 ${p.color} opacity-70`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[13px] font-semibold truncate">{p.name}</span>
                          <span className="text-[9px] font-mono text-white/30 shrink-0">{p.stage}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-0.5 bg-white/[0.05] rounded-full overflow-hidden">
                            <motion.div className={`h-full ${p.color} rounded-full`} initial={{ width:0 }} animate={{ width:`${p.progress}%` }} transition={{ delay:i*0.1+0.3, duration:0.8 }} />
                          </div>
                          <span className="text-[10px] font-mono text-white/25 shrink-0">{p.progress}%</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[12px] font-bold">{p.rev}</span>
                        <span className="block text-[10px] font-mono text-white/25">{p.due}</span>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2.5 py-1.5 border border-white/[0.1] rounded-lg text-[10px] font-mono text-white/40 hover:text-white shrink-0 transition-all">
                        Open <ArrowRight className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Revenue + Proposals */}
              <section className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25">Revenue</span>
                    <span className="text-[10px] font-mono text-emerald-400">+18% MoM</span>
                  </div>
                  <div className="p-5 border border-white/[0.07] bg-[#0a0a0a] rounded-xl">
                    <span className="block text-[28px] font-bold tracking-tighter mb-1">R$18.5k</span>
                    <span className="block text-[10px] text-white/25 font-mono mb-4">Junho 2025</span>
                    <div className="flex items-end gap-1.5 h-16">
                      {BARS.map((h,i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div initial={{ height:0 }} animate={{ height:`${h}%` }} transition={{ delay:i*0.08+0.4, duration:0.6 }}
                            className={`w-full rounded-sm ${i===5 ? "bg-white" : "bg-white/[0.08]"}`} />
                          <span className="text-[8px] font-mono text-white/15">{MONTHS[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[{l:"Paid",v:"R$82k",c:"text-white"},{l:"Pending",v:"R$34k",c:"text-amber-400"},{l:"Forecast",v:"R$21k",c:"text-sky-400"}].map(f=>(
                      <div key={f.l} className="p-3 border border-white/[0.06] bg-[#0a0a0a] rounded-xl text-center">
                        <span className={`block text-[15px] font-bold ${f.c}`}>{f.v}</span>
                        <span className="block text-[9px] font-mono text-white/20 mt-0.5">{f.l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proposals donut */}
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25 block mb-4">Proposals</span>
                  <div className="p-5 border border-white/[0.07] bg-[#0a0a0a] rounded-xl flex flex-col items-center">
                    {/* SVG donut */}
                    <div className="relative w-28 h-28 mb-4">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="74 26" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="16 84" strokeDashoffset="-74" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[22px] font-bold leading-none">74%</span>
                        <span className="text-[9px] font-mono text-white/25">CVR</span>
                      </div>
                    </div>
                    <div className="w-full space-y-2">
                      {[{l:"Approved",v:"6",c:"bg-emerald-400"},{l:"Pending",v:"4",c:"bg-amber-400"},{l:"Rejected",v:"2",c:"bg-red-400"}].map(s=>(
                        <div key={s.l} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${s.c}`} />
                          <span className="text-[11px] text-white/40 flex-1">{s.l}</span>
                          <span className="text-[12px] font-bold">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Deadlines */}
              <section className="px-8 py-6">
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25 block mb-4">Upcoming Deadlines</span>
                <div className="space-y-2">
                  {DEADLINES.map((d,i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 border rounded-xl transition-all ${d.urgent ? "border-red-500/20 bg-red-500/[0.04]" : "border-white/[0.07] bg-[#0a0a0a]"}`}>
                      <div className={`text-center shrink-0 w-10 ${d.urgent ? "text-red-400" : "text-white/40"}`}>
                        <span className="block text-[20px] font-bold leading-none">{d.days}</span>
                        <span className="block text-[9px] font-mono">days</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[13px] font-medium truncate">{d.project}</span>
                        <span className="block text-[10px] font-mono text-white/25">Due {d.due}</span>
                      </div>
                      {d.urgent && <span className="text-[9px] font-mono text-red-400 border border-red-500/20 px-2 py-0.5 rounded shrink-0">URGENT</span>}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT — Feed */}
            <div className="px-5 py-6 flex flex-col gap-6">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25 block mb-5">Operations Feed</span>
                {FEED.map((f,i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div key={i} initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.06 }}
                      className="flex gap-3 pb-4">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-lg border border-white/[0.07] bg-white/[0.02] flex items-center justify-center shrink-0">
                          <Icon className={`w-3.5 h-3.5 ${f.color}`} />
                        </div>
                        {i < FEED.length-1 && <div className="w-px flex-1 bg-white/[0.04] my-1" />}
                      </div>
                      <div className="pt-1">
                        <span className="block text-[12px] font-medium">{f.label}</span>
                        <span className="block text-[11px] text-white/25">{f.client}</span>
                        <span className="block text-[9px] font-mono text-white/15 mt-0.5">{f.time}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Leads mini */}
              <div className="border-t border-white/[0.05] pt-5">
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25 block mb-3">Leads Recentes</span>
                {[{src:"WhatsApp",score:92,hot:true},{src:"Instagram",score:74,hot:false},{src:"Website",score:61,hot:false},{src:"Referral",score:88,hot:true}].map((l,i)=>(
                  <div key={i} className="flex items-center gap-2 mb-2 px-3 py-2.5 border border-white/[0.06] bg-[#0a0a0a] rounded-xl">
                    <span className="text-[11px] text-white/40 flex-1">{l.src}</span>
                    <span className={`text-[9px] font-mono ${l.hot?"text-red-400":"text-amber-400"}`}>{l.hot?"Hot":"Warm"}</span>
                    <span className="text-[11px] font-bold w-6 text-right">{l.score}</span>
                  </div>
                ))}
              </div>

              {/* Deploy status */}
              <div className="border-t border-white/[0.05] pt-5">
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25 block mb-3">Deploy Status</span>
                {[{env:"Production",url:"sleep-house.vercel.app",ok:true},{env:"Staging",url:"portal-nexio.vercel.app",ok:true},{env:"Dev",url:"pixel-labs-dev",ok:false}].map((d,i)=>(
                  <div key={i} className="flex items-center gap-2 mb-2 px-3 py-2.5 border border-white/[0.06] bg-[#0a0a0a] rounded-xl">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.ok?"bg-emerald-400":"bg-amber-400"} animate-pulse`} />
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] font-mono text-white/40 truncate">{d.url}</span>
                      <span className="block text-[9px] font-mono text-white/20">{d.env}</span>
                    </div>
                    <span className={`text-[9px] font-mono ${d.ok?"text-emerald-400":"text-amber-400"}`}>{d.ok?"Live":"Build"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
