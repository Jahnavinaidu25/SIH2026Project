import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { audioService } from '../utils/audioService';
import { AppUser } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  onLoginSuccess: (user: AppUser) => void;
  onBackToLanding: () => void;
}

export const AdminLoginView: React.FC<Props> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const { language, setLanguage } = useTranslation();
  const [email, setEmail] = useState('admin@craftbridge.in');
  const [password, setPassword] = useState('admin123');

  const localT = {
    en: {
      back: '← Back to Home',
      governance: 'Governance Portal',
      title: 'Platform Admin Login',
      desc: 'Monitor 1,248+ rural artisans, evaluate catalog quality, track live buyer requirements, and inspect marketplace previews.',
      demoTitle: 'SIH Quick Test',
      demoDesc: 'Log in as Platform Administrator',
      demoBtn: 'Try Demo Admin',
      emailLabel: 'Admin Email',
      passLabel: 'Password',
      submitBtn: 'Enter Admin Dashboard',
    },
    hi: {
      back: '← होम पर वापस जाएं',
      governance: 'गवर्नेंस पोर्टल',
      title: 'प्लेटफ़ॉर्म एडमिन लॉगिन',
      desc: '1,248+ ग्रामीण कारीगरों की निगरानी करें, कैटलॉग गुणवत्ता का मूल्यांकन करें, लाइव खरीदार आवश्यकताओं को ट्रैक करें, और बाज़ार पूर्वावलोकन का निरीक्षण करें।',
      demoTitle: 'SIH त्वरित परीक्षण',
      demoDesc: 'प्लेटफ़ॉर्म एडमिन के रूप में लॉगिन करें',
      demoBtn: 'डेमो एडमिन आज़माएं',
      emailLabel: 'एडमिन ईमेल',
      passLabel: 'पासवर्ड',
      submitBtn: 'एडमिन डैशबोर्ड में प्रवेश करें',
    },
    kn: {
      back: '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
      governance: 'ಆಡಳಿತ ಪೋರ್ಟಲ್',
      title: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ನಿರ್ವಾಹಕ ಲಾಗಿನ್',
      desc: '1,248+ ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ, ಕ್ಯಾಟಲಾಗ್ ಗುಣಮಟ್ಟವನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ, ನೇರ ಖರೀದಿದಾರರ ಅಗತ್ಯಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮುನ್ನೋಟಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
      demoTitle: 'SIH ತ್ವರಿತ ಪರೀಕ್ಷೆ',
      demoDesc: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ನಿರ್ವಾಹಕರಾಗಿ ಲಾಗ್ ಇನ್ ಮಾಡಿ',
      demoBtn: 'ಡೆಮೊ ನಿರ್ವಾಹಕ ಪ್ರಯತ್ನಿಸಿ',
      emailLabel: 'ನಿರ್ವಾಹಕ ಇಮೇಲ್',
      passLabel: 'ಪಾಸ್‌ವರ್ಡ್',
      submitBtn: 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ',
    },
    ta: {
      back: '← முகப்புக்குத் திரும்பு',
      governance: 'நிர்வாக போர்டல்',
      title: 'தள நிர்வாகி உள்நுழைவு',
      desc: '1,248+ கிராமப்புற கைவினைஞர்களைக் கண்காணிக்கவும், பட்டியலின் தரத்தை மதிப்பிடவும், நேரடி வாங்குபவர் தேவைகளைக் கண்காணிக்கவும், மற்றும் சந்தை முன்னோட்டங்களை ஆய்வு செய்யவும்.',
      demoTitle: 'SIH விரைவான சோதனை',
      demoDesc: 'தள நிர்வாகியாக உள்நுழையவும்',
      demoBtn: 'டெமோ நிர்வாகியை முயற்சிக்கவும்',
      emailLabel: 'நிர்வாகி மின்னஞ்சல்',
      passLabel: 'கடவுச்சொல்',
      submitBtn: 'நிர்வாகி டாஷ்போர்டிற்குள் நுழையவும்',
    },
    te: {
      back: '← హోమ్‌కి తిరిగి వెళ్లు',
      governance: 'పరిపాలన పోర్టల్',
      title: 'ప్లాట్‌ఫార్మ్ అడ్మిన్ లాగిన్',
      desc: '1,248+ గ్రామీణ కళాకారులను పర్యవేక్షించండి, కేటలాగ్ నాణ्यతను అంచనా వేయండి, ప్రత్యక్ష కొనుగోలుదారు అవసరాలను ట్రాక్ చేయండి మరియు మార్కెట్‌ప్లేస్ ప్రివ్యూలను తనిఖీ చేయండి.',
      demoTitle: 'SIH త్వరిత పరీక్ష',
      demoDesc: 'ప్లాట్‌ఫార్మ్ అడ్మిన్‌గా లాగిన్ అవ్వండి',
      demoBtn: 'డెమో అడ్మిన్ ప్రయత్నించండి',
      emailLabel: 'అడ్మిన్ ఈమెయిల్',
      passLabel: 'పాస్‌వర్డ్',
      submitBtn: 'అడ్మిన్ డాష్‌బోర్డ్ ప్రవేశించండి',
    },
    ml: {
      back: '← ഹോമിലേക്ക് തിരികെ പോകുക',
      governance: 'ഭരണ വിഭാഗം പോർട്ടൽ',
      title: 'പ്ലാറ്റ്ഫോം അഡ്മിൻ ലോഗിൻ',
      desc: '1,248+ ഗ്രാമീണ കരകൗശല വിദഗ്ധരെ നിരീക്ഷിക്കുക, കാറ്റലോഗ് നിലവാരം വിലയിരുത്തുക, തത്സമയ ഉപഭോക്തൃ ആവശ്യങ്ങൾ പരിശോധിക്കുക, വിപണി വിവരങ്ങൾ വിലയിരുത്തുക.',
      demoTitle: 'SIH ദ്രുത പരിശോധന',
      demoDesc: 'പ്ലാറ്റ്ഫോം അഡ്മിനായി ലോഗിൻ ചെയ്യുക',
      demoBtn: 'ഡെമോ അഡ്മിൻ പരീക്ഷിക്കുക',
      emailLabel: 'അഡ്മിൻ ഇമെയിൽ',
      passLabel: 'പാസ്‌വേഡ്',
      submitBtn: 'അഡ്മിൻ ഡാഷ്‌ബോർഡിൽ പ്രവേശിക്കുക',
    }
  };

  const currentT = localT[language] || localT.en;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playTactileTap();

    const adminUser: AppUser = {
      id: 'admin-1',
      name: 'System Administrator',
      email: email,
      role: 'admin',
      location: 'Central Monitoring Hub',
    };

    onLoginSuccess(adminUser);
  };

  const handleDemoAdmin = () => {
    audioService.playTactileTap();
    const demoAdmin: AppUser = {
      id: 'admin-1',
      name: 'CraftBridge Platform Admin',
      email: 'admin@craftbridge.in',
      role: 'admin',
      location: 'Bengaluru Operations Hub',
    };
    onLoginSuccess(demoAdmin);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-10 px-4 sm:px-6">
      <div className="max-w-md w-full mx-auto">
        {/* Quick Language Switcher Bar directly inside Admin Login Page */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-[10px] font-bold text-[#2C1810]/50 uppercase tracking-wider">
            🌐 Quick Language Selection
          </div>
          <div className="flex gap-1.5">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'kn', label: 'ಕನ್ನಡ' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  audioService.playClickSound();
                  setLanguage(lang.code as any);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
                  language === lang.code
                    ? 'bg-[#2C1810] text-[#FDFBF7] border-[#2C1810] shadow-xs'
                    : 'bg-white text-[#2C1810]/70 border-[#E6DDD4] hover:bg-[#F5EFEB]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              audioService.playClickSound();
              onBackToLanding();
            }}
            className="text-xs font-bold text-[#2C1810]/70 hover:text-[#2C1810] flex items-center gap-1.5 transition-colors"
          >
            {currentT.back}
          </button>
          <span className="text-xs font-extrabold text-[#2C1810] uppercase tracking-wider">
            {currentT.governance}
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#2C1810]/10 border border-[#2C1810]/20 flex items-center justify-center text-3xl mx-auto mb-3 shadow-xs">
              📊
            </div>
            <h1 className="text-2xl font-extrabold text-[#2C1810] tracking-tight">
              {currentT.title}
            </h1>
            <p className="text-xs text-[#2C1810]/70 mt-1 max-w-xs mx-auto">
              {currentT.desc}
            </p>
          </div>

          {/* Quick Demo Admin Button */}
          <div className="mb-6 p-3.5 rounded-2xl bg-[#F5EFEB] border border-[#2C1810]/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold text-[#2C1810] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentT.demoTitle}</span>
              </div>
              <div className="text-[11px] text-[#2C1810]/70 font-medium">
                {currentT.demoDesc}
              </div>
            </div>
            <button
              type="button"
              id="try-demo-admin-btn"
              onClick={handleDemoAdmin}
              className="px-3.5 py-1.5 rounded-xl bg-[#2C1810] text-white text-xs font-extrabold hover:bg-black transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0 active:scale-95 cursor-pointer"
            >
              <span>{currentT.demoBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2C1810] mb-1">
                {currentT.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#2C1810]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@craftbridge.in"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#2C1810]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C1810] mb-1">
                {currentT.passLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#2C1810]/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#2C1810]"
                />
              </div>
            </div>

            <button
              type="submit"
              id="admin-login-submit-btn"
              className="w-full py-3 rounded-xl bg-[#2C1810] text-[#FDFBF7] text-xs font-extrabold hover:bg-black transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>{currentT.submitBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
