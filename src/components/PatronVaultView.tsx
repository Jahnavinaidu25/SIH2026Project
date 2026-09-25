import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Compass,
  Mic,
  Volume2,
  Sparkles,
  Send,
  Package,
  Heart,
  ChevronRight,
  Printer,
  CheckCircle2,
  Clock,
  MapPin,
  FileCheck,
  User,
  Radio,
  SlidersHorizontal,
  CornerDownRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import {
  ProvenancePassport,
  BespokeCommission,
  ArtisanVoiceMessage,
  CraftItem
} from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { formatPrice } from '../utils/currency';

interface Props {
  passports: ProvenancePassport[];
  commissions: BespokeCommission[];
  voiceMessages: ArtisanVoiceMessage[];
  onAddCommission: (commission: BespokeCommission) => void;
  onSendPatronReply: (messageId: string, replyText: string) => void;
  onExploreMarketplace: () => void;
}

export const PatronVaultView: React.FC<Props> = ({
  passports,
  commissions,
  voiceMessages,
  onAddCommission,
  onSendPatronReply,
  onExploreMarketplace,
}) => {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState<'passports' | 'commissions' | 'dialogue'>('passports');
  const [selectedPassport, setSelectedPassport] = useState<ProvenancePassport | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Bespoke commission form states
  const [commissionPrompt, setCommissionPrompt] = useState('');
  const [selectedGuild, setSelectedGuild] = useState<'elena-ramos' | 'amina-diallo' | 'tenzin-norbu' | 'kenji-takahashi'>('elena-ramos');
  const [isRecordingCommission, setIsRecordingCommission] = useState(false);
  const [isSubmittingCommission, setIsSubmittingCommission] = useState(false);
  const [commissionSuccess, setCommissionSuccess] = useState(false);

  // Two-way voice reply states
  const [activeReplyingMessageId, setActiveReplyingMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isRecordingReply, setIsRecordingReply] = useState(false);

  // Calculate patron totals
  const totalFairWageFunded = passports.reduce((sum, p) => sum + p.fairWagePaid, 0);
  const totalAncestralHours = passports.reduce((sum, p) => sum + p.handcraftHours, 0);
  const totalTreasures = passports.length;

  const handlePlayVoice = (id: string, frequency: number = 440) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
      return;
    }
    setPlayingAudioId(id);
    audioService.playCeramicChime(frequency);
    setTimeout(() => {
      setPlayingAudioId(null);
    }, 4500);
  };

  const handleVoiceCommissionRecord = () => {
    audioService.playCeramicChime(360);
    setIsRecordingCommission(true);

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setCommissionPrompt(text);
        setIsRecordingCommission(false);
      };
      recognition.onerror = () => {
        fallbackCommissionVoice();
      };
      try {
        recognition.start();
      } catch {
        fallbackCommissionVoice();
      }
    } else {
      fallbackCommissionVoice();
    }
  };

  const fallbackCommissionVoice = () => {
    setTimeout(() => {
      const samples = [
        'A hand-coiled raw black clay mezcal decanter with burnished quartz neck, roughly 22cm high.',
        'A ceremonial Indigo and fermented riverbed mud wall hanging with geometric sun protection symbols.',
        'A pair of wood-fired Bizen ceramic tea bowls with natural pine ash dripping and unglazed clay warmth.',
      ];
      const picked = samples[Math.floor(Math.random() * samples.length)];
      setCommissionPrompt(picked);
      setIsRecordingCommission(false);
      audioService.playCeramicChime(500);
    }, 1200);
  };

  const handleApplyPresetPrompt = (preset: string, guild: 'elena-ramos' | 'amina-diallo' | 'tenzin-norbu' | 'kenji-takahashi') => {
    audioService.playTactileTap();
    setCommissionPrompt(preset);
    setSelectedGuild(guild);
  };

  const handleSubmitCommission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commissionPrompt.trim()) return;

    setIsSubmittingCommission(true);
    audioService.playCeramicChime(420);

    setTimeout(() => {
      const guildInfo = {
        'elena-ramos': {
          name: 'Elena Ramos',
          region: 'San Bartolo Coyotepec, Oaxaca',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
          category: 'Ceramics & Pottery',
          materials: ['San Bartolo raw black clay', 'Riverbed quartz polish'],
          hours: 18,
          price: 135,
        },
        'amina-diallo': {
          name: 'Amina Diallo',
          region: 'Ségou on the Niger River, Mali',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          category: 'Handwoven Textiles',
          materials: ['Handspun organic Sahel cotton', 'Fermented riverbed mud'],
          hours: 28,
          price: 190,
        },
        'tenzin-norbu': {
          name: 'Tenzin Norbu',
          region: 'Nubra Valley, Ladakh',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          category: 'Handwoven Textiles',
          materials: ['Nomadic high-plateau fleece', 'Alpine rhubarb dye'],
          hours: 22,
          price: 160,
        },
        'kenji-takahashi': {
          name: 'Kenji Takahashi',
          region: 'Imbe, Bizen, Japan',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          category: 'Ceramics & Pottery',
          materials: ['Hiyose rice-paddy clay', 'Red pine ash'],
          hours: 32,
          price: 240,
        },
      }[selectedGuild];

      const newCommission: BespokeCommission = {
        id: `comm-${Date.now().toString().slice(-4)}`,
        title: commissionPrompt.slice(0, 45) + (commissionPrompt.length > 45 ? '...' : ''),
        artisanId: selectedGuild,
        artisanName: guildInfo.name,
        artisanRegion: guildInfo.region,
        artisanAvatar: guildInfo.avatar,
        description: commissionPrompt,
        category: guildInfo.category,
        requestedMaterials: guildInfo.materials,
        estimatedHours: guildInfo.hours,
        fairPriceQuote: guildInfo.price,
        status: 'In Review',
        dateRequested: 'Just now',
        voiceTranscript: `"${commissionPrompt}"`,
      };

      onAddCommission(newCommission);
      setIsSubmittingCommission(false);
      setCommissionSuccess(true);
      setCommissionPrompt('');
      audioService.playCeramicChime(540);

      setTimeout(() => setCommissionSuccess(false), 4000);
    }, 1000);
  };

  const handleRecordPatronReply = (msgId: string) => {
    setIsRecordingReply(true);
    audioService.playCeramicChime(380);

    setTimeout(() => {
      const sampleReplies = [
        'Thank you so much! Our family is truly moved by the ancestral dedication behind this piece.',
        'We cannot wait to welcome your craft into our tea sanctuary. Blessings to your workshop!',
        'The craftsmanship is extraordinary. Thank you for keeping these sacred techniques alive.',
      ];
      const picked = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
      setReplyText(picked);
      setIsRecordingReply(false);
      audioService.playTactileTap();
    }, 1200);
  };

  const handleSendReply = (msgId: string) => {
    if (!replyText.trim()) return;
    onSendPatronReply(msgId, replyText);
    audioService.playCeramicChime(500);
    setActiveReplyingMessageId(null);
    setReplyText('');
  };

  return (
    <div id="patron-vault-container" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fadeIn">
      {/* Patron Hero Banner & Living Impact Metrics */}
      <div className="bg-[#2C1810] text-[#FDFBF7] rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#E6DDD4]/20 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 text-[#C85A32] text-xs font-bold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.buyerHome.fairWageBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {t.patronVault.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#FDFBF7]/80 leading-relaxed max-w-2xl">
            {t.patronVault.subtitle}
          </p>

          {/* Living Impact Stats Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-[#FDFBF7]/60 block uppercase font-semibold">
                {t.common.directFairWage}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#3D6B52] block mt-0.5 animate-pulse">
                {formatPrice(totalFairWageFunded)}
              </span>
              <span className="text-[10px] text-[#FDFBF7]/50 block">0% middleman deduction</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-[#FDFBF7]/60 block uppercase font-semibold">
                {t.common.hoursOfCraft}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#C85A32] block mt-0.5">
                {totalAncestralHours} hrs
              </span>
              <span className="text-[10px] text-[#FDFBF7]/50 block">Slow handcraft sustained</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-[#FDFBF7]/60 block uppercase font-semibold">
                {t.patronVault.tabPassports}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#FDFBF7] block mt-0.5">
                {totalTreasures} pieces
              </span>
              <span className="text-[10px] text-[#FDFBF7]/50 block">Permanent digital passports</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-[#FDFBF7]/60 block uppercase font-semibold">
                Eco-Logistics
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#3D6B52] block mt-0.5">
                100% Clean
              </span>
              <span className="text-[10px] text-[#FDFBF7]/50 block">Plastic-free jute wrapping</span>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Terracotta Glow */}
        <div className="absolute right-0 -bottom-24 w-80 h-80 rounded-full bg-[#C85A32]/15 blur-3xl pointer-events-none" />
      </div>

      {/* Sub-Tabs Navigation for Buyer Experience */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6DDD4] pb-3">
        <div className="flex items-center gap-1.5 bg-[#F5EFEB] p-1 rounded-2xl border border-[#E6DDD4]">
          <button
            id="tab-buyer-passports"
            onClick={() => {
              audioService.playTactileTap();
              setActiveSubTab('passports');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'passports'
                ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                : 'text-[#2C1810] hover:text-[#C85A32]'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>{t.patronVault.tabPassports} ({passports.length})</span>
          </button>

          <button
            id="tab-buyer-commissions"
            onClick={() => {
              audioService.playTactileTap();
              setActiveSubTab('commissions');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'commissions'
                ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                : 'text-[#2C1810] hover:text-[#C85A32]'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{t.patronVault.tabCommissions} ({commissions.length})</span>
          </button>

          <button
            id="tab-buyer-dialogue"
            onClick={() => {
              audioService.playTactileTap();
              setActiveSubTab('dialogue');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'dialogue'
                ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                : 'text-[#2C1810] hover:text-[#C85A32]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#3D6B52]" />
            <span>{t.patronVault.tabVoiceNotes} ({voiceMessages.length})</span>
          </button>
        </div>

        {/* Action Button: Explore crafts */}
        <button
          onClick={onExploreMarketplace}
          className="px-4 py-2 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810] text-xs font-bold hover:bg-[#F5EFEB] flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span>{t.cart.continueShopping}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TAB 1: PROVENANCE PASSPORTS & LIVING TRACKING */}
      {activeSubTab === 'passports' && (
        <div className="space-y-6">
          {passports.length === 0 ? (
            <div className="bg-[#F5EFEB] rounded-3xl p-12 text-center border border-[#E6DDD4] space-y-3">
              <span className="text-4xl block">🏺</span>
              <h3 className="text-base font-extrabold text-[#2C1810]">No Provenance Passports Yet</h3>
              <p className="text-xs text-[#2C1810]/70 max-w-md mx-auto">
                Acquire an authentic piece from the Conscious Marketplace to generate a cryptographic
                certificate of lineage, GPS origin coordinates, and direct fair wage verification.
              </p>
              <button
                onClick={onExploreMarketplace}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] transition-all"
              >
                Browse Conscious Crafts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {passports.map((passport) => {
                const stages = [
                  'Earth / Fiber Gathering',
                  'Slow Ancestral Handcrafting',
                  'Plastic-Free Packaging',
                  'Safely Delivered to Sanctuary',
                ];

                return (
                  <div
                    key={passport.certificateId}
                    className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-3xl p-5 sm:p-6 space-y-4 hover:border-[#C85A32]/40 transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header Card Info */}
                      <div className="flex items-start justify-between gap-3 border-b border-[#E6DDD4] pb-4">
                        <div className="flex gap-3">
                          <img
                            src={passport.craftImage}
                            alt={passport.craftTitle}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E6DDD4] shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-[#3D6B52]/15 text-[#3D6B52] text-[10px] font-extrabold uppercase tracking-wide">
                                Verified Lineage
                              </span>
                              <span className="text-[11px] font-mono text-[#2C1810]/50">
                                {passport.certificateId}
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-extrabold text-[#2C1810] mt-1 line-clamp-1">
                              {passport.craftTitle}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-[#C85A32] font-serif italic mt-0.5">
                              <User className="w-3 h-3" />
                              <span>By {passport.artisanName}</span>
                              <span className="text-[#2C1810]/40 font-sans">• {passport.artisanRegion}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2C1810] text-[#FDFBF7] text-[10px] font-bold">
                            <Clock className="w-3 h-3 text-[#C85A32]" />
                            {passport.status}
                          </span>
                        </div>
                      </div>

                      {/* 4-Stage Traceability Journey */}
                      <div className="py-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C1810]/60 block mb-2">
                          Ancestral Journey &amp; Living Traceability
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {stages.map((stageName, idx) => {
                            const isDone = idx <= passport.currentStageIndex;
                            const isCurrent = idx === passport.currentStageIndex;
                            return (
                              <div key={stageName} className="space-y-1">
                                <div
                                  className={`h-1.5 rounded-full transition-all ${
                                    isDone ? 'bg-[#3D6B52]' : 'bg-[#E6DDD4]'
                                  } ${isCurrent ? 'ring-2 ring-[#C85A32]/50' : ''}`}
                                />
                                <span
                                  className={`text-[9px] block leading-tight truncate ${
                                    isDone ? 'text-[#2C1810] font-bold' : 'text-[#2C1810]/40'
                                  }`}
                                >
                                  {stageName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Technical Lineage Breakdown Details */}
                      <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-white/60 p-3 rounded-2xl border border-[#E6DDD4]">
                        <div>
                          <span className="text-[10px] text-[#2C1810]/50 block">GPS Provenance</span>
                          <span className="font-mono text-[11px] font-bold text-[#2C1810] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C85A32]" />
                            {passport.gpsCoordinates}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#2C1810]/50 block">Cryptographic Seal</span>
                          <span className="font-mono text-[11px] font-bold text-[#2C1810] truncate block">
                            {passport.artisanThumbprintHash.slice(0, 16)}...
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#2C1810]/50 block">Handcraft Time</span>
                          <span className="font-bold text-[#2C1810]">{passport.handcraftHours} hours</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#2C1810]/50 block">Direct Maker Share</span>
                          <span className="font-extrabold text-[#3D6B52]">
                            {formatPrice(passport.fairWagePaid)} ({Math.round((passport.fairWagePaid / passport.totalPrice) * 100)}%)
                          </span>
                        </div>
                      </div>

                      {/* Artisan Audio Dedication */}
                      {passport.artisanAudioNote && (
                        <div className="mt-3 p-3 rounded-2xl bg-[#C85A32]/10 border border-[#C85A32]/25 flex items-start gap-2.5">
                          <button
                            onClick={() =>
                              handlePlayVoice(
                                passport.certificateId,
                                passport.artisanAudioNote?.audioFrequency
                              )
                            }
                            className="w-8 h-8 rounded-full bg-[#C85A32] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                          >
                            <Volume2
                              className={`w-4 h-4 ${
                                playingAudioId === passport.certificateId ? 'animate-bounce' : ''
                              }`}
                            />
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-extrabold text-[#2C1810]">
                                Spoken Dedication by {passport.artisanName}
                              </span>
                              <span className="text-[10px] font-mono text-[#C85A32] font-semibold">
                                {passport.artisanAudioNote.duration}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#2C1810]/80 italic mt-0.5 leading-snug">
                              "{passport.artisanAudioNote.transcript}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Trigger: View Full Certificate Modal */}
                    <div className="pt-3 border-t border-[#E6DDD4] flex items-center justify-between">
                      <span className="text-[11px] text-[#2C1810]/60">
                        Acquired on {passport.dateAcquired}
                      </span>
                      <button
                        onClick={() => {
                          audioService.playTactileTap();
                          setSelectedPassport(passport);
                          setIsCertificateModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#2C1810] text-[#FDFBF7] text-xs font-bold hover:bg-black transition-all flex items-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>Inspect Official Certificate</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BESPOKE VOICE COMMISSION ENGINE */}
      {activeSubTab === 'commissions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Voice Commission Studio */}
          <div className="lg:col-span-7 bg-[#F5EFEB] border border-[#E6DDD4] rounded-3xl p-5 sm:p-7 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C85A32]/15 text-[#C85A32] text-[10px] font-extrabold uppercase">
                <Mic className="w-3 h-3" />
                Assistive Spoken Commissioning
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
                Commission Directly from Master Guilds
              </h2>
              <p className="text-xs text-[#2C1810]/70 leading-relaxed">
                Describe the specific form, function, and materials you envision. The system calculates
                fair crafting hours and matches your request directly to the master artisan's bench.
              </p>
            </div>

            {/* Quick Inspiration Presets */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2C1810]/60 block">
                Tap an Inspiration Prompt or Speak Freely:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPresetPrompt(
                      'Two ceremonial Barro Negro mezcal copitas with smooth burnished quartz rims, 8cm diameter.',
                      'elena-ramos'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810] text-xs hover:border-[#C85A32] hover:bg-[#FDFBF7] transition-all text-left"
                >
                  🏺 Barro Negro Mezcal Copitas (Oaxaca)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPresetPrompt(
                      'A natural fermented indigo wall hanging with ancestral Bamana geometric sun patterns on handspun cotton.',
                      'amina-diallo'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810] text-xs hover:border-[#C85A32] hover:bg-[#FDFBF7] transition-all text-left"
                >
                  🧵 Indigo &amp; Mud Cloth Runner (Mali)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPresetPrompt(
                      'A high-altitude sheep fleece meditation wrap, naturally dyed with wild Himalayan rhubarb root.',
                      'tenzin-norbu'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DDD4] text-[#2C1810] text-xs hover:border-[#C85A32] hover:bg-[#FDFBF7] transition-all text-left"
                >
                  🏔️ Mountain Fleece Wrap (Ladakh)
                </button>
              </div>
            </div>

            {/* Commission Form */}
            <form onSubmit={handleSubmitCommission} className="space-y-4">
              {/* Guild Selection Dropdown */}
              <div>
                <label className="text-xs font-bold text-[#2C1810] block mb-1.5">
                  Select Master Artisan &amp; Heritage Guild:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'elena-ramos', label: 'Elena Ramos', subtitle: 'Barro Negro, Oaxaca' },
                    { id: 'amina-diallo', label: 'Amina Diallo', subtitle: 'Bogolan Weaving, Mali' },
                    { id: 'tenzin-norbu', label: 'Tenzin Norbu', subtitle: 'Mountain Fleece, Ladakh' },
                    { id: 'kenji-takahashi', label: 'Kenji Takahashi', subtitle: 'Wood-Fired Bizen, Japan' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => {
                        audioService.playTactileTap();
                        setSelectedGuild(g.id as any);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedGuild === g.id
                          ? 'bg-[#2C1810] text-[#FDFBF7] border-[#2C1810] shadow-sm'
                          : 'bg-white text-[#2C1810] border-[#E6DDD4] hover:bg-[#EDE7E3]'
                      }`}
                    >
                      <span className="text-xs font-extrabold block truncate">{g.label}</span>
                      <span
                        className={`text-[10px] block truncate ${
                          selectedGuild === g.id ? 'text-[#FDFBF7]/70' : 'text-[#2C1810]/50'
                        }`}
                      >
                        {g.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Commission Speech & Text Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#2C1810]">
                    Your Vision &amp; Specifications:
                  </label>
                  <button
                    type="button"
                    onClick={handleVoiceCommissionRecord}
                    className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isRecordingCommission
                        ? 'bg-[#ba1a1a] text-white animate-pulse'
                        : 'bg-[#C85A32] text-white hover:bg-[#b54f2a]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isRecordingCommission ? 'Listening...' : 'Speak Your Vision'}</span>
                  </button>
                </div>
                <textarea
                  value={commissionPrompt}
                  onChange={(e) => setCommissionPrompt(e.target.value)}
                  placeholder="E.g. Describe desired dimensions, intended rituals, specific surface textures, or handle arrangements..."
                  className="w-full p-3.5 rounded-2xl bg-white border border-[#E6DDD4] text-xs text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#C85A32] resize-none h-28"
                  required
                />
              </div>

              {/* Instant Quote Estimation Box */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E6DDD4] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[#2C1810]/50 block">
                    Estimated Fair Artisan Wage
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-[#3D6B52]">
                      {formatPrice(95)} - {formatPrice(190)}
                    </span>
                    <span className="text-[11px] text-[#2C1810]/60">
                      • 100% direct disbursement
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#2C1810]/50 block">
                    Handcraft Duration
                  </span>
                  <span className="text-xs font-bold text-[#2C1810]">14 to 28 Days</span>
                </div>
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={isSubmittingCommission || !commissionPrompt.trim()}
                className="w-full h-12 rounded-xl bg-[#C85A32] text-white text-xs sm:text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmittingCommission ? (
                  <span>Transmitting to Maker's Guild...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Commission to Artisan Guild</span>
                  </>
                )}
              </button>

              {commissionSuccess && (
                <div className="p-3 rounded-xl bg-[#3D6B52]/15 border border-[#3D6B52]/30 text-[#3D6B52] text-xs font-bold text-center animate-fadeIn">
                  ✓ Bespoke commission dispatched! Elena and the cooperative have received your request.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Active Commissions Ledger */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#2C1810]">
                Active Bespoke Requests ({commissions.length})
              </h3>
              <span className="text-xs text-[#3D6B52] font-bold">Direct Maker Dialogue</span>
            </div>

            <div className="space-y-3">
              {commissions.map((comm) => (
                <div
                  key={comm.id}
                  className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={comm.artisanAvatar}
                        alt={comm.artisanName}
                        className="w-10 h-10 rounded-full object-cover border border-[#E6DDD4]"
                      />
                      <div>
                        <h4 className="text-xs font-extrabold text-[#2C1810] line-clamp-1">
                          {comm.title}
                        </h4>
                        <span className="text-[11px] text-[#C85A32] font-serif italic block">
                          Assigned to {comm.artisanName} ({comm.artisanRegion})
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#2C1810] text-[#FDFBF7] text-[10px] font-bold shrink-0">
                      {comm.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#2C1810]/80 bg-white/70 p-2.5 rounded-xl border border-[#E6DDD4] leading-relaxed">
                    {comm.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E6DDD4]">
                    <div>
                      <span className="text-[10px] text-[#2C1810]/50 block">Quote</span>
                      <span className="font-extrabold text-[#3D6B52]">
                        {formatPrice(comm.fairPriceQuote)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#2C1810]/50 block">Est. Crafting</span>
                      <span className="font-bold text-[#2C1810]">{comm.estimatedHours} hrs</span>
                    </div>
                    <span className="text-[10px] text-[#2C1810]/50">{comm.dateRequested}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ARTISAN VOICE MAILBOX (TWO-WAY DIALOGUE) */}
      {activeSubTab === 'dialogue' && (
        <div className="space-y-6">
          <div className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-3xl p-5 sm:p-6 space-y-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#3D6B52]/15 text-[#3D6B52] text-[10px] font-extrabold uppercase">
              <Radio className="w-3 h-3" />
              Two-Way Spoken Cultural Dialogue
            </div>
            <h2 className="text-xl font-extrabold text-[#2C1810]">
              Personal Spoken Messages Between You &amp; The Makers
            </h2>
            <p className="text-xs text-[#2C1810]/70 max-w-xl">
              Artisans record voice notes from their rural workshops in Oaxaca, Ségou, and Ladakh.
              You can listen to their vernacular updates and reply with your own spoken appreciation.
            </p>
          </div>

          <div className="space-y-4">
            {voiceMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-3xl p-5 sm:p-6 space-y-4 hover:border-[#C85A32]/40 transition-all shadow-sm"
              >
                {/* Message Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={msg.artisanAvatar}
                      alt={msg.artisanName}
                      className="w-12 h-12 rounded-2xl object-cover border border-[#E6DDD4]"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-[#2C1810]">{msg.artisanName}</h4>
                      <span className="text-xs text-[#C85A32] font-serif italic block">
                        Regarding: {msg.craftTitle}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#2C1810]/50 font-medium">{msg.timestamp}</span>
                </div>

                {/* Spoken Audio Player Bar */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DDD4] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handlePlayVoice(msg.id, msg.audioFrequency)}
                      className="w-10 h-10 rounded-full bg-[#C85A32] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                    >
                      <Volume2
                        className={`w-4 h-4 ${playingAudioId === msg.id ? 'animate-bounce' : ''}`}
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#2C1810]">
                          Voice Update from Workshop
                        </span>
                        <span className="text-[10px] font-mono text-[#C85A32] font-bold">
                          {msg.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {/* Audio waveform simulator */}
                        {Array.from({ length: 18 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all ${
                              playingAudioId === msg.id
                                ? 'bg-[#C85A32] animate-pulse'
                                : 'bg-[#E6DDD4]'
                            }`}
                            style={{
                              height: `${8 + ((i * 7) % 16)}px`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transcript & Vernacular Translation */}
                <div className="space-y-1.5 text-xs">
                  <p className="text-[#2C1810] font-medium leading-relaxed bg-[#FDFBF7] p-3 rounded-xl border border-[#E6DDD4]">
                    "{msg.transcript}"
                  </p>
                  {msg.translatedDialect && (
                    <span className="text-[11px] text-[#3D6B52] italic block pl-1">
                      {msg.translatedDialect}
                    </span>
                  )}
                </div>

                {/* Existing Patron Reply if any */}
                {msg.hasPatronReplied && msg.patronReplyTranscript && (
                  <div className="ml-4 sm:ml-8 pl-3 border-l-2 border-[#C85A32] space-y-1 bg-white/70 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#C85A32]">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Your Spoken Note to {msg.artisanName}:</span>
                    </div>
                    <p className="text-xs text-[#2C1810]/80 italic">
                      "{msg.patronReplyTranscript}"
                    </p>
                  </div>
                )}

                {/* Action: Record Reply */}
                {activeReplyingMessageId === msg.id ? (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#C85A32] space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C1810]">
                        Record a voice note to {msg.artisanName}:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRecordPatronReply(msg.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isRecordingReply
                            ? 'bg-[#ba1a1a] text-white animate-pulse'
                            : 'bg-[#C85A32] text-white hover:bg-[#b54f2a]'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isRecordingReply ? 'Listening...' : 'Record Voice'}</span>
                      </button>
                    </div>

                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Your note will be sent directly to the artisan cooperative..."
                      className="w-full p-2.5 rounded-xl bg-[#FDFBF7] border border-[#E6DDD4] text-xs text-[#2C1810] focus:outline-none focus:border-[#C85A32] resize-none h-16"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveReplyingMessageId(null)}
                        className="px-3 py-1.5 rounded-lg border border-[#E6DDD4] text-xs text-[#2C1810]/70 hover:bg-[#F5EFEB]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(msg.id)}
                        disabled={!replyText.trim()}
                        className="px-4 py-1.5 rounded-lg bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] disabled:opacity-40"
                      >
                        Send to Maker
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        audioService.playTactileTap();
                        setActiveReplyingMessageId(msg.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-[#E6DDD4] bg-white text-[#2C1810] text-xs font-bold hover:bg-[#F5EFEB] flex items-center gap-1.5 transition-all"
                    >
                      <Mic className="w-3.5 h-3.5 text-[#C85A32]" />
                      <span>{msg.hasPatronReplied ? 'Send Another Note' : 'Reply with Voice Note'}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OFFICIAL PROVENANCE CERTIFICATE MODAL */}
      {isCertificateModalOpen && selectedPassport && (
        <div
          id="certificate-modal-backdrop"
          className="fixed inset-0 z-50 bg-[#2C1810]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsCertificateModalOpen(false)}
        >
          <div
            id="certificate-sheet"
            className="w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border-4 border-[#2C1810] overflow-hidden relative p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Header Banner */}
            <div className="text-center space-y-2 border-b-2 border-[#E6DDD4] pb-5">
              <div className="w-14 h-14 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/30 text-[#C85A32] flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85A32] font-bold">
                Earth &amp; Craft Humane System • Protocol #85
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
                Official Certificate of Ancestral Provenance
              </h2>
              <p className="text-xs text-[#2C1810]/70 max-w-md mx-auto">
                Cryptographically certified authentic handmade creation with 100% verified fair-wage disbursement to the maker's cooperative.
              </p>
            </div>

            {/* Certificate Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3 bg-[#F5EFEB] p-4 rounded-2xl border border-[#E6DDD4]">
                <div>
                  <span className="text-[10px] text-[#2C1810]/50 block uppercase font-bold">
                    Master Artisan &amp; Lineage
                  </span>
                  <span className="font-extrabold text-sm text-[#2C1810] block mt-0.5">
                    {selectedPassport.artisanName}
                  </span>
                  <span className="text-[#C85A32] font-serif italic text-xs block">
                    {selectedPassport.artisanRegion}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#2C1810]/50 block uppercase font-bold">
                    Creation Title
                  </span>
                  <span className="font-bold text-[#2C1810] block mt-0.5">
                    {selectedPassport.craftTitle}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#2C1810]/50 block uppercase font-bold">
                    Natural Raw Materials
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPassport.materialsUsed.map((mat) => (
                      <span
                        key={mat}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#E6DDD4] text-[10px] font-semibold text-[#2C1810]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-[#F5EFEB] p-4 rounded-2xl border border-[#E6DDD4]">
                <div>
                  <span className="text-[10px] text-[#2C1810]/50 block uppercase font-bold">
                    Certificate ID &amp; Batch
                  </span>
                  <span className="font-mono font-bold text-xs text-[#2C1810]">
                    {selectedPassport.certificateId}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#2C1810]/50 block uppercase font-bold">
                    GPS Coordinates
                  </span>
                  <span className="font-mono text-xs text-[#2C1810]">
                    {selectedPassport.gpsCoordinates}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#2C1810]/50 block uppercase font-bold">
                    Fair Wage Disbursement
                  </span>
                  <span className="text-sm font-extrabold text-[#3D6B52] block">
                    {formatPrice(selectedPassport.fairWagePaid)} (85% Direct to Maker)
                  </span>
                  <span className="text-[10px] text-[#2C1810]/60">
                    Middleman extraction: ₹0 INR (0%)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#2C1810]/50 block uppercase font-bold">
                    Handcraft Labor
                  </span>
                  <span className="font-bold text-[#2C1810]">
                    {selectedPassport.handcraftHours} hours slow curation
                  </span>
                </div>
              </div>
            </div>

            {/* Official Thumbprint Seal */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DDD4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2C1810] text-[#C85A32] flex items-center justify-center font-serif text-lg font-bold">
                  印
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#2C1810] block">
                    Verified Digital Thumbprint Seal
                  </span>
                  <span className="text-[10px] font-mono text-[#2C1810]/60 block truncate max-w-xs">
                    {selectedPassport.artisanThumbprintHash}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#3D6B52]/15 text-[#3D6B52] text-[10px] font-bold">
                Immutable Ledger Verified
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  audioService.playTactileTap();
                  window.print();
                }}
                className="px-4 py-2 rounded-xl border border-[#E6DDD4] bg-[#F5EFEB] text-[#2C1810] text-xs font-bold hover:bg-white flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#2C1810] text-[#FDFBF7] text-xs font-bold hover:bg-black"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
