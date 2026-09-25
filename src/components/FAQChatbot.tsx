import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, HelpCircle, Bot, Globe } from 'lucide-react';
import { audioService } from '../utils/audioService';

interface FAQItem {
  questionEn: string;
  questionKn: string;
  questionHi: string;
  answerEn: string;
  answerKn: string;
  answerHi: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    questionEn: 'How does Voice Digitization work?',
    questionKn: 'ಧ್ವನಿ ಡಿಜಿಟಲೀಕರಣ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?',
    questionHi: 'वॉइस डिजिटलीकरण कैसे काम करता है?',
    answerEn:
      'Simply speak in your native dialect (Kannada, Hindi, English). Our AI detects craft lineage, raw materials, extracts dimensions, translates to multiple languages, and formats e-commerce catalog listings automatically.',
    answerKn:
      'ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ (ಕನ್ನಡ, ಹಿಂದಿ, ಇಂಗ್ಲಿಷ್). ನಮ್ಮ AI ಕರಕುಶಲತೆ, ಕಚ್ಚಾ ವಸ್ತುಗಳನ್ನು ಗುರುತಿಸಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಟಲಾಗ್ ರಚಿಸುತ್ತದೆ.',
    answerHi:
      'बस अपनी मूल भाषा (कन्नड़, हिंदी, अंग्रेजी) में बोलें। हमारा AI शिल्प, कच्ची सामग्री की पहचान कर स्वचालित रूप से ई-कॉमर्स कैटलॉग तैयार करता है।',
  },
  {
    questionEn: 'How is the AI Recommended Price calculated?',
    questionKn: 'AI ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಲೆಯನ್ನು ಹೇಗೆ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ?',
    questionHi: 'AI अनुशंसित मूल्य की गणना कैसे की जाती है?',
    answerEn:
      'The engine computes baseline raw material costs (clay, cotton, pigments), direct handcrafting labor hours, and historical buyer demand trends to ensure at least 85% fair wages go directly to the artisan.',
    answerKn:
      'ಇಂಜಿನ್ ಕಚ್ಚಾ ವಸ್ತುಗಳ ವೆಚ್ಚ, ಕುಶಲಕರ್ಮಿಗಳ ಶ್ರಮದ ಸಮಯ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಕನಿಷ್ಠ 85% ನ್ಯಾಯಯುತ ವೇತನ ಸಿಗುವಂತೆ ಮಾಡುತ್ತದೆ.',
    answerHi:
      'यह कच्ची सामग्री की लागत, कारीगर के श्रम के घंटे और बाजार की मांग का विश्लेषण कर कारीगर के लिए 85% उचित मजदूरी सुनिश्चित करता है।',
  },
  {
    questionEn: 'What is B2B Requirement Matching for Buyers?',
    questionKn: 'ಖರೀದಿದಾರರಿಗೆ B2B ಅಗತ್ಯತೆ ಹೊಂದಾಣಿಕೆ ಎಂದರೇನು?',
    questionHi: 'खरीदारों के लिए B2B आवश्यकता मिलान क्या है?',
    answerEn:
      'Buyers specify quantity, budget, and delivery timelines. Our AI scores artisan capabilities (material mastery, kiln capacity, past rating) and connects buyers directly with matched certified rural makers.',
    answerKn:
      'ಖರೀದಿದಾರರು ಪ್ರಮಾಣ ಮತ್ತು ಬಜೆಟ್ ತಿಳಿಸಿದಾಗ, AI ಸೂಕ್ತ ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳನ್ನು ಹುಡುಕಿ ನೇರ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುತ್ತದೆ.',
    answerHi:
      'खरीदार मात्रा और बजट दर्ज करते हैं, और हमारा AI उपयुक्त ग्रामीण कारीगरों से सीधे संवाद और आपूर्ति का मिलान करता है।',
  },
  {
    questionEn: 'Can I sell on Amazon and Flipkart too?',
    questionKn: 'ನಾನು Amazon ಮತ್ತು Flipkart ನಲ್ಲೂ ಮಾರಾಟ ಮಾಡಬಹುದೇ?',
    questionHi: 'क्या मैं Amazon और Flipkart पर भी बेच सकता हूँ?',
    answerEn:
      'Yes! Through "Sell Everywhere", CraftBridge automatically generates formatted titles, bullet points, and category specifications tailored for Amazon India and Flipkart Seller hubs.',
    answerKn:
      'ಹೌದು! "Sell Everywhere" ಮೂಲಕ Amazon ಮತ್ತು Flipkart ಗಾಗಿ AI ಆಧಾರಿತ ಪಟ್ಟಿಯನ್ನು ತಕ್ಷಣ ಪಡೆಯಬಹುದು.',
    answerHi:
      'हाँ! "Sell Everywhere" सुविधा के माध्यम से Amazon और Flipkart के लिए उपयुक्त शीर्षक और विवरण तुरंत तैयार होते हैं।',
  },
];

export const FAQChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [botLang, setBotLang] = useState<'en' | 'kn' | 'hi'>('en');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Namaste! I am your CraftBridge AI Assistant. Tap any common question or ask about crafts, pricing, or B2B matching.',
    },
  ]);
  const [customInput, setCustomInput] = useState('');

  const toggleOpen = () => {
    audioService.playClickSound();
    setIsOpen(!isOpen);
  };

  const handleSelectFaq = (faq: FAQItem) => {
    audioService.playClickSound();
    const qText =
      botLang === 'kn' ? faq.questionKn : botLang === 'hi' ? faq.questionHi : faq.questionEn;
    const aText =
      botLang === 'kn' ? faq.answerKn : botLang === 'hi' ? faq.answerHi : faq.answerEn;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: qText },
      { sender: 'bot', text: aText },
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    audioService.playClickSound();
    const text = customInput;
    setCustomInput('');

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: text },
      {
        sender: 'bot',
        text:
          botLang === 'kn'
            ? 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಶೀಘ್ರದಲ್ಲೇ AI ಸಹಾಯಕರಿಂದ ಸಂಪೂರ್ಣ ಉತ್ತರ ನೀಡಲಾಗುವುದು.'
            : botLang === 'hi'
            ? 'धन्यवाद! आपकी सहायता के लिए CraftBridge AI सदैव तत्पर है।'
            : 'Thank you for asking! CraftBridge AI connects conscious patrons directly with rural artisans across India with complete fair-wage transparency.',
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          id="faq-chatbot-open-btn"
          className="h-13 px-4 rounded-full bg-[#2C1810] text-[#FDFBF7] shadow-xl hover:bg-black transition-all flex items-center gap-2 border border-[#E6DDD4]/40 active:scale-95 group"
        >
          <div className="w-8 h-8 rounded-full bg-[#C85A32] flex items-center justify-center text-white text-sm shadow-xs">
            💬
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-extrabold leading-tight">CraftBridge Help</div>
            <div className="text-[10px] text-[#C85A32] font-semibold">Voice & B2B FAQ</div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl bg-[#FDFBF7] border-2 border-[#E6DDD4] shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#2C1810] text-[#FDFBF7] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#C85A32] flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <h4 className="text-xs font-extrabold leading-tight">CraftBridge Assistant</h4>
                <span className="text-[10px] text-emerald-400 font-semibold">● Online • Multilingual</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white/10 rounded-lg p-0.5 text-[10px] font-bold">
                <button
                  onClick={() => setBotLang('en')}
                  className={`px-1.5 py-0.5 rounded ${botLang === 'en' ? 'bg-[#C85A32] text-white' : 'text-white/70'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setBotLang('kn')}
                  className={`px-1.5 py-0.5 rounded ${botLang === 'kn' ? 'bg-[#C85A32] text-white' : 'text-white/70'}`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  onClick={() => setBotLang('hi')}
                  className={`px-1.5 py-0.5 rounded ${botLang === 'hi' ? 'bg-[#C85A32] text-white' : 'text-white/70'}`}
                >
                  हिन्दी
                </button>
              </div>

              <button
                onClick={toggleOpen}
                className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#2C1810] text-white rounded-br-xs'
                      : 'bg-white border border-[#E6DDD4] text-[#2C1810] rounded-bl-xs shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick FAQ Pills */}
            <div className="pt-2">
              <span className="text-[10px] font-extrabold uppercase text-[#2C1810]/60 block mb-1.5">
                Suggested Questions:
              </span>
              <div className="space-y-1.5">
                {FAQ_DATA.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectFaq(faq)}
                    className="w-full text-left p-2 rounded-xl bg-white border border-[#E6DDD4] hover:border-[#C85A32] transition-colors text-[11px] font-bold text-[#2C1810] flex items-center justify-between gap-1"
                  >
                    <span className="line-clamp-1">
                      {botLang === 'kn'
                        ? faq.questionKn
                        : botLang === 'hi'
                        ? faq.questionHi
                        : faq.questionEn}
                    </span>
                    <span className="text-[#C85A32] flex-shrink-0">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendCustom} className="p-3 bg-white border-t border-[#E6DDD4] flex gap-2">
            <input
              type="text"
              placeholder={
                botLang === 'kn'
                  ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...'
                  : botLang === 'hi'
                  ? 'अपना प्रश्न यहाँ लिखें...'
                  : 'Ask a question...'
              }
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-[#C85A32] text-white flex items-center justify-center hover:bg-[#b04b25] transition-all flex-shrink-0 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
