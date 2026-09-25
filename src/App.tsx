import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MarketplaceView } from './components/MarketplaceView';
import { PatronVaultView } from './components/PatronVaultView';
import { VoiceStudio } from './components/VoiceStudio';
import { ProvenanceView } from './components/ProvenanceView';
import { WorkshopLedgerView } from './components/WorkshopLedgerView';
import { CraftDetailModal } from './components/CraftDetailModal';
import { AudioPlayerBanner } from './components/AudioPlayerBanner';
import { CartDrawer } from './components/CartDrawer';

// Authentication & Separate Portal Pages
import { PublicLandingView } from './components/PublicLandingView';
import { ArtisanLoginView } from './components/ArtisanLoginView';
import { BuyerLoginView } from './components/BuyerLoginView';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboardView } from './components/AdminDashboardView';

// Hero Flows & Feature Views
import { LanguageScreen } from './components/LanguageScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { BuyerHomeView } from './components/BuyerHomeView';
import { ArtisanHomeView } from './components/ArtisanHomeView';
import { ArtisanProductsView } from './components/ArtisanProductsView';
import { ArtisanProductDetailView } from './components/ArtisanProductDetailView';
import { ArtisanDigitizeStudio } from './components/ArtisanDigitizeStudio';
import { ArtisanInventoryView } from './components/ArtisanInventoryView';
import { VoiceStockModal } from './components/VoiceStockModal';
import { ArtisanBusinessDashboardView } from './components/ArtisanBusinessDashboardView';
import { AIBusinessAssistantView } from './components/AIBusinessAssistantView';
import { PostRequirementFlow } from './components/PostRequirementFlow';
import { SellEverywhereModal } from './components/SellEverywhereModal';
import { FAQChatbot } from './components/FAQChatbot';
import { ProfileEditView } from './components/ProfileEditView';

import {
  INITIAL_CRAFTS,
  INITIAL_PATRON_PASSPORTS,
  INITIAL_COMMISSIONS,
  INITIAL_VOICE_MESSAGES,
  INITIAL_ARTISAN_PRODUCTS,
} from './data/mockData';
import {
  CraftItem,
  AudioStory,
  CartItem,
  ProvenancePassport,
  BespokeCommission,
  ArtisanVoiceMessage,
  UserRole,
  AppLanguage,
  ArtisanProduct,
  AppUser,
  InventoryTransaction,
  AppNotification,
} from './types';
import { Mic, Sparkles, WifiOff, RefreshCw, ArrowRight, Globe } from 'lucide-react';
import { audioService } from './utils/audioService';
import { useTranslation } from './context/LanguageContext';
import { getLocalizedCraft, getLocalizedArtisanProduct } from './translations/productTranslations';

export default function App() {
  const {
    language: currentLanguage,
    setLanguage: setCurrentLanguageState,
    t,
    isLanguageModalOpen,
    openLanguageModal,
    closeLanguageModal,
  } = useTranslation();

  // Active User & Authentication State
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem('craftbridge_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Set default initially to null so users land straight on the welcome/login page
    return null;
  });

  const [userRole, setUserRole] = useState<UserRole>(currentUser?.role || 'artisan');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);

  // Active View Routing State
  // Public/Auth: 'landing' | 'artisan-login' | 'buyer-login' | 'admin-login'
  // Admin: 'admin-dashboard'
  // Artisan: 'artisan-home' | 'artisan-products' | 'artisan-product-detail' | 'artisan-digitize' | 'inventory' | 'voice-studio' | 'artisan-dashboard' | 'artisan-assistant'
  // Buyer: 'buyer-home' | 'marketplace' | 'post-requirement' | 'conversation' | 'patron-vault' | 'provenance' | 'workshop'
  const [currentView, setCurrentView] = useState<string>('landing');

  // Network Simulation State
  const [networkStatus, setNetworkStatus] = useState<'online' | 'limited' | 'offline'>('online');

  // Artisan Domain Data
  const [artisanProducts, setArtisanProducts] = useState<ArtisanProduct[]>(INITIAL_ARTISAN_PRODUCTS);
  const [selectedArtisanProduct, setSelectedArtisanProduct] = useState<ArtisanProduct | null>(null);
  const [voiceStockModalOpen, setVoiceStockModalOpen] = useState<boolean>(false);
  const [voiceStockTargetProduct, setVoiceStockTargetProduct] = useState<ArtisanProduct | null>(null);
  const [sellEverywhereProduct, setSellEverywhereProduct] = useState<ArtisanProduct | null>(null);
  const [inventoryTransactions, setInventoryTransactions] = useState<InventoryTransaction[]>([]);

  // Buyer & Marketplace Domain Data
  const [crafts, setCrafts] = useState<CraftItem[]>(INITIAL_CRAFTS);
  const [passports, setPassports] = useState<ProvenancePassport[]>(INITIAL_PATRON_PASSPORTS);
  const [commissions, setCommissions] = useState<BespokeCommission[]>(INITIAL_COMMISSIONS);
  const [voiceMessages, setVoiceMessages] = useState<ArtisanVoiceMessage[]>(INITIAL_VOICE_MESSAGES);
  const [selectedCraft, setSelectedCraft] = useState<CraftItem | null>(null);
  const [activeAudioStory, setActiveAudioStory] = useState<AudioStory | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamically localized states
  const localizedCrafts = React.useMemo(() => {
    return crafts.map((craft) => getLocalizedCraft(craft, currentLanguage, t));
  }, [crafts, currentLanguage, t]);

  const localizedArtisanProducts = React.useMemo(() => {
    return artisanProducts.map((p) => getLocalizedArtisanProduct(p, currentLanguage, t));
  }, [artisanProducts, currentLanguage, t]);

  const localizedSelectedCraft = React.useMemo(() => {
    return selectedCraft
      ? localizedCrafts.find((c) => c.id === selectedCraft.id) || selectedCraft
      : null;
  }, [selectedCraft, localizedCrafts]);

  const localizedSelectedArtisanProduct = React.useMemo(() => {
    return selectedArtisanProduct
      ? localizedArtisanProducts.find((p) => p.id === selectedArtisanProduct.id) || selectedArtisanProduct
      : null;
  }, [selectedArtisanProduct, localizedArtisanProducts]);

  const localizedVoiceStockTargetProduct = React.useMemo(() => {
    return voiceStockTargetProduct
      ? localizedArtisanProducts.find((p) => p.id === voiceStockTargetProduct.id) || voiceStockTargetProduct
      : null;
  }, [voiceStockTargetProduct, localizedArtisanProducts]);

  const localizedSellEverywhereProduct = React.useMemo(() => {
    return sellEverywhereProduct
      ? localizedArtisanProducts.find((p) => p.id === sellEverywhereProduct.id) || sellEverywhereProduct
      : null;
  }, [sellEverywhereProduct, localizedArtisanProducts]);

  const localizedCartItems = React.useMemo(() => {
    return cartItems.map((item) => ({
      ...item,
      craft: getLocalizedCraft(item.craft, currentLanguage, t),
    }));
  }, [cartItems, currentLanguage, t]);

  const localizedActiveAudioStory = React.useMemo(() => {
    if (!activeAudioStory) return null;
    const parentCraft = localizedCrafts.find((c) => c.audioStory.id === activeAudioStory.id);
    return parentCraft ? parentCraft.audioStory : activeAudioStory;
  }, [activeAudioStory, localizedCrafts]);

  // App Notifications Center State (Artisan & Buyer)
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Welcome to CraftBridge! 🏺',
      message: 'Your decentralized digital identity is successfully authenticated. Explore secure peer-to-peer trade with direct fair-wage margins.',
      timestamp: '5 mins ago',
      isRead: false,
      role: 'all',
    },
    {
      id: 'notif-2',
      title: 'Lineage Certification Ready 📜',
      message: 'Your craft catalogs are protected with decentralized origin tags. Tap to view your verified geographic provenance details.',
      timestamp: '1 hour ago',
      isRead: false,
      role: 'artisan',
    },
    {
      id: 'notif-3',
      title: 'Patron Vault Activated 🛡️',
      message: 'Secure your first handcraft purchase to instantly generate verifiable provenance passports directly inside your vault.',
      timestamp: '2 hours ago',
      isRead: false,
      role: 'buyer',
    }
  ]);

  // Post Requirement flow initial step
  const [buyerReqInitialStep, setBuyerReqInitialStep] = useState<'input' | 'analysis' | 'matches' | 'profile' | 'chat'>('input');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync Current User with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('craftbridge_current_user', JSON.stringify(currentUser));
      setUserRole(currentUser.role);
    } else {
      localStorage.removeItem('craftbridge_current_user');
    }
  }, [currentUser]);

  // Login Success Handlers
  const handleLoginSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setUserRole(user.role);
    audioService.playCeramicChime(440);

    if (user.role === 'admin') {
      setCurrentView('admin-dashboard');
      showToast(`Welcome back, Administrator ${user.name}`);
    } else if (user.role === 'artisan') {
      setCurrentView('artisan-home');
      showToast(`Welcome, Artisan ${user.name}!`);
    } else {
      setCurrentView('buyer-home');
      showToast(`Welcome, Conscious Patron ${user.name}!`);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    showToast('Signed out successfully. Choose a portal to continue.');
  };

  // Role Switcher Handler
  const handleSwitchRole = (newRole: UserRole) => {
    setUserRole(newRole);
    if (currentUser) {
      setCurrentUser({ ...currentUser, role: newRole });
    }
    if (newRole === 'artisan') {
      setCurrentView('artisan-home');
      showToast('Switched to Artisan Workshop mode');
    } else if (newRole === 'buyer') {
      setCurrentView('buyer-home');
      showToast('Switched to Conscious Buyer mode');
    } else {
      setCurrentView('admin-dashboard');
      showToast('Switched to Platform Admin mode');
    }
  };

  // Network Simulation Toggle
  const handleToggleNetworkStatus = () => {
    setNetworkStatus((prev) => {
      if (prev === 'online') return 'limited';
      if (prev === 'limited') return 'offline';
      return 'online';
    });
    audioService.playClickSound();
  };

  // Language Change Handler
  const handleSelectLanguage = (lang: AppLanguage) => {
    setCurrentLanguageState(lang);
    closeLanguageModal();
    showToast(`Language set to ${lang.toUpperCase()}`);
  };

  // Artisan Inventory Handlers
  const handleUpdateProductStock = (productId: string, newStock: number) => {
    let affectedProduct: ArtisanProduct | undefined;

    setArtisanProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          affectedProduct = p;
          return {
            ...p,
            stock: newStock,
            status: newStock === 0 ? 'Out of Stock' : newStock <= 5 ? 'Low Stock' : 'Active',
          };
        }
        return p;
      })
    );

    if (selectedArtisanProduct && selectedArtisanProduct.id === productId) {
      setSelectedArtisanProduct((prev) =>
        prev
          ? {
              ...prev,
              stock: newStock,
              status: newStock === 0 ? 'Out of Stock' : newStock <= 5 ? 'Low Stock' : 'Active',
            }
          : null
      );
    }

    if (affectedProduct) {
      const diff = newStock - affectedProduct.stock;
      const newTx: InventoryTransaction = {
        id: `tx-${Date.now()}`,
        productId,
        productName: affectedProduct.name,
        type: diff >= 0 ? 'in' : 'out',
        quantity: Math.abs(diff),
        previousStock: affectedProduct.stock,
        newStock,
        reason: 'Voice/Smart Inventory update',
        timestamp: 'Just now',
        method: 'voice',
      };
      setInventoryTransactions((prev) => [newTx, ...prev]);
    }

    showToast(`Inventory updated to ${newStock} units`);
  };

  const handleOpenVoiceStockModal = (product?: ArtisanProduct) => {
    setVoiceStockTargetProduct(product || null);
    setVoiceStockModalOpen(true);
  };

  const handleSaveProductChanges = (updatedProduct: ArtisanProduct) => {
    setArtisanProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setSelectedArtisanProduct(updatedProduct);
    showToast(`Changes saved for "${updatedProduct.name}"`);
  };

  // Digitize Studio Save & Publish Handler
  const handlePublishFromStudio = (newProd: ArtisanProduct) => {
    setArtisanProducts((prev) => [newProd, ...prev]);

    // Also bridge into buyer marketplace catalog
    const validCategory = (
      ['Ceramics & Pottery', 'Handwoven Textiles', 'Botanical Dyes', 'Woodcraft & Carving', 'Basketry & Reed', 'Metals & Brass'].includes(newProd.category)
        ? newProd.category
        : 'Ceramics & Pottery'
    ) as CraftItem['category'];

    const newCraft: CraftItem = {
      id: `craft-${Date.now()}`,
      title: newProd.name,
      vernacularTitle: newProd.name,
      artisanId: currentUser?.id || 'artisan-1',
      artisan: {
        id: currentUser?.id || 'artisan-1',
        name: currentUser?.name || 'Lakshmi Devi',
        region: currentUser?.region || 'Ramanagara, Karnataka',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        yearsExperience: 22,
        specialty: newProd.category,
        bio: 'Preserving ancestral village traditions through ethical fair-trade craftwork.',
      },
      category: validCategory,
      price: newProd.price,
      currency: 'INR',
      fairWagePercentage: 86,
      rawMaterialsPercentage: 10,
      ecoLogisticsPercentage: 4,
      handcraftHours: 14,
      materials: newProd.materials || ['Terracotta Clay', 'Natural River Silt'],
      dimensions: '28cm x 22cm x 30cm',
      weight: '3.2 kg',
      images: [newProd.image],
      audioStory: {
        id: `audio-${Date.now()}`,
        title: `${newProd.name} - Handcraft Lineage`,
        duration: '1:45',
        recordedDate: 'Today',
        language: currentLanguage,
        transcript: newProd.description,
        audioFrequency: 432,
      },
      provenanceStory: newProd.description,
      originSteps: [
        { stage: 'Material Gathering', description: 'River silt refined and mixed with organic soil', duration: '2 days' },
        { stage: 'Wheel Throwing & Shaping', description: 'Ancestral manual potter wheel forming', duration: '1 day' },
        { stage: 'Traditional Kiln Firing', description: 'Open wood-fired kiln with rice husk glaze', duration: '3 days' },
      ],
      inStock: newProd.stock,
      status: 'ready',
      verifiedLineage: true,
      dateAdded: 'Today',
    };

    setCrafts((prev) => [newCraft, ...prev]);
    showToast(`🎉 "${newProd.name}" digitized and published live!`);
    setCurrentView('artisan-products');
  };

  // Cart & Checkout Handlers
  const handleAddToCart = (craft: CraftItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.craft.id === craft.id);
      if (existing) {
        return prev.map((item) =>
          item.craft.id === craft.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { craft, quantity: 1 }];
    });
    audioService.playCeramicChime(420);
    showToast(`Added "${craft.title}" to Conscious Bag`);
  };

  const handleRemoveFromCart = (craftId: string) => {
    setCartItems((prev) => prev.filter((item) => item.craft.id !== craftId));
    audioService.playTactileTap();
  };

  const handleUpdateQuantity = (craftId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(craftId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.craft.id === craftId ? { ...item, quantity } : item))
    );
  };

  const handlePublishCraft = (newCraft: CraftItem) => {
    setCrafts((prev) => [newCraft, ...prev]);

    const newArtisanProd: ArtisanProduct = {
      id: `prod-${Date.now()}`,
      name: newCraft.title,
      category: newCraft.category as any,
      price: newCraft.price,
      stock: 25,
      status: 'Active',
      image: newCraft.images[0],
      description: newCraft.provenanceStory,
      craftType: newCraft.category,
      materials: newCraft.materials,
      productionTime: `${newCraft.handcraftHours} hours`,
      aiCatalogReview: {
        isReviewed: true,
        summary: 'AI voice-assisted story generated with lineage authentication tags.',
        suggestedTags: [newCraft.category, 'Handmade', 'Village Lineage'],
        optimalPriceSuggestion: newCraft.price,
      },
    };
    setArtisanProducts((prev) => [newArtisanProd, ...prev]);
    showToast(`Published "${newCraft.title}" to catalog!`);
    setCurrentView('artisan-products');
  };

  const handlePlayAudio = (craft: CraftItem) => {
    setActiveAudioStory(craft.audioStory);
  };

  const handleCheckoutSuccess = (items: CartItem[], patronNote: string, provId: string) => {
    const newPassports: ProvenancePassport[] = items.map((item, idx) => ({
      certificateId: idx === 0 ? provId : `PROV-${Date.now().toString().slice(-6)}-${idx}`,
      craftId: item.craft.id,
      craftTitle: item.craft.title,
      craftImage: item.craft.images[0],
      artisanName: item.craft.artisan.name,
      artisanRegion: item.craft.artisan.region,
      dateCrafted: 'Handcrafted in Village Workshop',
      dateAcquired: 'Today',
      handcraftHours: item.craft.handcraftHours,
      materialsUsed: item.craft.materials,
      fairWagePaid: Math.round((item.craft.price * item.craft.fairWagePercentage) / 100) * item.quantity,
      totalPrice: item.craft.price * item.quantity,
      status: 'Crafting in Field',
      currentStageIndex: 1,
      artisanThumbprintHash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
      gpsCoordinates: '16.9534° N, 96.7088° W',
      patronNote: patronNote || undefined,
      artisanAudioNote: {
        title: `Spoken blessing from ${item.craft.artisan.name}`,
        transcript: `Thank you dear patron. Your direct fair-wage support honors our ancestral lineage.`,
        duration: '0:28',
        audioFrequency: 440,
      },
    }));

    // Build notifications for both buyer and artisan
    const newNotifs: AppNotification[] = [];
    items.forEach((item) => {
      const fairWage = Math.round((item.craft.price * item.craft.fairWagePercentage) / 100) * item.quantity;
      
      // Buyer Notification
      newNotifs.push({
        id: `notif-b-${Date.now()}-${Math.random()}`,
        title: '🛍️ Order Placed Successfully!',
        message: `You purchased "${item.craft.title}" (x${item.quantity}) from ${item.craft.artisan.name}. Your Provenance Passport has been added to your Patron Vault!`,
        timestamp: 'Just now',
        isRead: false,
        role: 'buyer',
      });

      // Artisan Notification
      newNotifs.push({
        id: `notif-a-${Date.now()}-${Math.random()}`,
        title: '🔔 New Order Received!',
        message: `A conscious patron just purchased your "${item.craft.title}" (x${item.quantity}). A direct fair-wage payout of ₹${fairWage} has been sent to your guild account!`,
        timestamp: 'Just now',
        isRead: false,
        role: 'artisan',
      });
    });

    setNotifications((prev) => [...newNotifs, ...prev]);
    setPassports((prev) => [...newPassports, ...prev]);
    showToast('Provenance Passports generated in your Patron Vault!');
  };

  const handleAddCommission = (newCommission: BespokeCommission) => {
    setCommissions((prev) => [newCommission, ...prev]);
    showToast(`Bespoke commission sent to ${newCommission.artisanName}!`);
  };

  const handleSendPatronReply = (messageId: string, replyText: string) => {
    setVoiceMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, hasPatronReplied: true, patronReplyTranscript: replyText }
          : msg
      )
    );
    showToast('Spoken note dispatched directly to artisan workshop!');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check if current view is a standalone portal/login screen (which renders its own clean layout)
  const isAuthOrPortalView =
    currentView === 'landing' ||
    currentView === 'artisan-login' ||
    currentView === 'buyer-login' ||
    currentView === 'admin-login';

  // View Router
  const renderCurrentView = () => {
    switch (currentView) {
      // --- PUBLIC LANDING & AUTH PORTALS ---
      case 'landing':
        return (
          <PublicLandingView
            onNavigateToArtisanLogin={() => setCurrentView('artisan-login')}
            onNavigateToBuyerLogin={() => setCurrentView('buyer-login')}
            onNavigateToAdminLogin={() => setCurrentView('admin-login')}
            onOpenLanguageModal={openLanguageModal}
            onQuickDemoArtisan={() => {
              handleLoginSuccess({
                id: 'art-demo',
                name: 'Lakshmi Devi',
                email: 'lakshmi@craftbridge.in',
                phone: '+91 98450 12345',
                role: 'artisan',
                region: 'Ramanagara, Karnataka',
                craftType: 'Terracotta Pottery',
                preferredLanguage: 'kn',
              });
            }}
            onQuickDemoBuyer={() => {
              handleLoginSuccess({
                id: 'buyer-demo',
                name: 'Priya Sharma',
                email: 'priya@interiors.in',
                phone: '+91 99880 77665',
                role: 'buyer',
                companyName: 'Studio Vistara',
                preferredLanguage: 'en',
              });
            }}
            onBrowseCatalog={() => {
              setUserRole('buyer');
              setCurrentView('marketplace');
            }}
          />
        );

      case 'artisan-login':
        return (
          <ArtisanLoginView
            onLoginSuccess={handleLoginSuccess}
            onSwitchToBuyerLogin={() => setCurrentView('buyer-login')}
            onBackToLanding={() => setCurrentView('landing')}
          />
        );

      case 'buyer-login':
        return (
          <BuyerLoginView
            onLoginSuccess={handleLoginSuccess}
            onSwitchToArtisanLogin={() => setCurrentView('artisan-login')}
            onBackToLanding={() => setCurrentView('landing')}
          />
        );

      case 'admin-login':
        return (
          <AdminLoginView
            onLoginSuccess={handleLoginSuccess}
            onBackToLanding={() => setCurrentView('landing')}
          />
        );

      case 'admin-dashboard':
        return (
          <AdminDashboardView
            onLogout={handleLogout}
            onOpenLanguageModal={openLanguageModal}
            onNavigateToArtisanPortal={() => {
              handleSwitchRole('artisan');
            }}
            onNavigateToBuyerPortal={() => {
              handleSwitchRole('buyer');
            }}
          />
        );

      // --- ARTISAN PATH ---
      case 'artisan-home':
        return (
          <ArtisanHomeView
            products={localizedArtisanProducts}
            onOpenCreateProduct={() => setCurrentView('artisan-digitize')}
            onOpenMyProducts={() => setCurrentView('artisan-products')}
            onOpenDashboard={() => setCurrentView('artisan-dashboard')}
            onOpenAssistant={() => setCurrentView('artisan-assistant')}
            onOpenVoiceStockModal={() => handleOpenVoiceStockModal()}
            onOpenSellEverywhere={(p) => setSellEverywhereProduct(p)}
            onSelectProduct={(p) => {
              setSelectedArtisanProduct(p);
              setCurrentView('artisan-product-detail');
            }}
          />
        );

      case 'artisan-products':
        return (
          <ArtisanProductsView
            products={localizedArtisanProducts}
            onSelectProduct={(p) => {
              setSelectedArtisanProduct(p);
              setCurrentView('artisan-product-detail');
            }}
            onAddProduct={() => setCurrentView('artisan-digitize')}
            onOpenVoiceStockModal={() => handleOpenVoiceStockModal()}
          />
        );

      case 'artisan-digitize':
        return (
          <ArtisanDigitizeStudio
            onSaveAndPublish={handlePublishFromStudio}
            onCancel={() => setCurrentView('artisan-products')}
          />
        );

      case 'inventory':
        return (
          <ArtisanInventoryView
            products={localizedArtisanProducts}
            onOpenVoiceStockModal={handleOpenVoiceStockModal}
            onUpdateStock={handleUpdateProductStock}
            transactions={inventoryTransactions}
          />
        );

      case 'artisan-product-detail':
        if (!selectedArtisanProduct) {
          return (
            <ArtisanProductsView
              products={localizedArtisanProducts}
              onSelectProduct={(p) => {
                setSelectedArtisanProduct(p);
                setCurrentView('artisan-product-detail');
              }}
              onAddProduct={() => setCurrentView('artisan-digitize')}
              onOpenVoiceStockModal={() => handleOpenVoiceStockModal()}
            />
          );
        }
        return (
          <ArtisanProductDetailView
            product={localizedSelectedArtisanProduct}
            onBack={() => setCurrentView('artisan-products')}
            onSave={handleSaveProductChanges}
            onOpenVoiceStock={() => handleOpenVoiceStockModal(selectedArtisanProduct)}
            onOpenSellEverywhere={() => setSellEverywhereProduct(selectedArtisanProduct)}
          />
        );

      case 'artisan-dashboard':
        return (
          <ArtisanBusinessDashboardView
            onOpenAssistant={() => setCurrentView('artisan-assistant')}
            onOpenInventory={() => setCurrentView('inventory')}
          />
        );

      case 'artisan-assistant':
        return (
          <AIBusinessAssistantView
            onBackToDashboard={() => setCurrentView('artisan-dashboard')}
            onOpenInventory={() => setCurrentView('inventory')}
          />
        );

      case 'voice-studio':
        return (
          <VoiceStudio
            onPublishCraft={handlePublishCraft}
            onNavigateToMarket={() => setCurrentView('artisan-products')}
          />
        );

      // --- BUYER PATH ---
      case 'buyer-home':
        return (
          <BuyerHomeView
            crafts={localizedCrafts}
            onSelectCraft={(craft) => setSelectedCraft(craft)}
            onAddToCart={handleAddToCart}
            onPostRequirement={() => {
              setBuyerReqInitialStep('input');
              setCurrentView('post-requirement');
            }}
            onOpenConversation={(artisanId) => {
              setBuyerReqInitialStep('chat');
              setCurrentView('post-requirement');
            }}
            onOpenPatronVault={() => setCurrentView('patron-vault')}
            onSwitchToArtisan={() => handleSwitchRole('artisan')}
            onOpenLanguageModal={openLanguageModal}
            activeBuyerNavTab="home"
            onChangeBuyerNavTab={(tab) => {
              if (tab === 'discover') setCurrentView('marketplace');
              else if (tab === 'requirements') {
                setBuyerReqInitialStep('input');
                setCurrentView('post-requirement');
              } else if (tab === 'messages') {
                setBuyerReqInitialStep('chat');
                setCurrentView('post-requirement');
              } else if (tab === 'profile') {
                setCurrentView('patron-vault');
              } else {
                setCurrentView('buyer-home');
              }
            }}
            onSelectProduct={(p) => {
              if (!p) return;
              const pName = p.title || p.name || '';
              const craft = localizedCrafts.find((c) => {
                const cTitle = c.title || '';
                return (pName && cTitle.toLowerCase().includes(pName.toLowerCase())) || 
                       (cTitle && pName.toLowerCase().includes(cTitle.toLowerCase()));
              }) || localizedCrafts[0];
              setSelectedCraft(craft);
            }}
            onOpenPostRequirement={() => {
              setBuyerReqInitialStep('input');
              setCurrentView('post-requirement');
            }}
            onNavigate={(tab) => {
              if (tab === 'discover') setCurrentView('marketplace');
              else if (tab === 'requirements') {
                setBuyerReqInitialStep('input');
                setCurrentView('post-requirement');
              } else if (tab === 'messages') {
                setBuyerReqInitialStep('chat');
                setCurrentView('post-requirement');
              } else if (tab === 'profile') {
                setCurrentView('patron-vault');
              } else {
                setCurrentView('buyer-home');
              }
            }}
          />
        );

      case 'marketplace':
        return (
          <MarketplaceView
            crafts={localizedCrafts}
            onSelectCraft={(craft) => setSelectedCraft(craft)}
            onPlayAudio={handlePlayAudio}
            onAddToCart={handleAddToCart}
            playingStoryId={localizedActiveAudioStory?.id || null}
            onOpenVoiceStudio={() => setCurrentView('voice-studio')}
            onOpenPatronVault={() => setCurrentView('patron-vault')}
          />
        );

      case 'post-requirement':
      case 'conversation':
        return (
          <PostRequirementFlow
            initialStep={currentView === 'conversation' ? 'chat' : buyerReqInitialStep}
            onBackToBuyerHome={() => setCurrentView('buyer-home')}
            onOrderPlaced={(artisan) => {
              showToast(`Custom commission confirmed with ${artisan.name}!`);
              setCurrentView('patron-vault');
            }}
          />
        );

      case 'patron-vault':
        return (
          <PatronVaultView
            passports={passports}
            commissions={commissions}
            voiceMessages={voiceMessages}
            onAddCommission={handleAddCommission}
            onSendPatronReply={handleSendPatronReply}
            onExploreMarketplace={() => setCurrentView('marketplace')}
          />
        );

      case 'provenance':
        return <ProvenanceView />;

      case 'workshop':
        return (
          <WorkshopLedgerView
            crafts={localizedCrafts}
            onOpenVoiceStudio={() => setCurrentView('voice-studio')}
            onSelectCraft={(craft) => setSelectedCraft(craft)}
          />
        );

      case 'profile-edit':
        return (
          <ProfileEditView
            currentUser={currentUser}
            onUpdateUser={(updated) => {
              setCurrentUser(updated);
              showToast('Profile updated successfully!');
            }}
            onCancel={() => {
              setCurrentView(userRole === 'artisan' ? 'artisan-home' : 'buyer-home');
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1810] flex flex-col font-sans selection:bg-[#C85A32]/20 selection:text-[#2C1810]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2C1810] text-[#FDFBF7] px-4 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-fadeIn border border-[#E6DDD4]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Simulated Offline Field Banner */}
      {networkStatus === 'offline' && (
        <div className="bg-[#2C1810] text-[#FDFBF7] px-4 py-2 text-xs font-bold flex items-center justify-between z-50 border-b border-[#E6DDD4]/20 animate-fadeIn">
          <div className="flex items-center gap-2 max-w-2xl">
            <WifiOff className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
            <span>
              Offline Village Field Mode: All voice digitizations and stock updates are cached locally.
            </span>
          </div>
          <button
            onClick={() => {
              setNetworkStatus('online');
              audioService.playCeramicChime(480);
              showToast('Synced 3 cached updates to CraftBridge Cloud!');
            }}
            className="px-2.5 py-1 rounded-lg bg-[#C85A32] text-white text-[11px] font-extrabold hover:bg-[#b04b25] transition-all flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Sync Now</span>
          </button>
        </div>
      )}

      {/* Quick Portal Switcher Banner (Shows when logged in to let user view login pages or public landing) */}
      {!isAuthOrPortalView && (
        <div className="bg-[#F5EFEB] border-b border-[#E6DDD4] px-4 py-1.5 text-[11px] font-semibold text-[#2C1810]/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>
              {userRole === 'artisan' ? '👩‍🎨 Artisan Portal' : '🛍️ Buyer Marketplace'}:{' '}
              <strong>{currentUser?.name || (userRole === 'artisan' ? 'Master Ramesh' : 'Conscious Buyer')}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-[#C85A32] font-extrabold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Sign Out / Switch Portal</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar (Hidden on full-screen landing/auth pages for distraction-free login) */}
      {!isAuthOrPortalView && (
        <Navbar
          userRole={userRole}
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          currentLanguage={currentLanguage}
          onOpenLanguageModal={openLanguageModal}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          isMobileDeviceView={isMobileDeviceView}
          onToggleDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
          onLogout={handleLogout}
          networkStatus={networkStatus}
          onToggleNetworkStatus={handleToggleNetworkStatus}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
            showToast('Profile updated successfully!');
          }}
          notifications={notifications}
          onMarkNotificationAsRead={(id) => {
            setNotifications((prev) =>
              prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
            );
          }}
        />
      )}

      {/* Main Content: Support either Fluid View OR Mobile Phone Frame Device View */}
      <main className="flex-1 w-full">
        {isMobileDeviceView && !isAuthOrPortalView ? (
          <div className="py-8 px-4 flex justify-center bg-[#EDE7E3]/60">
            <div className="w-[390px] min-h-[780px] bg-[#FDFBF7] rounded-[48px] border-[10px] border-[#2C1810] shadow-2xl overflow-hidden flex flex-col relative">
              {/* Dynamic Island / Speaker notch */}
              <div className="h-6 bg-[#2C1810] rounded-b-2xl mx-auto w-36 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#111] mr-3" />
                <div className="w-10 h-1 bg-[#333] rounded-full" />
              </div>

              {/* Mobile Screen Internal Body */}
              <div className="flex-1 overflow-y-auto pb-20">{renderCurrentView()}</div>

              {/* Bottom Home Indicator bar */}
              <div className="h-4 bg-[#FDFBF7] flex items-center justify-center pb-1">
                <div className="w-32 h-1 bg-[#2C1810]/30 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full pb-20">{renderCurrentView()}</div>
        )}
      </main>

      {/* Persistent Audio Story Banner when playing */}
      <AudioPlayerBanner
        activeStory={localizedActiveAudioStory}
        onClose={() => setActiveAudioStory(null)}
      />

      {/* Craft Details & Provenance Modal */}
      <CraftDetailModal
        craft={localizedSelectedCraft}
        onClose={() => setSelectedCraft(null)}
        onAddToCart={handleAddToCart}
        onPlayAudio={handlePlayAudio}
        isAudioPlaying={
          localizedSelectedCraft ? localizedActiveAudioStory?.id === localizedSelectedCraft.audioStory.id : false
        }
      />

      {/* Conscious Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={localizedCartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCartItems([])}
        onCheckoutSuccess={handleCheckoutSuccess}
        onNavigateToPatronVault={() => setCurrentView('patron-vault')}
      />

      {/* Voice Stock Update Modal (Hero Flow #3 Screens 21-23) */}
      <VoiceStockModal
        isOpen={voiceStockModalOpen}
        onClose={() => setVoiceStockModalOpen(false)}
        product={localizedVoiceStockTargetProduct}
        onUpdateStock={handleUpdateProductStock}
      />

      {/* Sell Everywhere Modal (Hero Flow #5 Screens 32-34 Amazon & Flipkart preview) */}
      <SellEverywhereModal
        isOpen={!!sellEverywhereProduct}
        onClose={() => setSellEverywhereProduct(null)}
        product={localizedSellEverywhereProduct}
      />

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <LanguageScreen
          selectedLanguage={currentLanguage}
          onSelectLanguage={handleSelectLanguage}
          onContinue={closeLanguageModal}
          isModal={true}
          onClose={closeLanguageModal}
        />
      )}

      {/* Role Selection Modal */}
      {isRoleModalOpen && (
        <RoleSelectionScreen
          selectedRole={userRole}
          onSelectRole={(role) => {
            handleSwitchRole(role);
            setIsRoleModalOpen(false);
          }}
          onOpenLanguageModal={openLanguageModal}
          onContinue={() => setIsRoleModalOpen(false)}
        />
      )}

      {/* Global Multilingual AI FAQ Chatbot */}
      <FAQChatbot />

      {/* Global Floating Language & Text Scale Action Button */}
      <button
        id="global-language-fab"
        onClick={() => {
          audioService.playClickSound();
          openLanguageModal();
        }}
        className="fixed bottom-4 left-4 z-50 bg-[#2C1810] hover:bg-black text-[#FDFBF7] p-2 rounded-full shadow-lg flex items-center gap-1.5 border border-[#E6DDD4] transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C85A32] cursor-pointer"
        title="Change Language & Text Size"
      >
        <Globe className="w-4 h-4 text-[#C85A32]" />
        <span className="text-[10px] font-black tracking-wider uppercase pr-0.5">
          {currentLanguage} | A±
        </span>
      </button>

      {/* Grounded Humane Footer (on dashboard & marketplace views) */}
      {!isAuthOrPortalView && (
        <footer className="bg-[#F5EFEB] border-t border-[#E6DDD4] py-8 px-4 sm:px-6 text-xs text-[#2C1810]/70">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🏺</span>
              <span className="font-extrabold text-[#2C1810]">CraftBridge AI</span>
              <span>• {t.footer.mission}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-semibold">
              <button
                onClick={openLanguageModal}
                className="text-[#C85A32] hover:underline"
              >
                {t.footer.language} ({currentLanguage.toUpperCase()})
              </button>
              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="text-[#C85A32] hover:underline"
              >
                {t.footer.role}: {userRole === 'artisan' ? t.roleSelection.artisanTitle : userRole === 'admin' ? 'Administrator' : t.roleSelection.buyerTitle}
              </button>
              <button
                onClick={() => setCurrentView('landing')}
                className="text-[#2C1810] hover:underline"
              >
                Welcome Portal
              </button>
              <span className="text-[#3D6B52]">100% {t.footer.fairWageGuaranteed}</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
