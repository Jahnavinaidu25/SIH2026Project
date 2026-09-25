# CraftBridge AI 🌿

CraftBridge AI is a digital platform designed to connect rural artisans with conscious buyers through AI-powered tools, voice-first interactions, digital craft cataloguing, marketplace features, and transparent craft provenance.

The platform provides separate experiences for Artisans, Buyers, and Administrators, helping artisans digitize and manage their businesses while enabling buyers to discover and purchase authentic handcrafted products.

## ✨ Features

### 🧑‍🎨 Artisan Portal

- Artisan registration and login
- Digital product catalogue management
- Product details and inventory management
- Voice-based stock updates
- Artisan business dashboard
- AI-powered business assistant
- Digitization studio for crafts
- Sell products across multiple channels

### 🛍️ Buyer Experience

- Browse handcrafted products through the marketplace
- Product details and shopping cart
- Post custom craft requirements
- AI-assisted artisan/product matching
- Patron Vault for purchased craft records
- Craft provenance and authenticity information
- Workshop and artisan stories
- Voice/audio-based craft storytelling

### 🤖 AI Features

- AI business assistant for artisans
- Voice-first interactions
- Speech-based product and inventory updates
- AI-assisted requirement analysis and matching
- Google Gemini integration support

### 🌍 Multilingual Support

- Language selection interface
- Localized product information
- Translation support for crafts and artisan products

### 📜 Provenance & Digital Identity

- Digital provenance records
- Craft origin information
- Artisan identity and product records
- Verifiable craft history concepts

## 🔐 User Roles

The application supports three major user roles:

- **Artisan** – Manage crafts, products, inventory, and business activities
- **Buyer** – Discover, purchase, and request handcrafted products
- **Admin** – Manage and monitor the platform

## 🛠️ Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini API
- Lucide React
- Motion
- Express.js
- Node.js
- Local Storage
- Web Speech / Audio APIs

## 📁 Project Structure

```text
Project1101-main/
│
├── src/
│   ├── components/
│   │   ├── ArtisanHomeView.tsx
│   │   ├── ArtisanProductsView.tsx
│   │   ├── ArtisanInventoryView.tsx
│   │   ├── ArtisanBusinessDashboardView.tsx
│   │   ├── AIBusinessAssistantView.tsx
│   │   ├── MarketplaceView.tsx
│   │   ├── BuyerHomeView.tsx
│   │   ├── AdminDashboardView.tsx
│   │   ├── VoiceStudio.tsx
│   │   ├── ProvenanceView.tsx
│   │   ├── PatronVaultView.tsx
│   │   └── ...
│   │
│   ├── context/
│   │   └── LanguageContext.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── translations/
│   │   ├── index.ts
│   │   ├── landingTranslations.ts
│   │   └── productTranslations.ts
│   │
│   ├── utils/
│   │   ├── audioService.ts
│   │   ├── currency.ts
│   │   └── speechAiParser.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── types.ts
│   └── index.css
│
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── metadata.json