import React, { useState, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, Sparkles, X, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';
import { ArtisanProduct } from '../types';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: ArtisanProduct | null;
  onUpdateStock: (productId: string, newStock: number) => void;
}

type StockVoiceState = 'IDLE_PROMPT' | 'LISTENING' | 'UNDERSTANDING' | 'CONFIRM' | 'SUCCESS';

export const VoiceStockModal: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
  onUpdateStock,
}) => {
  const { t } = useTranslation();
  const [currentState, setCurrentState] = useState<StockVoiceState>('IDLE_PROMPT');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [extractedStock, setExtractedStock] = useState<number>(25);
  const [targetProductName, setTargetProductName] = useState(
    product?.name || 'Traditional Terracotta Water Pot'
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentState('IDLE_PROMPT');
      setLiveTranscript('');
      setExtractedStock(25);
      if (product) {
        setTargetProductName(product.name);
      }
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  // STATE 1 -> STATE 2: Start Voice Listening
  const handleStartListening = () => {
    audioService.playCeramicChime(360);
    setCurrentState('LISTENING');
    setLiveTranscript('');

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;

      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setLiveTranscript(text);
        processSpokenStock(text);
      };

      recognition.onerror = () => {
        simulateVoiceStock();
      };

      try {
        recognition.start();
      } catch (err) {
        simulateVoiceStock();
      }
    } else {
      simulateVoiceStock();
    }
  };

  const simulateVoiceStock = () => {
    const phrases = [
      'Update...',
      'Update terracotta pot...',
      'Update terracotta pot stock to 25 units',
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i < phrases.length) {
        setLiveTranscript(phrases[i]);
        i++;
      } else {
        clearInterval(timer);
        processSpokenStock('Update terracotta pot stock to 25');
      }
    }, 600);
  };

  const processSpokenStock = (spokenText: string) => {
    setTimeout(() => {
      audioService.playCeramicChime(420);
      setCurrentState('UNDERSTANDING');
      // Extract number if present or default to 25
      const match = spokenText.match(/\d+/);
      const stockVal = match ? parseInt(match[0], 10) : 25;
      setExtractedStock(stockVal);

      // Auto move to CONFIRM state after 1 sec
      setTimeout(() => {
        setCurrentState('CONFIRM');
      }, 1000);
    }, 800);
  };

  // STATE 4 -> STATE 5: Confirm Update
  const handleConfirmUpdate = () => {
    audioService.playCeramicChime(520);
    if (product) {
      onUpdateStock(product.id, extractedStock);
    }
    setCurrentState('SUCCESS');
  };

  const handleFinish = () => {
    audioService.playTactileTap();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C1810]/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-[#E6DDD4] shadow-2xl p-6 relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STATE 1: Prompt & Big Mic */}
        {currentState === 'IDLE_PROMPT' && (
          <div className="space-y-6 text-center py-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {t.voiceStock.modalTitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
                {t.voiceStock.modalTitle}
              </h3>
              <p className="text-xs text-[#2C1810]/70 max-w-xs mx-auto mt-1">
                {t.voiceStock.subtitle}
              </p>
            </div>

            {/* Big Mic Button */}
            <div className="py-3 flex justify-center">
              <button
                id="voice-stock-big-mic-btn"
                onClick={handleStartListening}
                className="w-24 h-24 rounded-full bg-[#C85A32] text-white flex items-center justify-center shadow-xl hover:bg-[#b54f2a] active:scale-95 transition-all group"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(200, 90, 50, 0.4)',
                }}
              >
                <Mic className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Example prompt card */}
            <div className="bg-[#F5EFEB] p-4 rounded-2xl border border-[#E6DDD4] text-xs text-[#2C1810] space-y-1">
              <span className="font-bold text-[#C85A32] block">{t.voiceStock.samplePhrases}:</span>
              <p className="italic font-medium text-sm">
                "{t.voiceStock.hintText}"
              </p>
            </div>
          </div>
        )}

        {/* STATE 2: Listening Animation with Live Transcription */}
        {currentState === 'LISTENING' && (
          <div className="space-y-6 text-center py-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              {t.voiceStock.listening}
            </div>

            {/* Terracotta Waveform animation */}
            <div className="flex items-center justify-center gap-1.5 h-16">
              {[40, 75, 95, 60, 85, 100, 55, 90, 45, 70, 85].map((height, i) => (
                <div
                  key={i}
                  className="w-2 rounded-full bg-[#C85A32] transition-all duration-200"
                  style={{
                    height: `${height}%`,
                    animation: `pulse 0.8s ease-in-out ${i * 0.08}s infinite alternate`,
                  }}
                />
              ))}
            </div>

            <div className="bg-[#F5EFEB] p-4 rounded-2xl border border-[#E6DDD4] min-h-[70px] flex items-center justify-center">
              <p className="text-sm font-semibold text-[#2C1810] italic">
                {liveTranscript ? `"${liveTranscript}"` : t.voiceStock.speechDetected}
              </p>
            </div>
          </div>
        )}

        {/* STATE 3: AI Understanding State */}
        {currentState === 'UNDERSTANDING' && (
          <div className="space-y-6 text-center py-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              {t.voiceStock.aiInterpreting}
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-[#C85A32] shadow-sm text-left space-y-3">
              <div>
                <span className="text-[11px] font-bold text-[#2C1810]/50 uppercase">{t.voiceStock.targetProduct}</span>
                <div className="text-base font-extrabold text-[#2C1810]">
                  {targetProductName}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6DDD4] flex justify-between items-center">
                <span className="text-xs font-bold text-[#2C1810]/60">{t.voiceStock.intentIdentified}:</span>
                <span className="text-xl font-extrabold text-[#C85A32]">
                  {extractedStock} {t.common.units}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STATE 4: Confirmation State */}
        {currentState === 'CONFIRM' && (
          <div className="space-y-5 text-center py-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.voiceStock.intentIdentified}
              </div>
              <h3 className="text-xl font-extrabold text-[#2C1810]">
                {t.voiceStock.modalTitle}
              </h3>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E6DDD4] text-left space-y-3 shadow-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-[#2C1810]/50 uppercase">{t.voiceStock.targetProduct}</span>
                  <div className="text-base font-extrabold text-[#2C1810]">
                    {targetProductName}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#3D6B52]/10 text-[#3D6B52]">
                  {t.artisanProducts.filterActive}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E6DDD4] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#2C1810]/60 block">{t.artisanProducts.stockLevel}: {product?.stock ?? 12}</span>
                  <span className="text-xs font-bold text-[#C85A32] block">{t.voiceStock.newStockCount}</span>
                </div>
                <div className="text-2xl font-black text-[#C85A32]">
                  {extractedStock} <span className="text-xs font-semibold text-[#2C1810]/60">{t.common.units}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleStartListening}
                className="flex-1 h-12 rounded-xl bg-[#F5EFEB] hover:bg-[#EDE7E3] text-[#2C1810] text-xs font-bold transition-all"
              >
                {t.voiceStock.tryAgain}
              </button>
              <button
                id="voice-stock-confirm-btn"
                onClick={handleConfirmUpdate}
                className="flex-1 h-12 rounded-xl bg-[#C85A32] hover:bg-[#b54f2a] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.voiceStock.confirmBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STATE 5: Success Message */}
        {currentState === 'SUCCESS' && (
          <div className="space-y-5 text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#3D6B52]/15 text-[#3D6B52] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#2C1810]">
                {t.voiceStock.successTitle}
              </h3>
              <p className="text-xs text-[#2C1810]/70">
                {targetProductName} is now set to{' '}
                <strong className="text-[#C85A32]">{extractedStock} {t.common.units}</strong>.
              </p>
            </div>

            <button
              id="voice-stock-finish-btn"
              onClick={handleFinish}
              className="w-full h-12 rounded-xl bg-[#2C1810] text-white text-xs font-bold hover:bg-black transition-all"
            >
              {t.common.continue}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
