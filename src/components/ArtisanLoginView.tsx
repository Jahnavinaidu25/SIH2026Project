import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, UserCheck, Lock, Mail, Phone, MapPin, Tag } from 'lucide-react';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { AppUser } from '../types';

interface Props {
  onLoginSuccess: (user: AppUser) => void;
  onBackToLanding: () => void;
  onSwitchToBuyer?: () => void;
  onSwitchToBuyerLogin?: () => void;
}

export const ArtisanLoginView: React.FC<Props> = ({
  onLoginSuccess,
  onBackToLanding,
  onSwitchToBuyer,
  onSwitchToBuyerLogin,
}) => {
  const { language, setLanguage } = useTranslation();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const localT = {
    en: {
      back: '← Back to Home',
      portalTitle: 'Artisan Portal',
      loginTitle: 'Artisan Workshop Login',
      registerTitle: 'Create Artisan Account',
      loginDesc: 'Welcome back. Manage your smart catalog, voice inventory, and buyer inquiries.',
      registerDesc: 'Register your workshop to digitize handmade crafts and receive B2B orders.',
      sihTest: 'SIH Quick Test',
      sihDesc: 'Log in as Master Ramesh (Pottery)',
      tryDemo: 'Try Demo Artisan',
      signInTab: 'Sign In',
      registerTab: 'Register Workshop',
      mobileEmailLabel: 'Mobile Number or Email',
      passwordLabel: 'Password',
      forgotPassword: 'Forgot Password?',
      loginBtn: 'Log In to Artisan Workshop',
      fullName: 'Full Name',
      mobile: 'Mobile',
      email: 'Email',
      craftCategory: 'Craft Category',
      location: 'Location',
      regPasswordPlaceholder: 'Create password',
      registerBtn: 'Create Artisan Account',
      buyerQuestion: 'Are you a conscious buyer? ',
      buyerBtn: 'Sign In as Buyer →',
    },
    hi: {
      back: '← होम पर वापस जाएं',
      portalTitle: 'कारीगर पोर्टल',
      loginTitle: 'कारीगर कार्यशाला लॉगिन',
      registerTitle: 'कारीगर खाता बनाएं',
      loginDesc: 'वापसी पर स्वागत है। अपने स्मार्ट कैटलॉग, वॉयस इन्वेंट्री और खरीदार पूछताछ का प्रबंधन करें।',
      registerDesc: 'हस्तनिर्मित शिल्प को डिजिटल बनाने और बी2बी ऑर्डर प्राप्त करने के लिए अपनी कार्यशाला का पंजीकरण करें।',
      sihTest: 'SIH त्वरित परीक्षण',
      sihDesc: 'मास्टर रमेश (पोटरी) के रूप में लॉगिन करें',
      tryDemo: 'डेमो कारीगर आज़माएं',
      signInTab: 'साइन इन करें',
      registerTab: 'कार्यशाला पंजीकृत करें',
      mobileEmailLabel: 'मोबाइल नंबर या ईमेल',
      passwordLabel: 'पासवर्ड',
      forgotPassword: 'पासवर्ड भूल गए?',
      loginBtn: 'कारीगर कार्यशाला में लॉगिन करें',
      fullName: 'पूरा नाम',
      mobile: 'मोबाइल',
      email: 'ईमेल',
      craftCategory: 'शिल्प श्रेणी',
      location: 'स्थान',
      regPasswordPlaceholder: 'पासवर्ड बनाएं',
      registerBtn: 'कारीगर खाता बनाएं',
      buyerQuestion: 'क्या आप एक जागरूक खरीदार हैं? ',
      buyerBtn: 'खरीदार के रूप में साइन इन करें →',
    },
    kn: {
      back: '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
      portalTitle: 'ಕುಶಲಕರ್ಮಿ ಪೋರ್ಟಲ್',
      loginTitle: 'ಕುಶಲಕರ್ಮಿ ಕಾರ್ಯಾಗార ಲಾಗಿన్',
      registerTitle: 'ಕುಶಲಕರ್ಮಿ ಖಾತೆಯನ್ನು ರಚಿಸಿ',
      loginDesc: 'ಸ್ವಾಗತ. ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಟಲಾಗ್, ಧ್ವನಿ ದಾസ്തಾನು ಮತ್ತು ಖರೀದಿದారರ ವಿಚಾರಣೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
      registerDesc: 'ಹಸ್ತಚಾಲಿತ ಕರಕುಶല ವಸ್ತುಗಳನ್ನು ಡಿಜಿಟಲೀಕರಿಸಲು ಮತ್ತು ಬಿ2ಬಿ ಆರ್ಡರ್‌ಗಳನ್ನು ಸ್ವೀಕರಿಸಲು ನಿಮ್ಮ ಕಾರ್ಯಾಗారವನ್ನು ನೋಂದಾಯಿಸಿ.',
      sihTest: 'SIH ತ್ವರಿత ಪರೀಕ್ಷೆ',
      sihDesc: 'ಮಾಸ್ಟರ್ ರಮೇಶ್ (ಪಾಟ್ರಿ) ಆಗಿ ಲಾಗ್ ಇನ್ ಮಾಡಿ',
      tryDemo: 'ಡೆಮೊ ಕುಶಲಕರ್ಮಿ ಪ್ರಯತ್ನಿಸಿ',
      signInTab: 'ಸೈನ್ ಇನ್',
      registerTab: 'ಕಾರ್ಯಾಗಾರ ನೋಂದಾಯಿಸಿ',
      mobileEmailLabel: 'ಮೊಬైಲ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇమేಲ್',
      passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
      forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
      loginBtn: 'ಕುಶಲಕರ್ಮಿ ಕಾರ್ಯಾಗಾರಕ್ಕೆ ಲಾಗ್ ಇన్ ಮಾಡಿ',
      fullName: 'ಪೂರ್ಣ ಹೆಸರು',
      mobile: 'ಮೊಬైಲ್',
      email: 'ಇಮೇಲ್',
      craftCategory: 'ಕರಕುಶల ವರ್ಗ',
      location: 'ಸ್ಥಳ',
      regPasswordPlaceholder: 'ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ',
      registerBtn: 'ಕುಶಲಕರ್ಮಿ ಖಾತೆಯನ್ನು ರಚಿಸಿ',
      buyerQuestion: 'ನೀವು ಜಾಗೃತ ಖರೀದಿದారರೇ? ',
      buyerBtn: 'ಖರೀದಿದారರಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ →',
    },
    ml: {
      back: '← ഹോമിലേക്ക് തിരികെ പോകുക',
      portalTitle: 'കരകൗശല വിദഗ്ധ പോർട്ടൽ',
      loginTitle: 'വർക്ക്ഷോപ്പ് ലോഗിൻ',
      registerTitle: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
      loginDesc: 'സ്വാഗതം. സ്മാർട്ട് കാറ്റലോഗ്, വോയ്സ് ഇൻവെന്ററി എന്നിവ ഇവിടെ കൈകാര്യം ചെയ്യാം.',
      registerDesc: 'കരകൗശല ഉൽപ്പന്നങ്ങൾ ഡിജിറ്റൈസ് ചെയ്യാനും ഓർഡറുകൾ സ്വീകരിക്കാനും രജിസ്റ്റർ ചെയ്യുക.',
      sihTest: 'SIH ദ്രുത പരിശോധന',
      sihDesc: 'മാസ്റ്റർ രമേശായി ലോഗിൻ ചെയ്യുക',
      tryDemo: 'ഡെമോ പരീക്ഷിക്കുക',
      signInTab: 'ലോഗിൻ',
      registerTab: 'രജിസ്റ്റർ ചെയ്യുക',
      mobileEmailLabel: 'മൊബൈൽ അല്ലെങ്കിൽ ഇമെയിൽ',
      passwordLabel: 'പാസ്‌വേഡ്',
      forgotPassword: 'പാസ്‌വേഡ് മറന്നോ?',
      loginBtn: 'ലോഗിൻ ചെയ്യുക',
      fullName: 'പൂർണ്ണനാമം',
      mobile: 'മൊബൈൽ',
      email: 'ഇമെയിൽ',
      craftCategory: 'വിഭാഗം',
      location: 'സ്ഥലം',
      regPasswordPlaceholder: 'പാസ്‌വേഡ് നൽകുക',
      registerBtn: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
      buyerQuestion: 'നിങ്ങൾ ഒരു ഉപഭോക്താവാണോ? ',
      buyerBtn: 'ഉപഭോക്താവായി പ്രവേശിക്കുക →',
    },
    ta: {
      back: '← முகப்புக்குத் திரும்பு',
      portalTitle: 'கைவினைஞர் போர்டல்',
      loginTitle: 'கைவினைஞர் பட்டறை உள்நுழைவு',
      registerTitle: 'கைவினைஞர் கணக்கை உருவாக்கு',
      loginDesc: 'நல்வரவு. உங்கள் ஸ்மார்ட் பட்டியல், குரல் இருப்பு மற்றும் வாங்குபவர் விசாரணைகளை நிர்வகிக்கவும்.',
      registerDesc: 'கைவினைப்பொருட்களை டிஜிட்டல் மயமாக்கவும் மற்றும் ஆர்டர்களைப் பெறவும் உங்கள் பட்டறையைப் பதிவு செய்யவும்.',
      sihTest: 'SIH விரைவான சோதனை',
      sihDesc: 'மாஸ்டர் ரமேஷ் (மண்பாண்டங்கள்) ஆக உள்நுழைக',
      tryDemo: 'டெমো கைவினைஞரை முயற்சிக்கவும்',
      signInTab: 'உள்நுழைக',
      registerTab: 'பட்டறையைப் பதிவு செய்க',
      mobileEmailLabel: 'கைபேசி எண் அல்லது மின்னஞ்சல்',
      passwordLabel: 'கடவுச்சொல்',
      forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
      loginBtn: 'கைவினைஞர் பட்டறைக்குள் உள்நுழைக',
      fullName: 'முழு பெயர்',
      mobile: 'கைபேசி',
      email: 'மின்னஞ்சல்',
      craftCategory: 'கைவினை வகை',
      location: 'இடம்',
      regPasswordPlaceholder: 'கடவுச்சொல்லை உருவாக்கு',
      registerBtn: 'கைவினைஞர் கணக்கை உருவாக்கு',
      buyerQuestion: 'நீங்கள் ஒரு வாங்குபவரா? ',
      buyerBtn: 'வாங்குபவராக உள்நுழையவும் →',
    },
    te: {
      back: '← హోమ్‌కి తిరిగి వెళ్లు',
      portalTitle: 'కళాకారుల పోర్టల్',
      loginTitle: 'కళాకారుల వర్క్‌షాప్ లాగిన్',
      registerTitle: 'కళాకారుల ఖాతా సృష్టించండి',
      loginDesc: 'స్వాగతం. మీ స్మార్ట్ కేటలాగ్, వాయిస్ ఇన్వెంటరీ మరియు కొనుగోలుదారుల విచారణలను నిర్వహించండి.',
      registerDesc: 'చేతితో తయారు చేసిన వస్తువులను డిజిటలైజ్ చేయడానికి మరియు ఆర్డర్లు పొందడానికి నమోదు చేయండి.',
      sihTest: 'SIH త్వరిత పరీక్ష',
      sihDesc: 'మాస్టర్ రమేష్ (కుండల తయారీ) లాగిన్ అవ్వండి',
      tryDemo: 'డెమో అడ్మిన్ ప్రయత్నించండి',
      signInTab: 'సైన్ ఇన్',
      registerTab: 'నమోదు చేయండి',
      mobileEmailLabel: 'మొబైల్ సంఖ్య లేదా ఈమెయిల్',
      passwordLabel: 'పాస్‌వర్డ్',
      forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      loginBtn: 'కళాకారుల వర్క్‌షాప్ లాగిన్ అవ్వండి',
      fullName: 'పూర్తి పేరు',
      mobile: 'మొబైల్',
      email: 'ఈమెయిల్',
      craftCategory: 'చేతిపని విభాగం',
      location: 'ప్రదేశం',
      regPasswordPlaceholder: 'పాస్‌వర్డ్ సృష్టించండి',
      registerBtn: 'ఖాతా సృష్టించండి',
      buyerQuestion: 'మీరు కొనుగోలుదారులా? ',
      buyerBtn: 'కొనుగోలుదారుగా లాగిన్ అవ్వండి →',
    }
  };

  const currentT = localT[language as keyof typeof localT] || localT.en;

  const handleSwitchToBuyer = () => {
    if (onSwitchToBuyer) onSwitchToBuyer();
    else if (onSwitchToBuyerLogin) onSwitchToBuyerLogin();
  };

  // Login form state
  const [identifier, setIdentifier] = useState('ramesh.artisan@craftbridge.in');
  const [password, setPassword] = useState('artisan123');

  // Register form state
  const [regName, setRegName] = useState('Master Ramesh');
  const [regMobile, setRegMobile] = useState('+91 98450 12345');
  const [regEmail, setRegEmail] = useState('ramesh.artisan@craftbridge.in');
  const [regPassword, setRegPassword] = useState('artisan123');
  const [regCategory, setRegCategory] = useState('Pottery & Terracotta');
  const [regLocation, setRegLocation] = useState('Ramanagara, Karnataka');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playCeramicChime(380);

    const user: AppUser = {
      id: 'artisan-ramesh',
      name: 'Master Ramesh',
      email: identifier,
      mobile: '+91 98450 12345',
      role: 'artisan',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      location: 'Ramanagara, Karnataka',
      craftCategory: 'Traditional Terracotta Pottery',
    };

    onLoginSuccess(user);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playCeramicChime(420);

    const user: AppUser = {
      id: `artisan-${Date.now()}`,
      name: regName || 'Master Artisan',
      email: regEmail,
      mobile: regMobile,
      role: 'artisan',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      location: regLocation,
      craftCategory: regCategory,
    };

    onLoginSuccess(user);
  };

  const handleDemoArtisan = () => {
    audioService.playCeramicChime(440);
    const demoArtisan: AppUser = {
      id: 'artisan-ramesh',
      name: 'Master Ramesh',
      email: 'ramesh.artisan@craftbridge.in',
      mobile: '+91 98450 12345',
      role: 'artisan',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      location: 'Ramanagara, Karnataka',
      craftCategory: 'Traditional Terracotta Pottery',
    };
    onLoginSuccess(demoArtisan);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-10 px-4 sm:px-6">
      <div className="max-w-md w-full mx-auto">
        {/* Quick Language Switcher Bar directly inside Login Page */}
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
                    ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs'
                    : 'bg-white text-[#2C1810]/70 border-[#E6DDD4] hover:bg-[#F5EFEB]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Back Link & Brand */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              audioService.playClickSound();
              onBackToLanding();
            }}
            className="text-xs font-bold text-[#2C1810]/70 hover:text-[#C85A32] flex items-center gap-1.5 transition-colors"
          >
            {currentT.back}
          </button>
          <span className="text-xs font-extrabold text-[#C85A32] uppercase tracking-wider">
            {currentT.portalTitle}
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#C85A32]/5 rounded-bl-full pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#C85A32]/10 border border-[#C85A32]/20 flex items-center justify-center text-3xl mx-auto mb-3 shadow-xs">
              👩‍🎨
            </div>
            <h1 className="text-2xl font-extrabold text-[#2C1810] tracking-tight">
              {isRegisterMode ? currentT.registerTitle : currentT.loginTitle}
            </h1>
            <p className="text-xs text-[#2C1810]/70 mt-1 max-w-xs mx-auto">
              {isRegisterMode ? currentT.registerDesc : currentT.loginDesc}
            </p>
          </div>

          {/* One-Click Quick Demo Button (Highlighted for SIH Screening) */}
          <div className="mb-6 p-3.5 rounded-2xl bg-[#F5EFEB] border border-[#C85A32]/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold text-[#C85A32] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentT.sihTest}</span>
              </div>
              <div className="text-[11px] text-[#2C1810]/70 font-medium">
                {currentT.sihDesc}
              </div>
            </div>
            <button
              type="button"
              id="try-demo-artisan-btn"
              onClick={handleDemoArtisan}
              className="px-3.5 py-1.5 rounded-xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0 active:scale-95 cursor-pointer"
            >
              <span>{currentT.tryDemo}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tab Switcher: Login vs Register */}
          <div className="flex bg-[#F5EFEB] p-1 rounded-xl mb-5 border border-[#E6DDD4]">
            <button
              type="button"
              onClick={() => {
                audioService.playClickSound();
                setIsRegisterMode(false);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isRegisterMode ? 'bg-[#2C1810] text-[#FDFBF7] shadow-xs' : 'text-[#2C1810]/70'
              }`}
            >
              {currentT.signInTab}
            </button>
            <button
              type="button"
              onClick={() => {
                audioService.playClickSound();
                setIsRegisterMode(true);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isRegisterMode ? 'bg-[#2C1810] text-[#FDFBF7] shadow-xs' : 'text-[#2C1810]/70'
              }`}
            >
              {currentT.registerTab}
            </button>
          </div>

          {!isRegisterMode ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">
                  {currentT.mobileEmailLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#2C1810]/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="+91 98450 12345 or email"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#2C1810]">{currentT.passwordLabel}</label>
                  <button
                    type="button"
                    onClick={() => alert('Demo password is: artisan123')}
                    className="text-[11px] font-bold text-[#C85A32] hover:underline"
                  >
                    {currentT.forgotPassword}
                  </button>
                </div>
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="artisan-login-submit-btn"
                className="w-full py-3 rounded-xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>{currentT.loginBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.fullName}</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Master Ramesh"
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.mobile}</label>
                  <input
                    type="text"
                    required
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="+91 98450 12345"
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.email}</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="artisan@craftbridge.in"
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.craftCategory}</label>
                  <input
                    type="text"
                    required
                    value={regCategory}
                    onChange={(e) => setRegCategory(e.target.value)}
                    placeholder="Pottery / Textiles / Wood"
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.location}</label>
                  <input
                    type="text"
                    required
                    value={regLocation}
                    onChange={(e) => setRegLocation(e.target.value)}
                    placeholder="Ramanagara, Karnataka"
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.passwordLabel}</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder={currentT.regPasswordPlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <button
                type="submit"
                id="artisan-register-submit-btn"
                className="w-full py-3 rounded-xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>{currentT.registerBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Switch to Buyer link */}
          <div className="mt-6 pt-4 border-t border-[#E6DDD4] text-center">
            <span className="text-xs text-[#2C1810]/70">{currentT.buyerQuestion}</span>
            <button
              type="button"
              onClick={() => {
                audioService.playClickSound();
                handleSwitchToBuyer();
              }}
              className="text-xs font-bold text-[#3D6B52] hover:underline cursor-pointer"
            >
              {currentT.buyerBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
