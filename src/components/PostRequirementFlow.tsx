import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic,
  Send,
  MapPin,
  Clock,
  Coins,
  Package,
  Star,
  MessageSquare,
  ShieldCheck,
  User,
  Edit2,
  Volume2,
  Phone,
  Mail,
} from 'lucide-react';
import { ArtisanMatch, BuyerRequirement, ConversationMessage } from '../types';
import { INITIAL_ARTISAN_MATCHES, INITIAL_CONVERSATION } from '../data/mockData';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  onBackToHome: () => void;
  onOpenArtisanProducts?: (artisanId: string) => void;
  initialArtisanId?: string | null;
}

type FlowStep =
  | 'POST_INPUT'
  | 'AI_ANALYZING'
  | 'AI_EXTRACTED_REVIEW'
  | 'MATCH_RESULTS'
  | 'ARTISAN_PROFILE'
  | 'CONVERSATION';

export const PostRequirementFlow: React.FC<Props> = ({
  onBackToHome,
  onOpenArtisanProducts,
  initialArtisanId,
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<FlowStep>(
    initialArtisanId ? 'CONVERSATION' : 'POST_INPUT'
  );

  // Requirement raw input
  const [rawText, setRawText] = useState(
    'Looking for 100 authentic handmade clay lamps (diyas) for a community festival in Hyderabad. Budget is around ₹20,000, needed in 10 days.'
  );
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  // Extracted Requirement parameters (Prompt Part 9 specifications)
  const [extractedProductType, setExtractedProductType] = useState('Handmade Clay Lamps');
  const [extractedQuantity, setExtractedQuantity] = useState(100);
  const [extractedBudget, setExtractedBudget] = useState(20000);
  const [extractedLocation, setExtractedLocation] = useState('Hyderabad');
  const [extractedTimeline, setExtractedTimeline] = useState('10 Days');
  const [isEditingExtracted, setIsEditingExtracted] = useState(false);

  // Selected Artisan for Profile/Conversation
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanMatch>(
    INITIAL_ARTISAN_MATCHES.find((a) => a.artisanId === initialArtisanId) ||
      INITIAL_ARTISAN_MATCHES[0]
  );

  // Conversation Messages
  const [chatMessages, setChatMessages] = useState<ConversationMessage[]>(
    INITIAL_CONVERSATION['ravi-kumar'] || []
  );
  const [chatInput, setChatInput] = useState('');
  const [isVoiceChatRecording, setIsVoiceChatRecording] = useState(false);

  // Voice recording for prompt input
  const handleVoiceInput = () => {
    audioService.playCeramicChime(360);
    setIsVoiceRecording(true);

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const rec = new (window as any).webkitSpeechRecognition();
      rec.lang = 'en-US';
      rec.onresult = (e: any) => {
        setRawText(e.results[0][0].transcript);
        setIsVoiceRecording(false);
      };
      rec.onerror = () => setIsVoiceRecording(false);
      rec.onend = () => setIsVoiceRecording(false);
      rec.start();
    } else {
      setTimeout(() => {
        setRawText(
          'I need 100 handmade clay oil lamps delivered to Hyderabad within 10 days, budget ₹20,000.'
        );
        setIsVoiceRecording(false);
      }, 1500);
    }
  };

  // Submit Requirement -> Trigger Part 9 Intermediate AI Processing Screen
  const handleSubmitRequirement = () => {
    audioService.playCeramicChime(420);
    setCurrentStep('AI_ANALYZING');

    setTimeout(() => {
      audioService.playCeramicChime(520);
      setCurrentStep('AI_EXTRACTED_REVIEW');
    }, 1800);
  };

  // Find Matching Artisans -> Part 10
  const handleFindMatches = () => {
    audioService.playCeramicChime(460);
    setCurrentStep('MATCH_RESULTS');
  };

  // View Artisan Profile -> Part 11
  const handleViewArtisan = (artisan: ArtisanMatch) => {
    setSelectedArtisan(artisan);
    audioService.playTactileTap();
    setCurrentStep('ARTISAN_PROFILE');
  };

  // Connect / Open Conversation with Artisan
  const handleStartConversation = (artisan: ArtisanMatch) => {
    setSelectedArtisan(artisan);
    audioService.playCeramicChime(440);
    setCurrentStep('CONVERSATION');
  };

  // Send message in chat
  const handleSendChatMessage = (text: string) => {
    if (!text.trim()) return;

    audioService.playTactileTap();
    const newMsg: ConversationMessage = {
      id: `c-${Date.now()}`,
      artisanId: selectedArtisan.artisanId,
      sender: 'buyer',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Artisan reply simulation
    setTimeout(() => {
      audioService.playCeramicChime(380);
      const replyMsg: ConversationMessage = {
        id: `art-reply-${Date.now()}`,
        artisanId: selectedArtisan.artisanId,
        sender: 'artisan',
        text: `Namaste! I have reviewed your requirement for ${extractedQuantity} ${extractedProductType}. I will start curing the clay today!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6 animate-fadeIn">
      {/* Top Navigation bar */}
      <div className="flex items-center justify-between">
        <button
          id="req-flow-back-btn"
          onClick={() => {
            audioService.playTactileTap();
            if (currentStep === 'POST_INPUT') onBackToHome();
            else if (currentStep === 'AI_EXTRACTED_REVIEW') setCurrentStep('POST_INPUT');
            else if (currentStep === 'MATCH_RESULTS') setCurrentStep('AI_EXTRACTED_REVIEW');
            else if (currentStep === 'ARTISAN_PROFILE') setCurrentStep('MATCH_RESULTS');
            else if (currentStep === 'CONVERSATION') setCurrentStep('MATCH_RESULTS');
            else onBackToHome();
          }}
          className="h-10 px-3 rounded-xl bg-white border border-[#E6DDD4] hover:bg-[#F5EFEB] text-xs font-bold text-[#2C1810] flex items-center gap-2 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {currentStep === 'POST_INPUT'
              ? 'Back to Home'
              : currentStep === 'CONVERSATION'
              ? 'Back to Matches'
              : 'Back'}
          </span>
        </button>

        <div className="text-xs font-extrabold text-[#C85A32] uppercase tracking-wider">
          {currentStep === 'POST_INPUT' && 'Step 1: Post Requirement'}
          {currentStep === 'AI_ANALYZING' && 'Understanding Requirement...'}
          {currentStep === 'AI_EXTRACTED_REVIEW' && 'Step 2: AI Requirement Analysis'}
          {currentStep === 'MATCH_RESULTS' && 'Step 3: Best Artisans'}
          {currentStep === 'ARTISAN_PROFILE' && 'Artisan Profile'}
          {currentStep === 'CONVERSATION' && 'Direct Artisan Conversation'}
        </div>
      </div>

      {/* ================= STEP 1: POST REQUIREMENT FORM ================= */}
      {currentStep === 'POST_INPUT' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DDD4] shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              AI Direct Matchmaking
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Post a Craft Requirement
            </h1>
            <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1">
              Describe what you need in plain words or voice. CraftBridge AI will analyze the materials, quantity, budget, and match you with verified rural artisans.
            </p>
          </div>

          {/* Direct Artisan Phone & Email Directory */}
          <div className="bg-[#F5EFEB]/40 rounded-2xl p-5 border border-[#E6DDD4] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-[#2C1810] flex items-center gap-1.5">
                  📞 Talk to Artisans Directly (Phone / Email)
                </h3>
                <p className="text-[11px] text-[#2C1810]/60">
                  Select an artisan below to call them, send an email directly, or open a live app chat.
                </p>
              </div>
              <span className="text-[10px] bg-[#3D6B52]/10 text-[#3D6B52] font-extrabold px-2 py-0.5 rounded-full border border-[#3D6B52]/20 self-start sm:self-auto uppercase tracking-wide">
                Direct Contact Enabled
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INITIAL_ARTISAN_MATCHES.map((artisan) => (
                <div
                  key={artisan.id}
                  className="bg-white rounded-xl border border-[#E6DDD4] p-4 flex flex-col justify-between space-y-3 hover:border-[#C85A32]/40 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={artisan.avatar}
                      alt={artisan.artisanName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E6DDD4] flex-shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-xs font-black text-[#2C1810] truncate">
                        {artisan.artisanName}
                      </h4>
                      <p className="text-[10px] text-[#C85A32] font-bold truncate">
                        {artisan.craftSpecialization}
                      </p>
                      <p className="text-[9px] text-[#2C1810]/50 font-semibold truncate">
                        📍 {artisan.location}
                      </p>
                    </div>
                  </div>

                  {/* Direct Contact Handles & Options */}
                  <div className="bg-[#FDFBF7] p-2 rounded-lg border border-[#E6DDD4]/60 text-[10px] font-bold space-y-1 text-[#2C1810]/80">
                    <div className="flex items-center justify-between gap-1">
                      <span>📞 Phone:</span>
                      <a
                        href={`tel:${artisan.phone}`}
                        onClick={() => audioService.playClickSound()}
                        className="text-[#C85A32] hover:underline"
                      >
                        {artisan.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between gap-1 min-w-0">
                      <span>✉️ Email:</span>
                      <a
                        href={`mailto:${artisan.email}?subject=CraftBridge Inquiry`}
                        onClick={() => audioService.playClickSound()}
                        className="text-[#3D6B52] hover:underline truncate max-w-[120px]"
                        title={artisan.email}
                      >
                        {artisan.email}
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {/* Call Directly Dial button */}
                    <a
                      href={`tel:${artisan.phone}`}
                      onClick={() => audioService.playCeramicChime(440)}
                      className="h-8 rounded-lg bg-[#C85A32]/10 hover:bg-[#C85A32]/20 text-[#C85A32] text-[10px] font-black flex items-center justify-center gap-1 transition-all text-center"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Now</span>
                    </a>

                    {/* Chat directly button */}
                    <button
                      type="button"
                      onClick={() => {
                        handleStartConversation(artisan);
                      }}
                      className="h-8 rounded-lg bg-[#3D6B52]/10 hover:bg-[#3D6B52]/20 text-[#3D6B52] text-[10px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>App Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#2C1810]/70 uppercase tracking-wider">
              Describe Your Custom or Bulk Order
            </label>
            <div className="relative">
              <textarea
                id="req-raw-input"
                rows={4}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="E.g., I need 100 handmade clay oil lamps for Diwali delivered to Hyderabad within 10 days. My budget is ₹20,000."
                className="w-full p-4 pr-14 rounded-2xl border-2 border-[#E6DDD4] focus:border-[#C85A32] text-sm text-[#2C1810] focus:outline-none bg-[#FDFBF7]"
              />
              <button
                id="req-voice-btn"
                onClick={handleVoiceInput}
                className={`absolute right-3 bottom-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isVoiceRecording
                    ? 'bg-[#C85A32] text-white animate-pulse'
                    : 'bg-[#F5EFEB] text-[#C85A32] hover:bg-[#EDE7E3]'
                }`}
                title="Speak Requirement"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#2C1810]/60">
            <span className="text-[#C85A32] font-bold">Quick Examples:</span>
            <button
              onClick={() =>
                setRawText('Need 50 Pochampally Ikat cotton stoles for a corporate wedding gift.')
              }
              className="hover:underline bg-[#F5EFEB] px-2.5 py-1 rounded-lg"
            >
              • 50 Ikat Cotton Stoles
            </button>
            <button
              onClick={() =>
                setRawText('Looking for 20 carved Sheesham wooden spice boxes with brass inlays.')
              }
              className="hover:underline bg-[#F5EFEB] px-2.5 py-1 rounded-lg"
            >
              • 20 Carved Wooden Boxes
            </button>
          </div>

          <button
            id="req-submit-btn"
            onClick={handleSubmitRequirement}
            className="w-full h-14 rounded-2xl bg-[#C85A32] text-white text-base font-extrabold hover:bg-[#b54f2a] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Analyze Requirement with AI</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ================= STEP 2A: PART 9 AI PROCESSING ANIMATION ================= */}
      {currentStep === 'AI_ANALYZING' && (
        <div className="bg-white p-10 rounded-3xl border border-[#E6DDD4] text-center space-y-6 shadow-sm py-16">
          <div className="w-20 h-20 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/20 flex items-center justify-center text-3xl mx-auto animate-pulse">
            <Sparkles className="w-10 h-10 text-[#C85A32] animate-spin" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#2C1810]">
              CraftBridge AI is Understanding Your Requirement
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810]/70 max-w-md mx-auto">
              Extracting product taxonomy, quantity, geographical delivery constraints, and fair-wage price tolerance...
            </p>
          </div>

          {/* Processing Steps Checklist */}
          <div className="max-w-xs mx-auto space-y-2 text-left text-xs font-semibold text-[#2C1810]">
            <div className="flex items-center gap-2 text-[#3D6B52]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Parsing craft materials and techniques</span>
            </div>
            <div className="flex items-center gap-2 text-[#3D6B52]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Analyzing bulk capacity and kiln requirements</span>
            </div>
            <div className="flex items-center gap-2 text-[#C85A32] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping ml-1 mr-1" />
              <span>Filtering verified regional artisan clusters</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2B: PART 9 AI REQUIREMENT ANALYSIS INTERMEDIATE SCREEN ================= */}
      {currentStep === 'AI_EXTRACTED_REVIEW' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DDD4] shadow-xs space-y-6 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52] mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AI Understanding Verified
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
                CraftBridge AI Requirement Analysis
              </h2>
              <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1">
                Here is how our AI understood your request. You can confirm or adjust any details before finding artisans.
              </p>
            </div>

            <button
              onClick={() => {
                audioService.playTactileTap();
                setIsEditingExtracted(!isEditingExtracted);
              }}
              className="h-9 px-3 rounded-xl border border-[#E6DDD4] text-xs font-bold text-[#2C1810] hover:bg-[#F5EFEB] flex items-center gap-1.5"
            >
              <Edit2 className="w-3 h-3 text-[#C85A32]" />
              <span>{isEditingExtracted ? 'Done Editing' : 'Edit Details'}</span>
            </button>
          </div>

          {/* Extracted Information Cards (Prompt Part 9 specifications) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Type */}
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6DDD4] space-y-1">
              <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase tracking-wider block">
                Product Type
              </span>
              {isEditingExtracted ? (
                <input
                  type="text"
                  value={extractedProductType}
                  onChange={(e) => setExtractedProductType(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#C85A32] text-sm font-bold bg-white"
                />
              ) : (
                <div className="text-base font-extrabold text-[#2C1810] flex items-center gap-2">
                  <span>🏺</span>
                  <span>{extractedProductType}</span>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6DDD4] space-y-1">
              <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase tracking-wider block">
                Quantity
              </span>
              {isEditingExtracted ? (
                <input
                  type="number"
                  value={extractedQuantity}
                  onChange={(e) => setExtractedQuantity(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-[#C85A32] text-sm font-bold bg-white"
                />
              ) : (
                <div className="text-base font-extrabold text-[#2C1810] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C85A32]" />
                  <span>{extractedQuantity} Units</span>
                </div>
              )}
            </div>

            {/* Budget */}
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6DDD4] space-y-1">
              <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase tracking-wider block">
                Budget
              </span>
              {isEditingExtracted ? (
                <input
                  type="number"
                  value={extractedBudget}
                  onChange={(e) => setExtractedBudget(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-[#C85A32] text-sm font-bold bg-white"
                />
              ) : (
                <div className="text-base font-extrabold text-[#2C1810] flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#3D6B52]" />
                  <span>₹{extractedBudget.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6DDD4] space-y-1">
              <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase tracking-wider block">
                Location
              </span>
              {isEditingExtracted ? (
                <input
                  type="text"
                  value={extractedLocation}
                  onChange={(e) => setExtractedLocation(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#C85A32] text-sm font-bold bg-white"
                />
              ) : (
                <div className="text-base font-extrabold text-[#2C1810] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C85A32]" />
                  <span>{extractedLocation}</span>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6DDD4] space-y-1">
              <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase tracking-wider block">
                Timeline
              </span>
              {isEditingExtracted ? (
                <input
                  type="text"
                  value={extractedTimeline}
                  onChange={(e) => setExtractedTimeline(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#C85A32] text-sm font-bold bg-white"
                />
              ) : (
                <div className="text-base font-extrabold text-[#2C1810] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C85A32]" />
                  <span>{extractedTimeline} (Rush Festive Production Window)</span>
                </div>
              )}
            </div>
          </div>

          <button
            id="find-matching-artisans-btn"
            onClick={handleFindMatches}
            className="w-full h-14 rounded-2xl bg-[#C85A32] text-white text-base font-extrabold hover:bg-[#b54f2a] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Find Matching Artisans</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ================= STEP 3: PART 10 AI ARTISAN MATCH RESULTS ================= */}
      {currentStep === 'MATCH_RESULTS' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Artisan Matches Found
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Best Artisans for Your Requirement
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1">
              Ranked with transparent AI explanations so you know exactly why each maker was selected.
            </p>
          </div>

          <div className="space-y-4">
            {INITIAL_ARTISAN_MATCHES.map((match) => (
              <div
                key={match.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E6DDD4] shadow-xs hover:border-[#C85A32] transition-all space-y-4"
              >
                {/* Header row: Avatar, Name, Specialization, Match Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={match.avatar}
                      alt={match.artisanName}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#E6DDD4] flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-lg font-extrabold text-[#2C1810]">
                        {match.artisanName}
                      </h3>
                      <p className="text-xs font-semibold text-[#C85A32]">
                        {match.craftSpecialization} • {match.location}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-[#2C1810]/60 mt-0.5">
                        <span>{match.experienceYears} Years Heritage</span>
                        <span>•</span>
                        <span className="font-bold text-[#3D6B52] flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-[#3D6B52]" /> {match.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="px-4 py-2 rounded-2xl bg-[#3D6B52]/10 border border-[#3D6B52]/20 text-[#3D6B52] text-sm font-extrabold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>{match.matchScore}% Match</span>
                    </div>
                  </div>
                </div>

                {/* Explicit Reasons Section (Prompt requirement: display reasons why they matched) */}
                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6DDD4] space-y-2">
                  <span className="text-[10px] font-extrabold text-[#2C1810]/50 uppercase tracking-wider block">
                    Why this match:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {match.reasons.map((reason, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-semibold text-[#2C1810]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3D6B52] flex-shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E6DDD4]">
                  <span className="text-xs text-[#2C1810]/60">
                    Typical response: <strong className="text-[#2C1810]">{match.responseTime}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartConversation(match)}
                      className="h-10 px-3.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EDE7E3] text-xs font-bold text-[#2C1810] transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#C85A32]" />
                      <span>Chat</span>
                    </button>

                    <button
                      id={`view-artisan-btn-${match.id}`}
                      onClick={() => handleViewArtisan(match)}
                      className="h-10 px-4 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <span>View Artisan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= STEP 4: PART 11 ARTISAN PROFILE FOR BUYERS ================= */}
      {currentStep === 'ARTISAN_PROFILE' && (
        <div className="bg-white rounded-3xl border border-[#E6DDD4] overflow-hidden shadow-xs space-y-6 animate-fadeIn">
          {/* Cover Header */}
          <div className="bg-gradient-to-r from-[#2C1810] to-[#5a3325] p-6 sm:p-8 text-white relative">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-10">
              <img
                src={selectedArtisan.avatar}
                alt={selectedArtisan.artisanName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#3D6B52] text-white">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Master Artisan
                </div>
                <h1 className="text-2xl font-extrabold">{selectedArtisan.artisanName}</h1>
                <p className="text-xs text-white/80 font-medium">
                  {selectedArtisan.craftSpecialization} • {selectedArtisan.location}
                </p>
                <div className="flex items-center gap-3 text-xs pt-1">
                  <span className="font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {selectedArtisan.rating} (48 verified commissions)
                  </span>
                  <span>•</span>
                  <span>Response: {selectedArtisan.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details & Story */}
          <div className="p-6 sm:p-8 pt-0 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-[#2C1810] uppercase tracking-wider">
                Artisan Lineage &amp; Heritage Story
              </h3>
              <p className="text-sm text-[#2C1810]/80 leading-relaxed bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6DDD4]">
                {selectedArtisan.bio}
              </p>
            </div>

            {/* Specialization & Products */}
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-[#2C1810] uppercase tracking-wider">
                Signature Craft Offerings
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedArtisan.products.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#F5EFEB] text-xs font-bold text-[#2C1810] border border-[#E6DDD4]"
                  >
                    🏺 {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E6DDD4] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#2C1810]/60">
                Direct inquiry with no intermediaries or commissions.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleStartConversation(selectedArtisan)}
                  className="flex-1 sm:flex-none h-12 px-6 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b54f2a] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Artisan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 5: PART 11 BUYER-ARTISAN CONVERSATION SCREEN ================= */}
      {currentStep === 'CONVERSATION' && (
        <div className="bg-white rounded-3xl border border-[#E6DDD4] overflow-hidden shadow-xs flex flex-col min-h-[550px] animate-fadeIn">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-[#E6DDD4] bg-[#FDFBF7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedArtisan.avatar}
                alt={selectedArtisan.artisanName}
                className="w-10 h-10 rounded-xl object-cover border border-[#E6DDD4]"
              />
              <div>
                <h3 className="font-extrabold text-sm text-[#2C1810]">
                  {selectedArtisan.artisanName}
                </h3>
                <p className="text-[11px] text-[#3D6B52] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#3D6B52] animate-pulse" />
                  Online in Workshop • {selectedArtisan.location}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-bold text-[#C85A32] bg-[#C85A32]/10 px-2.5 py-1 rounded-lg">
              Requirement Inquiry: 100 Clay Lamps
            </span>
          </div>

          {/* Messages Stream */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 bg-[#FAF7F2]">
            {chatMessages.map((msg) => {
              const isBuyer = msg.sender === 'buyer';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isBuyer ? 'justify-end' : 'justify-start'}`}
                >
                  {!isBuyer && (
                    <img
                      src={selectedArtisan.avatar}
                      alt={selectedArtisan.artisanName}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0 mt-1"
                    />
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 shadow-2xs ${
                      isBuyer
                        ? 'bg-[#C85A32] text-white rounded-br-xs'
                        : 'bg-white border border-[#E6DDD4] text-[#2C1810] rounded-bl-xs'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-bold flex items-center justify-between gap-3 ${
                        isBuyer ? 'text-white/80' : 'text-[#2C1810]/50'
                      }`}
                    >
                      <span>{isBuyer ? 'You (Buyer)' : selectedArtisan.artisanName}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>

                  {isBuyer && (
                    <div className="w-8 h-8 rounded-lg bg-[#2C1810] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                      🛍️
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-[#E6DDD4] bg-white flex items-center gap-2">
            <input
              id="buyer-chat-input"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Message ${selectedArtisan.artisanName}...`}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm text-[#2C1810] rounded-xl border border-[#E6DDD4] focus:outline-none focus:border-[#C85A32]"
              onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage(chatInput)}
            />

            <button
              onClick={() => {
                audioService.playCeramicChime(350);
                setIsVoiceChatRecording(true);
                setTimeout(() => {
                  setIsVoiceChatRecording(false);
                  handleSendChatMessage('Can you share a sample photograph of the sun-cured lamps?');
                }, 1500);
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isVoiceChatRecording
                  ? 'bg-[#C85A32] text-white animate-pulse'
                  : 'bg-[#F5EFEB] text-[#C85A32] hover:bg-[#EDE7E3]'
              }`}
              title="Voice Message"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              id="buyer-chat-send-btn"
              onClick={() => handleSendChatMessage(chatInput)}
              disabled={!chatInput.trim()}
              className="h-10 px-4 rounded-xl bg-[#2C1810] text-white text-xs font-bold hover:bg-black disabled:opacity-40 transition-all flex items-center gap-1"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
