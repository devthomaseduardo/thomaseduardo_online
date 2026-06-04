import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutGrid, FolderKanban, Users, FileText, DollarSign, 
  PenTool, Rocket, HardDrive, Filter, MessageSquare, 
  Settings, UploadCloud, Search, CheckCircle2, Clock, 
  MoreVertical, File as FileIcon, Image as ImageIcon,
  Video, FileCode, Check, X, Shield, Lock, Eye
} from "lucide-react";
import { RotatingText } from "../components/RotatingText";

// --- TYPES ---
type Role = "ADMIN" | "CLIENT";
type Status = "PENDING" | "RECEIVED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
type Category = "BRAND_ASSETS" | "CONTENT" | "IMAGES" | "VIDEOS" | "DOCUMENTS" | "CREDENTIALS" | "REFERENCES" | "CONTRACTS" | "OTHER";

interface Material {
  id: string;
  projectId: string;
  clientId: string;
  name: string;
  description: string;
  fileSize: string;
  fileType: string;
  category: Category;
  status: Status;
  uploadedBy: string;
  uploadDate: string;
}

// --- MOCK DATA ---
const MOCK_MATERIALS: Material[] = [
  {
    id: "m1",
    projectId: "prj_001",
    clientId: "cli_001",
    name: "Brand_Guidelines_V2.pdf",
    description: "Official brand guidelines including colors and typography.",
    fileSize: "4.2 MB",
    fileType: "PDF",
    category: "BRAND_ASSETS",
    status: "APPROVED",
    uploadedBy: "Client Corp",
    uploadDate: "Oct 12, 2026",
  },
  {
    id: "m2",
    projectId: "prj_001",
    clientId: "cli_001",
    name: "Hero_Background.mp4",
    description: "Main background loop for the landing page hero section.",
    fileSize: "18.5 MB",
    fileType: "MP4",
    category: "VIDEOS",
    status: "UNDER_REVIEW",
    uploadedBy: "Client Corp",
    uploadDate: "Oct 14, 2026",
  },
  {
    id: "m3",
    projectId: "prj_001",
    clientId: "cli_001",
    name: "API_Credentials.docx",
    description: "Stripe and AWS access keys (encrypted).",
    fileSize: "12 KB",
    fileType: "DOCX",
    category: "CREDENTIALS",
    status: "PENDING",
    uploadedBy: "System",
    uploadDate: "-",
  },
  {
    id: "m4",
    projectId: "prj_001",
    clientId: "cli_001",
    name: "Product_Photos.zip",
    description: "High-res images for the catalog.",
    fileSize: "142 MB",
    fileType: "ZIP",
    category: "IMAGES",
    status: "RECEIVED",
    uploadedBy: "Client Corp",
    uploadDate: "Oct 15, 2026",
  }
];

const WORKFLOW_STEPS = [
  { num: "01", title: "Brand Assets", status: "COMPLETED", files: 3, pending: 0 },
  { num: "02", title: "Content", status: "IN_PROGRESS", files: 2, pending: 1 },
  { num: "03", title: "Media", status: "IN_PROGRESS", files: 4, pending: 2 },
  { num: "04", title: "Technical Assets", status: "PENDING", files: 0, pending: 3 },
  { num: "05", title: "Approval", status: "PENDING", files: 0, pending: 0 },
  { num: "06", title: "Development Ready", status: "PENDING", files: 0, pending: 0 },
];

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Overview", id: "overview" },
  { icon: FolderKanban, label: "Projects", id: "projects" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: FileText, label: "Proposals", id: "proposals" },
  { icon: DollarSign, label: "Financial", id: "financial" },
  { icon: PenTool, label: "Contracts", id: "contracts" },
  { icon: Rocket, label: "Deployments", id: "deployments" },
  { icon: HardDrive, label: "Materials", id: "materials", active: true },
  { icon: Filter, label: "Leads", id: "leads" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
  { icon: Users, label: "Team", id: "team" },
  { icon: Settings, label: "Settings", id: "settings" },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: Status }) => {
  const styles: Record<Status, string> = {
    PENDING: "bg-[#111111] text-white/50 border border-white/10",
    RECEIVED: "bg-[#111111] text-blue-400 border border-blue-500/20",
    UNDER_REVIEW: "bg-[#111111] text-amber-400 border border-amber-500/20",
    APPROVED: "bg-[#111111] text-emerald-400 border border-emerald-500/20",
    REJECTED: "bg-[#111111] text-red-400 border border-red-500/20",
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-mono tracking-wider font-semibold uppercase ${styles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
};

const FileIconForType = ({ type }: { type: string }) => {
  switch (type) {
    case 'PDF': return <FileText className="w-4 h-4" />;
    case 'MP4':
    case 'MOV': return <Video className="w-4 h-4" />;
    case 'ZIP': return <FileCode className="w-4 h-4" />;
    case 'JPG':
    case 'PNG':
    case 'WEBP':
    case 'SVG': return <ImageIcon className="w-4 h-4" />;
    default: return <FileIcon className="w-4 h-4" />;
  }
};

export default function ProjectMaterials() {
  const [role, setRole] = useState<Role>("ADMIN");
  const [materials, setMaterials] = useState<Material[]>(MOCK_MATERIALS);
  const [search, setSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Stats calculation
  const totalFiles = materials.length;
  const approvedFiles = materials.filter(m => m.status === "APPROVED").length;
  const pendingFiles = materials.filter(m => m.status === "PENDING" || m.status === "UNDER_REVIEW").length;
  const completionPct = totalFiles > 0 ? Math.round((approvedFiles / totalFiles) * 100) : 0;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Real implementation would handle e.dataTransfer.files
    console.log("Files dropped");
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white/20 flex">
      {/* SIDEBAR */}
      <aside className="w-[260px] flex-shrink-0 border-r border-[#111111] bg-[#050505] flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-[#111111] flex items-center gap-3">
          <div className="w-10 h-10 rounded-none bg-[#111111] overflow-hidden border border-white/10">
            <img src="/avatar.webp" alt="Thomas Eduardo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-white tracking-tight"><RotatingText /></h2>
            <p className="text-[11px] text-white/50 font-mono">Software Engineer</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`flex items-center gap-3 px-3 py-2 text-[13px] transition-all rounded-[6px] ${item.active ? 'bg-[#111111] text-white font-medium' : 'text-white/50 hover:text-white hover:bg-[#0B0B0B]'}`}
              >
                <Icon className="w-4 h-4" strokeWidth={item.active ? 2 : 1.5} />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Role Toggle for Demo */}
        <div className="p-4 border-t border-[#111111]">
          <div className="bg-[#0B0B0B] p-1 rounded-[6px] flex text-[11px] font-mono border border-white/5">
            <button 
              onClick={() => setRole("ADMIN")}
              className={`flex-1 py-1.5 rounded-[4px] transition-colors ${role === "ADMIN" ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white'}`}
            >
              ADMIN
            </button>
            <button 
              onClick={() => setRole("CLIENT")}
              className={`flex-1 py-1.5 rounded-[4px] transition-colors ${role === "CLIENT" ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white'}`}
            >
              CLIENT
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 overflow-y-auto h-screen bg-[#000000]">
        <div className="max-w-[1400px] mx-auto p-8 md:p-12 lg:p-16">
          
          {/* HEADER / HERO */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-white/10 rounded-full mb-6">
              <Shield className="w-3 h-3 text-white/50" />
              <span className="text-[10px] uppercase tracking-widest font-mono text-white/60">Project Materials</span>
            </div>
            
            <h1 className="text-[40px] md:text-[56px] font-bold tracking-tighter leading-[1.05] mb-4">
              Everything Required To<br />Build Your Project.
            </h1>
            <p className="text-[16px] text-white/50 font-light max-w-2xl leading-relaxed">
              Upload, organize and track every project asset through a structured operational workflow.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Total Files", value: totalFiles },
              { label: "Pending", value: pendingFiles },
              { label: "Approved", value: approvedFiles },
              { label: "Completion", value: `${completionPct}%` }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-[#050505] border border-[#111111]">
                <div className="text-[12px] text-white/40 uppercase tracking-widest font-mono mb-2">{stat.label}</div>
                <div className="text-[32px] font-medium tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* WORKFLOW */}
          <div className="mb-16">
            <h3 className="text-[14px] font-semibold tracking-tight mb-6">Onboarding Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {WORKFLOW_STEPS.map((step, i) => (
                <div key={i} className={`p-4 border ${step.status === 'COMPLETED' ? 'bg-[#050505] border-white/20' : step.status === 'IN_PROGRESS' ? 'bg-[#0B0B0B] border-white/10' : 'bg-[#000000] border-[#111111] opacity-50'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono text-white/40">{step.num}</span>
                    {step.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3 text-white/80" />}
                  </div>
                  <div className="text-[12px] font-medium mb-1 line-clamp-1">{step.title}</div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                    <span>{step.files} Files</span>
                    {step.pending > 0 && <span className="text-amber-400/80">{step.pending} Pending</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UPLOAD MODULE */}
          <div className="mb-16">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed ${isDragging ? 'border-white/40 bg-[#0B0B0B]' : 'border-[#111111] bg-[#050505]'} transition-all p-12 flex flex-col items-center justify-center text-center`}
            >
              <div className="w-12 h-12 bg-[#111111] border border-white/10 rounded-full flex items-center justify-center mb-6">
                <UploadCloud className="w-5 h-5 text-white/60" />
              </div>
              <h3 className="text-[16px] font-medium mb-2">Upload Project Materials</h3>
              <p className="text-[13px] text-white/40 mb-6 max-w-md">
                Drag and drop files here, or click to browse. Accepted formats: PNG, JPG, WEBP, SVG, PDF, DOCX, ZIP, MP4, MOV.
              </p>
              <button className="px-6 py-2.5 bg-white text-black text-[12px] font-semibold hover:bg-white/90 transition-colors">
                Select Files
              </button>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-[20px] font-semibold tracking-tight">Material Repository</h3>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search materials..." 
                    className="w-[240px] h-9 bg-[#050505] border border-[#111111] text-[13px] pl-9 pr-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button className="h-9 px-3 bg-[#050505] border border-[#111111] text-white/60 flex items-center justify-center hover:bg-[#0B0B0B] hover:text-white transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-[#111111] bg-[#050505]">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-[#111111] text-[11px] font-mono uppercase tracking-wider text-white/40 bg-[#0B0B0B]">
                    <th className="p-4 font-medium">File Name</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Uploaded By</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] divide-y divide-[#111111]">
                  {materials.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map((material) => (
                    <tr key={material.id} className="hover:bg-[#0B0B0B]/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[4px] bg-[#111111] border border-white/5 flex items-center justify-center text-white/60">
                            <FileIconForType type={material.fileType} />
                          </div>
                          <div>
                            <div className="font-medium text-white/90">{material.name}</div>
                            <div className="text-[11px] text-white/40 mt-0.5">{material.fileSize} • {material.fileType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-[11px] font-mono text-white/60 bg-[#111111] px-2 py-1 rounded-[4px]">
                          {material.category.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 text-white/60">{material.uploadedBy}</td>
                      <td className="p-4 text-white/60">{material.uploadDate}</td>
                      <td className="p-4">
                        <StatusBadge status={material.status} />
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-[#111111] text-white/60 hover:text-white transition-colors" title="Preview">
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {role === "ADMIN" && material.status !== "APPROVED" && (
                            <>
                              <button className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-emerald-500/10 text-emerald-400/60 hover:text-emerald-400 transition-colors" title="Approve">
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-colors" title="Reject">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-[#111111] text-white/60 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {materials.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[13px] text-white/40">
                        No materials found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
