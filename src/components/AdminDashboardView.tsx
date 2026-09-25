import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  ExternalLink,
  ChevronRight,
  Filter,
  AlertCircle,
  Sparkles,
  Globe,
  Terminal,
  Activity,
  Database,
  Cpu,
  HardDrive,
  RefreshCw,
  Layers,
  Send,
  Trash2,
} from 'lucide-react';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  products?: any[];
  onApproveProduct?: (productId: string) => void;
  onLogout: () => void;
  onNavigateToArtisanPortal?: () => void;
  onNavigateToBuyerPortal?: () => void;
  onOpenLanguageModal?: () => void;
}

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'API' | 'SYS';
  module: string;
  message: string;
}

export const AdminDashboardView: React.FC<Props> = ({
  products = [],
  onApproveProduct,
  onLogout,
  onNavigateToArtisanPortal,
  onNavigateToBuyerPortal,
  onOpenLanguageModal,
}) => {
  const { language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'terminal' | 'artisans' | 'buyers' | 'requirements' | 'health'>('terminal');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // 1. Initial State System Log Generator
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '11:02:04', level: 'SYS', module: 'BOOT', message: 'CraftBridge Platform governance monitor active on port 3000.' },
    { timestamp: '11:02:05', level: 'SYS', module: 'DB', message: 'Established read-replica connections with regional cloud nodes.' },
    { timestamp: '11:02:12', level: 'API', module: 'LANG', message: 'Google Translation Engine: pre-compiled localized static keys for [en, hi, kn, ta, te, ml].' },
    { timestamp: '11:02:45', level: 'INFO', module: 'SYNC', message: 'Synchronized Catalog ledger cache. Total verified active items: 8,560.' },
    { timestamp: '11:03:01', level: 'SUCCESS', module: 'MATCH', message: 'B2B Semantic Match Engine: matched Buyer inquiry ID #req-1 with Master Ramesh pottery cluster (92% confidence).' },
    { timestamp: '11:04:15', level: 'API', module: 'AUDIO', message: 'Tactile sound engine: dispatched low-latency sound cues (Ceramic chime 440Hz).' },
    { timestamp: '11:05:00', level: 'INFO', module: 'SECURITY', message: 'Completed security health check. Audit logs synced with district weaver guilds.' },
  ]);

  // Terminal screen reference for auto-scroll
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Mock registries as system logs instead of consumer lists
  const [artisansList, setArtisansList] = useState([
    { id: 'art-1', name: 'Master Ramesh', craft: 'Traditional Terracotta Pottery', location: 'Ramanagara, Karnataka', activeChannels: 3, status: 'VERIFIED', lastPing: '2 mins ago' },
    { id: 'art-2', name: 'Lakshmi Devi', craft: 'Handloom Cotton & Ikat', location: 'Warangal, Telangana', activeChannels: 5, status: 'VERIFIED', lastPing: '5 mins ago' },
    { id: 'art-3', name: 'Ravi Kumar', craft: 'Heritage Leather Craft', location: 'Bidar, Karnataka', activeChannels: 2, status: 'VERIFIED', lastPing: '12 mins ago' },
    { id: 'art-4', name: 'Suresh Varma', craft: 'Brass Metal Inlay', location: 'Moradabad, Uttar Pradesh', activeChannels: 1, status: 'PENDING_AUDIT', lastPing: '1 hour ago' },
  ]);

  const [buyersList, setBuyersList] = useState([
    { id: 'buy-1', name: 'Heritage Home Store', org: 'Heritage Retail Pvt Ltd', location: 'Bengaluru, Karnataka', activeRequests: 4, status: 'COMPLIANT' },
    { id: 'buy-2', name: 'Conscious Living Co', org: 'Eco Lifestyle Brands', location: 'Mumbai, Maharashtra', activeRequests: 2, status: 'COMPLIANT' },
    { id: 'buy-3', name: 'Priya Sharma', org: 'Independent Patron', location: 'New Delhi', activeRequests: 1, status: 'ACTIVE' },
  ]);

  const [requirementsList, setRequirementsList] = useState([
    { id: 'req-1', buyer: 'Heritage Home Store', product: 'Handmade Clay Lamps', quantity: 200, budget: '₹200–₹300 / unit', location: 'Bengaluru', status: 'Matched (92% accuracy)' },
    { id: 'req-2', buyer: 'Conscious Living Co', product: 'Handloom Desi Cotton Stoles', quantity: 150, budget: '₹800–₹1,100 / unit', location: 'Mumbai', status: 'Matched (89% accuracy)' },
  ]);

  // Telemetry simulation values
  const [cpuLoad, setCpuLoad] = useState(34);
  const [ramUsage, setRamUsage] = useState(4.2);
  const [latencies, setLatencies] = useState([12, 14, 11, 15, 12]);

  // Dynamic state logging simulation
  const addLog = (level: LogEntry['level'], module: string, message: string) => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { timestamp: time, level, module, message }]);
  };

  // Ticker for mock active operations to show "how things are happening"
  useEffect(() => {
    const interval = setInterval(() => {
      // randomly toggle metric telemetry values slightly
      setCpuLoad((prev) => Math.max(20, Math.min(80, prev + (Math.random() > 0.5 ? 2 : -2))));
      setRamUsage((prev) => Math.max(3.5, Math.min(6.5, Number((prev + (Math.random() > 0.5 ? 0.05 : -0.05)).toFixed(2)))));
      setLatencies((prev) => {
        const next = [...prev.slice(1), Math.floor(10 + Math.random() * 8)];
        return next;
      });

      // inject live system diagnostic logs occasionally
      const r = Math.random();
      if (r < 0.2) {
        addLog('SYS', 'MONITOR', `Audit tick. CPU load is normal at ${cpuLoad}%. Database thread pool health is green.`);
      } else if (r < 0.4) {
        const randomArtisan = artisansList[Math.floor(Math.random() * artisansList.length)];
        addLog('API', 'LEDGER', `Artisan cache write: Checked integrity for workshop of ${randomArtisan.name}.`);
      } else if (r < 0.5) {
        addLog('INFO', 'B2B', 'Checked conscious buyer requirements queue for inactive or expired requests.');
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [cpuLoad]);

  // Operations Control Board Actions
  const handleSimulateHandshake = () => {
    audioService.playCeramicChime(523.25); // high note C5
    showToast('📟 Dispatched B2B handshake simulation signals!');
    addLog('SUCCESS', 'MATCH', 'Admin simulation: Dispatched active handshake invitation. Matched Buyer "Heritage Home Store" with "Master Ramesh" for Terracotta clay lamps.');
    addLog('API', 'SMS', 'Triggered regional SMS network router for WhatsApp notification delivery directly to craft cluster Ramanagara (+91 98450 12345).');
  };

  const handleSimulateTranslation = () => {
    audioService.playClickSound();
    showToast('🌐 Run translation mapping test');
    addLog('API', 'TRANSLATE', 'Bypassed caching. Requested active translation chunk via API: Traditional unglazed clay container.');
    addLog('INFO', 'LOCALIZE', 'Dynamically parsed values mapping: [kn (ಕನ್ನಡ): ಸಾಂಪ್ರದಾಯಿಕ ಮಣ್ಣಿನ ಮಡಕೆ] -> [hi (हिंदी): पारंपरिक मिट्टी का बर्तन] -> [en: Traditional Clay Vessel]. Status: Mapping Match Perfect.');
  };

  const handleSimulateAuditLogs = () => {
    audioService.playClickSound();
    showToast('🛡️ Running full cryptographic ledger audit...');
    addLog('SYS', 'INTEGRITY', 'Starting checksum audit on all 1,248 artisan ledger identity passports...');
    addLog('SUCCESS', 'PASSPORT', 'Audit passed: 100% of artisan passports match verified physical coordinates with zero state discrepancies.');
  };

  const handleClearLogs = () => {
    audioService.playClickSound();
    setLogs([]);
    showToast('Console cleared.');
  };

  const handleToggleArtisan = (id: string, name: string) => {
    audioService.playClickSound();
    setArtisansList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'VERIFIED' ? 'SUSPENDED' : 'VERIFIED' }
          : a
      )
    );
    addLog('WARN', 'REGISTRY', `Admin action: Toggled artisan ${name} registration state to ${artisansList.find(a => a.id === id)?.status === 'VERIFIED' ? 'SUSPENDED' : 'VERIFIED'}.`);
    showToast(`Status updated for ${name}`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#C85A32] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 border border-orange-400/20 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Control Tower Header */}
      <header className="sticky top-0 z-40 bg-[#020617] border-b border-slate-800 px-4 sm:px-6 h-16 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C85A32] text-white flex items-center justify-center font-bold text-lg shadow-inner">
            ⚡
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-wider text-slate-100 block leading-none">
              CRAFTBRIDGE PLATFORM CONTROL TOWER
            </span>
            <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest block mt-0.5">
              SYSTEM MONITORING & GOVERNANCE • LEVEL 1 SECURE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-slate-800 border border-slate-700 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PLATFORM OK • REPLICA SYNCED</span>
          </div>

          <button
            onClick={() => {
              audioService.playClickSound();
              onLogout();
            }}
            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 hover:text-white transition-all text-slate-300 cursor-pointer"
          >
            ← Exit Tower
          </button>
        </div>
      </header>

      {/* Control Tower Sub-Tabs (Strictly Non-Retail System Metrics Mode) */}
      <div className="border-b border-slate-800 bg-[#020617]/50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2 overflow-x-auto">
          {[
            { id: 'terminal', label: '🖥️ Operations Console Log' },
            { id: 'artisans', label: '🏺 Artisan Registry Logs' },
            { id: 'buyers', label: '🛍️ Conscious Buyers Registry' },
            { id: 'requirements', label: '📑 B2B Dispatch Matcher' },
            { id: 'health', label: '📊 Telemetry & Health Metrics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioService.playClickSound();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#C85A32] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Monitoring Desk */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* OPERATIONAL TERMINAL TAB */}
        {activeTab === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Live Unix-Style Log Stream */}
            <div className="lg:col-span-8 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Real-Time Event Audit Terminal (Live)</span>
                </div>
                <button
                  onClick={handleClearLogs}
                  className="text-[10px] font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear Stream
                </button>
              </div>

              <div className="bg-slate-950 font-mono text-xs rounded-2xl border border-slate-800 p-4 h-[420px] overflow-y-auto space-y-1 shadow-inner select-text">
                {logs.length === 0 ? (
                  <div className="text-slate-600 text-center py-20 italic">
                    Console empty. Click "Simulate Event" below to trigger system audit ticks.
                  </div>
                ) : (
                  logs.map((entry, idx) => {
                    let levelColor = 'text-blue-400';
                    if (entry.level === 'SUCCESS') levelColor = 'text-emerald-400';
                    if (entry.level === 'WARN') levelColor = 'text-amber-400';
                    if (entry.level === 'API') levelColor = 'text-purple-400';
                    if (entry.level === 'SYS') levelColor = 'text-cyan-400';

                    return (
                      <div key={idx} className="leading-5 hover:bg-slate-900 px-1 py-0.5 rounded transition-colors flex items-start gap-2">
                        <span className="text-slate-600 select-none">[{entry.timestamp}]</span>
                        <span className={`${levelColor} font-black select-none`}>{entry.level}</span>
                        <span className="text-[#C85A32] font-extrabold select-none">[{entry.module}]</span>
                        <span className="text-slate-300 break-words flex-1">{entry.message}</span>
                      </div>
                    );
                  })
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Simulated Live Event Injector Dashboard */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
                <Activity className="w-4 h-4 text-orange-400" />
                <span>Simulation Injection Board</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
                <div>
                  <h3 className="text-xs font-black text-slate-200">
                    📡 Direct Action Drivers
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Trigger background process handlers to observe how the platform maps communication, databases, and localizations.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleSimulateHandshake}
                    className="w-full text-left py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-100 font-mono font-bold flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <span>⚡ Simulate B2B Handshake</span>
                    <ChevronRight className="w-4 h-4 text-[#C85A32] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleSimulateTranslation}
                    className="w-full text-left py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-100 font-mono font-bold flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <span>🌐 Run Translation Mapping</span>
                    <ChevronRight className="w-4 h-4 text-[#C85A32] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleSimulateAuditLogs}
                    className="w-full text-left py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-100 font-mono font-bold flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <span>🛡️ Crypto Passport Check</span>
                    <ChevronRight className="w-4 h-4 text-[#C85A32] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400">
                    Platform engine listening for socket handshakes...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTISANS REGISTRY LOGS TAB */}
        {activeTab === 'artisans' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-sm font-black text-slate-100 uppercase tracking-wider font-mono">
                  🏺 Rural Artisan Node Ledger Registry
                </h2>
                <p className="text-xs text-slate-400">
                  Platform-wide state for verified active workshops, guild affiliations, and digital inventory nodes.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                    <th className="py-2.5 px-3">Node ID</th>
                    <th className="py-2.5 px-3">Artisan Lead</th>
                    <th className="py-2.5 px-3">Regional Guild</th>
                    <th className="py-2.5 px-3">State/Location</th>
                    <th className="py-2.5 px-3">Active Items</th>
                    <th className="py-2.5 px-3">Audit Registry</th>
                    <th className="py-2.5 px-3 text-right">Ledger Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {artisansList.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 text-[#C85A32] font-bold">#{art.id}</td>
                      <td className="py-3 px-3 font-extrabold text-slate-200">{art.name}</td>
                      <td className="py-3 px-3 text-slate-400">{art.craft}</td>
                      <td className="py-3 px-3 text-slate-400">{art.location}</td>
                      <td className="py-3 px-3 text-emerald-400 font-extrabold">{art.activeChannels} catalog items</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                            art.status === 'VERIFIED'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          }`}
                        >
                          ● {art.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleToggleArtisan(art.id, art.name)}
                          className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold text-slate-300"
                        >
                          {art.status === 'VERIFIED' ? 'Suspend Node' : 'Authorize Node'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONSCIOUS BUYERS REGISTRY TAB */}
        {activeTab === 'buyers' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-sm font-black text-slate-100 uppercase tracking-wider font-mono">
                  🛍️ Conscious Buyers & Procurement Nodes
                </h2>
                <p className="text-xs text-slate-400">
                  Wholesalers, design agencies, B2B boutiques, and verified corporate procurement representatives.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                    <th className="py-2.5 px-3">Buyer ID</th>
                    <th className="py-2.5 px-3">Procurement Representative</th>
                    <th className="py-2.5 px-3">Enterprise / Org</th>
                    <th className="py-2.5 px-3">Regional Node</th>
                    <th className="py-2.5 px-3">B2B Requirements</th>
                    <th className="py-2.5 px-3">Audit compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {buyersList.map((buy) => (
                    <tr key={buy.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 text-[#C85A32] font-bold">#{buy.id}</td>
                      <td className="py-3 px-3 font-extrabold text-slate-200">{buy.name}</td>
                      <td className="py-3 px-3 text-slate-400">{buy.org}</td>
                      <td className="py-3 px-3 text-slate-400">{buy.location}</td>
                      <td className="py-3 px-3 text-orange-400 font-extrabold">{buy.activeRequests} active tenders</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          ✓ {buy.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* B2B MATCHING FLOW MONITORS */}
        {activeTab === 'requirements' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md">
            <div className="mb-5 border-b border-slate-800 pb-4">
              <h2 className="text-sm font-black text-slate-100 uppercase tracking-wider font-mono">
                📑 B2B Custom Requirements Dispatch Logs
              </h2>
              <p className="text-xs text-slate-400">
                Active bulk tenders posted by verified commercial buyers matched dynamically with district weavers and potters.
              </p>
            </div>

            <div className="space-y-4">
              {requirementsList.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#C85A32] font-black">#{req.id}</span>
                      <span className="text-slate-100 font-bold">{req.product}</span>
                    </div>
                    <div className="text-slate-400 text-[11px] space-y-0.5">
                      <p>● Procurement node: {req.buyer} ({req.location})</p>
                      <p>● Target volume: {req.quantity} units ({req.budget})</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 self-stretch sm:self-auto justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold self-start sm:self-auto">
                      {req.status}
                    </span>
                    <button
                      onClick={() => {
                        audioService.playClickSound();
                        showToast(`Initiating manual audit sync for requirement ${req.id}...`);
                        addLog('INFO', 'LEDGER', `Requested manual ledger sync for ${req.id} matched connections.`);
                      }}
                      className="px-2.5 py-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded"
                    >
                      Audit Dispatch Sync
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SYSTEM TELEMETRY & HEALTH METRICS */}
        {activeTab === 'health' && (
          <div className="space-y-6">
            
            {/* Health Meter Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>SYSTEM CPU LOAD</span>
                  <Cpu className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-black text-slate-100 mt-2">
                  {cpuLoad}%
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-orange-500 h-full transition-all duration-500"
                    style={{ width: `${cpuLoad}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>RAM ALLOCATION</span>
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-slate-100 mt-2">
                  {ramUsage} GB
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  Dynamic container heap limit: 8.00 GB
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>DB WORKER LATENCY</span>
                  <Database className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-slate-100 mt-2">
                  {latencies[latencies.length - 1]} ms
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  Nodes: Ramanagara, Warangal, Bidar
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>API SUITE TRAFFIC</span>
                  <Layers className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-slate-100 mt-2">
                  1,240 calls
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  Success rate: 100% (No dropped threads)
                </div>
              </div>
            </div>

            {/* Simulated Live Latency Pipeline Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 font-mono">
              <h3 className="text-xs font-black text-slate-100 uppercase tracking-wider mb-4">
                📈 Real-time Network Latency Sparklines (last 5 intervals)
              </h3>
              <div className="flex items-end gap-3 h-28 pt-4 pb-2 px-6 bg-slate-950 rounded-xl border border-slate-800">
                {latencies.map((lat, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] text-slate-400">{lat}ms</span>
                    <div
                      className="bg-[#C85A32] w-full rounded-t transition-all duration-300"
                      style={{ height: `${(lat / 25) * 100}%` }}
                    />
                    <span className="text-[9px] text-slate-600">t-{latencies.length - idx}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
