import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, Building, Phone, MapPin } from 'lucide-react';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { AppUser } from '../types';

interface Props {
  onLoginSuccess: (user: AppUser) => void;
  onBackToLanding: () => void;
  onSwitchToArtisan?: () => void;
  onSwitchToArtisanLogin?: () => void;
}

export const BuyerLoginView: React.FC<Props> = ({
  onLoginSuccess,
  onBackToLanding,
  onSwitchToArtisan,
  onSwitchToArtisanLogin,
}) => {
  const { language, setLanguage } = useTranslation();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const localT = {
    en: {
      back: '← Back to Home',
      portalTitle: 'Conscious Buyer Portal',
      loginTitle: 'Conscious Buyer Login',
      registerTitle: 'Create Buyer Account',
      loginDesc: 'Welcome back. Explore handmade crafts and monitor your bespoke artisan matches.',
      registerDesc: 'Discover authentic crafts, post custom B2B bulk requirements, and source directly.',
      sihTest: 'SIH Quick Test',
      sihDesc: 'Log in as Heritage Home Store (B2B Buyer)',
      tryDemo: 'Try Demo Buyer',
      signInTab: 'Sign In',
      registerTab: 'Register Business',
      fullName: 'Full Name',
      orgName: 'Organization / Business Name',
      mobileEmailLabel: 'Mobile Number or Email',
      passwordLabel: 'Password',
      forgotPassword: 'Forgot Password?',
      loginBtn: 'Log In as Conscious Buyer',
      mobile: 'Mobile Number',
      email: 'Email Address',
      location: 'Location (City, State)',
      regPasswordPlaceholder: 'Create secure password',
      registerBtn: 'Create Buyer Account',
      artisanQuestion: 'Are you a traditional artisan? ',
      artisanBtn: 'Sign In as Artisan →',
    },
    hi: {
      back: '← होम पर वापस जाएं',
      portalTitle: 'सचेत खरीदार पोर्टल',
      loginTitle: 'जागरूक खरीदार लॉगिन',
      registerTitle: 'खरीदार खाता बनाएं',
      loginDesc: 'वापसी पर स्वागत है। हस्तनिर्मित शिल्पों का अन्वेषण करें और अपने कारीगर मिलानों की निगरानी करें।',
      registerDesc: 'प्रामाणिक शिल्पों की खोज करें, कस्टम बी2बी थोक आवश्यकताएं पोस्ट करें और सीधे स्रोत खोजें।',
      sihTest: 'SIH त्वरित परीक्षण',
      sihDesc: 'हेरिटेज होम स्टोर (B2B खरीदार) के रूप में लॉगिन करें',
      tryDemo: 'डेमो खरीदार आज़माएं',
      signInTab: 'साइन इन करें',
      registerTab: 'व्यवसाय पंजीकृत करें',
      fullName: 'पूरा नाम',
      orgName: 'संगठन / व्यवसाय का नाम',
      mobileEmailLabel: 'मोबाइल नंबर या ईमेल',
      passwordLabel: 'पासवर्ड',
      forgotPassword: 'पासवर्ड भूल गए?',
      loginBtn: 'खरीदार के रूप में लॉगिन करें',
      mobile: 'मोबाइल नंबर',
      email: 'ईमेल पता',
      location: 'स्थान (शहर, राज्य)',
      regPasswordPlaceholder: 'सुरक्षित पासवर्ड बनाएं',
      registerBtn: 'खरीदार खाता बनाएं',
      artisanQuestion: 'क्या आप एक पारंपरिक कारीगर हैं? ',
      artisanBtn: 'कारीगर के रूप में साइन इन करें →',
    },
    kn: {
      back: '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
      portalTitle: 'ಜಾಗೃತ ಖರೀದಿದారರ ಪೋರ್ಟಲ್',
      loginTitle: 'ಜಾಗೃತ ಖರೀದಿದారರ ಲಾಗಿನ್',
      registerTitle: 'ಖರೀದಿದಾರರ ಖಾತೆಯನ್ನು ರಚಿಸಿ',
      loginDesc: 'ಸ್ವಾಗತ. ಹಸ್ತಚಾಲಿತ ಕರಕುಶല ವಸ್ತುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕುಶಲಕರ್ಮಿ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
      registerDesc: 'ಅಪ್ಪಟ ಕರಕುಶല ವಸ್ತುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ಕಸ್ಟಮ್ ಬಿ2ಬಿ ಬೃಹತ್ ಅವಶ್ಯಕತೆಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ ಮತ್ತು ನೇರವಾಗಿ ಸೋರ್ಸ್ ಮಾಡಿ.',
      sihTest: 'SIH ತ್ವರಿತ ಪರೀಕ್ಷೆ',
      sihDesc: 'ಹೆರಿಟೇಜ್ ಹೋಮ್ ಸ್ಟೋರ್ (B2B ಖರೀದಿದಾರ) ಆಗಿ ಲಾಗ್ ಇನ್ ಮಾಡಿ',
      tryDemo: 'ಡೆಮೊ ಖರೀದಿದಾರ ಪ್ರಯತ್ನಿಸಿ',
      signInTab: 'ಸೈನ್ ಇನ್',
      registerTab: 'ವ್ಯಾಪಾರ ನೋಂದಾಯಿಸಿ',
      fullName: 'ಪೂರ್ಣ ಹೆಸರು',
      orgName: 'ಸಂಸ್ಥೆ / ವ್ಯಾಪಾರದ ಹೆಸರು',
      mobileEmailLabel: 'ಮೊಬైಲ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್',
      passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
      forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
      loginBtn: 'ಖರೀದಿದారರಾಗಿ ಲಾಗ್ ಇನ್ ಮಾಡಿ',
      mobile: 'ಮೊಬైಲ್ ಸಂಖ್ಯೆ',
      email: 'ಇಮೇಲ್ ವಿಳಾಸ',
      location: 'ಸ್ಥಳ (ನಗರ, ರಾಜ್ಯ)',
      regPasswordPlaceholder: 'ಸುರಕ್ಷిత ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ',
      registerBtn: 'ಖರೀದಿದಾರರ ಖಾತೆಯನ್ನು ರಚಿಸಿ',
      artisanQuestion: 'ನೀವು ಸಾಂಪ್ರದಾಯಿಕ ಕುಶಲಕರ್ಮಿಯೇ? ',
      artisanBtn: 'ಕುಶಲಕರ್ಮಿಯಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ →',
    },
    ml: {
      back: '← ഹോമിലേക്ക് തിരികെ പോകുക',
      portalTitle: 'ഉപഭോക്തൃ പോർട്ടൽ',
      loginTitle: 'ഉപഭോക്തൃ ലോഗിൻ',
      registerTitle: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
      loginDesc: 'സ്വാഗതം. പുതിയ കരകൗശല ഉൽപ്പന്നങ്ങൾ ഇവിടെ കണ്ടെത്താം.',
      registerDesc: 'കരകൗശല ഉൽപ്പന്നങ്ങൾ കണ്ടെത്താനും ബി2ബി ഓർഡറുകൾ നൽകാനും രജിസ്റ്റർ ചെയ്യുക.',
      sihTest: 'SIH ദ്രുത പരിശോധന',
      sihDesc: 'ഹെറിറ്റേജ് ഹോം സ്റ്റോറായി ലോഗിൻ ചെയ്യുക',
      tryDemo: 'ഡെമോ പരീക്ഷിക്കുക',
      signInTab: 'ലോഗിൻ',
      registerTab: 'രജിസ്റ്റർ ചെയ്യുക',
      fullName: 'പൂർണ്ണനാമം',
      orgName: 'സ്ഥാപനത്തിന്റെ പേര്',
      mobileEmailLabel: 'മൊബൈൽ അല്ലെങ്കിൽ ഇമെയിൽ',
      passwordLabel: 'പാസ്‌വേഡ്',
      forgotPassword: 'പാസ്‌വേഡ് മറന്നോ?',
      loginBtn: 'ലോഗിൻ ചെയ്യുക',
      mobile: 'മൊബൈൽ',
      email: 'ഇമെയിൽ',
      location: 'സ്ഥലം',
      regPasswordPlaceholder: 'പാസ്‌വേഡ് നൽകുക',
      registerBtn: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
      artisanQuestion: 'നിങ്ങൾ ഒരു കരകൗശല വിദഗ്ധനാണോ? ',
      artisanBtn: 'കരകൗശല വിദഗ്ധനായി പ്രവേശിക്കുക →',
    },
    ta: {
      back: '← முகப்புக்குத் திரும்பு',
      portalTitle: 'வாங்குபவர் போர்டல்',
      loginTitle: 'வாங்குபவர் உள்நுழைவு',
      registerTitle: 'வாங்குபவர் கணக்கை உருவாக்கு',
      loginDesc: 'நல்வரவு. கைவினைப்பொருட்களை ஆராய்ந்து உங்கள் கைவினைஞர் பொருத்தங்களை கண்காணிக்கவும்.',
      registerDesc: 'உண்மையான கைவினைப்பொருட்களைக் கண்டறியவும், மொத்த தேவைகளை இடுகையிடவும் மற்றும் நேரடியாக வாங்கவும்.',
      sihTest: 'SIH விரைவான சோதனை',
      sihDesc: 'ஹெரிட்டேஜ் ஹோம் ஸ்டோர் (B2B வாங்குபவர்) ஆக உள்நுழைக',
      tryDemo: 'டெமோ வாங்குபவரை முயற்சிக்கவும்',
      signInTab: 'உள்நுழைக',
      registerTab: 'வணிகத்தை பதிவு செய்க',
      fullName: 'முழு பெயர்',
      orgName: 'நிறுவனம் / வணிக பெயர்',
      mobileEmailLabel: 'கைபேசி எண் அல்லது மின்னஞ்சல்',
      passwordLabel: 'கடவுச்சொல்',
      forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
      loginBtn: 'வாங்குபவராக உள்நுழைக',
      mobile: 'கைபேசி எண்',
      email: 'மின்னஞ்சல் முகவரி',
      location: 'இடம் (நகரம், மாநிலம்)',
      regPasswordPlaceholder: 'பாதுகாப்பான கடவுச்சொல்லை உருவாக்கு',
      registerBtn: 'வாங்குபவர் கணக்கை உருவாக்கு',
      artisanQuestion: 'நீங்கள் ஒரு பாரம்பரிய கைவினைஞரா? ',
      artisanBtn: 'கைவினைஞராக உள்நுழையவும் →',
    },
    te: {
      back: '← హోమ్‌కి తిరిగి వెళ్లు',
      portalTitle: 'కొనుగోలుదారుల పోర్టల్',
      loginTitle: 'కొనుగోలుదారుల లాగిన్',
      registerTitle: 'కొనుగోలుదారుల ఖాతా సృష్టించండి',
      loginDesc: 'స్వాగతం. చేతితో తయారు చేసిన వస్తువులను అన్వేషించండి మరియు మీ కళాకారుల మ్యాచ్‌లను పర్యవేక్షించండి.',
      registerDesc: 'అచ్చమైన హస్తకళలను కనుగొనండి, కస్టమ్ బి2బి బల్క్ అవసరాలను పోస్ట్ చేయండి మరియు నేరుగా సోర్స్ చేయండి.',
      sihTest: 'SIH త్వరిత పరీక్ష',
      sihDesc: 'హెరిటేజ్ హోమ్ స్టోర్ (B2B కొనుగోలుదారు) లాగిన్ అవ్వండి',
      tryDemo: 'డెమో కొనుగోలుదారు ప్రయత్నించండి',
      signInTab: 'సైన్ ఇన్',
      registerTab: 'వ్యాపారం నమోదు చేయండి',
      fullName: 'పూర్తి పేరు',
      orgName: 'సంస్థ / వ్యాపార పేరు',
      mobileEmailLabel: 'మొబైల్ సంఖ్య లేదా ఈమెయిల్',
      passwordLabel: 'పాస్‌వర్డ్',
      forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      loginBtn: 'కొనుగోలుదారుగా లాగిన్ అవ్వండి',
      mobile: 'మొబైల్ సంఖ్య',
      email: 'ఈమెయిల్ చిరునామా',
      location: 'ప్రదేశం (నగరం, రాష్ట్రం)',
      regPasswordPlaceholder: 'సురక్షితమైన పాస్‌వర్డ్ సృష్టించండి',
      registerBtn: 'ఖాతా సృష్టించండి',
      artisanQuestion: 'మీరు సంప్రదాయ కళాకారులా? ',
      artisanBtn: 'కళాకారుడిగా లాగిన్ అవ్వండి →',
    }
  };

  const currentT = localT[language as keyof typeof localT] || localT.en;

  const handleSwitchToArtisan = () => {
    if (onSwitchToArtisan) onSwitchToArtisan();
    else if (onSwitchToArtisanLogin) onSwitchToArtisanLogin();
  };

  // Login form state
  const [identifier, setIdentifier] = useState('procurement@heritagehomestore.com');
  const [password, setPassword] = useState('buyer123');

  // Register form state
  const [regName, setRegName] = useState('Ananya Sen');
  const [regOrg, setRegOrg] = useState('Heritage Home Store');
  const [regEmail, setRegEmail] = useState('procurement@heritagehomestore.com');
  const [regMobile, setRegMobile] = useState('+91 98110 54321');
  const [regLocation, setRegLocation] = useState('Bengaluru, Karnataka');
  const [regPassword, setRegPassword] = useState('buyer123');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playCeramicChime(440);

    const user: AppUser = {
      id: 'buyer-heritage',
      name: 'Heritage Home Store',
      email: identifier,
      mobile: '+91 98110 54321',
      role: 'buyer',
      organization: 'Heritage Home Store',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };

    onLoginSuccess(user);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playCeramicChime(440);

    const user: AppUser = {
      id: `buyer-${Date.now()}`,
      name: regName || 'Conscious Buyer',
      email: regEmail,
      mobile: regMobile,
      role: 'buyer',
      organization: regOrg || 'Independent Buyer',
      location: regLocation,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };

    onLoginSuccess(user);
  };

  const handleDemoBuyer = () => {
    audioService.playCeramicChime(440);
    const demoBuyer: AppUser = {
      id: 'buyer-heritage',
      name: 'Heritage Home Store (Bengaluru)',
      email: 'procurement@heritagehomestore.com',
      mobile: '+91 98110 54321',
      role: 'buyer',
      organization: 'Heritage Home Store (Wholesale / B2B)',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };
    onLoginSuccess(demoBuyer);
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
                    ? 'bg-[#3D6B52] text-white border-[#3D6B52] shadow-xs'
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
            className="text-xs font-bold text-[#2C1810]/70 hover:text-[#3D6B52] flex items-center gap-1.5 transition-colors"
          >
            {currentT.back}
          </button>
          <span className="text-xs font-extrabold text-[#3D6B52] uppercase tracking-wider">
            {currentT.portalTitle}
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#3D6B52]/5 rounded-bl-full pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#3D6B52]/10 border border-[#3D6B52]/20 flex items-center justify-center text-3xl mx-auto mb-3 shadow-xs">
              🛍️
            </div>
            <h1 className="text-2xl font-extrabold text-[#2C1810] tracking-tight">
              {isRegisterMode ? currentT.registerTitle : currentT.loginTitle}
            </h1>
            <p className="text-xs text-[#2C1810]/70 mt-1 max-w-xs mx-auto">
              {isRegisterMode ? currentT.registerDesc : currentT.loginDesc}
            </p>
          </div>

          {/* One-Click Quick Demo Button (Highlighted for SIH Screening) */}
          <div className="mb-6 p-3.5 rounded-2xl bg-[#F5EFEB] border border-[#3D6B52]/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold text-[#3D6B52] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentT.sihTest}</span>
              </div>
              <div className="text-[11px] text-[#2C1810]/70 font-medium">
                {currentT.sihDesc}
              </div>
            </div>
            <button
              type="button"
              id="try-demo-buyer-btn"
              onClick={handleDemoBuyer}
              className="px-3.5 py-1.5 rounded-xl bg-[#3D6B52] text-white text-xs font-extrabold hover:bg-[#2f5540] transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0 active:scale-95 cursor-pointer"
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
                    placeholder="+91 98110 54321 or email"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#2C1810]">{currentT.passwordLabel}</label>
                  <button
                    type="button"
                    onClick={() => alert('Demo password is: buyer123')}
                    className="text-[11px] font-bold text-[#3D6B52] hover:underline"
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="buyer-login-submit-btn"
                className="w-full py-3 rounded-xl bg-[#3D6B52] text-white text-xs font-extrabold hover:bg-[#2f5540] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
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
                  placeholder="Ananya Sen"
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.orgName}</label>
                <input
                  type="text"
                  required
                  value={regOrg}
                  onChange={(e) => setRegOrg(e.target.value)}
                  placeholder="Heritage Home Store"
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
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
                    placeholder="+91 98110 54321"
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.email}</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="procurement@heritagehomestore.com"
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.location}</label>
                <input
                  type="text"
                  required
                  value={regLocation}
                  onChange={(e) => setRegLocation(e.target.value)}
                  placeholder="Bengaluru, Karnataka"
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">{currentT.passwordLabel}</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder={currentT.regPasswordPlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] focus:outline-none focus:border-[#3D6B52]"
                />
              </div>

              <button
                type="submit"
                id="buyer-register-submit-btn"
                className="w-full py-3 rounded-xl bg-[#3D6B52] text-white text-xs font-extrabold hover:bg-[#2f5540] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>{currentT.registerBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Switch to Artisan link */}
          <div className="mt-6 pt-4 border-t border-[#E6DDD4] text-center">
            <span className="text-xs text-[#2C1810]/70">{currentT.artisanQuestion}</span>
            <button
              type="button"
              onClick={() => {
                audioService.playClickSound();
                handleSwitchToArtisan();
              }}
              className="text-xs font-bold text-[#C85A32] hover:underline cursor-pointer"
            >
              {currentT.artisanBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
