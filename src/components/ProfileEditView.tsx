import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, User, Shield, Info, HelpCircle } from 'lucide-react';
import { AppUser } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  currentUser: AppUser | null;
  onUpdateUser: (updated: AppUser) => void;
  onCancel: () => void;
}

export const ProfileEditView: React.FC<Props> = ({
  currentUser,
  onUpdateUser,
  onCancel,
}) => {
  const { t, language } = useTranslation();
  const isArtisan = currentUser?.role === 'artisan';

  // State variables for core details
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || currentUser?.mobile || '');
  const [region, setRegion] = useState(currentUser?.region || currentUser?.location || '');
  const [craftType, setCraftType] = useState(currentUser?.craftType || currentUser?.craftCategory || '');
  const [companyName, setCompanyName] = useState(currentUser?.companyName || currentUser?.organization || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  // State for dynamic custom fields
  const [customDetails, setCustomDetails] = useState<{ id: string; label: string; value: string }[]>(
    currentUser?.customDetails || [
      { id: 'cd-1', label: isArtisan ? 'Ancestral Lineage' : 'Preferred Categories', value: isArtisan ? '3rd Generation Master Potter' : 'Eco-Friendly Terracotta, Handspun Wool' },
      { id: 'cd-2', label: 'Preferred Shipping', value: 'Eco-Express Green Transport' }
    ]
  );

  // Temp states for adding a new field
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [showAddField, setShowAddField] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phone || currentUser.mobile || '');
      setRegion(currentUser.region || currentUser.location || '');
      setCraftType(currentUser.craftType || currentUser.craftCategory || '');
      setCompanyName(currentUser.companyName || currentUser.organization || '');
      setAvatar(currentUser.avatar || '');
      if (currentUser.customDetails) {
        setCustomDetails(currentUser.customDetails);
      }
    }
  }, [currentUser]);

  // Multilingual translations inside component for profile options
  const profileT = {
    en: {
      title: 'Separate Profile Page Edit',
      artisanSub: 'Configure your heritage craftsmanship identity and custom attributes',
      buyerSub: 'Configure your conscious patron details and direct trade preferences',
      avatarLabel: 'Select Your Digital Avatar Preset',
      coreHeader: 'Core Professional Information',
      customHeader: 'Dynamic Custom Attributes',
      addBtn: 'Add New Attribute',
      removeBtn: 'Remove Field',
      fieldNamePlaceholder: 'e.g. Bank Account / Certification',
      fieldValuePlaceholder: 'e.g. State Bank of India, IFSC...',
      saveBtn: 'Save Changes & Update Profile',
      cancelBtn: 'Go Back',
    },
    hi: {
      title: 'अलग प्रोफाइल संपादन पृष्ठ',
      artisanSub: 'अपनी शिल्पकार पहचान और कस्टम विवरण कॉन्फ़िगर करें',
      buyerSub: 'अपने जागरूक ग्राहक विवरण और प्रत्यक्ष व्यापार प्राथमिकताएं कॉन्फ़िger करें',
      avatarLabel: 'अपने डिजिटल अवतार का चयन करें',
      coreHeader: 'मुख्य व्यावसायिक जानकारी',
      customHeader: 'गतिशील कस्टम विवरण (नया जोड़ें/हटाएं)',
      addBtn: 'नया विवरण जोड़ें',
      removeBtn: 'विवरण हटाएं',
      fieldNamePlaceholder: 'उदा. बैंक खाता / प्रमाणीकरण',
      fieldValuePlaceholder: 'उदा. भारतीय स्टेट बैंक...',
      saveBtn: 'परिवर्तनों को सहेजें',
      cancelBtn: 'पीछे जाएं',
    },
    kn: {
      title: 'ಪ್ರತ್ಯೇಕ ಪ್ರೊಫೈಲ್ ಸಂಪಾದನೆ ಪುಟ',
      artisanSub: 'ನಿಮ್ಮ ಕುಶಲಕರ್ಮಿ ಗುರುತು ಮತ್ತು ಕಸ್ಟಮ್ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಬದಲಾಯಿಸಿ',
      buyerSub: 'ನಿಮ್ಮ ಕಾಳಜಿಯುಳ್ಳ ಗ್ರಾಹಕ ವಿವರಗಳು ಮತ್ತು ಆದ್ಯತೆಗಳನ್ನು ಇಲ್ಲಿ ಸಂಪಾದಿಸಿ',
      avatarLabel: 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಅವತಾರ ಆಯ್ಕೆಮಾಡಿ',
      coreHeader: 'ಮುಖ್ಯ ವೃತ್ತಿಪರ ಮಾಹಿತಿ',
      customHeader: 'ಗತಿಶೀಲ ಕಸ್ಟಮ್ ವಿವರಗಳು (ಹೊಸತು ಸೇರಿಸಿ/ತೆಗೆಯಿರಿ)',
      addBtn: 'ಹೊಸ ವಿವರ ಸೇರಿಸಿ',
      removeBtn: 'ತೆಗೆದುಹಾಕಿ',
      fieldNamePlaceholder: 'ಉದಾ: ಬ್ಯಾಂಕ್ ಖಾತೆ ಸಂಖ್ಯೆ',
      fieldValuePlaceholder: 'ಉದಾ: ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ...',
      saveBtn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
      cancelBtn: 'ಹಿಂದೆ ಹೋಗಿ',
    },
    ta: {
      title: 'தனிப்பட்ட சுயவிவரப் பக்கம்',
      artisanSub: 'உங்கள் கைவினைஞர் அடையாளத்தையும் கூடுதல் விவரங்களையும் உள்ளமைக்கவும்',
      buyerSub: 'உங்கள் வாங்குபவர் விவரங்களையும் நேரடி வர்த்தக விருப்பங்களையும் உள்ளமைக்கவும்',
      avatarLabel: 'உங்கள் டிஜிட்டல் அவதாரத்தைத் தேர்ந்தெடுக்கவும்',
      coreHeader: 'முக்கிய தொழில்முறை தகவல்கள்',
      customHeader: 'கூடுதல் தனிப்பயன் விவரங்கள் (சேர்க்கவும்/நீக்கவும்)',
      addBtn: 'புதிய விவரத்தைச் சேர்',
      removeBtn: 'நீக்கு',
      fieldNamePlaceholder: 'உதாரணமாக: வங்கி கணக்கு / சான்றிதழ்',
      fieldValuePlaceholder: 'உதாரணமாக: ஸ்டேட் பேங்க் ஆஃப் இந்தியா...',
      saveBtn: 'மாற்றங்களைச் சேமிக்கவும்',
      cancelBtn: 'பின்செல்லவும்',
    },
    te: {
      title: 'ప్రత్యేక ప్రొఫైల్ ఎడిటింగ్ పేజీ',
      artisanSub: 'మీ హస్తకళల గుర్తింపును మరియు అదనపు సమాచారాన్ని ఇక్కడ మార్చండి',
      buyerSub: 'మీ కొనుగోలుదారు వివరాలను మరియు ప్రాధాన్యతలను ఇక్కడ సరిచేయండి',
      avatarLabel: 'మీ డిజిటల్ అవతార్ ఎంచుకోండి',
      coreHeader: 'ప్రధాన వృత్తిపరమైన సమాచారం',
      customHeader: 'డైనమిక్ అనుకూల సమాచారం (జోడించండి/తొలగించండి)',
      addBtn: 'కొత్త ఫీల్డ్ జోడించు',
      removeBtn: 'తొలగించు',
      fieldNamePlaceholder: 'ఉదా: బ్యాంక్ ఖాతా',
      fieldValuePlaceholder: 'ఉదా: స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా...',
      saveBtn: 'మార్పులను సేవ్ చేయి',
      cancelBtn: 'వెనుకకు వెళ్ళు',
    },
    ml: {
      title: 'പ്രത്യേക പ്രൊഫൈൽ എഡിറ്റിംഗ് പേജ്',
      artisanSub: 'നിങ്ങളുടെ പൈതൃക കരകൗശല വിവരങ്ങളും കസ്റ്റം ഫീൽഡുകളും സജ്ജീകരിക്കുക',
      buyerSub: 'നിങ്ങളുടെ കോൺഷ്യസ് ബയർ വിവരങ്ങളും മുൻഗണനകളും എഡിറ്റ് ചെയ്യുക',
      avatarLabel: 'ഡിജിറ്റൽ അവതാർ തിരഞ്ഞെടുക്കുക',
      coreHeader: 'പ്രധാന വിവരങ്ങൾ',
      customHeader: 'ഡൈനാമിക് കസ്റ്റം ഫീൽഡുകൾ (ചേർക്കുക/ഒഴിവാക്കുക)',
      addBtn: 'പുതിയ വിവരങ്ങൾ ചേർക്കുക',
      removeBtn: 'ഒഴിവാക്കുക',
      fieldNamePlaceholder: 'ഉദാ: ബാങ്ക് അക്കൗണ്ട്',
      fieldValuePlaceholder: 'ഉദാ: സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ഇന്ത്യ...',
      saveBtn: 'വിവരങ്ങൾ സംരക്ഷിക്കുക',
      cancelBtn: 'തിരികെ പോവുക',
    }
  };

  const currentT = profileT[language as keyof typeof profileT] || profileT.en;

  const handleAddCustomField = () => {
    if (!newLabel.trim() || !newValue.trim()) return;
    audioService.playClickSound();
    const newField = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label: newLabel.trim(),
      value: newValue.trim(),
    };
    setCustomDetails((prev) => [...prev, newField]);
    setNewLabel('');
    setNewValue('');
    setShowAddField(false);
  };

  const handleRemoveCustomField = (id: string) => {
    audioService.playTactileTap();
    setCustomDetails((prev) => prev.filter((field) => field.id !== id));
  };

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
      customDetails,
    };

    onUpdateUser(updatedUser);
    audioService.playCeramicChime(520);
    onCancel();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DDD4] pb-6">
        <div className="space-y-1">
          <button
            onClick={() => {
              audioService.playTactileTap();
              onCancel();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C85A32] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentT.cancelBtn}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2C1810]">
            {currentT.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1810]/70 max-w-2xl leading-relaxed">
            {isArtisan ? currentT.artisanSub : currentT.buyerSub}
          </p>
        </div>

        <span className={`self-start sm:self-center text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
          isArtisan ? 'bg-[#C85A32]/10 text-[#C85A32] border border-[#C85A32]/30' : 'bg-[#3D6B52]/10 text-[#3D6B52] border border-[#3D6B52]/30'
        }`}>
          {isArtisan ? 'Artisan Workshop' : 'Conscious Buyer'}
        </span>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar Preset Picker */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-2 border-[#E6DDD4] p-6 text-center space-y-4 shadow-2xs">
            <h3 className="text-sm font-black text-[#2C1810] uppercase tracking-wider">
              {currentT.avatarLabel}
            </h3>
            
            <div className="w-24 h-24 rounded-full bg-[#F5EFEB] border-2 border-[#E6DDD4] flex items-center justify-center text-5xl mx-auto shadow-inner overflow-hidden">
              {avatar && avatar.startsWith('http') ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span>{avatar || (isArtisan ? '👩‍🎨' : '🛍️')}</span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2.5 justify-center pt-2">
              {['👩‍🎨', '🧑‍🎨', '👨‍🎨', '🏺', '🛍️', '🎨', '🧵', '🧶', '🪵', '🌾', '🐘', '🌾'].map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    audioService.playClickSound();
                    setAvatar(emoji);
                  }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border transition-all cursor-pointer hover:scale-110 bg-white ${
                    avatar === emoji ? 'border-[#C85A32] bg-orange-50 shadow-xs ring-1 ring-[#C85A32]/20' : 'border-[#E6DDD4]'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines info card */}
          <div className="bg-[#3D6B52]/5 border border-[#3D6B52]/20 rounded-2xl p-4 text-xs text-[#2C1810]/80 space-y-2">
            <h4 className="font-bold text-[#3D6B52] flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              Direct Fair Trade Assured
            </h4>
            <p className="leading-relaxed">
              Every profile attribute you configure here is securely integrated with peer-to-peer lineage checks, letting buyers trace products directly back to your workshop region.
            </p>
          </div>
        </div>

        {/* Center & Right Column: Fields & Dynamic Details List */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Core Fields Card */}
          <div className="bg-white rounded-3xl border-2 border-[#E6DDD4] p-6 space-y-5 shadow-2xs">
            <h3 className="text-sm font-black text-[#2C1810] uppercase tracking-wider border-b border-[#E6DDD4] pb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#C85A32]" />
              {currentT.coreHeader}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] text-xs font-bold text-[#2C1810] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              {/* Field 2: Email */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] text-xs font-bold text-[#2C1810] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              {/* Field 3: Phone */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] text-xs font-bold text-[#2C1810] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              {/* Field 4: Region */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">Region / Location</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] text-xs font-bold text-[#2C1810] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              {/* Role Adaptive Field 5 */}
              {isArtisan ? (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#2C1810] mb-1.5">Craft Specialty</label>
                  <input
                    type="text"
                    value={craftType}
                    onChange={(e) => setCraftType(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] text-xs font-bold text-[#2C1810] focus:outline-none focus:border-[#C85A32]"
                    placeholder="e.g. Unglazed Terracotta Potter, Block Printing, Handspun Wool"
                  />
                </div>
              ) : (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#2C1810] mb-1.5">Organization / Business Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E6DDD4] bg-[#FDFBF7] text-xs font-bold text-[#2C1810] focus:outline-none focus:border-[#C85A32]"
                    placeholder="e.g. Studio Vistara Co."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Attributes Manager Card (ADD and REMOVE fields dynamically) */}
          <div className="bg-white rounded-3xl border-2 border-[#E6DDD4] p-6 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#E6DDD4] pb-2">
              <h3 className="text-sm font-black text-[#2C1810] uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#C85A32]" />
                {currentT.customHeader}
              </h3>
              
              <button
                type="button"
                onClick={() => {
                  audioService.playClickSound();
                  setShowAddField(!showAddField);
                }}
                className="h-8 px-3 rounded-xl bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold hover:bg-[#C85A32]/20 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Field</span>
              </button>
            </div>

            {/* Input fields to add a brand new field dynamically */}
            {showAddField && (
              <div className="bg-[#F5EFEB]/50 border border-[#E6DDD4] rounded-2xl p-4 space-y-3 animate-fadeIn">
                <span className="text-[10px] font-black uppercase text-[#2C1810]/60 tracking-wider block">
                  🛡️ New Custom Information Block
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#2C1810] mb-1">Field Label</label>
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-lg border border-[#E6DDD4] bg-white text-xs font-bold text-[#2C1810] focus:outline-none"
                      placeholder={currentT.fieldNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#2C1810] mb-1">Field Value</label>
                    <input
                      type="text"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-lg border border-[#E6DDD4] bg-white text-xs font-bold text-[#2C1810] focus:outline-none"
                      placeholder={currentT.fieldValuePlaceholder}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddField(false)}
                    className="h-8 px-3 rounded-lg border border-[#E6DDD4] text-xs font-bold text-[#2C1810]/70 hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="h-8 px-3 rounded-lg bg-[#C85A32] text-white text-xs font-bold hover:bg-[#b04b25]"
                  >
                    Confirm Add
                  </button>
                </div>
              </div>
            )}

            {/* List of current fields (with option to remove each item dynamically) */}
            <div className="space-y-3">
              {customDetails.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E6DDD4] hover:border-[#C85A32]/40 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#C85A32] tracking-wider block">
                      {field.label}
                    </span>
                    <span className="text-xs font-bold text-[#2C1810]">
                      {field.value}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveCustomField(field.id)}
                    className="w-8 h-8 rounded-full border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                    title={currentT.removeBtn}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 h-12 rounded-2xl bg-[#C85A32] text-white text-xs font-black uppercase tracking-wider hover:bg-[#b04b25] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{currentT.saveBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                audioService.playTactileTap();
                onCancel();
              }}
              className="h-12 px-6 rounded-2xl border-2 border-[#E6DDD4] bg-white text-[#2C1810] text-xs font-bold hover:bg-[#F5EFEB] transition-all"
            >
              {currentT.cancelBtn}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
