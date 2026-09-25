import React, { useState } from 'react';
import { Globe, Check, ArrowRight } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import { AppLanguage, LanguageOption } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { getTranslation } from '../translations';

interface Props {
  currentLanguage?: AppLanguage;
  selectedLanguage?: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
  onContinue: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const LanguageScreen: React.FC<Props> = ({
  currentLanguage: propCurrentLanguage,
  selectedLanguage: propSelectedLanguage,
  onSelectLanguage,
  onContinue,
  isModal = false,
  onClose,
}) => {
  const { language: contextLang, setLanguage, textSize, setTextSize } = useTranslation();
  const initial = propCurrentLanguage || propSelectedLanguage || contextLang;
  const [selected, setSelected] = useState<AppLanguage>(initial);

  const t = getTranslation(selected);

  const handleChoose = (code: AppLanguage) => {
    setSelected(code);
    onSelectLanguage(code);
    setLanguage(code);
    audioService.playTactileTap();
  };

  const handleConfirm = () => {
    audioService.playCeramicChime(440);
    setLanguage(selected);
    onSelectLanguage(selected);
    onContinue();
  };

  const content = (
    <div className="w-full max-w-md mx-auto py-8 px-4 sm:px-6 flex flex-col justify-between min-h-[620px]">
      <div className="space-y-6">
        {/* Header Badge & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C85A32]/10 text-[#C85A32] mb-1 shadow-xs">
            <Globe className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
            {t.languageModal.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1810]/70 max-w-xs mx-auto leading-relaxed">
            {t.languageModal.subtitle}
          </p>
        </div>

        {/* Language Selection Cards */}
        <div className="space-y-2.5 pt-2" role="radiogroup" aria-label="Languages">
          {LANGUAGES.map((lang: LanguageOption) => {
            const isSelected = selected === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-btn-${lang.code}`}
                onClick={() => handleChoose(lang.code)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                  isSelected
                    ? 'border-[#C85A32] bg-[#F5EFEB] shadow-sm ring-2 ring-[#C85A32]/15'
                    : 'border-[#E6DDD4] bg-white hover:border-[#C85A32]/50 hover:bg-[#FDFBF7]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? 'bg-[#C85A32] text-white'
                        : 'bg-[#F5EFEB] text-[#2C1810]/70'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#2C1810] flex items-center gap-2">
                      <span>{lang.nativeName}</span>
                      {lang.name !== lang.nativeName && (
                        <span className="text-xs font-normal text-[#2C1810]/50">
                          ({lang.name})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#2C1810]/60 font-medium">
                      {lang.greeting}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#C85A32] bg-[#C85A32] text-white'
                      : 'border-[#E6DDD4] bg-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Text Size / Sizing Control */}
        <div className="pt-4 border-t border-[#E6DDD4]/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/60">
              {selected === 'en' && "Text Size"}
              {selected === 'hi' && "अक्षर का आकार"}
              {selected === 'kn' && "ಅಕ್ಷರದ ಗಾತ್ರ"}
              {selected === 'ta' && "எழுத்து அளவு"}
              {selected === 'ml' && "അക്ഷരത്തിന്റെ വലിപ്പം"}
              {selected === 'te' && "അక్షరం పరిమాణం"}
            </span>
            <span className="text-xs font-semibold text-[#C85A32]">
              {textSize === 'sm' && (selected === 'en' ? "Small" : selected === 'hi' ? "छोटा" : selected === 'ta' ? "சிறியது" : selected === 'ml' ? "ചെറുത്" : "ಸಣ್ಣ")}
              {textSize === 'base' && (selected === 'en' ? "Normal" : selected === 'hi' ? "सामान्य" : selected === 'ta' ? "சாதாரண" : selected === 'ml' ? "സാധാരണ" : "ಸಾಮಾನ್ಯ")}
              {textSize === 'lg' && (selected === 'en' ? "Large" : selected === 'hi' ? "बड़ा" : selected === 'ta' ? "பெரியത്" : selected === 'ml' ? "വലുത്" : "ದೊಡ್ಡ")}
              {textSize === 'xl' && (selected === 'en' ? "Extra Large" : selected === 'hi' ? "बहुत बड़ा" : selected === 'ta' ? "மிகப் பெரியത്" : selected === 'ml' ? "വളരെ വലുത്" : "ಅತಿ ದೊಡ್ಡ")}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F5EFEB] rounded-xl border border-[#E6DDD4]">
            {(['sm', 'base', 'lg', 'xl'] as const).map((size) => {
              const isSizeActive = textSize === size;
              return (
                <button
                  key={size}
                  onClick={() => {
                    audioService.playTactileTap();
                    setTextSize(size);
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    isSizeActive
                      ? 'bg-white text-[#C85A32] shadow-xs border border-[#E6DDD4]'
                      : 'text-[#2C1810]/60 hover:text-[#2C1810]'
                  }`}
                >
                  {size === 'sm' && "A-"}
                  {size === 'base' && "A"}
                  {size === 'lg' && "A+"}
                  {size === 'xl' && "A++"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 space-y-3">
        <button
          id="language-continue-btn"
          onClick={handleConfirm}
          className="w-full h-14 rounded-2xl bg-[#C85A32] text-white text-base font-bold hover:bg-[#b54f2a] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>{t.languageModal.continueBtn}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl text-xs font-bold text-[#2C1810]/60 hover:text-[#2C1810] hover:bg-[#F5EFEB] transition-all"
          >
            {t.languageModal.cancelBtn}
          </button>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-[#2C1810]/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-[#FDFBF7] rounded-3xl border border-[#E6DDD4] max-w-md w-full shadow-2xl overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      {content}
    </div>
  );
};
