import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Volume2, CheckCircle, RefreshCw, Upload, ArrowRight, Play, Globe, Camera } from 'lucide-react';
import { VOICE_PRESETS, ARTISANS } from '../data/mockData';
import { VoicePreset, CraftItem, Artisan } from '../types';
import { analyzeArtisanSpeech } from '../utils/speechAiParser';
import { audioService } from '../utils/audioService';
import { useTranslation } from '../context/LanguageContext';
import { formatPrice } from '../utils/currency';

interface Props {
  onPublishCraft: (craft: CraftItem) => void;
  onNavigateToMarket: () => void;
}

export const VoiceStudio: React.FC<Props> = ({ onPublishCraft, onNavigateToMarket }) => {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedArtisanId, setSelectedArtisanId] = useState<string>('elena-ramos');
  const [transcript, setTranscript] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedCraft, setExtractedCraft] = useState<Partial<CraftItem> | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<VoicePreset | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80'
  );
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const recognitionRef = useRef<any>(null);
  const activeArtisan = ARTISANS[selectedArtisanId] || ARTISANS['elena-ramos'];

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
          console.error('Error accessing camera:', err);
        }
      }, 300);
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
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedPhoto(dataUrl);
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

  // Clean up camera stream
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Setup Web Speech API if supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            current += event.results[i][0].transcript;
          }
          if (current) {
            setTranscript(current);
          }
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition warning:', err);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // When transcript updates and recording finishes, analyze
  const handleProcessSpeech = (textToProcess: string) => {
    if (!textToProcess.trim()) return;
    setIsProcessing(true);
    audioService.playCeramicChime(320);

    setTimeout(() => {
      const result = analyzeArtisanSpeech(textToProcess, activeArtisan);
      setExtractedCraft(result);
      setIsProcessing(false);
    }, 900);
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop
      setIsRecording(false);
      audioService.playCeramicChime(190);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      handleProcessSpeech(transcript);
    } else {
      // Start
      audioService.playTactileTap();
      audioService.playCeramicChime(380);
      setTranscript('');
      setExtractedCraft(null);
      setPublishedSuccess(false);
      setIsRecording(true);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Fallback simulation if mic blocked
          simulateLiveVoice();
        }
      } else {
        simulateLiveVoice();
      }
    }
  };

  // Simulated live voice typing if mic isn't accessible in preview
  const simulateLiveVoice = () => {
    const sample =
      selectedPreset?.sampleTranscript ||
      `This is a two-handled cantaro made from wild riverbed black clay. I shaped it completely by hand without any wheel, then burnished the surface for six hours with a heirloom quartz stone before underground pit firing with dried agave leaves.`;

    let i = 0;
    const words = sample.split(' ');
    let currentText = '';

    const interval = setInterval(() => {
      if (i < words.length) {
        currentText += (i === 0 ? '' : ' ') + words[i];
        setTranscript(currentText);
        i++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        handleProcessSpeech(currentText);
      }
    }, 180);
  };

  const loadPreset = (preset: VoicePreset) => {
    setSelectedPreset(preset);
    if (preset.id === 'preset-elena') setSelectedArtisanId('elena-ramos');
    if (preset.id === 'preset-amina') setSelectedArtisanId('amina-diallo');
    if (preset.id === 'preset-tenzin') setSelectedArtisanId('tenzin-norbu');

    setTranscript(preset.sampleTranscript);
    audioService.playCeramicChime(290);
    handleProcessSpeech(preset.sampleTranscript);
  };

  const handlePublish = () => {
    if (!extractedCraft || !extractedCraft.title) return;

    const newCraft: CraftItem = {
      id: `craft-${Date.now()}`,
      title: extractedCraft.title || 'Handmade Artisan Piece',
      vernacularTitle: extractedCraft.vernacularTitle || 'Pieza Auténtica',
      category: extractedCraft.category || 'Ceramics & Pottery',
      artisanId: activeArtisan.id,
      artisan: activeArtisan,
      price: extractedCraft.price || 120,
      currency: 'INR',
      fairWagePercentage: extractedCraft.fairWagePercentage || 85,
      rawMaterialsPercentage: extractedCraft.rawMaterialsPercentage || 8,
      ecoLogisticsPercentage: extractedCraft.ecoLogisticsPercentage || 7,
      materials: extractedCraft.materials || ['Harvested mountain clay', 'River stone polish'],
      dimensions: extractedCraft.dimensions || '25cm × 20cm',
      weight: extractedCraft.weight || '1.2 kg',
      handcraftHours: extractedCraft.handcraftHours || 22,
      provenanceStory: extractedCraft.provenanceStory || transcript,
      originSteps: extractedCraft.originSteps || [
        { stage: 'Harvesting', description: 'Gathered by hand from ancestral deposit.', duration: '2 days' },
        { stage: 'Crafting', description: 'Hand-formed using generational methods.', duration: '3 days' },
      ],
      audioStory: {
        id: `voice-${Date.now()}`,
        title: `Spoken Lineage of ${extractedCraft.title}`,
        artisanName: activeArtisan.name,
        duration: '1:45',
        durationSeconds: 105,
        transcript: transcript || 'Spoken artisan lineage.',
      },
      images: [
        selectedPhoto,
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
      ],
      inStock: 3,
      status: 'ready',
      verifiedLineage: true,
      dateAdded: new Date().toISOString().split('T')[0],
    };

    onPublishCraft(newCraft);
    setPublishedSuccess(true);
    audioService.playCeramicChime(440);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Field Voice Studio • Low-Literacy Accessible AI
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
          {t.voiceStudio.title}
        </h1>
        <p className="text-sm text-[#2C1810]/70 mt-1 max-w-2xl leading-relaxed">
          {t.voiceStudio.subtitle}
        </p>
      </div>

      {/* Voice Mode Selector: Select Active Artisan & Presets */}
      <div className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider">
            {t.voiceStudio.selectArtisan}
          </label>
          <div className="flex items-center gap-2">
            {Object.values(ARTISANS).slice(0, 3).map((artisan) => (
              <button
                key={artisan.id}
                onClick={() => {
                  setSelectedArtisanId(artisan.id);
                  audioService.playTactileTap();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  selectedArtisanId === artisan.id
                    ? 'bg-[#2C1810] text-[#FDFBF7] shadow-sm'
                    : 'bg-[#FDFBF7] text-[#2C1810] border border-[#E6DDD4] hover:bg-white'
                }`}
              >
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span>{artisan.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Vernacular Speech Presets for Fast Testing */}
        <div className="pt-3 border-t border-[#E6DDD4]/80">
          <span className="text-xs text-[#2C1810]/70 font-medium block mb-2">
            {t.voiceStock.samplePhrases}:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {VOICE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedPreset?.id === preset.id
                    ? 'bg-[#EDE7E3] border-[#C85A32] shadow-sm'
                    : 'bg-[#FDFBF7] border-[#E6DDD4] hover:border-[#C85A32]/40'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[#2C1810] mb-0.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span className="truncate">{preset.title}</span>
                </div>
                <div className="text-[11px] text-[#2C1810]/60 truncate">{preset.region}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Voice Capture Stage */}
      <div className="bg-[#FDFBF7] border border-[#E6DDD4] rounded-2xl p-6 sm:p-8 mb-6 text-center relative overflow-hidden shadow-sm">
        {/* The 72px x 72px Primary Voice FAB as specified in design system */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative">
            {/* Animated pulsating rings during recording */}
            {isRecording && (
              <div
                className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                style={{
                  backgroundColor: 'rgba(226, 125, 96, 0.4)',
                  animationDuration: '1.4s',
                }}
              />
            )}
            <button
              id="primary-voice-fab"
              onClick={toggleRecording}
              className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 relative z-10 ${
                isRecording
                  ? 'bg-[#9f3c16] voice-pulse scale-105'
                  : 'bg-[#C85A32] hover:bg-[#b54f2a] active:scale-95'
              }`}
              style={{
                boxShadow: isRecording
                  ? '0 0 0 8px rgba(200, 90, 50, 0.2), 0 0 0 16px rgba(200, 90, 50, 0.1)'
                  : '0 8px 20px -3px rgba(44, 24, 16, 0.2)',
              }}
              aria-label={isRecording ? 'Stop recording artisan voice' : 'Start speaking artisan craft'}
            >
              {isRecording ? (
                <MicOff className="w-8 h-8 animate-pulse text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
          </div>

          <div className="mt-4">
            <span className="text-sm font-bold text-[#2C1810] block">
              {isRecording ? t.voiceStock.listening : t.voiceStudio.recordVoiceStory}
            </span>
            <span className="text-xs text-[#2C1810]/60">
              {isRecording ? t.voiceStock.tapToSpeak : t.voiceStudio.speakDialectHint}
            </span>
          </div>
        </div>

        {/* Voice Waveform Banner Rendered in #F5EFEB as specified */}
        {isRecording && (
          <div
            id="voice-waveform-banner"
            className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-xl p-3 max-w-md mx-auto my-4 flex items-center justify-center gap-1.5"
          >
            {[20, 45, 80, 100, 65, 85, 40, 90, 55, 75, 95, 50, 80, 40, 60].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full wave-bar"
                style={{
                  height: `${h * 0.28}px`,
                  backgroundColor: i % 2 === 0 ? '#C85A32' : '#3D6B52',
                  animationDelay: `${(i % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Voice Transcription Typography as specified: body-lg italicized #2C1810 with #C85A32 active caret */}
        <div className="mt-4 p-4 rounded-xl bg-[#F5EFEB]/70 border border-[#E6DDD4] min-h-[90px] text-left">
          <div className="flex items-center justify-between text-xs text-[#2C1810]/60 mb-2 font-semibold">
            <span>Real-time Audio-to-Text Transcription:</span>
            {transcript && (
              <button
                onClick={() => handleProcessSpeech(transcript)}
                className="text-[#C85A32] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Re-parse
              </button>
            )}
          </div>
          {transcript ? (
            <p className="text-base sm:text-lg italic text-[#2C1810] leading-relaxed font-serif">
              "{transcript}"
              {isRecording && (
                <span className="inline-block w-2 h-4 bg-[#C85A32] ml-1 animate-pulse" />
              )}
            </p>
          ) : (
            <p className="text-sm italic text-[#2C1810]/40 font-serif">
              "No speech detected yet. Tap the terracotta microphone and describe the piece: clay or fiber origins, firing ritual, colors, and hours worked..."
            </p>
          )}
        </div>
      </div>

      {/* AI Extraction & Synthesis Stage */}
      {isProcessing && (
        <div className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-6 text-center my-6 flex flex-col items-center justify-center">
          <RefreshCw className="w-8 h-8 text-[#C85A32] animate-spin mb-3" />
          <h3 className="text-base font-bold text-[#2C1810]">
            AI Synthesizing Vernacular Craft Listing...
          </h3>
          <p className="text-xs text-[#2C1810]/60 mt-1 max-w-md">
            Extracting lineage techniques, raw material sourcing, and calculating living fair-wage compensation.
          </p>
        </div>
      )}

      {extractedCraft && !isProcessing && (
        <div className="bg-[#F5EFEB] border border-[#E6DDD4] rounded-2xl p-5 sm:p-6 mb-8 transition-all animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DDD4] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3D6B52]" />
              <h3 className="text-lg font-bold text-[#2C1810]">
                Synthesized Catalog Entry & Proof
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#3D6B52]/15 text-[#3D6B52]">
              Verified 100% Direct Lineage
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Craft Image preview & photo selector */}
            <div>
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#EDE7E3] mb-3 relative border border-[#E6DDD4]">
                <img
                  src={selectedPhoto}
                  alt="Synthesized Craft"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#C85A32]/5 pointer-events-none" />
              </div>
              <span className="text-[11px] text-[#2C1810]/60 font-semibold block mb-1.5">
                Select Visual Proof from Workshop:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
                ].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhoto(img)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedPhoto === img ? 'border-[#C85A32]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-3.5 space-y-2">
                <button
                  type="button"
                  id="take-live-photo-btn"
                  onClick={startCamera}
                  className="w-full h-10 px-3 rounded-xl border border-[#C85A32] text-[#C85A32] hover:bg-[#C85A32]/5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Live Photo</span>
                </button>
                <label className="w-full h-10 rounded-xl bg-[#EDE7E3] hover:bg-[#e2dad3] text-[#2C1810]/80 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#E6DDD4] shadow-xs">
                  <Upload className="w-4 h-4 text-[#C85A32]" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Center & Right: Extracted metadata & Fair Wage breakdown */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#2C1810]/60">Craft Title (Catalog Ready)</span>
                <input
                  type="text"
                  value={extractedCraft.title || ''}
                  onChange={(e) =>
                    setExtractedCraft({ ...extractedCraft, title: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 text-base font-bold text-[#2C1810] bg-white border border-[#E6DDD4] rounded-xl focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#2C1810]/60">Ancestral Title</span>
                  <input
                    type="text"
                    value={extractedCraft.vernacularTitle || ''}
                    onChange={(e) =>
                      setExtractedCraft({ ...extractedCraft, vernacularTitle: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 text-sm italic font-serif text-[#2C1810] bg-white border border-[#E6DDD4] rounded-xl focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#2C1810]/60">Craft Category</span>
                  <div className="mt-1 px-3 py-2 text-sm font-semibold text-[#2C1810] bg-[#EDE7E3] rounded-xl">
                    {extractedCraft.category}
                  </div>
                </div>
              </div>

              {/* Raw Materials extracted */}
              <div>
                <span className="text-xs font-semibold text-[#2C1810]/60">Harvested Materials & Sourcing</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {extractedCraft.materials?.map((m, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white border border-[#E6DDD4] text-[#2C1810]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fair Wage Math Box */}
              <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E6DDD4]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#2C1810] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#3D6B52]" />
                    Fair Wage Transparency Calculation
                  </span>
                  <span className="text-sm font-extrabold text-[#2C1810]">
                    {formatPrice(extractedCraft.price || 0)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-[#3D6B52]/10 text-[#3D6B52]">
                    <div className="font-extrabold text-sm">85%</div>
                    <div className="text-[10px] font-medium mt-0.5">
                      Direct to {activeArtisan.name} ({formatPrice(Math.round((extractedCraft.price || 120) * 0.85))})
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#2C1810]/5 text-[#2C1810]">
                    <div className="font-extrabold text-sm">8%</div>
                    <div className="text-[10px] font-medium mt-0.5">Raw Sourcing</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#C85A32]/10 text-[#C85A32]">
                    <div className="font-extrabold text-sm">7%</div>
                    <div className="text-[10px] font-medium mt-0.5">Eco Packaging</div>
                  </div>
                </div>
              </div>

              {/* Publish Action */}
              {publishedSuccess ? (
                <div className="p-4 rounded-xl bg-[#3D6B52]/15 border border-[#3D6B52]/30 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#3D6B52] mb-1">
                    <CheckCircle className="w-4 h-4" />
                    Published to Conscious Marketplace!
                  </div>
                  <p className="text-xs text-[#2C1810]/70 mb-3">
                    Your piece and its spoken voice lineage are now live for conscious patrons.
                  </p>
                  <button
                    onClick={onNavigateToMarket}
                    className="h-11 px-5 rounded-xl bg-[#2C1810] text-[#FDFBF7] text-xs font-bold hover:bg-black transition-all inline-flex items-center gap-2"
                  >
                    <span>View in Conscious Marketplace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 pt-2">
                  <button
                    id="publish-craft-btn"
                    onClick={handlePublish}
                    className="flex-1 h-12 rounded-xl bg-[#C85A32] text-white text-sm font-bold hover:bg-[#b54f2a] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Publish Piece & Spoken Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 📹 Live Camera capture modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-[#2C1810]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FDFBF7] rounded-3xl border border-[#E6DDD4] max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#E6DDD4] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#C85A32]" />
                <span className="font-extrabold text-sm text-[#2C1810]">Take Live Craft Photo</span>
              </div>
              <button
                onClick={stopCamera}
                className="text-xs font-bold text-[#2C1810]/60 hover:text-[#2C1810] hover:bg-[#EDE7E3] px-2 py-1 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
            <div className="relative aspect-[4/3] bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[3px] border-dashed border-white/30 rounded-xl pointer-events-none m-4 animate-pulse" />
            </div>
            <div className="p-5 flex items-center justify-center bg-[#F5EFEB]">
              <button
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full bg-white border-4 border-[#C85A32] flex items-center justify-center active:scale-95 transition-transform shadow-lg relative"
                aria-label="Capture photo"
              >
                <span className="w-10 h-10 rounded-full bg-[#C85A32]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
