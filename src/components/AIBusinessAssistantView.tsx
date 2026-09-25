import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  Send,
  ArrowLeft,
  Bot,
  User,
  Volume2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface AssistantMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  category?: 'sales' | 'inventory' | 'pricing' | 'recommendation';
}

interface Props {
  onBack: () => void;
}

export const AIBusinessAssistantView: React.FC<Props> = ({ onBack }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: t.businessAssistant.greetingMessage || 'Namaste! I am your CraftBridge AI Business Assistant. I monitor your kiln batches, orders, materials, and marketplace demand. Ask me anything about your artisan workshop!',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const suggestedQuestions = [
    t.businessAssistant.query1,
    t.businessAssistant.query2,
    t.businessAssistant.query3,
    t.businessAssistant.query4,
  ];

  const handleSendQuestion = (question: string) => {
    if (!question.trim()) return;

    audioService.playTactileTap();

    const userMsg: AssistantMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent AI response based on business dummy data
    setTimeout(() => {
      audioService.playCeramicChime(460);
      const lower = question.toLowerCase();
      let reply = '';
      let cat: 'sales' | 'inventory' | 'pricing' | 'recommendation' = 'recommendation';

      if (lower.includes('best-selling') || lower.includes('top product') || lower.includes('सबसे') || lower.includes('ಅತ್ಯುತ್ತಮ') || lower.includes('అత్యధికంగా') || lower.includes('அதிகமாக')) {
        reply =
          'Your best-selling craft is the Channapatna Hand-turned Dancing Doll (₹650). It has accounted for 38 units sold this month, contributing over ₹24,700 in direct artisan revenue with 5-star customer ratings.';
        cat = 'sales';
      } else if (lower.includes('produce more') || lower.includes('demand') || lower.includes('उत्पादन') || lower.includes('ಬೇಡಿಕೆ') || lower.includes('ఉత్పత్తి') || lower.includes('உற்பத்தி')) {
        reply =
          'With the upcoming heritage exhibition and wedding season, customer demand for Ramanagara Pure Silk Handloom Stoles (+48%) and Channapatna Raja-Rani Sets (+35%) is surging. I recommend preparing 25 additional stoles on your pit-looms.';
        cat = 'recommendation';
      } else if (lower.includes('low stock') || lower.includes('inventory') || lower.includes('स्टॉक') || lower.includes('ದಾಸ್ತಾನು') || lower.includes('స్టాక్') || lower.includes('கையிருப்பு')) {
        reply =
          'Attention: Your Bidriware Silver Inlaid Coaster Sets are down to 4 units (Low Stock Alert). Mysore Sandalwood Idols also have only 6 units remaining. Consider restocking raw zinc alloy and silver wire.';
        cat = 'inventory';
      } else if (lower.includes('sales') || lower.includes('revenue') || lower.includes('month') || lower.includes('बिक्री') || lower.includes('ಮಾರಾಟ') || lower.includes('అమ్మకాలు') || lower.includes('விற்பனை')) {
        reply =
          'Great performance! Your monthly revenue is currently ₹48,650 across 56 orders. Your estimated net profit is ₹18,400, which is a 22% increase compared to last month.';
        cat = 'sales';
      } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('कीमत') || lower.includes('ಬೆಲೆ') || lower.includes('ధర') || lower.includes('விலை')) {
        reply =
          'Based on national handcraft index and export benchmark pricing, your Dharwad Kasuti Hand-Embroidered Wall Hanging is currently valued at ₹1,850. You can comfortably price it at ₹2,200 with verified GI tag provenance certification.';
        cat = 'pricing';
      } else {
        reply = `I have analyzed your workshop records: your heritage production pipeline is active with Ramanagara Silk, Channapatna Lacquerware, and Bidriware. Overall sales momentum is up +22%. Let me know if you need specific pricing, raw material sourcing, or marketing guidance!`;
      }

      const aiMsg: AssistantMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: cat,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 900);
  };

  const handleVoiceInput = () => {
    audioService.playCeramicChime(360);
    setIsListening(true);

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setIsListening(false);
        handleSendQuestion(text);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      setTimeout(() => {
        setIsListening(false);
        handleSendQuestion(t.businessAssistant.query1);
      }, 1500);
    }
  };

  const handleSpeakAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          id="assistant-back-btn"
          onClick={() => {
            audioService.playTactileTap();
            onBack();
          }}
          className="h-10 px-3 rounded-xl bg-white border border-[#E6DDD4] hover:bg-[#F5EFEB] text-xs font-bold text-[#2C1810] flex items-center gap-2 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back}</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52]">
          <span className="w-2 h-2 rounded-full bg-[#3D6B52] animate-pulse" />
          Artisan Intelligence Online
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2C1810] to-[#45271d] p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-white mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            Advisory Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.businessAssistant.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-md font-sans">
            {t.businessAssistant.subtitle}
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 text-7xl opacity-10 pointer-events-none select-none">
          📊
        </div>
      </div>

      {/* Suggested Question Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#2C1810]/60 uppercase tracking-wider block">
          {t.businessAssistant.suggestedQueriesTitle}
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuestion(q)}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E6DDD4] hover:border-[#C85A32] hover:bg-[#FDFBF7] text-xs font-semibold text-[#2C1810] transition-all shadow-2xs text-left"
            >
              💬 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation History Area */}
      <div className="space-y-4 min-h-[320px] bg-[#FDFBF7] p-4 sm:p-6 rounded-3xl border border-[#E6DDD4]">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-9 h-9 rounded-xl bg-[#C85A32] text-white flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                  🏺
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isAI
                    ? 'bg-white border border-[#E6DDD4] text-[#2C1810] shadow-2xs'
                    : 'bg-[#C85A32] text-white font-medium'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-70">
                  <span className="font-bold">{isAI ? 'CraftBridge AI' : 'You'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-line">{msg.text}</p>

                {isAI && (
                  <div className="pt-2 border-t border-[#E6DDD4]/60 flex items-center justify-between">
                    <button
                      onClick={() => handleSpeakAloud(msg.text)}
                      className="text-[11px] font-bold text-[#C85A32] hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t.marketplace.listenStory}</span>
                    </button>
                    {msg.category && (
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3D6B52] bg-[#3D6B52]/10 px-2 py-0.5 rounded">
                        {msg.category}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {!isAI && (
                <div className="w-9 h-9 rounded-xl bg-[#2C1810] text-white flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0">
                  👨‍🎨
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Bar with Voice Button */}
      <div className="bg-white p-3 rounded-2xl border-2 border-[#E6DDD4] focus-within:border-[#C85A32] transition-all shadow-xs flex items-center gap-2">
        <input
          id="assistant-query-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.businessAssistant.inputPlaceholder}
          className="flex-1 px-3 py-2 text-sm text-[#2C1810] focus:outline-none bg-transparent"
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion(inputText)}
        />

        <button
          id="assistant-voice-input-btn"
          onClick={handleVoiceInput}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            isListening
              ? 'bg-[#C85A32] text-white animate-pulse'
              : 'bg-[#F5EFEB] text-[#C85A32] hover:bg-[#EDE7E3]'
          }`}
          title={t.voiceStock.tapToSpeak}
        >
          <Mic className="w-5 h-5" />
        </button>

        <button
          id="assistant-send-btn"
          onClick={() => handleSendQuestion(inputText)}
          disabled={!inputText.trim()}
          className="h-11 px-4 rounded-xl bg-[#2C1810] text-white text-xs font-bold hover:bg-black disabled:opacity-40 transition-all flex items-center gap-1.5"
        >
          <span>{t.businessAssistant.sendBtn}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
