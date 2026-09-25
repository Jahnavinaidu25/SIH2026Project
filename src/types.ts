export type UserRole = 'artisan' | 'buyer' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  region?: string;
  craftCategory?: string;
  craftType?: string;
  companyName?: string;
  organization?: string;
  preferredLanguage?: string;
  customDetails?: { id: string; label: string; value: string }[];
}

export interface InventoryTransaction {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  timestamp: string;
  method: 'voice' | 'manual';
}

export type AppLanguage = 'en' | 'hi' | 'kn' | 'ta' | 'ml' | 'te';

export interface LanguageOption {
  code: AppLanguage;
  name: string;
  nativeName: string;
  greeting: string;
}

export interface ArtisanProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: 'Active' | 'Low Stock' | 'Out of Stock';
  category: string;
  material?: string;
  materials?: string[];
  craftType?: string;
  productionTime?: string;
  description: string;
  tags?: string[];
  image: string;
  fairWagePercentage?: number;
  handcraftHours?: number;
  aiCatalogReview?: {
    isReviewed: boolean;
    summary: string;
    suggestedTags: string[];
    optimalPriceSuggestion: number;
  };
  marketplaces?: {
    amazonReady: boolean;
    flipkartReady: boolean;
    craftbridgeReady: boolean;
  };
}

export interface BuyerRequirement {
  id: string;
  productType: string;
  quantity: number;
  budget: number;
  location: string;
  timeline: string;
  notes?: string;
  status: 'analyzing' | 'confirmed' | 'matched';
  dateCreated: string;
}

export interface ArtisanMatch {
  id: string;
  artisanId: string;
  artisanName: string;
  avatar: string;
  craftSpecialization: string;
  location: string;
  matchScore: number;
  reasons: string[];
  experienceYears: number;
  rating: number;
  responseTime: string;
  bio: string;
  products: string[];
  email?: string;
  phone?: string;
}

export interface ConversationMessage {
  id: string;
  artisanId: string;
  sender: 'buyer' | 'artisan';
  text: string;
  timestamp: string;
  isVoice?: boolean;
  audioDuration?: string;
}

export interface Artisan {
  id: string;
  name: string;
  vernacularName?: string;
  avatar: string;
  location?: string;
  region: string;
  country?: string;
  communityCoop?: string;
  lineage?: string;
  yearsPracticing?: number;
  yearsExperience?: number;
  specialty?: string;
  portrait?: string;
  bio: string;
  audioStorySnippet?: string;
  voiceIntroAudio?: string;
  fairWageRating?: number;
}

export interface AudioStory {
  id: string;
  title: string;
  artisanName?: string;
  duration: string;
  durationSeconds?: number;
  transcript: string;
  audioToneFrequency?: number;
  recordedDate?: string;
  language?: string;
  audioFrequency?: number;
}

export interface CraftItem {
  id: string;
  title: string;
  vernacularTitle: string;
  category: 'Ceramics & Pottery' | 'Handwoven Textiles' | 'Botanical Dyes' | 'Woodcraft & Carving' | 'Basketry & Reed' | 'Metals & Brass';
  artisanId: string;
  artisan: Artisan;
  price: number;
  currency: string;
  fairWagePercentage: number; // e.g. 82%
  rawMaterialsPercentage: number; // e.g. 10%
  ecoLogisticsPercentage: number; // e.g. 8%
  materials: string[];
  dimensions: string;
  weight: string;
  handcraftHours: number;
  provenanceStory: string;
  originSteps: {
    stage: string;
    description: string;
    duration: string;
  }[];
  audioStory: AudioStory;
  images: string[];
  inStock: number;
  status: 'sun-curing' | 'in-kiln' | 'ready' | 'reserved';
  verifiedLineage: boolean;
  featured?: boolean;
  dateAdded: string;
}

export interface CartItem {
  craft: CraftItem;
  quantity: number;
  patronVoiceNote?: string;
}

export interface VoicePreset {
  id: string;
  title: string;
  speaker: string;
  region: string;
  sampleTranscript: string;
  suggestedCraft: Partial<CraftItem>;
}

export interface ProvenancePassport {
  certificateId: string;
  craftId: string;
  craftTitle: string;
  craftImage: string;
  artisanName: string;
  artisanRegion: string;
  dateCrafted: string;
  dateAcquired: string;
  handcraftHours: number;
  materialsUsed: string[];
  fairWagePaid: number;
  totalPrice: number;
  status: 'Crafting in Field' | 'Sun-Curing' | 'Dispatched (Eco-Transit)' | 'Safely in Sanctuary';
  currentStageIndex: number; // 0, 1, 2, 3
  artisanThumbprintHash: string;
  gpsCoordinates: string;
  patronNote?: string;
  artisanAudioNote?: {
    title: string;
    transcript: string;
    duration: string;
    audioFrequency: number;
  };
}

export interface BespokeCommission {
  id: string;
  title: string;
  artisanId: string;
  artisanName: string;
  artisanRegion: string;
  artisanAvatar: string;
  description: string;
  category: string;
  requestedMaterials: string[];
  estimatedHours: number;
  fairPriceQuote: number;
  status: 'In Review' | 'Accepted by Maker' | 'Shaping in Progress' | 'Completed';
  dateRequested: string;
  voiceTranscript?: string;
}

export interface ArtisanVoiceMessage {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  craftTitle: string;
  timestamp: string;
  transcript: string;
  translatedDialect?: string;
  duration: string;
  audioFrequency: number;
  hasPatronReplied: boolean;
  patronReplyTranscript?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  role: 'artisan' | 'buyer' | 'all';
}

