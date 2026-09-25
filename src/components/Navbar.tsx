import React from 'react';
import {
  Sparkles,
  ShoppingBag,
  Mic,
  Compass,
  Hammer,
  Smartphone,
  Monitor,
  Globe,
  Bot,
  Package,
  MessageSquare,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  LogOut,
  Boxes,
  X,
  User,
  Bell,
} from 'lucide-react';
import { UserRole, AppLanguage, AppUser, AppNotification } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  userRole: UserRole;
  currentUser?: AppUser | null;
  onSwitchRole?: (newRole: UserRole) => void;
  currentLanguage: AppLanguage;
  onOpenLanguageModal: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  isMobileDeviceView: boolean;
  onToggleDeviceView: () => void;
  onLogout?: () => void;
  networkStatus?: 'online' | 'limited' | 'offline';
  onToggleNetworkStatus?: () => void;
  onUpdateUser?: (updated: AppUser) => void;
  notifications?: AppNotification[];
  onMarkNotificationAsRead?: (id: string) => void;
}

export const Navbar: React.FC<Props> = ({
  userRole,
  currentUser,
  onSwitchRole,
  currentLanguage,
  onOpenLanguageModal,
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  isMobileDeviceView,
  onToggleDeviceView,
  onLogout,
  networkStatus = 'online',
  onToggleNetworkStatus,
  onUpdateUser,
  notifications = [],
  onMarkNotificationAsRead,
}) => {
  const { t, language } = useTranslation();
  const isArtisan = userRole === 'artisan';
  const [soundOn, setSoundOn] = React.useState(audioService.isSoundEnabled());

  const handleToggleSound = () => {
    const next = audioService.toggleSound();
    setSoundOn(next);
  };

  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = React.useState(false);

  const roleNotifs = (notifications || []).filter(
    (n) => n.role === 'all' || n.role === userRole
  );
  const unreadCount = roleNotifs.filter((n) => !n.isRead).length;

  // Profile edit states
  const [name, setName] = React.useState(currentUser?.name || '');
  const [email, setEmail] = React.useState(currentUser?.email || '');
  const [phone, setPhone] = React.useState(currentUser?.phone || currentUser?.mobile || '');
  const [region, setRegion] = React.useState(currentUser?.region || currentUser?.location || '');
  const [craftType, setCraftType] = React.useState(currentUser?.craftType || currentUser?.craftCategory || '');
  const [companyName, setCompanyName] = React.useState(currentUser?.companyName || currentUser?.organization || '');
  const [avatar, setAvatar] = React.useState(currentUser?.avatar || '');

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phone || currentUser.mobile || '');
      setRegion(currentUser.region || currentUser.location || '');
      setCraftType(currentUser.craftType || currentUser.craftCategory || '');
      setCompanyName(currentUser.companyName || currentUser.organization || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser, isProfileModalOpen]);

  const localProfileT = {
    en: {
      editTitle: 'User Profile Settings',
      artisanTitle: 'Artisan Workshop Profile',
      buyerTitle: 'Conscious Buyer Profile',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / Mobile',
      regionLabel: 'Region / Location',
      craftLabel: 'Craft Specialty / Type',
      companyLabel: 'Company / Business Name',
      prefLang: 'Preferred Language',
      saveBtn: 'Save Changes',
      cancelBtn: 'Cancel',
      successMsg: 'Profile updated successfully!',
    },
    hi: {
      editTitle: 'उपयोगकर्ता प्रोफ़ाइल सेटिंग्स',
      artisanTitle: 'कारीगर कार्यशाला प्रोफ़ाइल',
      buyerTitle: 'सचेत खरीदार प्रोफ़ाइल',
      nameLabel: 'पूरा नाम',
      emailLabel: 'ईमेल पता',
      phoneLabel: 'फ़ोन / मोबाइल',
      regionLabel: 'क्षेत्र / स्थान',
      craftLabel: 'शिल्प विशेषता / प्रकार',
      companyLabel: 'कंपनी / व्यवसाय का नाम',
      prefLang: 'पसंदीदा भाषा',
      saveBtn: 'परिवर्तनों को सहेजें',
      cancelBtn: 'रद्द करें',
      successMsg: 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!',
    },
    kn: {
      editTitle: 'ಬಳಕೆದಾರರ ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      artisanTitle: 'ಕುಶಲಕರ್ಮಿ ಕಾರ್ಯಾಗಾರ ಪ್ರೊಫೈಲ್',
      buyerTitle: 'ಜಾಗೃತ ಖರೀದಿದారರ ಪ್ರೊಫೈಲ್',
      nameLabel: 'ಪೂರ್ಣ ಹೆಸರು',
      emailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ',
      phoneLabel: 'ಫೋನ್ / ಮೊಬైಲ್',
      regionLabel: 'ಪ್ರದೇಶ / ಸ್ಥಳ',
      craftLabel: 'ಕರಕುಶല ವಿಶೇಷತೆ / ಪ್ರಕಾರ',
      companyLabel: 'ಕಂಪನಿ / ವ್ಯಾಪಾರದ ಹೆಸರು',
      prefLang: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
      saveBtn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
      cancelBtn: 'ರದ್ದುಮಾಡಿ',
      successMsg: 'ಪ್ರೊഫైಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!',
    },
    ml: {
      editTitle: 'പ്രൊഫൈൽ ക്രമീകരണങ്ങൾ',
      artisanTitle: 'കരകൗശല വിദഗ്ധ പ്രൊഫൈൽ',
      buyerTitle: 'ഉപഭോക്തൃ പ്രൊഫൈൽ',
      nameLabel: 'പൂർണ്ണനാമം',
      emailLabel: 'ഇമെയിൽ വിലാസം',
      phoneLabel: 'ഫോൺ നമ്പർ',
      regionLabel: 'സ്ഥലം / പ്രദേശം',
      craftLabel: 'കരകൗശല വിഭാഗം',
      companyLabel: 'സ്ഥാപനത്തിന്റെ പേര്',
      prefLang: 'ഭാഷാ മുൻഗണന',
      saveBtn: 'മാറ്റങ്ങൾ സൂക്ഷിക്കുക',
      cancelBtn: 'റദ്ദാക്കുക',
      successMsg: 'പ്രൊഫൈൽ വിജയകരമായി പുതുക്കി!',
    },
    ta: {
      editTitle: 'பயனர் சுயவிவர அமைப்புகள்',
      artisanTitle: 'கைவினைஞர் பட்டறை சுயவிவரம்',
      buyerTitle: 'வாங்குபவர் சுயவிவரம்',
      nameLabel: 'முழு பெயர்',
      emailLabel: 'மின்னஞ்சல் முகவரி',
      phoneLabel: 'தொலைபேசி / கைபேசி',
      regionLabel: 'மண்டலம் / இடம்',
      craftLabel: 'கைவினை சிறப்பு / வகை',
      companyLabel: 'நிறுவனம் / வணிக பெயர்',
      prefLang: 'விருப்பமான மொழி',
      saveBtn: 'மாற்றங்களைச் சேமி',
      cancelBtn: 'ரத்து செய்',
      successMsg: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
    },
    te: {
      editTitle: 'వినియోగదారు ప్రొఫైల్ సెట్టింగులు',
      artisanTitle: 'కళాకారుల వర్క్‌షాప్ ప్రొఫైల్',
      buyerTitle: 'కొనుగోలుదారు ప్రొఫైల్',
      nameLabel: 'పూర్తి పేరు',
      emailLabel: 'ఈమెయిల్ చిరునామా',
      phoneLabel: 'ఫోన్ / మొబైల్',
      regionLabel: 'ప్రాంతం / ప్రదేశం',
      craftLabel: 'చేతిపని రకం',
      companyLabel: 'కంపెనీ / వ్యాపార పేరు',
      prefLang: 'ఆద్యత భాష',
      saveBtn: 'మార్పులను సేవ్ చేయి',
      cancelBtn: 'రద్దు చేయి',
      successMsg: 'ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!',
    }
  };

  const profileT = localProfileT[language as keyof typeof localProfileT] || localProfileT.en;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser: AppUser = {
      ...currentUser,
      name,
      email,
      phone,
      mobile: phone,
      region,
      location: region,
      craftType,
      craftCategory: craftType,
      companyName,
      organization: companyName,
      avatar,
      preferredLanguage: language,
    };

    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }
    audioService.playCeramicChime(460);
    setIsProfileModalOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6DDD4] transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Logo */}
        <div
          onClick={() => {
            audioService.playTactileTap();
            onNavigate(isArtisan ? 'artisan-home' : 'buyer-home');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C85A32] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-xl">
            🏺
          </div>
          <div>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#2C1810] block leading-none">
              {t.common.brandName}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#C85A32] block mt-0.5">
              {t.common.brandSlogan}
            </span>
          </div>
        </div>

        {/* Center Navigation Tabs: Role Adaptive */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F5EFEB] p-1 rounded-2xl border border-[#E6DDD4]">
          {isArtisan ? (
            <>
              <button
                id="nav-tab-artisan-home"
                onClick={() => {
                  audioService.playTactileTap();
                  onNavigate('artisan-home');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentView === 'artisan-home'
                    ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                🏠 {t.nav.home}
              </button>
              <button
                id="nav-tab-artisan-products"
                onClick={() => {
                  audioService.playTactileTap();
                  onNavigate('artisan-products');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'artisan-products' || currentView === 'artisan-product-detail'
                    ? 'bg-[#C85A32] text-white shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>{t.nav.myProducts}</span>
              </button>
              <button
                id="nav-tab-artisan-inventory"
                onClick={() => {
                  audioService.playTactileTap();
                  onNavigate('inventory');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'inventory'
                    ? 'bg-[#C85A32] text-white shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Inventory</span>
              </button>
              <button
                id="nav-tab-digitize"
                onClick={() => {
                  audioService.playCeramicChime(380);
                  onNavigate('artisan-digitize');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'artisan-digitize'
                    ? 'bg-[#3D6B52] text-white shadow-sm'
                    : 'text-[#2C1810] hover:text-[#3D6B52]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#3D6B52]" />
                <span>AI Digitize</span>
              </button>
              <button
                id="nav-tab-voice-studio"
                onClick={() => {
                  audioService.playCeramicChime(320);
                  onNavigate('voice-studio');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'voice-studio'
                    ? 'bg-[#C85A32] text-white shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{t.nav.voiceStudio}</span>
              </button>
              <button
                id="nav-tab-artisan-dashboard"
                onClick={() => {
                  audioService.playTactileTap();
                  onNavigate('artisan-dashboard');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'artisan-dashboard'
                    ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#3D6B52]" />
                <span>{t.nav.dashboard}</span>
              </button>
              <button
                id="nav-tab-artisan-assistant"
                onClick={() => {
                  audioService.playCeramicChime(460);
                  onNavigate('artisan-assistant');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'artisan-assistant'
                    ? 'bg-[#C85A32] text-white shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{t.nav.aiAssistant}</span>
              </button>
            </>
          ) : (
            <>
              <button
                id="nav-tab-buyer-home"
                onClick={() => {
                  audioService.playTactileTap();
                  onNavigate('buyer-home');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentView === 'buyer-home'
                    ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                🏠 {t.nav.home}
              </button>
              <button
                id="nav-tab-discover"
                onClick={() => {
                  audioService.playTactileTap();
                  onNavigate('marketplace');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentView === 'marketplace'
                    ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                🧭 {t.nav.discover}
              </button>
              <button
                id="nav-tab-buyer-req"
                onClick={() => {
                  audioService.playCeramicChime(420);
                  onNavigate('post-requirement');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'post-requirement'
                    ? 'bg-[#C85A32] text-white shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.nav.requirements}</span>
              </button>
              <button
                id="nav-tab-buyer-messages"
                onClick={() => {
                  audioService.playTactileTap();
                  onNavigate('conversation');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'conversation'
                    ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.nav.messages}</span>
              </button>
              <button
                id="nav-tab-patron-vault"
                onClick={() => {
                  audioService.playCeramicChime(420);
                  onNavigate('patron-vault');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentView === 'patron-vault'
                    ? 'bg-[#3D6B52] text-white shadow-sm'
                    : 'text-[#2C1810] hover:text-[#C85A32]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t.nav.patronVault}</span>
              </button>
            </>
          )}
        </nav>

        {/* Right Controls: Role Switcher, Language Toggle, Device View & Cart */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            id="nav-sound-toggle-btn"
            onClick={handleToggleSound}
            className={`h-10 px-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center ${
              soundOn
                ? 'border-[#E6DDD4] bg-[#F5EFEB] text-[#2C1810]'
                : 'border-red-200 bg-red-50 text-red-600'
            }`}
            title={soundOn ? 'Sound is ON (Web Audio synthesizer active)' : 'Sound is MUTED'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#C85A32]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Network / Offline Simulation Pill */}
          {onToggleNetworkStatus && (
            <button
              id="nav-network-toggle-btn"
              onClick={() => {
                audioService.playClickSound();
                onToggleNetworkStatus();
              }}
              className={`h-10 px-2 sm:px-2.5 rounded-xl border text-[11px] font-bold transition-all hidden sm:flex items-center gap-1 ${
                networkStatus === 'online'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : networkStatus === 'limited'
                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                  : 'border-gray-300 bg-gray-100 text-gray-600'
              }`}
              title="Click to simulate offline field connectivity"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  networkStatus === 'online'
                    ? 'bg-emerald-500'
                    : networkStatus === 'limited'
                    ? 'bg-amber-500'
                    : 'bg-gray-400'
                }`}
              />
              <span className="capitalize">{networkStatus}</span>
            </button>
          )}

          {/* Language Switcher Pill */}
          <button
            id="nav-lang-btn"
            onClick={() => {
              audioService.playTactileTap();
              onOpenLanguageModal();
            }}
            className="h-10 px-2.5 sm:px-3 rounded-xl border border-[#E6DDD4] bg-[#F5EFEB] text-[#2C1810] text-xs font-bold hover:bg-white transition-all flex items-center gap-1.5"
            title={t.nav.changeLanguage}
          >
            <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="uppercase">{language || currentLanguage}</span>
          </button>

          {/* Interactive Live Notifications Bell */}
          <div className="relative">
            <button
              id="nav-notif-btn"
              onClick={() => {
                audioService.playTactileTap();
                setIsNotifDropdownOpen(!isNotifDropdownOpen);
              }}
              className={`h-10 w-10 rounded-xl border transition-all flex items-center justify-center relative cursor-pointer ${
                isNotifDropdownOpen
                  ? 'border-[#C85A32] bg-orange-50'
                  : 'border-[#E6DDD4] bg-[#F5EFEB] hover:bg-white'
              }`}
              title="View Alerts & Order Statuses"
            >
              <Bell className="w-4 h-4 text-[#C85A32]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-600 rounded-full text-[9px] font-black text-white flex items-center justify-center animate-bounce shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {isNotifDropdownOpen && (
              <>
                {/* Click-outside backdrop */}
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setIsNotifDropdownOpen(false)}
                />
                <div
                  id="nav-notif-dropdown"
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border-2 border-[#E6DDD4] shadow-xl z-50 overflow-hidden flex flex-col max-h-96"
                >
                  <div className="p-3 border-b border-[#E6DDD4] bg-[#F5EFEB]/50 flex items-center justify-between">
                    <span className="text-xs font-black text-[#2C1810] flex items-center gap-1.5">
                      🔔 Updates & Activity
                    </span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    )}
                  </div>

                  <div className="overflow-y-auto divide-y divide-[#E6DDD4] flex-1 max-h-72">
                    {roleNotifs.length === 0 ? (
                      <div className="p-8 text-center text-[#2C1810]/50 text-xs font-semibold">
                        No notifications yet
                      </div>
                    ) : (
                      roleNotifs.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            audioService.playCeramicChime(460);
                            if (onMarkNotificationAsRead) {
                              onMarkNotificationAsRead(notif.id);
                            }
                          }}
                          className={`p-3 text-left transition-colors cursor-pointer hover:bg-[#F5EFEB]/40 ${
                            !notif.isRead ? 'bg-amber-50/50 border-l-2 border-[#C85A32]' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-black text-[#2C1810]">
                              {notif.title}
                            </h4>
                            <span className="text-[9px] text-[#2C1810]/40 font-bold whitespace-nowrap">
                              {notif.timestamp}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#2C1810]/70 leading-relaxed mt-1 font-sans">
                            {notif.message}
                          </p>
                          {!notif.isRead && (
                            <span className="text-[9px] text-[#C85A32] font-black uppercase mt-1.5 inline-block tracking-wider">
                              ● Mark as read
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="p-2 border-t border-[#E6DDD4] bg-[#F5EFEB]/30 text-center">
                    <button
                      onClick={() => {
                        audioService.playClickSound();
                        setIsNotifDropdownOpen(false);
                      }}
                      className="text-[10px] font-black text-[#C85A32] hover:underline"
                    >
                      Close Notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Dedicated Portal Mode Badge (Separated Artisan & Buyer Modes) */}
          <button
            id="nav-portal-badge"
            onClick={() => {
              audioService.playTactileTap();
              onNavigate('profile-edit');
            }}
            className={`h-10 px-3 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:bg-white active:scale-95 cursor-pointer whitespace-nowrap select-none ${
              isArtisan
                ? 'border-[#C85A32]/30 bg-[#C85A32]/10 text-[#C85A32] hover:border-[#C85A32]'
                : 'border-[#3D6B52]/30 bg-[#3D6B52]/10 text-[#3D6B52] hover:border-[#3D6B52]'
            }`}
            title={isArtisan ? 'Click to view/edit Artisan Profile' : 'Click to view/edit Buyer Profile'}
          >
            {avatar && avatar.startsWith('http') ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-5 h-5 rounded-full object-cover border border-[#E6DDD4]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-sm">{avatar || (isArtisan ? '👩‍🎨' : '🛍️')}</span>
            )}
            <span className="hidden sm:inline font-extrabold text-[#2C1810] whitespace-nowrap truncate max-w-[120px]">
              {currentUser?.name || (isArtisan ? t.nav.artisanMode : t.nav.buyerMode)}
            </span>
          </button>

          {/* Logout / Switch Account */}
          {onLogout && (
            <button
              id="nav-logout-btn"
              onClick={() => {
                audioService.playClickSound();
                onLogout();
              }}
              className="h-10 px-2.5 sm:px-3 rounded-xl border border-[#E6DDD4] bg-[#F5EFEB] text-[#2C1810] hover:text-red-700 hover:border-red-300 hover:bg-red-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sign Out to Welcome Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}

          {/* Mobile frame toggle */}
          <button
            id="toggle-device-view-btn"
            onClick={() => {
              audioService.playTactileTap();
              onToggleDeviceView();
            }}
            className="h-10 px-2.5 sm:px-3 rounded-xl border border-[#E6DDD4] bg-[#F5EFEB] text-[#2C1810] text-xs font-semibold hover:bg-white transition-all flex items-center gap-1.5"
            title={isMobileDeviceView ? 'Switch to Fluid Desktop' : 'Preview in Mobile Device (390px)'}
          >
            {isMobileDeviceView ? (
              <>
                <Monitor className="w-4 h-4 text-[#C85A32]" />
                <span className="hidden lg:inline">{t.nav.desktopView}</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-[#C85A32]" />
                <span className="hidden lg:inline">{t.nav.mobileView}</span>
              </>
            )}
          </button>

          {/* Conscious Bag / Cart (Only visible in Buyer Mode) */}
          {!isArtisan && (
            <button
              id="open-conscious-bag-btn"
              onClick={() => {
                audioService.playTactileTap();
                onOpenCart();
              }}
              className="h-10 px-3 sm:px-3.5 rounded-xl bg-[#2C1810] text-[#FDFBF7] text-xs font-bold hover:bg-black transition-all flex items-center gap-2 relative shadow-sm cursor-pointer"
              aria-label="Open conscious bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.bag}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white text-[11px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-[#E6DDD4] bg-[#F5EFEB] px-1.5 py-1.5 justify-around">
        {isArtisan ? (
          <>
            <button
              onClick={() => onNavigate('artisan-home')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'artisan-home' ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => onNavigate('artisan-products')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'artisan-products' ? 'bg-[#C85A32] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.myProducts}
            </button>
            <button
              onClick={() => onNavigate('voice-studio')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'voice-studio' ? 'bg-[#C85A32] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.voiceStudio}
            </button>
            <button
              onClick={() => onNavigate('artisan-dashboard')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'artisan-dashboard' ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.dashboard}
            </button>
            <button
              onClick={() => onNavigate('artisan-assistant')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'artisan-assistant' ? 'bg-[#C85A32] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.aiAssistant}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('buyer-home')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'buyer-home' ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'marketplace' ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.discover}
            </button>
            <button
              onClick={() => onNavigate('post-requirement')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'post-requirement' ? 'bg-[#C85A32] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.requirements}
            </button>
            <button
              onClick={() => onNavigate('conversation')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'conversation' ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.messages}
            </button>
            <button
              onClick={() => onNavigate('patron-vault')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                currentView === 'patron-vault' ? 'bg-[#3D6B52] text-white' : 'text-[#2C1810]'
              }`}
            >
              {t.nav.patronVault}
            </button>
          </>
        )}
      </div>

      {/* Dynamic Profile Settings Modal (For both Artisan & Buyer) */}
      {false && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border-2 border-[#E6DDD4] max-w-md w-full p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E6DDD4]">
              <div>
                <h3 className="text-lg font-black text-[#2C1810]">
                  {profileT.editTitle}
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                  isArtisan ? 'bg-[#C85A32]/10 text-[#C85A32]' : 'bg-[#3D6B52]/10 text-[#3D6B52]'
                }`}>
                  {isArtisan ? profileT.artisanTitle : profileT.buyerTitle}
                </span>
              </div>
              <button
                onClick={() => {
                  audioService.playClickSound();
                  setIsProfileModalOpen(false);
                }}
                className="w-8 h-8 rounded-full hover:bg-[#F5EFEB] flex items-center justify-center transition-colors text-[#2C1810]/70 hover:text-[#2C1810] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Container */}
            <form onSubmit={handleSaveProfile} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {/* Avatar Selection Block */}
              <div className="bg-[#F5EFEB]/50 rounded-2xl p-4 border border-[#E6DDD4] text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#E6DDD4] flex items-center justify-center text-3xl mx-auto shadow-sm overflow-hidden mb-3">
                  {avatar && avatar.startsWith('http') ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span>{avatar || (isArtisan ? '👩‍🎨' : '🛍️')}</span>
                  )}
                </div>
                
                {/* Select Avatar Emoji Presets */}
                <span className="text-[10px] font-bold text-[#2C1810]/50 uppercase tracking-wider block mb-2">
                  Choose Avatar Emoji Preset
                </span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['👩‍🎨', '🧑‍🎨', '👨‍🎨', '🏺', '🛍️', '🎨', '🧵', '🧶', '🪵', '🌾', '🐘'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        audioService.playClickSound();
                        setAvatar(emoji);
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg border transition-all cursor-pointer hover:scale-110 active:scale-95 bg-white ${
                        avatar === emoji ? 'border-[#C85A32] bg-orange-50 shadow-xs' : 'border-[#E6DDD4]'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input: Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">
                  👤 {profileT.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6DDD4] bg-white text-sm font-semibold text-[#2C1810] focus:border-[#C85A32] focus:outline-none transition-all"
                />
              </div>

              {/* Form Input: Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">
                  📧 {profileT.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6DDD4] bg-white text-sm font-semibold text-[#2C1810] focus:border-[#C85A32] focus:outline-none transition-all"
                />
              </div>

              {/* Form Input: Phone / Mobile */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">
                  📞 {profileT.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6DDD4] bg-white text-sm font-semibold text-[#2C1810] focus:border-[#C85A32] focus:outline-none transition-all"
                />
              </div>

              {/* Form Input: Region / Location */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">
                  📍 {profileT.regionLabel}
                </label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6DDD4] bg-white text-sm font-semibold text-[#2C1810] focus:border-[#C85A32] focus:outline-none transition-all"
                />
              </div>

              {/* Role-Adaptive Inputs: Artisan Specialty vs. Buyer Business */}
              {isArtisan ? (
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1.5">
                    🏺 {profileT.craftLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={craftType}
                    onChange={(e) => setCraftType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6DDD4] bg-white text-sm font-semibold text-[#2C1810] focus:border-[#C85A32] focus:outline-none transition-all"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1.5">
                    🏢 {profileT.companyLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6DDD4] bg-white text-sm font-semibold text-[#2C1810] focus:border-[#C85A32] focus:outline-none transition-all"
                  />
                </div>
              )}
            </form>

            {/* Modal Footer Controls */}
            <div className="pt-4 border-t border-[#E6DDD4] flex gap-3">
              <button
                type="button"
                onClick={() => {
                  audioService.playClickSound();
                  setIsProfileModalOpen(false);
                }}
                className="flex-1 py-3 rounded-xl border border-[#E6DDD4] hover:bg-[#F5EFEB] text-xs font-bold text-[#2C1810]/70 hover:text-[#2C1810] transition-colors cursor-pointer"
              >
                {profileT.cancelBtn}
              </button>
              <button
                onClick={handleSaveProfile}
                className={`flex-1 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-sm active:scale-95 cursor-pointer ${
                  isArtisan
                    ? 'bg-[#C85A32] hover:bg-[#A94724]'
                    : 'bg-[#3D6B52] hover:bg-[#2C4E3C]'
                }`}
              >
                💾 {profileT.saveBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

