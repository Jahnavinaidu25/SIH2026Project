import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  Sliders,
  Globe,
  Tag,
  Info,
  DollarSign,
  Layers,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { ArtisanProduct } from '../types';

interface Props {
  onProductCreated?: (newProduct: ArtisanProduct) => void;
  onSaveAndPublish?: (newProduct: ArtisanProduct) => void;
  onCancel: () => void;
}

export const ArtisanDigitizeStudio: React.FC<Props> = ({
  onProductCreated,
  onSaveAndPublish,
  onCancel,
}) => {
  const { t, language } = useTranslation();

  // Multi-step wizard: 1=Photo & Voice, 2=Recognition, 3=Image Studio, 4=Voice Input, 5=AI Processing, 6=Smart Catalog, 7=Price Assistant
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Data states
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80'
  );
  const [imageEnhanced, setImageEnhanced] = useState<boolean>(true);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  // Recognition state
  const [detectedCategory, setDetectedCategory] = useState('Home & Kitchen');
  const [detectedCraft, setDetectedCraft] = useState('Traditional Pottery');
  const [detectedMaterial, setDetectedMaterial] = useState('Natural Terracotta');
  const [recognitionConfidence, setRecognitionConfidence] = useState(94);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);
  const timerRef = useRef<any>(null);
  const [detectedVoiceLang, setDetectedVoiceLang] = useState<'kn' | 'hi' | 'en'>('kn');
  const [voiceTranscript, setVoiceTranscript] = useState(
    'ಇದು ನಮ್ಮ ರಾಮನಗರದ ಕೆಂಪು ಮಣ್ಣಿನಿಂದ ಕೈಯಿಂದ ಮಾಡಿದ ಸಾಂಪ್ರದಾಯಿಕ ನೀರು ಕುಡಿಯುವ ಮಡಕೆ. ಇದು ನೈಸರ್ಗಿಕವಾಗಿ ನೀರನ್ನು ತಂಪಾಗಿರಿಸುತ್ತದೆ. (This is a handmade unglazed terracotta water pot made from Ramanagara red clay. Naturally cools drinking water without electricity).'
  );

  // Catalog state (Multilingual)
  const [activeCatalogLang, setActiveCatalogLang] = useState<'en' | 'hi' | 'kn'>('en');
  const [productTitleEn, setProductTitleEn] = useState('Traditional Terracotta Water Pot');
  const [productTitleHi, setProductTitleHi] = useState('पारंपरिक मिट्टी का मटका');
  const [productTitleKn, setProductTitleKn] = useState('ಸಾಂಪ್ರದಾಯಿಕ ಮಣ್ಣಿನ ಮಡಕೆ');

  const [descriptionEn, setDescriptionEn] = useState(
    'Handmade unglazed porous terracotta water pot shaped on an ancestral potter wheel. Naturally keeps water cool through evaporation. Free from lead, chemical glazing, and toxic pigments.'
  );
  const [descriptionHi, setDescriptionHi] = useState(
    'हाथ से बनाया गया बिना पॉलिश वाला पारंपरिक मिट्टी का मटका। प्राकृतिक रूप से पानी को ठंडा रखता है। किसी भी केमिकल व सीसे से मुक्त।'
  );
  const [descriptionKn, setDescriptionKn] = useState(
    'ಕೈಯಿಂದ ಮಾಡಿದ ಮಣ್ಣಿನ ಮಡಕೆ. ನೈಸರ್ಗಿಕ ಆವಿಯಾಗುವಿಕೆಯ ಮೂಲಕ ನೀರನ್ನು ತಂಪಾಗಿಡುತ್ತದೆ. ಸೀಸ ಮತ್ತು ರಾಸಾಯನಿಕ ಲೇಪನಗಳಿಂದ ಮುಕ್ತವಾಗಿದೆ.'
  );

  const [tags, setTags] = useState(['Terracotta', 'Handmade Pot', 'Natural Clay', 'Eco Friendly', 'Ramanagara']);
  const [dimensions, setDimensions] = useState('28cm height × 22cm diameter');

  // Pricing state
  const [marketMin, setMarketMin] = useState(800);
  const [marketMax, setMarketMax] = useState(950);
  const [recommendedPrice, setRecommendedPrice] = useState(899);
  const [finalPrice, setFinalPrice] = useState(899);

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Step 2 & Step 5 automated transitions for simulated AI recognition
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  useEffect(() => {
    if (currentStep === 2) {
      setAnalyzingProgress(0);
      const interval = setInterval(() => {
        setAnalyzingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 25;
        });
      }, 350);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Voice timer toggle
  const toggleRecording = () => {
    audioService.playClickSound();
    if (!isRecording) {
      setIsRecording(true);
      setVoiceTimer(0);
      timerRef.current = setInterval(() => {
        setVoiceTimer((v) => v + 1);
      }, 1000);
    } else {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
          audioService.playCeramicChime(420);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraOpen(true);
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
          }
        } catch (err) {
          console.error(err);
        }
      }, 200);
    } catch (err) {
      console.error(err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setSelectedPhoto(canvas.toDataURL('image/jpeg'));
        audioService.playCeramicChime(440);
      }
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const handleSaveProduct = () => {
    audioService.playCeramicChime(520);
    const newProd: ArtisanProduct = {
      id: `art-prod-${Date.now()}`,
      name: productTitleEn,
      price: finalPrice,
      stock: 35,
      status: 'Active',
      category: 'Pottery',
      material: detectedMaterial,
      craftType: detectedCraft,
      description: descriptionEn,
      tags: tags,
      image: selectedPhoto,
      fairWagePercentage: 88,
      handcraftHours: 14,
      marketplaces: {
        amazonReady: true,
        flipkartReady: true,
        craftbridgeReady: true,
      },
    };

    if (onProductCreated) {
      onProductCreated(newProd);
    }
    if (onSaveAndPublish) {
      onSaveAndPublish(newProd);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6">
      {/* Wizard Progress Stepper (Screens 11-17) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => {
              audioService.playClickSound();
              if (currentStep > 1) setCurrentStep((s) => s - 1);
              else onCancel();
            }}
            className="text-xs font-bold text-[#2C1810]/70 hover:text-[#C85A32] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentStep === 1 ? 'Cancel' : 'Previous Step'}</span>
          </button>
          <div className="text-xs font-extrabold text-[#C85A32]">
            Step {currentStep} of 7 • AI Digitization
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#E6DDD4] overflow-hidden">
          <div
            className="h-full bg-[#C85A32] transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: CREATE PRODUCT (Screen 11) */}
      {currentStep === 1 && (
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
              📸 Screen 11 • Create Product
            </span>
            <h2 className="text-2xl font-extrabold text-[#2C1810]">
              Add Your Handmade Craft
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1 max-w-md mx-auto">
              Snap a photo with your phone or select from your gallery. Our AI will automatically identify the craft form and materials.
            </p>
          </div>

          {/* Camera View Modal */}
          {isCameraOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-4 max-w-sm w-full text-center">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl mb-4" />
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={capturePhoto}
                    className="px-5 py-2 rounded-xl bg-[#C85A32] text-white text-xs font-bold"
                  >
                    Capture
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-5 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Photo Preview & Options */}
          <div className="max-w-sm mx-auto mb-6">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#F5EFEB] border-2 border-dashed border-[#E6DDD4] relative group">
              <img
                src={selectedPhoto}
                alt="Selected craft"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={startCamera}
                  className="px-3 py-1.5 rounded-xl bg-white text-[#2C1810] text-xs font-bold shadow-md"
                >
                  Camera
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                type="button"
                onClick={startCamera}
                className="py-2.5 px-3 rounded-xl border border-[#C85A32] text-[#C85A32] hover:bg-[#C85A32]/5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Take Live Photo</span>
              </button>

              <label className="py-2.5 px-3 rounded-xl bg-[#F5EFEB] hover:bg-[#eae3dc] border border-[#E6DDD4] text-[#2C1810] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-[#C85A32]" />
                <span>Upload Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={() => {
              audioService.playClickSound();
              setCurrentStep(2);
            }}
            className="w-full py-3.5 rounded-2xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Analyze Product with AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: PRODUCT RECOGNITION (Screen 12) */}
      {currentStep === 2 && (
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-3">
            🔍 Screen 12 • Product Recognition
          </span>

          <h2 className="text-2xl font-extrabold text-[#2C1810] mb-2">
            AI Craft Identification
          </h2>

          {analyzingProgress < 100 ? (
            <div className="py-12 max-w-sm mx-auto space-y-4">
              <RefreshCw className="w-10 h-10 text-[#C85A32] animate-spin mx-auto" />
              <div className="text-sm font-bold text-[#2C1810]">Analyzing Product...</div>
              <div className="w-full h-2 rounded-full bg-[#E6DDD4] overflow-hidden">
                <div
                  className="h-full bg-[#C85A32] transition-all"
                  style={{ width: `${analyzingProgress}%` }}
                />
              </div>
              <p className="text-xs text-[#2C1810]/60">
                Scanning silhouette, clay texture, unglazed porosity, and shaping markings.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#3D6B52]/10 border border-[#3D6B52]/20 max-w-md mx-auto text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#3D6B52] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>AI Detected Product</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#3D6B52] text-[11px] font-extrabold">
                    {recognitionConfidence}% Confidence
                  </span>
                </div>
                <div className="text-lg font-extrabold text-[#2C1810]">
                  Traditional Terracotta Water Pot
                </div>
                <div className="text-xs text-[#2C1810]/70 mt-1 space-y-1">
                  <div>• <strong>Craft Type:</strong> {detectedCraft}</div>
                  <div>• <strong>Primary Material:</strong> {detectedMaterial}</div>
                  <div>• <strong>Category:</strong> {detectedCategory}</div>
                </div>
              </div>

              <div className="flex gap-3 max-w-md mx-auto">
                <button
                  onClick={() => {
                    audioService.playClickSound();
                    setCurrentStep(3);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Proceed to Image Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: AI IMAGE STUDIO (Screen 13) */}
      {currentStep === 3 && (
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
              🎨 Screen 13 • AI Image Studio
            </span>
            <h2 className="text-2xl font-extrabold text-[#2C1810]">
              E-Commerce Visual Enhancement
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1">
              Background cleaned, soft studio lighting applied, and formatted for high-converting marketplaces.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            {/* Image Preview with Toggle */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E6DDD4] bg-[#F5EFEB] mb-4">
              <img
                src={selectedPhoto}
                alt="Product visual"
                className={`w-full h-full object-cover transition-all ${
                  imageEnhanced && !showOriginal ? 'filter contrast-105 brightness-105' : 'filter-none'
                }`}
              />
              <div className="absolute top-3 left-3 bg-[#2C1810]/80 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-xs">
                {showOriginal ? 'Original Shot' : 'AI Enhanced Studio'}
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5EFEB] border border-[#E6DDD4]">
                <span className="text-xs font-bold text-[#2C1810]">Background Removal & Studio Lighting</span>
                <button
                  onClick={() => {
                    audioService.playClickSound();
                    setImageEnhanced(!imageEnhanced);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    imageEnhanced ? 'bg-[#3D6B52]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      imageEnhanced ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5EFEB] border border-[#E6DDD4]">
                <span className="text-xs font-bold text-[#2C1810]">Hold to View Original</span>
                <button
                  onMouseDown={() => setShowOriginal(true)}
                  onMouseUp={() => setShowOriginal(false)}
                  onTouchStart={() => setShowOriginal(true)}
                  onTouchEnd={() => setShowOriginal(false)}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-white border border-[#E6DDD4] hover:bg-gray-50"
                >
                  Compare
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              audioService.playClickSound();
              setCurrentStep(4);
            }}
            className="w-full py-3.5 rounded-2xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Proceed to Multilingual Voice Input</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 4: MULTILINGUAL VOICE INPUT (Screen 14) */}
      {currentStep === 4 && (
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-3">
            🎙️ Screen 14 • Multilingual Voice Input
          </span>

          <h2 className="text-2xl font-extrabold text-[#2C1810] mb-1">
            Describe Your Product in Your Language
          </h2>
          <p className="text-xs text-[#2C1810]/70 max-w-md mx-auto mb-6">
            Speak naturally in Kannada, Hindi, or English. Explain how you made it, the materials used, and care tips.
          </p>

          {/* Big Voice Button */}
          <div className="my-6">
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white transition-all shadow-lg active:scale-95 ${
                isRecording ? 'bg-red-600 animate-pulse scale-110' : 'bg-[#C85A32] hover:bg-[#b04b25]'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            <div className="text-xs font-extrabold text-[#2C1810] mt-3">
              {isRecording ? `Listening... ${voiceTimer}s` : 'Tap to Start Speaking'}
            </div>
            <div className="text-[11px] text-[#2C1810]/60 mt-0.5">
              Detected Dialect: {detectedVoiceLang === 'kn' ? 'ಕನ್ನಡ (Kannada)' : 'हिन्दी (Hindi)'}
            </div>
          </div>

          {/* Transcript Box */}
          <div className="bg-[#FDFBF7] border border-[#E6DDD4] rounded-2xl p-4 text-left max-w-lg mx-auto mb-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#C85A32] mb-1">
              Recognized Voice Input:
            </div>
            <p className="text-xs text-[#2C1810] font-sans leading-relaxed">
              "{voiceTranscript}"
            </p>
          </div>

          <button
            onClick={() => {
              audioService.playClickSound();
              setCurrentStep(5);
            }}
            className="w-full py-3.5 rounded-2xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Synthesize with AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 5: AI PROCESSING ANIMATION (Screen 15) */}
      {currentStep === 5 && (
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-3">
            ⚡ Screen 15 • AI Processing Pipeline
          </span>

          <h2 className="text-2xl font-extrabold text-[#2C1810] mb-2">
            Synthesizing Smart Catalog
          </h2>
          <p className="text-xs text-[#2C1810]/60 max-w-md mx-auto mb-6">
            Translating dialect nuances, extracting technical specifications, and structuring e-commerce metadata.
          </p>

          <div className="max-w-sm mx-auto space-y-2.5 text-left mb-6">
            {[
              'Image received & visual markers identified',
              'Product recognized as Unglazed Terracotta',
              'Spoken audio processed via NLP',
              'Kannada dialect translated & normalized',
              'Multilingual descriptions generated',
              'Search tags & category metadata created',
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5EFEB] text-xs font-bold text-[#2C1810] animate-fadeIn"
              >
                <CheckCircle className="w-4 h-4 text-[#3D6B52]" />
                <span>{task}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              audioService.playClickSound();
              setCurrentStep(6);
            }}
            className="w-full py-3.5 rounded-2xl bg-[#3D6B52] text-white text-xs font-extrabold hover:bg-[#2f5540] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>View Generated Smart Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 6: SMART CATALOG (Screen 16) */}
      {currentStep === 6 && (
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-1">
                ✨ Screen 16 • Smart Catalog
              </span>
              <h2 className="text-2xl font-extrabold text-[#2C1810]">
                Multilingual Product Profile
              </h2>
            </div>

            {/* Language Switcher Tabs */}
            <div className="flex bg-[#F5EFEB] p-1 rounded-xl border border-[#E6DDD4]">
              <button
                onClick={() => setActiveCatalogLang('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCatalogLang === 'en' ? 'bg-[#2C1810] text-white shadow-xs' : 'text-[#2C1810]/70'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveCatalogLang('hi')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCatalogLang === 'hi' ? 'bg-[#2C1810] text-white shadow-xs' : 'text-[#2C1810]/70'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setActiveCatalogLang('kn')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCatalogLang === 'kn' ? 'bg-[#2C1810] text-white shadow-xs' : 'text-[#2C1810]/70'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-[#2C1810] mb-1">Product Title</label>
              {activeCatalogLang === 'en' && (
                <input
                  type="text"
                  value={productTitleEn}
                  onChange={(e) => setProductTitleEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-bold text-[#2C1810]"
                />
              )}
              {activeCatalogLang === 'hi' && (
                <input
                  type="text"
                  value={productTitleHi}
                  onChange={(e) => setProductTitleHi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-bold text-[#2C1810]"
                />
              )}
              {activeCatalogLang === 'kn' && (
                <input
                  type="text"
                  value={productTitleKn}
                  onChange={(e) => setProductTitleKn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-bold text-[#2C1810]"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">Craft Category</label>
                <input
                  type="text"
                  value={detectedCraft}
                  onChange={(e) => setDetectedCraft(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">Raw Material</label>
                <input
                  type="text"
                  value={detectedMaterial}
                  onChange={(e) => setDetectedMaterial(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-semibold text-[#2C1810]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C1810] mb-1">
                E-Commerce Description ({activeCatalogLang.toUpperCase()})
              </label>
              {activeCatalogLang === 'en' && (
                <textarea
                  rows={3}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-medium text-[#2C1810]"
                />
              )}
              {activeCatalogLang === 'hi' && (
                <textarea
                  rows={3}
                  value={descriptionHi}
                  onChange={(e) => setDescriptionHi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-medium text-[#2C1810]"
                />
              )}
              {activeCatalogLang === 'kn' && (
                <textarea
                  rows={3}
                  value={descriptionKn}
                  onChange={(e) => setDescriptionKn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DDD4] text-xs font-medium text-[#2C1810]"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C1810] mb-1">SEO & Discovery Tags</label>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tg, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#F5EFEB] border border-[#E6DDD4] text-xs font-semibold text-[#2C1810]"
                  >
                    #{tg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              audioService.playClickSound();
              setCurrentStep(7);
            }}
            className="w-full py-3.5 rounded-2xl bg-[#C85A32] text-white text-xs font-extrabold hover:bg-[#b04b25] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Proceed to AI Price Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 7: AI PRICE ASSISTANT (Screen 17) */}
      {currentStep === 7 && (
        <div className="bg-white border-2 border-[#E6DDD4] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
              🏷️ Screen 17 • AI Price Assistant
            </span>
            <h2 className="text-2xl font-extrabold text-[#2C1810]">
              Fair-Wage Pricing Recommendation
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810]/70 mt-1 max-w-md mx-auto">
              Our market intelligence engine analyzes raw clay sourcing costs, handcraft labor hours, and historical buyer demand to ensure sustainable artisan wages.
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#FDFBF7] border border-[#E6DDD4] rounded-2xl p-5 max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DDD4] mb-4">
              <div>
                <div className="text-xs text-[#2C1810]/60 font-semibold">Estimated Market Range</div>
                <div className="text-base font-extrabold text-[#2C1810]">
                  ₹{marketMin} – ₹{marketMax}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-[#3D6B52]">Recommended Price</div>
                <div className="text-2xl font-extrabold text-[#C85A32]">
                  ₹{recommendedPrice}
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between text-[#2C1810]/80">
                <span>Natural Riverbed Clay & Fuel</span>
                <span className="font-bold">₹280</span>
              </div>
              <div className="flex justify-between text-[#2C1810]/80">
                <span>Handcrafting & Kiln Firing (14 hrs)</span>
                <span className="font-bold">₹420</span>
              </div>
              <div className="flex justify-between text-[#3D6B52] font-bold">
                <span>Artisan Living Wage Margin (88%)</span>
                <span>₹199</span>
              </div>
            </div>

            {/* Final Price Input */}
            <div className="pt-3 border-t border-[#E6DDD4]">
              <label className="block text-xs font-bold text-[#2C1810] mb-1">
                Your Listing Price (INR)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[#2C1810]/50">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-[#E6DDD4] text-base font-extrabold text-[#2C1810]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFinalPrice(recommendedPrice)}
                  className="px-3 py-2 rounded-xl bg-[#3D6B52]/10 text-[#3D6B52] text-xs font-bold hover:bg-[#3D6B52]/20"
                >
                  Accept ₹{recommendedPrice}
                </button>
              </div>
            </div>
          </div>

          {/* Prototype Notice */}
          <div className="text-center mb-6">
            <span className="inline-block text-[11px] font-bold text-[#2C1810]/50 bg-[#F5EFEB] px-3 py-1 rounded-full">
              ⚡ Demo Data • Real-time algorithm calculates from local artisan cluster baseline
            </span>
          </div>

          {/* Publish & Finish */}
          <button
            onClick={handleSaveProduct}
            className="w-full py-3.5 rounded-2xl bg-[#3D6B52] text-white text-xs font-extrabold hover:bg-[#2f5540] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Save & Publish to Smart Catalog</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
