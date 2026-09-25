import { CraftItem, ArtisanProduct, AppLanguage } from '../types';

// Category mapping helper to match index.ts translation keys
export function translateCategory(category: string, language: AppLanguage, t: any): string {
  const cat = category.toLowerCase();
  if (cat.includes('potter') || cat.includes('ceramics')) return t.buyerHome?.catPottery || 'Pottery';
  if (cat.includes('textile') || cat.includes('dye') || cat.includes('woven')) return t.buyerHome?.catTextiles || 'Textiles';
  if (cat.includes('leather')) return t.buyerHome?.catLeather || 'Leather';
  if (cat.includes('wood')) return t.buyerHome?.catWood || 'Woodwork';
  if (cat.includes('metal') || cat.includes('brass')) return t.buyerHome?.catMetals || 'Metals & Brass';
  if (cat.includes('basket') || cat.includes('reed') || cat.includes('handicraft')) return t.buyerHome?.catHandicrafts || 'Handicrafts';
  return category;
}

interface LocalizedFields {
  title: string;
  provenanceStory: string;
  materials: string[];
  originSteps: { stage: string; description: string }[];
  audioTitle: string;
  audioTranscript: string;
  artisanName: string;
  artisanBio: string;
  artisanLocation: string;
  artisanRegion: string;
}

interface LocalizedSellerFields {
  name: string;
  material: string;
  craftType: string;
  description: string;
  tags: string[];
}

const BUYER_PRODUCT_TRANSLATIONS: Record<AppLanguage, Record<string, LocalizedFields>> = {
  en: {
    'craft-1': {
      title: 'Ramanagara Pure Mulberry Silk Saree with Real Zari',
      provenanceStory: 'Woven from bivoltine raw silk cocoons sourced directly from the bustling Ramanagara Cocoon Market. Hand-reeled in pure spring water, naturally dyed using pomegranate rind and madder root, then woven on an ancestral wooden pit loom with traditional temple korvai selvedges and dipped silver zari.',
      materials: ['100% Ramanagara mulberry raw silk', 'Natural pomegranate rind & madder root dye', 'Pure dipped silver zari'],
      originSteps: [
        { stage: 'Cocoon Selection', description: 'Bivoltine silk cocoons handpicked at Ramanagara Asia largest silk market.' },
        { stage: 'Charaka Reeling', description: 'Reeled into unbroken fine silk filament yarn using traditional wooden charakas.' },
        { stage: 'Botanical Dyeing', description: 'Simmered with sun-dried pomegranate peels and wild madder for lustrous color fastness.' },
        { stage: 'Pit Loom Weaving', description: 'Meticulously hand-interlocked with temple borders on wooden pit looms.' },
      ],
      audioTitle: 'The Rhythmic Shuttles of Ramanagara',
      audioTranscript: '"In Ramanagara, the song of the handloom begins at sunrise. We feed the raw mulberry silk through the reeds thread by single thread. A pure handloom silk saree breathes with you, growing softer across generations."',
      artisanName: 'Gowramma & Manjunath',
      artisanBio: 'Fourth generation master silk handloom weavers operating wooden pit looms in Ramanagara Silk City. Certified under Karnataka Silk Handloom Co-op with over 36 years of heritage mastery.',
      artisanLocation: 'Ramanagara Silk City',
      artisanRegion: 'Karnataka Silk Belt',
    },
    'craft-2': {
      title: 'Channapatna Lacquerware Wooden Raja-Rani Toy Set',
      provenanceStory: 'Turned on traditional high-speed wood lathes in Channapatna (Gombegala Ooru). Made exclusively from sustainably harvested soft Ivory wood (Aale Mara), colored using molten organic tree lac blended with natural kumkum, turmeric, and indigo, then burnished with screw pine leaves for a child-safe glossy finish.',
      materials: ['Seasoned Wrightia tinctoria (Aale Mara / Ivory Wood)', 'Natural organic lac resin', 'Non-toxic turmeric & kumkum vegetable dyes'],
      originSteps: [
        { stage: 'Ivory Wood Seasoning', description: 'Aale Mara timber seasoned naturally in shade for 60 days to prevent cracks.' },
        { stage: 'Lathe Turning & Shaping', description: 'Turned by hand with gouges on traditional motorless and powered lathes.' },
        { stage: 'Natural Lac Dyeing', description: 'Vegetable dye-infused lac sticks applied while spinning; friction melts the color.' },
        { stage: 'Screw Pine Leaf Polishing', description: 'Burnished with fibrous Tale Mara (screw pine) leaves for mirror-like sheen.' },
      ],
      audioTitle: 'Spinning Lacquer & Wood in Channapatna',
      audioTranscript: '"In Channapatna, we never touch chemical paints. When the ivory wood spins on the lathe, the heat of friction melts the lac right into the pores. Our wooden toys are so safe that babies have teethed on them for three centuries without harm."',
      artisanName: 'Syed Noorullah & Paramesh',
      artisanBio: 'Leading master artisans in Channapatna crafting eco-friendly wooden toys and dolls from Ivory wood (Aale Mara) with natural tree lac and turmeric-kumkum colors.',
      artisanLocation: 'Channapatna (Gombegala Ooru)',
      artisanRegion: 'Ramanagara District, Karnataka',
    },
    'craft-3': {
      title: 'Bidriware Pure Silver Inlaid Floral Surahi & Vase',
      provenanceStory: 'Mastercrafted in Bidar with a 600-year Bahmani lineage. The zinc-copper cast is engraved by hand with delicate Persian poppy patterns, inlaid with pure silver wire, and plunged into a boiling solution containing historic soil gathered exclusively from the interior courtyards of Bidar Fort, resulting in a rich, permanent jet-black velvet background.',
      materials: ['95% Zinc and 5% Copper alloy', '99.9% Fine pure silver wire & sheet', 'Historic Bidar Fort fortifying soil oxidation'],
      originSteps: [
        { stage: 'Sand Casting & Turning', description: 'Melted zinc-copper alloy cast into smooth sand molds and filed.' },
        { stage: 'Chisel Engraving (Kandai)', description: 'Floral patterns carved into the metal using hardened steel styluses.' },
        { stage: 'Pure Silver Wire Inlay (Tarkashi)', description: '99.9% fine silver wires hammered into narrow grooves by hand.' },
        { stage: 'Bidar Fort Soil Oxidation', description: 'Boiled with special nitrogen-rich soil gathered from inside Bidar Fort.' },
      ],
      audioTitle: 'The Alchemy of Bidar Soil & Silver',
      audioTranscript: '"Bidriware is born of four elements: zinc, fine silver, deep fire, and the mysterious old soil of Bidar Fort. When the silver touches the black oxidised base, it shines like moonlight breaking over midnight clouds."',
      artisanName: 'Rashid Ahmed Quadri',
      artisanBio: 'National Award recipient in Bidri metalcraft preserving 600 years of Bahmani heritage. Inlays pure silver wire onto hand-cast zinc alloy oxidized with Bidar Fort soil.',
      artisanLocation: 'Old Fort Town, Bidar',
      artisanRegion: 'Deccan Heritage Corridor',
    },
    'craft-4': {
      title: 'Dharwad Kasuti Hand-Embroidered Wall Hanging',
      provenanceStory: 'Created by rural women artisans across the Dharwad and Ilkal belt using ancestral Kasuti needlework (Gavanti, Murgi, Negi, and Menthi stitches). Each motif is counted thread by thread on handwoven cotton fabric without any traced outlines, depicting sacred temple chariots, sacred cows, and stylized peacocks.',
      materials: ['Handloom unbleached cotton canvas', 'Silk floss resham embroidery threads', 'Natural herbal fabric wash'],
      originSteps: [
        { stage: 'Fabric Thread Counting', description: 'Grid alignment calculated purely by eye without drawing pencils or stencils.' },
        { stage: 'Gavanti & Murgi Stitching', description: 'Double running stitch executed so both front and reverse sides look identical.' },
        { stage: 'Temple Gōpura Needlework', description: 'Stepped pyramid temple chariots embroidered with fine silk threads.' },
      ],
      audioTitle: 'Counting the Threads of Kasuti',
      audioTranscript: '"Kasuti has no tracing, no pencils, and no knots on the reverse side. Every stitch is counted in the artisan mind. When you turn the fabric over, it looks as neat and flawless as the front."',
      artisanName: 'Kamalamma & Shantha Bai',
      artisanBio: 'Empowers over 30 rural women in North Karnataka practicing ancestral Kasuti double-running embroidery on handloom Ilkal cotton and silk sarees.',
      artisanLocation: 'Ilkal & Dharwad',
      artisanRegion: 'North Karnataka Handloom Guild',
    },
    'craft-5': {
      title: 'Mysore Hand-Carved Sandalwood & Rosewood Keepsake Box',
      provenanceStory: 'Sculpted by royal palace-lineage artisans in Mysore. Constructed from seasoned rosewood and aromatic sandalwood, the lid features delicate deep-relief Jali carving of royal elephant processions and floral creepers, polished with organic beeswax to let the sacred sandalwood fragrance diffuse naturally.',
      materials: ['Ethically sourced Karnataka Sandalwood', 'Seasoned Mysore Rosewood', 'Natural wood marquetry and beeswax polish'],
      originSteps: [
        { stage: 'Timber Selection & Joinery', description: 'Precision dovetail joinery of seasoned rosewood timber panels.' },
        { stage: 'Deep Relief Jali Carving', description: 'Intricate carving of elephant procession with fine surgical chisels.' },
        { stage: 'Sandalwood Inlay Insertion', description: 'Aromatic sandalwood panels inlaid for lasting fragrance.' },
        { stage: 'Beeswax Hand Polish', description: 'Buffed with pure honeybee wax to seal the grain without muting fragrance.' },
      ],
      audioTitle: 'Fragrance of the Sacred Sandalwood',
      audioTranscript: '"Real Karnataka sandalwood carries the essence of the Western Ghats forests. When you open this keepsake box even fifty years from now, the soothing aroma will immediately fill your sanctuary with calm."',
      artisanName: 'Narayana Acharya',
      artisanBio: 'Master woodcarver carrying royal Mysore palace woodcraft traditions. Specializes in intricate Jali fretwork and fragrant sandalwood relief sculpture.',
      artisanLocation: 'Mysore Palace Heritage Lane',
      artisanRegion: 'Mysore Cultural District',
    },
    'craft-6': {
      title: 'Natural Red Terracotta Alkaline Cooling Water Jug',
      provenanceStory: 'Wheel-thrown by traditional potters using fertile red clay from monsoon lakes around Ramanagara. Hand-beaten with wooden mallets to enhance strength and mineral retention, then baked in husked open kilns for optimal microporous evaporative chilling and natural pH balancing.',
      materials: ['Monsoon lakebed red alluvial clay', 'Riverbed quartz burnishing', 'Husk and wood low-temperature pit firing'],
      originSteps: [
        { stage: 'Clay Sourcing & Slaking', description: 'Monsoon silt aged in earthen vats and filtered through muslin.' },
        { stage: 'Wheel Throwing & Mallet Beating', description: 'Turned on kick-wheel and beaten with Thappi mallet for dense porous walls.' },
        { stage: 'Husk Pit Firing', description: 'Slowly fired with rice husks and twigs to yield rich earthy terracotta.' },
      ],
      audioTitle: 'The Whisper of Porous Terracotta',
      audioTranscript: '"When fresh water enters a real clay pot, the earth wakes up. The pot breathes through microscopic pores, chilling the water to mountain freshness and infusing it with cooling minerals naturally without electricity."',
      artisanName: 'Basavaraju Kumbhar',
      artisanBio: 'Veteran potter in Pottery Town with over 40 years of wheelcraft, keeping alive ancestral terracotta pottery and natural cooling clayware.',
      artisanLocation: 'Pottery Town Heritage Ward',
      artisanRegion: 'Bangalore-Ramanagara Potter Guild',
    },
  },
  hi: {
    'craft-1': {
      title: 'रामनगर शुद्ध रेशम साड़ी (असली ज़री पल्लू)',
      provenanceStory: 'रामनगर के प्रसिद्ध कोकून बाजार से सीधे खरीदे गए शहतूत रेशम से निर्मित। शुद्ध कुएं के पानी में काता गया, अनार के छिलकों और मजीठ की जड़ से रंगा गया, और पारंपरिक लकड़ी के गड्ढे वाले करघे पर मंदिर की सीमाओं और शुद्ध चांदी की ज़री के साथ बुना गया।',
      materials: ['100% रामनगर शहतूत कच्चा रेशम', 'अनार के छिलके और मजीठ की प्राकृतिक रंगाई', 'चांदी में डूबी शुद्ध ज़री'],
      originSteps: [
        { stage: 'कोकून चयन', description: 'रामनगर के सबसे बड़े रेशम बाजार से हाथ से चुने गए रेशम कोकून।' },
        { stage: 'चरखा कताई', description: 'पारंपरिक लकड़ी के चरखों से बारीक मजबूत रेशम का धागा तैयार किया गया।' },
        { stage: 'प्राकृतिक रंगाई', description: 'अनार के सूखे छिलकों और मजीठ से स्थायी प्राकृतिक रंग तैयार किया गया।' },
        { stage: 'करघा बुनाई', description: 'लकड़ी के गड्ढे वाले करघे पर मंदिर की सीमाओं के साथ बुना गया।' },
      ],
      audioTitle: 'रामनगर के करघों की लयबद्ध ध्वनि',
      audioTranscript: '"रामनगर में करघे का गीत सूर्योदय के साथ शुरू होता है। हम रेशम के एक-एक धागे को सावधानी से पिरोते हैं। शुद्ध हाथ से बुनी रेशम साड़ी पीढ़ियों तक अपनी चमक और कोमलता बनाए रखती है।"',
      artisanName: 'गौरामम्मा और मंजूनाथ',
      artisanBio: 'रामनगर सिल्क सिटी में लकड़ी के करघे पर काम करने वाले चौथी पीढ़ी के मास्टर बुनकर। 36 वर्षों से अधिक के अनुभव के साथ कर्नाटक सिल्क फेडरेशन द्वारा प्रमाणित।',
      artisanLocation: 'रामनगर सिल्क सिटी',
      artisanRegion: 'कर्नाटक सिल्क बेल्ट',
    },
    'craft-2': {
      title: 'चन्नपटना लाख-लकड़ी राजा-रानी पारंपरिक खिलौने',
      provenanceStory: 'चन्नपटना (खिलौनों का शहर) में पारंपरिक खराद पर तैयार। केवल प्राकृतिक आइवरी वुड (आले मारा) से निर्मित, प्राकृतिक लाख, हल्दी और कुमकुम के रंगों से रंगा गया, और बच्चों की सुरक्षा के लिए स्क्रू पाइन पत्तियों से पॉलिश किया गया।',
      materials: ['आले मारा (आइवरी वुड)', 'प्राकृतिक पेड़ की लाख', 'हल्दी और कुमकुम के प्राकृतिक रंग'],
      originSteps: [
        { stage: 'लकड़ी का शोधन', description: 'दरारों से बचाने के लिए आले मारा लकड़ी को 60 दिनों तक सुखाया गया।' },
        { stage: 'खराद पर ढलाई', description: 'पारंपरिक खराद पर हाथ से छेनी की मदद से तराशा गया।' },
        { stage: 'लाख की रंगाई', description: 'घर्षण की गर्मी से पिघलने वाली प्राकृतिक लाख की लाठियों से रंगा गया।' },
        { stage: 'पाइन पत्ती पॉलिश', description: 'कांच जैसी चमक के लिए ताले मारा की पत्तियों से चमकाया गया।' },
      ],
      audioTitle: 'चन्नपटना की लाख और लकड़ी का जादू',
      audioTranscript: '"चन्नपटना में हम कभी रसायनों का उपयोग नहीं करते। खराद पर घर्षण की गर्मी से लाख सीधे लकड़ी के छिद्रों में समा जाती है। हमारे खिलौने 300 वर्षों से बच्चों के लिए पूरी तरह सुरक्षित रहे हैं।"',
      artisanName: 'सैयद नूरुल्लाह और परमेश',
      artisanBio: 'चन्नपटना के प्रमुख मास्टर कारीगर जो आइवरी लकड़ी और प्राकृतिक लाख रंगों से पर्यावरण-अनुकूल खिलौने और गुड़िया बनाते हैं।',
      artisanLocation: 'चन्नपटना (खिलौनों का शहर)',
      artisanRegion: 'रामनगर जिला, कर्नाटक',
    },
    'craft-3': {
      title: 'बीदर बिदरीवेयर चांदी की नक्काशीदार सुराही और फूलदान',
      provenanceStory: 'बीदर में 600 साल पुरानी बहमनी परंपरा के तहत तैयार। जिंक-कॉपर के बर्तन पर हाथ से फारसी फूलों के पैटर्न उकेरे गए, शुद्ध चांदी का तार जड़ा गया, और बीदर किले की ऐतिहासिक मिट्टी के उबलते घोल में डुबोकर स्थायी मखमली काला रंग दिया गया।',
      materials: ['जिंक और कॉपर मिश्र धातु', '99.9% शुद्ध बारीक चांदी का तार', 'बीदर किले की ऐतिहासिक मिट्टी'],
      originSteps: [
        { stage: 'रेत की ढलाई', description: 'पिघली हुई धातु को रेत के सांचों में ढालकर चिकना किया गया।' },
        { stage: 'छेनी से नक्काशी', description: 'स्टील के औजारों से धातु पर फूलों के पैटर्न उकेरे गए।' },
        { stage: 'चांदी की जड़ाई (तारकशी)', description: 'हाथ से हथौड़े की चोट से बारीक चांदी के तार जड़े गए।' },
        { stage: 'किले की मिट्टी से रंगाई', description: 'बीदर किले की विशेष मिट्टी के घोल में उबालकर काला रंग प्राप्त किया गया।' },
      ],
      audioTitle: 'बीदर की मिट्टी और चांदी की रसायन विद्या',
      audioTranscript: '"बिदरीवेयर चार तत्वों से बनता है: धातु, शुद्ध चांदी, अग्नि और बीदर किले की प्राचीन मिट्टी। जब चांदी काले आधार पर चमकती है, तो ऐसा लगता है जैसे बादलों में चांद चमक रहा हो।"',
      artisanName: 'रशीद अहमद कादरी',
      artisanBio: 'बिदरी मेटलक्राफ्ट में राष्ट्रीय पुरस्कार विजेता जो 600 वर्षों की बहमनी विरासत को सुरक्षित रख रहे हैं।',
      artisanLocation: 'पुराना किला, बीदर',
      artisanRegion: 'दक्कन हेरिटेज कॉरिडोर',
    },
    'craft-4': {
      title: 'धारवाड़ कसूती हाथ की कढ़ाई वाली कलात्मक दीवार पट्टी',
      provenanceStory: 'धारवाड़ और इलकल की ग्रामीण महिला कारीगरों द्वारा पारंपरिक कसूती सुईवर्क से निर्मित। कपड़े पर बिना किसी पेंसिल के केवल धागे गिनकर पवित्र मंदिर रथ, गाय और मोर के रूपांकन उकेरे गए हैं।',
      materials: ['हाथ से बुना सूती कपड़ा', 'रेशम कढ़ाई धागा', 'प्राकृतिक जड़ी-बूटी धुलाई'],
      originSteps: [
        { stage: 'धागा गणना', description: 'बिना किसी स्टेंसिल के आंखों से गिनकर धागों का संरेखण किया गया।' },
        { stage: 'गवंती और मुर्गी सिलाई', description: 'ऐसी सिलाई जिससे आगे और पीछे दोनों तरफ एक जैसा रूप दिखाई दे।' },
        { stage: 'मंदिर गोपुरम कढ़ाई', description: 'रेशम के धागों से सीढ़ीदार मंदिर रथों की बारीक कढ़ाई।' },
      ],
      audioTitle: 'कसूती के धागों की गिनती',
      audioTranscript: '"कसूती में कोई पेंसिल या गांठ नहीं होती। हर टांका मन में गिना जाता है। जब आप कपड़े को उलटते हैं, तो वह आगे जैसा ही साफ और सुंदर दिखता है।"',
      artisanName: 'कमलम्मा और शांता बाई',
      artisanBio: 'उत्तर कर्नाटक में 30 से अधिक ग्रामीण महिलाओं को कसूती कढ़ाई के माध्यम से सशक्त बनाने वाला कारीगर समूह।',
      artisanLocation: 'इलकल और धारवाड़',
      artisanRegion: 'उत्तर कर्नाटक हैंडलूम गिल्ड',
    },
    'craft-5': {
      title: 'मैसूर चंदन और शीशम हाथ से नक्काशीदार संदूक',
      provenanceStory: 'मैसूर के शाही महल के वंशज कारीगरों द्वारा तराशा गया। पुराने शीशम और सुगंधित चंदन से निर्मित, ढक्कन पर शाही हाथी जुलूस की बारीक जाली नक्काशी है, जिसे प्राकृतिक मधुमक्खी के मोम से चमकाया गया है।',
      materials: ['कर्नाटक का असली सुगंधित चंदन', 'मैसूर शीशम की लकड़ी', 'प्राकृतिक मधुमक्खी मोम पॉलिश'],
      originSteps: [
        { stage: 'लकड़ी चयन और जोड़', description: 'शीशम की लकड़ी के पैनलों की सटीक जोड़ाई।' },
        { stage: 'जाली नक्काशी', description: 'सर्जिकल छेनी से हाथी जुलूस की गहरी और बारीक नक्काशी।' },
        { stage: 'चंदन का जड़ाव', description: 'स्थायी सुगंध के लिए सुगंधित चंदन के पैनल लगाए गए।' },
        { stage: 'मोम पॉलिश', description: 'सुगंध को दबाए बिना लकड़ी को सील करने के लिए शहद के मोम से पॉलिश।' },
      ],
      audioTitle: 'पवित्र चंदन की सुगंध',
      audioTranscript: '"कर्नाटक का असली चंदन पश्चिमी घाट के जंगलों का सार समेटे हुए है। जब आप पचास साल बाद भी इस बक्से को खोलेंगे, तो इसकी सुखद सुगंध आपके कमरे को शांति से भर देगी।"',
      artisanName: 'नारायण आचार्य',
      artisanBio: 'शाही मैसूर महल की लकड़ी की नक्काशी परंपरा को आगे बढ़ाने वाले मास्टर शिल्पकार।',
      artisanLocation: 'मैसूर पैलेस हेरिटेज लेन',
      artisanRegion: 'मैसूर सांस्कृतिक जिला',
    },
    'craft-6': {
      title: 'प्राकृतिक लाल टेराकोटा क्षारीय जल शीतलन सुराही',
      provenanceStory: 'रामनगर के आसपास की मानसूनी झीलों की उपजाऊ लाल मिट्टी से पारंपरिक कुम्हारों द्वारा चाक पर बनाया गया। मजबूती और खनिज बनाए रखने के लिए लकड़ी के मुंगरों से पीटा गया, फिर खुले भूसे के भट्टों में पकाया गया।',
      materials: ['मानसूनी झील की लाल मिट्टी', 'नदी क्वार्ट्ज पॉलिश', 'चावल की भूसी की खुली फायरिंग'],
      originSteps: [
        { stage: 'मिट्टी की तैयारी', description: 'मिट्टी को पानी में भिगोकर मलमल से छाना गया।' },
        { stage: 'चाक पर ढलाई व पिटाई', description: 'चाक पर ढालकर मुंगर से पीटकर मजबूत छिद्रयुक्त दीवारें बनाई गईं।' },
        { stage: 'भूसे के भट्टे में पकाना', description: 'भूसे और टहनियों से धीमी आंच पर पकाया गया।' },
      ],
      audioTitle: 'मिट्टी के छिद्रों की फुसफुसाहट',
      audioTranscript: '"जब मिट्टी के मटके में पानी जाता है, तो मिट्टी जीवित हो उठती है। यह बिना बिजली के पानी को प्राकृतिक रूप से ठंडा और खनिजों से भरपूर बनाती है।"',
      artisanName: 'बसवराजू कुंभार',
      artisanBio: 'पॉटरी टाउन में 40 से अधिक वर्षों से पारंपरिक टेराकोटा बर्तन बनाने वाले अनुभवी कुम्हार।',
      artisanLocation: 'पॉटरी टाउन हेरिटेज वार्ड',
      artisanRegion: 'बैंगलोर-रामनगर कुम्हार संघ',
    },
  },
  kn: {
    'craft-1': {
      title: 'ರಾಮನಗರ ಶುದ್ಧ ರೇಷ್ಮೆ ಸೀರೆ (ಅಸಲಿ ಜರಿ ಪಲ್ಲು)',
      provenanceStory: 'ರಾಮನಗರದ ಏಷ್ಯಾದ ಅತಿ ದೊಡ್ಡ ರೇಷ್ಮೆ ಗೂಡಿನ ಮಾರುಕಟ್ಟೆಯಿಂದ ನೇರವಾಗಿ ಪಡೆದ ಶುದ್ಧ ಹಿಪ್ಪುನೇರಳೆ ರೇಷ್ಮೆಯಿಂದ ನೇಯ್ದದ್ದು. ನೈಸರ್ಗಿಕ ದಾಳಿಂಬೆ ಸಿಪ್ಪೆ ಬಣ್ಣ ಮತ್ತು ಅಪ್ಪಟ ಬೆಳ್ಳಿ ಜರಿಯೊಂದಿಗೆ ಪೂರ್ವಜರ ಕುಳಿ ಮಗ್ಗದಲ್ಲಿ ನೇಯ್ದ ಪಾರಂಪರಿಕ ಸೀರೆ.',
      materials: ['100% ರಾಮನಗರ ಶುದ್ಧ ಹಿಪ್ಪುನೇರಳೆ ರೇಷ್ಮೆ', 'ದಾಳಿಂಬೆ ಸಿಪ್ಪೆ ನೈಸರ್ಗಿಕ ಬಣ್ಣ', 'ಅಪ್ಪಟ ಬೆಳ್ಳಿ ಲೇಪಿತ ಜರಿ'],
      originSteps: [
        { stage: 'ಗೂಡುಗಳ ಆಯ್ಕೆ', description: 'ರಾಮನಗರ ಮಾರುಕಟ್ಟೆಯಿಂದ ಕೈಯಿಂದ ಆರಿಸಿದ ಶ್ರೇಷ್ಠ ರೇಷ್ಮೆ ಗೂಡುಗಳು.' },
        { stage: 'ಚರಕದಲ್ಲಿ ನೂಲು ತೆಗೆಯುವುದು', description: 'ಸಾಂಪ್ರದಾಯಿಕ ಚರಕಗಳಲ್ಲಿ ನಯವಾದ ರೇಷ್ಮೆ ನೂಲು ತಯಾರಿಕೆ.' },
        { stage: 'ನೈಸರ್ಗಿಕ ಬಣ್ಣ ಹಾಕುವುದು', description: 'ದಾಳಿಂಬೆ ಸಿಪ್ಪೆಯಿಂದ ಬಾಳಿಕೆ ಬರುವ ನೈಸರ್ಗಿಕ ಬಣ್ಣ.' },
        { stage: 'ಕುಳಿ ಮಗ್ಗದಲ್ಲಿ ನೇಯ್ಗೆ', description: 'ದೇಗುಲದ ಅಂಚುಗಳೊಂದಿಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಮಗ್ಗದಲ್ಲಿ ನೇಯ್ಗೆ.' },
      ],
      audioTitle: 'ರಾಮನಗರದ ಮಗ್ಗಗಳ ಮಧುರ ಧ್ವನಿ',
      audioTranscript: '"ರಾಮನಗರದಲ್ಲಿ ಸೂರ್ಯೋದಯದೊಂದಿಗೆ ಕೈಮಗ್ಗದ ನಾದ ಮೊಳಗುತ್ತದೆ. ಶುದ್ಧ ಕೈಮಗ್ಗದ ರೇಷ್ಮೆ ಸೀರೆಯು ತಲೆಮಾರುಗಳ ಕಾಲ ತನ್ನ ನಯ ಮತ್ತು ಕಾಂತಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುತ್ತದೆ."',
      artisanName: 'ಗೌರಮ್ಮ ಮತ್ತು ಮಂಜುನಾಥ್',
      artisanBio: 'ರಾಮನಗರ ರೇಷ್ಮೆ ನಗರದಲ್ಲಿ ನಾಲ್ಕು ತಲೆಮಾರುಗಳಿಂದ ಮಗ್ಗ ನಡೆಸುತ್ತಿರುವ ನುರಿತ ನೇಕಾರರು.',
      artisanLocation: 'ರಾಮನಗರ ರೇಷ್ಮೆ ನಗರ',
      artisanRegion: 'ಕರ್ನಾಟಕ ರೇಷ್ಮೆ ವಲಯ',
    },
    'craft-2': {
      title: 'ಚನ್ನಪಟ್ಟಣ ಸಾಂಪ್ರದಾಯಿಕ ರಾಜ-ರಾಣಿ ಮರದ ಬೊಂಬೆಗಳು',
      provenanceStory: 'ಗೊಂಬೆಗಳ ಊರಾದ ಚನ್ನಪಟ್ಟಣದಲ್ಲಿ ಆಲೆ ಮರದಿಂದ (ಐವರಿ ವುಡ್) ಲೇತ್‌ನಲ್ಲಿ ತಯಾರಿಸಿದ ನೈಸರ್ಗಿಕ ಲಾಕರ್‌ವೇರ್ ಬೊಂಬೆಗಳು. ಅರಿಶಿನ, ಕುಂಕುಮ ಮತ್ತು ನೈಸರ್ಗಿಕ ಅರಗಿನಿಂದ ಬಣ್ಣ ಬಳಿದು, ತಾಳೆ ಎಲೆಗಳಿಂದ ನಯಗೊಳಿಸಲಾದ ಸುರಕ್ಷಿತ ಆಟಿಕೆಗಳು.',
      materials: ['ಆಲೆ ಮರ (ಐವರಿ ವುಡ್)', 'ನೈಸರ್ಗಿಕ ಗಿಡದ ಅರಗು (ಲಾಕ್)', 'ಅರಿಶಿನ ಮತ್ತು ಕುಂಕುಮ ತರಕಾರಿ ಬಣ್ಣಗಳು'],
      originSteps: [
        { stage: 'ಮರದ ಹದಗೊಳಿಸುವಿಕೆ', description: 'ಆಲೆ ಮರವನ್ನು ಬಿರುಕು ಬಿಡದಂತೆ ನೆರಳಿನಲ್ಲಿ 60 ದಿನ ಒಣಗಿಸುವುದು.' },
        { stage: 'ಲೇತ್‌ನಲ್ಲಿ ಕಡೆಯುವುದು', description: 'ಸಾಂಪ್ರದಾಯಿಕ ಲೇತ್ ಯಂತ್ರದಲ್ಲಿ ಕೈಯಿಂದ ಆಕಾರ ಕೊಡುವುದು.' },
        { stage: 'ನೈಸರ್ಗಿಕ ಅರಗು ಬಣ್ಣ', description: 'ಘರ್ಷಣೆಯ ಬಿಸಿಯಿಂದ ನೈಸರ್ಗಿಕ ಅರಗನ್ನು ಕರಗಿಸಿ ಬಣ್ಣ ಹಚ್ಚುವುದು.' },
        { stage: 'ತಾಳೆ ಎಲೆ ಪಾಲಿಶ್', description: 'ತಾಳೆ ಮರದ ಎಲೆಗಳಿಂದ ನಯವಾದ ಹೊಳಪು ನೀಡುವುದು.' },
      ],
      audioTitle: 'ಚನ್ನಪಟ್ಟಣದ ಲಾಕರ್ ಮತ್ತು ಮರದ ನಂಟು',
      audioTranscript: '"ಚನ್ನಪಟ್ಟಣದಲ್ಲಿ ನಾವು ರಾಸಾಯನಿಕ ಬಣ್ಣಗಳನ್ನು ಬಳಸುವುದಿಲ್ಲ. ನೈಸರ್ಗಿಕ ಅರಗು ಬಣ್ಣದ ಈ ಆಟಿಕೆಗಳು ಮಕ್ಕಳಿಗೆ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವಾಗಿವೆ."',
      artisanName: 'ಸೈಯದ್ ನೂರುಲ್ಲಾ ಮತ್ತು ಪರಮೇಶ್',
      artisanBio: 'ಚನ್ನಪಟ್ಟಣದ ಪ್ರಸಿದ್ಧ ಮರದ ಗೊಂಬೆ ಮತ್ತು ಲಾಕರ್‌ವೇರ್ ಕುಶಲಕರ್ಮಿಗಳು.',
      artisanLocation: 'ಚನ್ನಪಟ್ಟಣ (ಗೊಂಬೆಗಳ ಊರು)',
      artisanRegion: 'ರಾಮನಗರ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ',
    },
    'craft-3': {
      title: 'ಬಿದರಿ ಶುದ್ಧ ಬೆಳ್ಳಿ ನಕ್ಷೆಯ ಹೂದಾನಿ ಮತ್ತು ಸುರಾಹಿ',
      provenanceStory: 'ಬಿದರ್‌ನಲ್ಲಿ 600 ವರ್ಷಗಳ ಬಹಮನಿ ಇತಿಹಾಸವಿರುವ ಲೋಹಕಲೆ. ಸತು-ತಾಮ್ರದ ಪಾತ್ರೆಯ ಮೇಲೆ ಶುದ್ಧ 99.9% ಬೆಳ್ಳಿಯ ತಂತಿ ಜಡಿದು, ಬಿದರ್ ಕೋಟೆಯ ಪ್ರಾಚೀನ ಮಣ್ಣಿನಲ್ಲಿ ಕುದಿಸಿ ಶಾಶ್ವತ ಕಪ್ಪು ವರ್ಣ ನೀಡಲಾಗಿದೆ.',
      materials: ['ಸತು ಮತ್ತು ತಾಮ್ರದ ಮಿಶ್ರಲೋಹ', '99.9% ಶುದ್ಧ ಬೆಳ್ಳಿ ತಂತಿ', 'ಬಿದರ್ ಕೋಟೆಯ ಐತಿಹಾಸಿಕ ಮಣ್ಣು'],
      originSteps: [
        { stage: 'ಮರಳು ಎರಕಹೊಯ್ಯುವುದು', description: 'ಕರಗಿಸಿದ ಮಿಶ್ರಲೋಹವನ್ನು ಮರಳಿನ ಅಚ್ಚಿನಲ್ಲಿ ಎರಕಹೊಯ್ದು ನಯಗೊಳಿಸುವುದು.' },
        { stage: 'ಉಳಿಯಿಂದ ಕೆತ್ತನೆ', description: 'ಉಕ್ಕಿನ ಉಪಕರಣಗಳಿಂದ ಹೂವಿನ ವಿನ್ಯಾಸಗಳನ್ನು ಕೊರೆಯುವುದು.' },
        { stage: 'ಬೆಳ್ಳಿ ತಂತಿ ಜಡಿತ (ತಾರ್ಕಶಿ)', description: 'ಕೈಯಿಂದ ಬೆಳ್ಳಿಯ ತಂತಿಯನ್ನು ನಯವಾಗಿ ಜಡಿಯುವುದು.' },
        { stage: 'ಕೋಟೆಯ ಮಣ್ಣಿನ ಸಂಸ್ಕರಣೆ', description: 'ಬಿದರ್ ಕೋಟೆಯ ಮಣ್ಣಿನ ದ್ರಾವಣದಲ್ಲಿ ಕುದಿಸಿ ಕಪ್ಪು ಬಣ್ಣ ತರುವುದು.' },
      ],
      audioTitle: 'ಬಿದರ್ ಮಣ್ಣು ಮತ್ತು ಬೆಳ್ಳಿಯ ರಸವಿದ್ಯೆ',
      audioTranscript: '"ಕಪ್ಪು ಮೈಮೇಲೆ ಬೆಳ್ಳಿಯ ನಕ್ಷೆ ಮೂಡಿದಾಗ ಅದು ಅಮಾವಾಸ್ಯೆಯ ರಾತ್ರಿಯಲ್ಲಿ ಚಂದ್ರನ ಬೆಳಕಿನಂತೆ ಕಂಗೊಳಿಸುತ್ತದೆ."',
      artisanName: 'ರಶೀದ್ ಅಹ್ಮದ್ ಖಾದ್ರಿ',
      artisanBio: 'ರಾಷ್ಟ್ರ ಪ್ರಶಸ್ತಿ ಪುರಸ್ಕೃತ ಬಿದರಿ ಕಲಾ ಮಾಂತ್ರಿಕರು.',
      artisanLocation: 'ಹಳೆಯ ಕೋಟೆ ಪಟ್ಟಣ, ಬಿದರ್',
      artisanRegion: 'ದಖನ್ ಪಾರಂಪರಿಕ ವಲಯ',
    },
    'craft-4': {
      title: 'ಧಾರವಾಡ ಕಸೂತಿ ಕೈ ಕಸೂತಿಯ ಕಲಾತ್ಮಕ ಗೋಡೆ ವಸ್ತ್ರ',
      provenanceStory: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರು ಎಳೆ ಎಣಿಸಿ ನೇಯ್ದ ಸಾಂಪ್ರದಾಯಿಕ ಕಸೂತಿ (ಗವಂತಿ, ಮುರ್ಗಿ ಹೊಲಿಗೆ). ದೇಗುಲದ ತೇರು, ನವಿಲು ಮತ್ತು ಗೋಪುರಗಳ ಪವಿತ್ರ ಚಿತ್ರಣ.',
      materials: ['ಕೈಮಗ್ಗದ ಹತ್ತಿ ಬಟ್ಟೆ', 'ರೇಷ್ಮೆ ಕಸೂತಿ ದಾರಗಳು', 'ನೈಸರ್ಗಿಕ ಮೂಲಿಕೆ ಶುದ್ಧೀಕರಣ'],
      originSteps: [
        { stage: 'ಎಳೆಗಳ ಎಣಿಕೆ', description: 'ಯಾವುದೇ ಪೆನ್ಸಿಲ್ ಗುರುತಿಲ್ಲದೆ ಕಣ್ಣಳತೆಯಿಂದ ಎಳೆಗಳನ್ನು ಎಣಿಸುವುದು.' },
        { stage: 'ಗವಂತಿ ಹೊಲಿಗೆ', description: 'ಮುಂಭಾಗ ಮತ್ತು ಹಿಂಭಾಗ ಎರಡೂ ಕಡೆ ಒಂದೇ ರೀತಿ ಕಾಣುವಂತೆ ಹೊಲಿಯುವುದು.' },
        { stage: 'ಗೋಪುರ ವಿನ್ಯಾಸ', description: 'ದೇಗುಲದ ತೇರುಗಳ ಸಂಕೀರ್ಣ ಕಸೂತಿ ಕೆಲಸ.' },
      ],
      audioTitle: 'ಕಸೂತಿ ಎಳೆಗಳ ಲೆಕ್ಕಾಚಾರ',
      audioTranscript: '"ಕಸೂತಿಯಲ್ಲಿ ಯಾವುದೇ ಗಂಟುಗಳಿರುವುದಿಲ್ಲ. ಬಟ್ಟೆಯನ್ನು ಮಗುಚಿ ನೋಡಿದರೂ ಮುಂಭಾಗದಷ್ಟೇ ಸುಂದರವಾಗಿ ಕಾಣುತ್ತದೆ."',
      artisanName: 'ಕಮಲಮ್ಮ ಮತ್ತು ಶಾಂತಾ ಬಾಯಿ',
      artisanBio: '30ಕ್ಕೂ ಹೆಚ್ಚು ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರಿಗೆ ಉದ್ಯೋಗ ನೀಡುತ್ತಿರುವ ಕಸೂತಿ ಕಲಾವಿದರು.',
      artisanLocation: 'ಇಳಕಲ್ ಮತ್ತು ಧಾರವಾಡ',
      artisanRegion: 'ಉತ್ತರ ಕರ್ನಾಟಕ ಕೈಮಗ್ಗ ಸಂಘ',
    },
    'craft-5': {
      title: 'ಮೈಸೂರು ಕೆತ್ತನೆಯ ಶ್ರೀಗಂಧ ಮತ್ತು ರೋಸ್‌ವುಡ್ ಪೆಟ್ಟಿಗೆ',
      provenanceStory: 'ಮೈಸೂರು ಅರಮನೆ ಪರಂಪರೆಯ ಕೆತ್ತನೆ ಕಲೆ. ಸುಗಂಧಿತ ಶ್ರೀಗಂಧ ಮತ್ತು ರೋಸ್‌ವುಡ್‌ನಿಂದ ರಚಿತವಾಗಿದ್ದು, ಆನೆಗಳ ಮೆರವಣಿಗೆಯ ಆಕರ್ಷಕ ಜಾಲಿ ಕೆತ್ತನೆ ಹೊಂದಿದೆ.',
      materials: ['ಕರ್ನಾಟಕದ ಅಪ್ಪಟ ಶ್ರೀಗಂಧ', 'ಮೈಸೂರು ರೋಸ್‌ವುಡ್', 'ನೈಸರ್ಗಿಕ ಜೇನುಮೇಣದ ಪಾಲಿಶ್'],
      originSteps: [
        { stage: 'ಮರದ ಆಯ್ಕೆ ಮತ್ತು ಜೋಡಣೆ', description: 'ರೋಸ್‌ವುಡ್ ಫಲಕಗಳ ನಿಖರವಾದ ಜೋಡಣೆ.' },
        { stage: 'ಜಾಲಿ ಕೆತ್ತನೆ', description: 'ಆನೆಗಳ ಮೆರವಣಿಗೆಯ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆ ಕೆಲಸ.' },
        { stage: 'ಶ್ರೀಗಂಧದ ಸೇರ್ಪಡೆ', description: 'ನಿರಂತರ ಸುವಾಸನೆಗಾಗಿ ಶ್ರೀಗಂಧದ ಫಲಕಗಳ ಜೋಡಣೆ.' },
        { stage: 'ಜೇನುಮೇಣ ಪಾಲಿಶ್', description: 'ಸುವಾಸನೆಗೆ ಧಕ್ಕೆಯಾಗದಂತೆ ನೈಸರ್ಗಿಕ ಮೇಣದಿಂದ ಹೊಳಪು ಕೊಡುವುದು.' },
      ],
      audioTitle: 'ಪವಿತ್ರ ಗಂಧದ ಸುವಾಸನೆ',
      audioTranscript: '"ಕರ್ನಾಟಕದ ಶ್ರೀಗಂಧವು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಕಂಪನ್ನು ಹೊಂದಿದೆ. ಐವತ್ತು ವರ್ಷಗಳ ನಂತರವೂ ಈ ಪೆಟ್ಟಿಗೆಯು ಅದೇ ಸುವಾಸನೆಯನ್ನು ಬೀರುತ್ತದೆ."',
      artisanName: 'ನಾರಾಯಣ ಆಚಾರ್ಯ',
      artisanBio: 'ಮೈಸೂರು ಅರಮನೆ ಸಂಪ್ರದಾಯದ ಪ್ರಸಿದ್ಧ ಮರದ ಕೆತ್ತನೆಗಾರರು.',
      artisanLocation: 'ಅರಮನೆ ರಸ್ತೆ, ಮೈಸೂರು',
      artisanRegion: 'ಮೈಸೂರು ಸಾಂಸ್ಕೃತಿಕ ವಲಯ',
    },
    'craft-6': {
      title: 'ನೈಸರ್ಗಿಕ ಕೆಂಪು ಮಣ್ಣಿನ ತಂಪು ನೀರಿನ ಕೂಜಾ ಮತ್ತು ಮಡಕೆ',
      provenanceStory: 'ರಾಮನಗರದ ಕೆರೆಗಳ ಕೆಂಪು ಜೇಡಿಮಣ್ಣಿನಿಂದ ಚಕ್ರದ ಮೇಲೆ ಮಾಡಿದ ನೈಸರ್ಗಿಕ ಮಡಕೆ. ಮರದ ತಟ್ಟೆಯಿಂದ ಬಡಿದು ಗಟ್ಟಿಗೊಳಿಸಿ, ನೈಸರ್ಗಿಕವಾಗಿ ನೀರನ್ನು ತಂಪಾಗಿಸುವ ಮತ್ತು ಕ್ಷಾರೀಯಗೊಳಿಸುವ ಗುಣ ಹೊಂದಿದೆ.',
      materials: ['ಕೆಂಪು ಜೇಡಿಮಣ್ಣು', 'ನದಿ ಕ್ವಾರ್ಟ್ಸ್ ಹೊಳಪು', 'ಭತ್ತದ ಹೊಟ್ಟಿನ ಸುಡುವಿಕೆ'],
      originSteps: [
        { stage: 'ಮಣ್ಣಿನ ಸಂಸ್ಕರಣೆ', description: 'ಕೆರೆಯ ಜೇಡಿಮಣ್ಣನ್ನು ನೀರಿನಲ್ಲಿ ನೆನೆಸಿ ಶೋಧಿಸುವುದು.' },
        { stage: 'ಚಕ್ರದಲ್ಲಿ ರೂಪ ಕೊಡುವುದು', description: 'ಕುಂಬಾರರ ಚಕ್ರದಲ್ಲಿ ತಿರುಗಿಸಿ ಮರದ ತಟ್ಟೆಯಿಂದ ಬಡಿಯುವುದು.' },
        { stage: 'ಹೊಟ್ಟಿನ ಬೆಂಕಿಯಲ್ಲಿ ಬೇಯಿಸುವುದು', description: 'ಭತ್ತದ ಹೊಟ್ಟಿನ ಮಂದ ಉರಿಯಲ್ಲಿ ಬೇಯಿಸುವುದು.' },
      ],
      audioTitle: 'ಮಣ್ಣಿನ ಮಡಕೆಯ ತಂಪು ಸ್ಪರ್ಶ',
      audioTranscript: '"ಮಣ್ಣಿನ ಮಡಕೆಯಲ್ಲಿ ನೀರು ತುಂಬಿದಾಗ ಪ್ರಕೃತಿ ಜಾಗೃತವಾಗುತ್ತದೆ. ವಿದ್ಯುತ್ ಇಲ್ಲದೆ ನೀರನ್ನು ಅಮೃತದಂತೆ ತಂಪಾಗಿಸುತ್ತದೆ."',
      artisanName: 'ಬಸವರಾಜು ಕುಂಬಾರ',
      artisanBio: 'ಪಾಟ್ರಿ ಟೌನ್‌ನಲ್ಲಿ 40 ವರ್ಷಗಳಿಂದ ಸಾಂಪ್ರದಾಯಿಕ ಮಣ್ಣಿನ ಪಾತ್ರೆಗಳನ್ನು ತಯಾರಿಸುತ್ತಿರುವ ಹಿರಿಯ ಕುಂಬಾರರು.',
      artisanLocation: 'ಪಾಟ್ರಿ ಟೌನ್, ಬೆಂಗಳೂರು',
      artisanRegion: 'ಕುಂಬಾರರ ಸಂಘ',
    },
  },
  te: {
    'craft-1': {
      title: 'రామనగర స్వచ్ఛమైన పట్టు చీర (అసలు జరీ పల్లు)',
      provenanceStory: 'రామనగర మార్కెట్ నుంచి నేరుగా సేకరించిన పట్టుతో మగ్గంపై నేసినది. దానిమ్మ తొక్కల సహజ రంగులతో మరియు వెండి జరీతో సాంప్రదాయక పద్ధతిలో తయారుచేయబడింది.',
      materials: ['100% రామనగర పట్టు', 'సహజ దానిమ్మ రంగు', 'స్వచ్ఛమైన వెండి జరీ'],
      originSteps: [
        { stage: 'పట్టు గూళ్ల ఎంపిక', description: 'రామనగర మార్కెట్లో నాణ్యమైన పట్టు గూళ్ల ఎంపిక.' },
        { stage: 'చరఖాపై దారాల తీత', description: 'సాంప్రదాయ చరఖాలపై సన్నని పట్టు దారాల తయారీ.' },
        { stage: 'సహజ రంగులు అద్దకం', description: 'దానిమ్మ తొక్కలతో శాశ్వత సహజ రంగుల అద్దకం.' },
        { stage: 'మగ్గంపై నేత', description: 'ఆలయ అంచులతో సాంప్రదాయ మగ్గంపై నేసిన చీర.' },
      ],
      audioTitle: 'రామనగర మగ్గాల లయబద్ధ నాదం',
      audioTranscript: '"రామనగర చేనేత పట్టు చీర తరతరాల పాటు తన నాణ్యతను, మెరుపును నిలుపుకుంటుంది."',
      artisanName: 'గౌరమ్మ & మంజునాథ్',
      artisanBio: 'నాలుగు తరాలుగా రామనగరంలో పట్టు చీరలు నేస్తున్న ప్రసిద్ధ చేనేత కళాకారులు.',
      artisanLocation: 'రామనగర సిల్క్ సిటీ',
      artisanRegion: 'కర్ణాటక సిల్క్ బెల్ట్',
    },
    'craft-2': {
      title: 'చన్నపట్న సాంప్రదాయ లక్క చెక్క బొమ్మలు',
      provenanceStory: 'చన్నపట్నంలో సహజమైన ఆలె చెక్కతో లేత్ యంత్రాలపై తయారు చేయబడినవి. సహజ లక్క, పసుపు, కుంకుమ రంగులు ఉపయోగించి పిల్లల కోసం సురక్షితంగా రూపొందించబడ్డాయి.',
      materials: ['ఆలె చెక్క (ఐవరీ వుడ్)', 'సహజ లక్క జిగురు', 'పసుపు మరియు కుంకుమ సహజ రంగులు'],
      originSteps: [
        { stage: 'చెక్కను ఆరబెట్టడం', description: 'పగుళ్లు రాకుండా 60 రోజుల పాటు నీడలో ఆరబెడతారు.' },
        { stage: 'లేత్‌పై చెక్కడం', description: 'లేత్ యంత్రంపై చేతితో ఆకారాన్ని రూపొందిస్తారు.' },
        { stage: 'లక్క రంగుల అద్దకం', description: 'వేడి రాపిడి ద్వారా సహజ లక్క రంగులు అద్దుతారు.' },
        { stage: 'ఆకులతో మెరుగు', description: 'తాటి ఆకులతో మెరిసేలా పాలిష్ చేస్తారు.' },
      ],
      audioTitle: 'చన్నపట్న లక్క మరియు చెక్క అనుబంధం',
      audioTranscript: '"మేము ఎటువంటి రసాయన రంగులు వాడము. ఈ బొమ్మలు పిల్లలకు అత్యంత సురక్షితమైనవి."',
      artisanName: 'సయ్యద్ నూరుల్లా & పరమేష్',
      artisanBio: 'చన్నపట్నంలో పర్యావరణ అనుకూల చెక్క బొమ్మలు తయారుచేసే ప్రముఖ కళాకారులు.',
      artisanLocation: 'చన్నపట్న (బొమ్మల ఊరు)',
      artisanRegion: 'రామనగర జిల్లా, కర్ణాటక',
    },
    'craft-3': {
      title: 'బిద్రి స్వచ్ఛమైన వెండి చెక్కడపు కూజా మరియు పాత్ర',
      provenanceStory: 'బిదర్‌లో 600 ఏళ్ల బహమనీ సాంప్రదాయంతో చేసిన లోహ కళ. జింక్-రాగి పాత్రపై స్వచ్ఛమైన వెండి తీగలను పొదిగి, బిదర్ కోట మట్టి ద్రావణంలో నల్లటి రంగును ఇస్తారు.',
      materials: ['జింక్ మరియు రాగి మిశ్రమం', '99.9% స్వచ్ఛమైన వెండి తీగ', 'బిదర్ కోట చారిత్రక మట్టి'],
      originSteps: [
        { stage: 'ఇసుక అచ్చు పోత', description: 'మిశ్రమ లోహాన్ని అచ్చులలో పోసి మృదువుగా చేస్తారు.' },
        { stage: 'ఉలితో చెక్కడం', description: 'ఉక్కు పనిముట్లతో పూల డిజైన్లు చెక్కుతారు.' },
        { stage: 'వెండి తీగ పొదగడం', description: 'చేతితో వెండి తీగలను లోహంలో పొదుగుతారు.' },
        { stage: 'కోట మట్టితో నలుపు', description: 'బిదర్ కోట మట్టిలో మరిగించి నలుపు రంగు తెస్తారు.' },
      ],
      audioTitle: 'బిదర్ మట్టి మరియు వెండి రసాయనిక అద్భుతం',
      audioTranscript: '"నల్లటి లోహంపై వెండి తీగలు మెరిసినప్పుడు రాత్రి వేళ చంద్రుని వెన్నెల వలె ప్రకాశిస్తాయి."',
      artisanName: 'రషీద్ అహ్మద్ ఖాద్రీ',
      artisanBio: 'బిద్రి లోహకళలో జాతీయ అవార్డు గ్రహీత.',
      artisanLocation: 'పాత కోట, బిదర్',
      artisanRegion: 'దక్కన్ హెరిటేజ్ కారిడార్',
    },
    'craft-4': {
      title: 'ధార్వాడ్ కసూతి చేతి ఎంబ్రాయిడరీ గోడ వస్త్రం',
      provenanceStory: 'గ్రామీణ మహిళల ద్వారా దారాలను లెక్కించి నేసిన సాంప్రదాయ కసూతి కళ. ఆలయ రథాలు మరియు నెమళ్ల నమూనాలు.',
      materials: ['చేనేత కాటన్ వస్త్రం', 'సిల్క్ ఎంబ్రాయిడరీ దారాలు', 'సహజ మూలికా ప్రక్షాళన'],
      originSteps: [
        { stage: 'దారాల లెక్కింపు', description: 'ఎటువంటి మార్కింగ్ లేకుండా కంటిచూపుతో దారాలు లెక్కిస్తారు.' },
        { stage: 'గవంతి కుట్టు', description: 'ముందు, వెనుక ఒకేలా కనిపించేలా కుడతారు.' },
        { stage: 'గోపుర డిజైన్లు', description: 'ఆలయ రథాల సున్నితమైన కుట్టుపని.' },
      ],
      audioTitle: 'కసూతి దారాల లెక్కలు',
      audioTranscript: '"కసూతిలో ఎటువంటి ముడులు ఉండవు. వస్త్రాన్ని వెనక్కి తిప్పినా అంతే అందంగా కనిపిస్తుంది."',
      artisanName: 'కమలమ్మ & శాంతా బాయి',
      artisanBio: 'ఉత్తర కర్ణాటకలో గ్రామీణ మహిళలను ప్రోత్సహిస్తున్న కళాకారులు.',
      artisanLocation: 'ఇల్కల్ & ధార్వాడ్',
      artisanRegion: 'ఉత్తర కర్ణాటక చేనేత గిల్డ్',
    },
    'craft-5': {
      title: 'మైసూర్ గంధపు చెక్క & రోజ్‌వుడ్ చెక్కిన పెట్టె',
      provenanceStory: 'మైసూర్ ప్యాలెస్ సాంప్రదాయంతో చెక్కబడినది. సుగంధ గంధపు చెక్క మరియు రోజ్‌వుడ్‌తో తయారై, ఏనుగుల ఊరేగింపు జాలీ చెక్కడాలు కలిగి ఉంటుంది.',
      materials: ['కర్ణాటక గంధపు చెక్క', 'మైసూర్ రోజ్‌వుడ్', 'తేనెటీగల మైనం పాలిష్'],
      originSteps: [
        { stage: 'చెక్క ఎంపిక', description: 'నాణ్యమైన రోజ్‌వుడ్ పలకల ఎంపిక.' },
        { stage: 'జాలీ చెక్కడం', description: 'ఏనుగుల ఊరేగింపు సూక్ష్మ చెక్కడాలు.' },
        { stage: 'గంధపు చెక్క అమరిక', description: 'సువాసన కోసం గంధపు చెక్క అమర్చడం.' },
        { stage: 'మైనం పాలిష్', description: 'సహజ మైనంతో మెరుగులు దిద్దడం.' },
      ],
      audioTitle: 'పవిత్ర గంధపు సువాసన',
      audioTranscript: '"కర్ణాటక గంధపు చెక్క యాభై సంవత్సరాల తర్వాత కూడా అదే తాజా సువాసనను వెదజల్లుతుంది."',
      artisanName: 'నారాయణ ఆచార్య',
      artisanBio: 'మైసూర్ రాజప్రసాద సంప్రదాయ చెక్క చెక్కడపు కళాకారులు.',
      artisanLocation: 'మైసూర్ ప్యాలెస్ రోడ్',
      artisanRegion: 'మైసూర్ కల్చరల్ డిస్ట్రిక్ట్',
    },
    'craft-6': {
      title: 'సహజ ఎర్ర మట్టి నీటి కూజా మరియు కుండ',
      provenanceStory: 'సహజమైన ఎర్ర మట్టితో చక్రంపై తయారుచేసి, చెక్క బద్దలతో కొట్టి గట్టిపరిచిన మట్టి కూజా. నీటిని సహజంగా చల్లబరిచి ఖనిజాలను అందిస్తుంది.',
      materials: ['ఎర్ర బంకమట్టి', 'నది క్వార్ట్జ్ పాలిష్', 'వరి పొట్టుతో కాల్చడం'],
      originSteps: [
        { stage: 'మట్టి తయారీ', description: 'మట్టిని నీటిలో నానబెట్టి శుద్ధి చేస్తారు.' },
        { stage: 'చక్రంపై తిప్పడం', description: 'కుమ్మరి చక్రంపై తిప్పి చేతితో ఆకారం ఇస్తారు.' },
        { stage: 'పొట్టులో కాల్చడం', description: 'వరి పొట్టు మంటల్లో నిదానంగా కాలుస్తారు.' },
      ],
      audioTitle: 'మట్టి కుండ చల్లని అనుభూతి',
      audioTranscript: '"మట్టి కుండలో నీరు పోసినప్పుడు ప్రకృతి మేల్కొంటుంది. కరెంటు లేకుండా నీటిని చల్లగా, స్వచ్ఛంగా ఉంచుతుంది."',
      artisanName: 'బసవరాజు కుంభార్',
      artisanBio: 'పాటరీ టౌన్‌లో 40 ఏళ్లుగా మట్టి పాత్రలు తయారు చేస్తున్న అనుభవజ్ఞులైన కుమ్మరి.',
      artisanLocation: 'పాటరీ టౌన్',
      artisanRegion: 'బెంగళూరు కుమ్మరి సంఘం',
    },
  },
  ta: {
    'craft-1': {
      title: 'ராமநகரா தூய பட்டு புடவை (அசல் ஜரி பல்லு)',
      provenanceStory: 'ராமநகராவின் உலகப் புகழ்பெற்ற பட்டுக்கூடு சந்தையிலிருந்து பெறப்பட்ட தூய மல்பெரி பட்டு. மாதுளைத் தோல் இயற்கை சாயம் மற்றும் வெள்ளி ஜரியுடன் பாரம்பரிய குழித்தறியில் நெய்யப்பட்டது.',
      materials: ['100% ராமநகரா மல்பெரி பட்டு', 'மாதுளைத் தோல் இயற்கை சாயம்', 'தூய வெள்ளி ஜரி'],
      originSteps: [
        { stage: 'பட்டுக்கூடு தேர்வு', description: 'ராமநகரா சந்தையிலிருந்து சிறந்த பட்டுக்கூடுகள் தேர்வு.' },
        { stage: 'ராட்டினத்தில் நூல் எடுத்தல்', description: 'பாரம்பரிய முறையில் பட்டு நூலை உருவாக்குதல்.' },
        { stage: 'இயற்கை சாயமிடுதல்', description: 'மாதுளை தோலால் நிலைத்து நிற்கும் இயற்கை சாயம்.' },
        { stage: 'குழித்தறி நெசவு', description: 'கோயில் பார்டர்களுடன் பாரம்பரிய தறியில் நெய்தல்.' },
      ],
      audioTitle: 'ராமநகரா தறிகளின் தாள நயம்',
      audioTranscript: '"ராமநகராவில் சூரிய உதயத்துடன் கைத்தறியின் ஓசை தொடங்குகிறது. தலைமுறைகள் கடந்தும் மென்மையும் பளபளப்பும் மாறாத தூய பட்டு புடவை."',
      artisanName: 'கௌரம்மா & மஞ்சுநாத்',
      artisanBio: 'ராமநகரா பட்டு நகரத்தில் நான்கு தலைமுறைகளாக தறி நெய்யும் தலைசிறந்த நெசவாளர்கள்.',
      artisanLocation: 'ராமநகரா பட்டு நகரம்',
      artisanRegion: 'கர்நாடக பட்டு மண்டலம்',
    },
    'craft-2': {
      title: 'சென்னப்பட்னா பாரம்பரிய அரக்கு மர பொம்மைகள்',
      provenanceStory: 'சென்னப்பட்னாவில் ஆலே மரத்தால் (ஐவரி வுட்) லேத் இயந்திரத்தில் செய்யப்பட்ட பாரம்பரிய அரக்கு பொம்மைகள். இயற்கை அரக்கு, மஞ்சள், குங்கும சாயங்களால் குழந்தைகளுக்கு பாதுகாப்பானது.',
      materials: ['ஆலே மரம் (ஐவரி வுட்)', 'இயற்கை அரக்கு', 'மஞ்சள் மற்றும் குங்கும இயற்கை சாயங்கள்'],
      originSteps: [
        { stage: 'மரத்தை உலர்த்துதல்', description: 'விரிசல் ஏற்படாமல் இருக்க 60 நாட்கள் நிழலில் உலர்த்துதல்.' },
        { stage: 'லேத்தில் கடைசல் செய்தல்', description: 'பாரம்பரிய லேத்தில் கையால் வடிவம் கொடுத்தல்.' },
        { stage: 'அரக்கு சாயமிடுதல்', description: 'உராய்வு வெப்பத்தால் உருகும் இயற்கை அரக்கு பூச்சு.' },
        { stage: 'தாழை இலை பாலிஷ்', description: 'தாழை இலைகளால் பளபளப்பான மெருகு அளித்தல்.' },
      ],
      audioTitle: 'சென்னப்பட்னாவின் அரக்கும் மரமும்',
      audioTranscript: '"நாங்கள் ரசாயனங்களை பயன்படுத்துவதில்லை. இந்த இயற்கை பொம்மைகள் குழந்தைகளுக்கு 100% பாதுகாப்பானவை."',
      artisanName: 'சையத் நூருல்லா & பரமேஷ்',
      artisanBio: 'சென்னப்பட்னாவில் இயற்கை மர பொம்மைகளை உருவாக்கும் முன்னணி கைவினைஞர்கள்.',
      artisanLocation: 'சென்னப்பட்னா (பொம்மை நகரம்)',
      artisanRegion: 'ராமநகரா மாவட்டம், கர்நாடகா',
    },
    'craft-3': {
      title: 'பிதார் பித்ரிவேர் தூய வெள்ளி வேலைப்பாட்டு கூஜா',
      provenanceStory: 'பிதாரில் 600 ஆண்டு பாரம்பரியத்தில் உருவான உலோகக் கலை. துத்தநாக-செம்பு உலோகத்தின் மீது தூய வெள்ளி கம்பிகளை பதித்து, பிதார் கோட்டை மண்ணில் கருமை நிறம் அளிக்கப்படுகிறது.',
      materials: ['துத்தநாகம் மற்றும் செம்பு கலவை', '99.9% தூய வெள்ளி கம்பி', 'பிதார் கோட்டையின் வரலாற்று மண்'],
      originSteps: [
        { stage: 'மணல் வார்ப்படம்', description: 'உருகிய உலோகத்தை மணல் அச்சில் வார்த்து செதுக்குதல்.' },
        { stage: 'உளியால் செதுக்குதல்', description: 'எஃகு உளியால் பூக்களின் வடிவங்களை செதுக்குதல்.' },
        { stage: 'வெள்ளி கம்பி பதித்தல்', description: 'கையால் வெள்ளி கம்பிகளை உலோகத்தில் பதித்தல்.' },
        { stage: 'கோட்டை மண் சாயமிடுதல்', description: 'பிதார் கோட்டை மண்ணில் கொதிக்க வைத்து கருப்பு நிறம் பெறுதல்.' },
      ],
      audioTitle: 'பிதார் மண்ணும் வெள்ளியின் ரசவாதமும்',
      audioTranscript: '"கருப்பு உலோகத்தின் மீது வெள்ளி ஒளிரும் போது, இரவில் சந்திரன் பிரகாசிப்பது போல் இருக்கும்."',
      artisanName: 'ரஷீத் அகமது காத்ரி',
      artisanBio: 'பித்ரி கைவினைக் கலையில் தேசிய விருது பெற்ற கைவினைஞர்.',
      artisanLocation: 'பழைய கோட்டை, பிதார்',
      artisanRegion: 'தக்காண பாரம்பரிய மண்டலம்',
    },
    'craft-4': {
      title: 'தார்வாட் கசூதி கைத்தையல் சுவர் அலங்கார துணி',
      provenanceStory: 'கிராமப்புற பெண்களால் நூல்களை எண்ணி தைக்கப்பட்ட பாரம்பரிய கசூதி கலை. கோவில் தேர், மயில் மற்றும் கோபுர வடிவங்கள்.',
      materials: ['கைத்தறி பருத்தி துணி', 'பட்டு தையல் நூல்கள்', 'இயற்கை மூலிகை தூய்மை'],
      originSteps: [
        { stage: 'நூல் எண்ணிக்கை', description: 'எந்தவித பென்சில் அடையாளமும் இன்றி கண்களால் எண்ணுதல்.' },
        { stage: 'கவந்தி தையல்', description: 'முன்புறமும் பின்புறமும் ஒரே மாதிரியாக இருக்கும்படி தைத்தல்.' },
        { stage: 'கோவில் கோபுர தையல்', description: 'கோவில் தேர்களின் நுணுக்கமான தையல் வேலை.' },
      ],
      audioTitle: 'கசூதி நூல்களின் கணக்கீடு',
      audioTranscript: '"கசூதியில் முடிச்சுகள் இருக்காது. துணியை திருப்பிப் பார்த்தாலும் முன்புறம் போன்றே அழகாக இருக்கும்."',
      artisanName: 'கமலம்மா & சாந்தா பாய்',
      artisanBio: 'வட கர்நாடகாவில் கிராமப்புற பெண்களுக்கு வேலைவாய்ப்பளிக்கும் கைவினை குழுமம்.',
      artisanLocation: 'இல்கல் & தார்வாட்',
      artisanRegion: 'வட கர்நாடக கைத்தறி சங்கம்',
    },
    'craft-5': {
      title: 'மைசூர் சந்தன மரம் & ரோஸ்வுட் செதுக்கப்பட்ட பெட்டி',
      provenanceStory: 'மைசூர் அரண்மனை பாரம்பரியத்தில் செதுக்கப்பட்டது. நறுமண சந்தன மரம் மற்றும் ரோஸ்வுட்டால் செய்யப்பட்டு, யானை ஊர்வல ஜாலி வேலைப்பாடு கொண்டது.',
      materials: ['கர்நாடக சந்தன மரம்', 'மைசூர் ரோஸ்வுட்', 'இயற்கை தேன்மெழுகு பாலிஷ்'],
      originSteps: [
        { stage: 'மரத் தேர்வு', description: 'ரோஸ்வுட் பலகைகளின் துல்லியமான இணைப்பு.' },
        { stage: 'ஜாலி செதுக்குதல்', description: 'யானை ஊர்வலத்தின் நுணுக்கமான செதுக்கல்.' },
        { stage: 'சந்தன மரம் பதித்தல்', description: 'நறுமணத்திற்காக சந்தன மர பலகைகளை இணைத்தல்.' },
        { stage: 'தேன்மெழுகு பாலிஷ்', description: 'நறுமணம் மறையாமல் இருக்க தேன்மெழுகால் மெருகூட்டுதல்.' },
      ],
      audioTitle: 'புனித சந்தனத்தின் நறுமணம்',
      audioTranscript: '"கர்நாடக சந்தன மரம் ஐம்பது ஆண்டுகளுக்குப் பிறகும் அதே தெய்வீக நறுமணத்தை பரப்பும்."',
      artisanName: 'நாராயண ஆச்சார்யா',
      artisanBio: 'மைசூர் அரண்மனை பாரம்பரிய மரச் செதுக்கல் கைவினைஞர்.',
      artisanLocation: 'மைசூர் அரண்மனை சாலை',
      artisanRegion: 'மைசூர் கலாச்சார மண்டலம்',
    },
    'craft-6': {
      title: 'இயற்கை செம்மண் குளிர்ச்சி நீர் கூஜா மற்றும் பானை',
      provenanceStory: 'ராமநகர ஏரி செம்மண்ணால் சக்கரத்தில் செய்யப்பட்டு, மர தட்டையால் தட்டி பலப்படுத்தப்பட்ட மண் கூஜா. தண்ணீரை இயற்கையாக குளிர்ச்சியாகவும் காரத்தன்மையுடனும் வைக்கும்.',
      materials: ['ஏரி செம்மண்', 'ஆற்று குவார்ட்ஸ் பாலிஷ்', 'நெல் உமி சுடுதல்'],
      originSteps: [
        { stage: 'மண் பக்குவப்படுத்துதல்', description: 'மண்ணை நீரில் ஊறவைத்து வடிகட்டுதல்.' },
        { stage: 'சக்கரத்தில் உருவாக்குதல்', description: 'சக்கரத்தில் சுழற்றி மர தட்டையால் தட்டுதல்.' },
        { stage: 'உமி நெருப்பில் சுடுதல்', description: 'நெல் உமியின் மிதமான நெருப்பில் சுடுதல்.' },
      ],
      audioTitle: 'மண் பானையின் குளிர்ச்சி அனுபவம்',
      audioTranscript: '"மண் பானையில் தண்ணீர் ஊற்றும்போது பூமி புத்துயிர் பெறுகிறது. மின்சாரம் இன்றி தண்ணீரை அமிர்தமாக மாற்றும்."',
      artisanName: 'பசவராஜு கும்பார்',
      artisanBio: 'பாட்டரி டவுனில் 40 ஆண்டுகளாக மண்பாண்டங்கள் செய்யும் மூத்த குயவர்.',
      artisanLocation: 'பாட்டரி டவுன்',
      artisanRegion: 'பெங்களூரு மண்பாண்ட சங்கம்',
    },
  },
  ml: {
    'craft-1': {
      title: 'രാമനഗര ശുദ്ധമായ പട്ട് സാരി (യഥാർത്ഥ സരി പല്ലു)',
      provenanceStory: 'രാമനഗര കൊക്കൂൺ മാർക്കറ്റിൽ നിന്നും നേരിട്ട് ശേഖരിച്ച ശുദ്ധമായ മൾബറി പട്ടുനൂലിൽ പരമ്പരാഗത തറിയിൽ നെയ്തെടുത്തത്. മാതളനാരങ്ങ തൊലി കൊണ്ടുള്ള പ്രകൃതിദത്ത ചായവും വെള്ളി സരിയും.',
      materials: ['100% രാമനഗര മൾബറി പട്ട്', 'മാതളനാരങ്ങ തൊലി പ്രകൃതിദത്ത ചായം', 'വെള്ളി പൂശിയ ശുദ്ധ സരി'],
      originSteps: [
        { stage: 'കൊക്കൂൺ തിരഞ്ഞെടുക്കൽ', description: 'രാമനഗര മാർക്കറ്റിൽ നിന്ന് മികച്ച പട്ടുനൂൽ കൊക്കൂണുകൾ തിരഞ്ഞെടുക്കൽ.' },
        { stage: 'ചർക്കയിൽ നൂൽ നൂൽക്കൽ', description: 'പരമ്പരാഗത ചർക്കകളിൽ നേർത്ത പട്ടുനൂൽ ഉണ്ടാക്കൽ.' },
        { stage: 'പ്രകൃതിദത്ത ചായം മുക്കൽ', description: 'മാതളനാരങ്ങ തൊലിയിൽ നിന്നുള്ള പ്രകൃതിദത്ത ചായം.' },
        { stage: 'തറി നെയ്ത്ത്', description: 'ക്ഷേത്ര ബോർഡറുകളോടെ പരമ്പരാഗത തറിയിൽ നെയ്തെടുക്കൽ.' },
      ],
      audioTitle: 'രാമനഗര തറികളുടെ താളലയം',
      audioTranscript: '"രാമനഗരയിൽ സൂര്യോദയത്തോടെ തറിയുടെ നാദം തുടങ്ങുന്നു. തലമുറകളോളം മൃദുത്വവും തിളക്കവും നിലനിൽക്കുന്ന ശുദ്ധമായ പട്ട് സാരി."',
      artisanName: 'ഗൗരമ്മ & മഞ്ജുനാഥ്',
      artisanBio: 'രാമനഗര പട്ടുനഗരത്തിൽ നാല് തലമുറകളായി തറി നെയ്യുന്ന പ്രഗത്ഭരായ നെയ്ത്തുകാർ.',
      artisanLocation: 'രാമനഗര പട്ടുനഗരം',
      artisanRegion: 'കർണാടക സിൽക്ക് ബെൽറ്റ്',
    },
    'craft-2': {
      title: 'ചന്നപട്ന പരമ്പരാഗത അരക്ക് മരപ്പാവകൾ',
      provenanceStory: 'ചന്നപട്നയിലെ ആലെ മരത്തിൽ (ഐവറി വുഡ്) ലേത്തിൽ കടഞ്ഞെടുത്ത പ്രകൃതിദത്ത പാവകൾ. പ്രകൃതിദത്ത അരക്ക്, മഞ്ഞൾ, കുങ്കുമ ചായങ്ങൾ ഉപയോഗിച്ച് കുട്ടികൾക്കായി സുരക്ഷിതമായി നിർമ്മിച്ചത്.',
      materials: ['ആലെ മരം (ഐവറി വുഡ്)', 'പ്രകൃതിദത്ത അരക്ക്', 'മഞ്ഞൾ, കുങ്കുമ പ്രകൃതിദത്ത ചായങ്ങൾ'],
      originSteps: [
        { stage: 'മരം ഉണക്കൽ', description: 'വിള്ളൽ വീഴാതിരിക്കാൻ 60 ദിവസം തണലിൽ ഉണക്കുന്നു.' },
        { stage: 'ലേത്തിൽ രൂപപ്പെടുത്തൽ', description: 'പരമ്പരാഗത ലേത്തിൽ കൈകൊണ്ട് രൂപം നൽകുന്നു.' },
        { stage: 'അരക്ക് ചായം പൂശൽ', description: 'ഉരസലിന്റെ ചൂടിൽ ഉരുകുന്ന പ്രകൃതിദത്ത അരക്ക് പൂശുന്നു.' },
        { stage: 'കൈതയോല പോളിഷ്', description: 'കൈതയോല ഉപയോഗിച്ച് തിളങ്ങുന്ന ഫിനിഷിംഗ് നൽകുന്നു.' },
      ],
      audioTitle: 'ചന്നപട്ന അരക്കും മരവും',
      audioTranscript: '"ഞങ്ങൾ രാസവസ്തുക്കൾ ഉപയോഗിക്കാറില്ല. ഈ പ്രകൃതിദത്ത കളിപ്പാട്ടങ്ങൾ കുട്ടികൾക്ക് തികച്ചും സുരക്ഷിതമാണ്."',
      artisanName: 'സയ്യിദ് നൂറുല്ല & പരമേഷ്',
      artisanBio: 'ചന്നപട്നയിലെ പ്രമുഖ മരപ്പാവ നിർമ്മാണ വിദഗ്ദ്ധർ.',
      artisanLocation: 'ചന്നപട്ന (കളിപ്പാട്ടങ്ങളുടെ നാട്)',
      artisanRegion: 'രാമനഗര ജില്ല, കർണാടക',
    },
    'craft-3': {
      title: 'ബിദ്രി ശുദ്ധമായ വെള്ളി കൊത്തുപണി കൂജയും പാത്രവും',
      provenanceStory: 'ബിദറിലെ 600 വർഷത്തെ ബഹ്മനി പാരമ്പര്യമുള്ള ലോഹശിൽപ്പകല. സിങ്ക്-ചെമ്പ് പാത്രത്തിൽ ശുദ്ധമായ 99.9% വെള്ളി കമ്പികൾ പതിപ്പിച്ച് ബിദർ കോട്ടയിലെ മണ്ണിൽ കറുപ്പ് നിറം നൽകുന്നു.',
      materials: ['സിങ്ക്, ചെമ്പ് മിശ്രലോഹം', '99.9% ശുദ്ധമായ വെള്ളി കമ്പി', 'ബിദർ കോട്ടയിലെ ചരിത്രപ്രസിദ്ധമായ മണ്ണ്'],
      originSteps: [
        { stage: 'മണൽ അച്ചിൽ വാർക്കൽ', description: 'മിശ്രലോഹം അച്ചിൽ വാർത്ത് മിനുസപ്പെടുത്തുന്നു.' },
        { stage: 'ഉളി കൊത്തുപണി', description: 'ഉളി ഉപയോഗിച്ച് പൂക്കളുടെ ഡിസൈനുകൾ കൊത്തുന്നു.' },
        { stage: 'വെള്ളി കമ്പി പതിപ്പിക്കൽ', description: 'കൈകൊണ്ട് വെള്ളി കമ്പികൾ ലോഹത്തിൽ പതിക്കുന്നു.' },
        { stage: 'കോട്ട മണ്ണിൽ കറുപ്പിക്കൽ', description: 'ബിദർ കോട്ടയിലെ മണ്ണിൽ തിളപ്പിച്ച് കറുപ്പ് നിറം നൽകുന്നു.' },
      ],
      audioTitle: 'ബിദർ മണ്ണും വെള്ളിയുടെ രസതന്ത്രവും',
      audioTranscript: '"കറുത്ത ലോഹത്തിന്മേൽ വെള്ളി തിളങ്ങുമ്പോൾ ഇരുണ്ട ആകാശത്തിൽ ചന്ദ്രൻ പ്രകാശിക്കുന്നത് പോലെ തോന്നും."',
      artisanName: 'റഷീദ് അഹമ്മദ് ഖാദ്രി',
      artisanBio: 'ബിദ്രി ലോഹകലയിൽ ദേശീയ അവാർഡ് ജേതാവ്.',
      artisanLocation: 'പഴയ കോട്ട, ബിദർ',
      artisanRegion: 'ഡെക്കാൻ ഹെറിറ്റേജ് ഇടനാഴി',
    },
    'craft-4': {
      title: 'ധാർവാഡ് കസൂതി കൈത്തയ്യൽ ചുവർ വസ്ത്രം',
      provenanceStory: 'ഗ്രാമീണ സ്ത്രീകൾ നൂലുകൾ എണ്ണി തുന്നിയ പരമ്പരാഗത കസൂതി കല. ക്ഷേത്ര രഥങ്ങളും മയിലുകളും.',
      materials: ['കൈത്തറി പരുത്തി തുണി', 'പട്ട് തയ്യൽ നൂലുകൾ', 'പ്രകൃതിദത്ത ഔഷധ ശുദ്ധീകരണം'],
      originSteps: [
        { stage: 'നൂലുകൾ എണ്ണൽ', description: 'പെൻസിൽ അടയാളങ്ങളില്ലാതെ കണ്ണുകൊണ്ട് നൂലുകൾ എണ്ണുന്നു.' },
        { stage: 'ഗവന്തി തുന്നൽ', description: 'മുൻവശവും പിൻവശവും ഒരേപോലെ കാണത്തക്കവിധം തുന്നുന്നു.' },
        { stage: 'ക്ഷേത്ര ഗോപുര തുന്നൽ', description: 'ക്ഷേത്ര രഥങ്ങളുടെ സൂക്ഷ്മമായ തുന്നൽ.' },
      ],
      audioTitle: 'കസൂതി നൂലുകളുടെ കണക്കുകൾ',
      audioTranscript: '"കസൂതിയിൽ കെട്ടുകൾ ഉണ്ടാകില്ല. തുണി മറിച്ചു നോക്കിയാലും മുൻവശം പോലെ തന്നെ മനോഹരമായിരിക്കും."',
      artisanName: 'കമലമ്മ & ശാന്താ ബായ്',
      artisanBio: 'ഉത്തര കർണാടകത്തിൽ ഗ്രാമീണ സ്ത്രീകൾക്ക് തൊഴിൽ നൽകുന്ന കരകൗശല സംഘം.',
      artisanLocation: 'ഇൽകൽ & ധാർവാഡ്',
      artisanRegion: 'ഉത്തര കർണാടക കൈത്തറി സംഘം',
    },
    'craft-5': {
      title: 'മൈസൂർ ചന്ദനമരം & ഈട്ടിത്തടി കൊത്തുപണി പെട്ടി',
      provenanceStory: 'മൈസൂർ കൊട്ടാര പാരമ്പര്യത്തിൽ കൊത്തിയെടുത്തത്. സുഗന്ധമുള്ള ചന്ദനമരത്തിലും ഈട്ടിത്തടിയിലും തീർത്ത ആനകളുടെ ജാലി കൊത്തുപണി.',
      materials: ['കർണാടക ചന്ദനമരം', 'മൈസൂർ ഈട്ടിത്തടി', 'പ്രകൃതിദത്ത തേനീച്ച മെഴുക് പോളിഷ്'],
      originSteps: [
        { stage: 'തടി തിരഞ്ഞെടുക്കൽ', description: 'ഈട്ടിത്തടി പലകകളുടെ കൃത്യമായ ചേർച്ച.' },
        { stage: 'ജാലി കൊത്തുപണി', description: 'ആനകളുടെ ജാഥയുടെ സൂക്ഷ്മമായ കൊത്തുപണി.' },
        { stage: 'ചന്ദനപ്പലക ചേർക്കൽ', description: 'സുഗന്ധത്തിനായി ചന്ദനപ്പലകകൾ ഘടിപ്പിക്കുന്നു.' },
        { stage: 'തേനീച്ച മെഴുക് പോളിഷ്', description: 'സുഗന്ധം നഷ്ടപ്പെടാതെ തേനീച്ച മെഴുക് ഉപയോഗിച്ച് തിളക്കം നൽകുന്നു.' },
      ],
      audioTitle: 'വിശുദ്ധ ചന്ദനത്തിന്റെ സുഗന്ധം',
      audioTranscript: '"കർണാടക ചന്ദനമരം അമ്പത് വർഷങ്ങൾക്ക് ശേഷവും അതേ സുഗന്ധം പരത്തും."',
      artisanName: 'നാരായണ ആചാര്യ',
      artisanBio: 'മൈസൂർ കൊട്ടാര പാരമ്പര്യ തടി കൊത്തുപണി വിദഗ്ദ്ധൻ.',
      artisanLocation: 'മൈസൂർ കൊട്ടാര റോഡ്',
      artisanRegion: 'മൈസൂർ സാംസ്കാരിക മേഖല',
    },
    'craft-6': {
      title: 'പ്രകൃതിദത്ത ചുവന്ന കളിമൺ തണുപ്പ് വെള്ള കൂജയും കുടവും',
      provenanceStory: 'രാമനഗര തടാകത്തിലെ ചുവന്ന കളിമണ്ണിൽ ചക്രത്തിൽ നിർമ്മിച്ച് തടി പലക കൊണ്ട് തട്ടി ഉറപ്പിച്ച കൂജ. വെള്ളം പ്രകൃതിദത്തമായി തണുപ്പിക്കുകയും ക്ഷാരഗുണമുള്ളതാക്കുകയും ചെയ്യുന്നു.',
      materials: ['ചുവന്ന കളിമണ്ണ്', 'നദീതീര ക്വാർട്സ് പോളിഷ്', 'ഉമി തീയിൽ ചുട്ടെടുക്കൽ'],
      originSteps: [
        { stage: 'മണ്ണ് പരുവപ്പെടുത്തൽ', description: 'മണ്ണ് വെള്ളത്തിൽ കുതിർത്ത് അരിച്ചെടുക്കുന്നു.' },
        { stage: 'ചക്രത്തിൽ ഉണ്ടാക്കൽ', description: 'ചക്രത്തിൽ തിരിച്ച് തടി കൊണ്ട് തട്ടി ബലപ്പെടുത്തുന്നു.' },
        { stage: 'ഉമി തീയിൽ ചുട്ടെടുക്കൽ', description: 'നെല്ലിന്റെ ഉമി തീയിൽ സാവധാനം ചുട്ടെടുക്കുന്നു.' },
      ],
      audioTitle: 'കളിമൺ കുടത്തിന്റെ തണുത്ത സ്പർശം',
      audioTranscript: '"മൺകുടത്തിൽ വെള്ളമൊഴിക്കുമ്പോൾ പ്രകൃതി ഉണരുന്നു. വൈദ്യുതിയില്ലാതെ വെള്ളം തണുപ്പുള്ളതാക്കി മാറ്റും."',
      artisanName: 'ബസവരാജു കുംഭാർ',
      artisanBio: 'പോട്ടറി ടൗണിൽ 40 വർഷമായി മൺപാത്രങ്ങൾ നിർമ്മിക്കുന്ന മുതിർന്ന കുശവൻ.',
      artisanLocation: 'പോട്ടറി ടൗൺ',
      artisanRegion: 'ബാംഗ്ലൂർ കുശവ സംഘം',
    },
  },
};

const SELLER_PRODUCT_TRANSLATIONS: Record<AppLanguage, Record<string, LocalizedSellerFields>> = {
  en: {
    'art-prod-1': {
      name: 'Channapatna Hand-turned Lacquerware Dancing Doll',
      material: 'Natural Ivory Wood (Aale Mara) & Organic Lac',
      craftType: 'Traditional Lathe Turning & Vegetable Dye Lacquer',
      description: 'Authentic Channapatna wooden figurine turned on high-speed lathes from seasoned ivory wood. Colored with 100% natural organic lac and vegetable dyes for non-toxic, child-safe enjoyment.',
      tags: ['Channapatna', 'Wooden Toys', 'Organic Lac', 'GI Tagged', 'Handmade'],
    },
    'art-prod-2': {
      name: 'Ramanagara Pure Mulberry Raw Silk Handloom Stole',
      material: '100% Ramanagara Raw Mulberry Silk Yarn',
      craftType: 'Traditional Handloom Pit-Weaving with Zari Border',
      description: 'Lustrous raw silk stole hand-reeled from premium Ramanagara bivoltine cocoons. Dyed with botanical plant extracts and woven on wooden pit looms with subtle zari selvedges.',
      tags: ['Ramanagara Silk', 'Pure Silk', 'Handloom', 'Natural Dye', 'Heritage'],
    },
    'art-prod-3': {
      name: 'Bidriware Pure Silver Inlaid Floral Coaster Set',
      material: 'Zinc-Copper Alloy & 99.9% Pure Fine Silver Wire',
      craftType: 'Hand Inlay Tarkashi with Bidar Fort Soil Oxidation',
      description: 'Exquisite 4-piece coaster set handcrafted by Bidar metal artisans. Inlaid with pure silver arabesques and oxidized to velvet black using historic Bidar Fort soil.',
      tags: ['Bidriware', 'Silver Inlay', 'Bidar Metal', 'GI Craft', 'Handmade'],
    },
    'art-prod-4': {
      name: 'Dharwad Kasuti Hand-Embroidered Wall Hanging',
      material: 'Handwoven Cotton Base & Resham Embroidery Floss',
      craftType: 'Count-Thread Kasuti Hand Needlework (Gavanti & Murgi)',
      description: 'Traditional North Karnataka wall tapestry depicting sacred temple chariots and peacocks, hand-stitched thread by thread without frames by rural women artisans.',
      tags: ['Kasuti', 'Hand Embroidery', 'Dharwad', 'Heritage Textile', 'Zero Frame'],
    },
    'art-prod-5': {
      name: 'Mysore Sandalwood Hand-Carved Aromatic Idol',
      material: 'Aromatic Karnataka Sandalwood & Beeswax',
      craftType: 'Chisel Carving with Natural Beeswax Buff',
      description: 'Heirloom idol sculpted from ethically certified Karnataka sandalwood heartwood. Preserves the sacred, long-lasting natural aroma for decades without synthetic perfumes.',
      tags: ['Mysore Sandalwood', 'Wood Carving', 'Natural Aroma', 'Spiritual', 'Heirloom'],
    },
    'art-prod-6': {
      name: 'Pottery Town Hand-Coiled Terracotta Alkaline Water Jug',
      material: 'Natural Red Alluvial Lakebed Clay',
      craftType: 'Kick-Wheel Throwing, Mallet Beating & Open Husk Kiln',
      description: 'Natural porous red terracotta water jar handcrafted in Pottery Town. Naturally chills drinking water through evaporative cooling and enriches it with essential alkaline minerals.',
      tags: ['Terracotta', 'Water Cooler', 'Pottery Town', 'Natural Cooling', 'Eco-friendly'],
    },
  },
  hi: {
    'art-prod-1': {
      name: 'चन्नपटना हाथ से तराशी लाख-लकड़ी नृत्य गुड़िया',
      material: 'प्राकृतिक आइवरी वुड (आले मारा) और जैविक लाख',
      craftType: 'पारंपरिक खराद और वनस्पति लाख रंग',
      description: 'चन्नपटना की प्रामाणिक लकड़ी की गुड़िया, जिसे गैर-विषाक्त और बच्चों के लिए सुरक्षित प्राकृतिक लाख से रंगा गया है।',
      tags: ['चन्नपटना', 'लकड़ी के खिलौने', 'जैविक लाख', 'जीआई टैग', 'हस्तनिर्मित'],
    },
    'art-prod-2': {
      name: 'रामनगर शुद्ध शहतूत कच्चा रेशम हथकरघा स्टोल',
      material: '100% रामनगर शहतूत कच्चा रेशम',
      craftType: 'पारंपरिक हथकरघा बुनाई और ज़री बॉर्डर',
      description: 'रामनगर के कोकून से काता गया चमकदार रेशमी स्टोल, प्राकृतिक वनस्पति रंगों से रंगा हुआ।',
      tags: ['रामनगर रेशम', 'शुद्ध रेशम', 'हथकरघा', 'प्राकृतिक रंग', 'विरासत'],
    },
    'art-prod-3': {
      name: 'बीदर बिदरीवेयर शुद्ध चांदी जड़ा कोस्टर सेट',
      material: 'जिंक-कॉपर मिश्र धातु और 99.9% शुद्ध चांदी का तार',
      craftType: 'हस्तनिर्मित तारकशी और बीदर किले की मिट्टी से रंगाई',
      description: 'बीदर के कारीगरों द्वारा शुद्ध चांदी के फूलों के साथ जड़ा हुआ 4-पीस कोस्टर सेट।',
      tags: ['बिदरीवेयर', 'चांदी की जड़ाई', 'बीदर धातु', 'जीआई शिल्प', 'हस्तनिर्मित'],
    },
    'art-prod-4': {
      name: 'धारवाड़ कसूती हाथ की कढ़ाई वाली दीवार पट्टी',
      material: 'हाथ से बुना सूती कपड़ा और रेशमी कढ़ाई धागा',
      craftType: 'धागा गिनकर की गई कसूती सुईवर्क (गवंती और मुर्गी)',
      description: 'उत्तर कर्नाटक की पारंपरिक दीवार पेंटिंग जिसमें मंदिर रथ और मोर की हाथ से कढ़ाई की गई है।',
      tags: ['कसूती', 'हाथ की कढ़ाई', 'धारवाड़', 'विरासत कपड़ा', 'हस्तनिर्मित'],
    },
    'art-prod-5': {
      name: 'मैसूर चंदन हाथ से तराशी सुगंधित मूर्ति',
      material: 'सुगंधित कर्नाटक चंदन और मधुमक्खी मोम',
      craftType: 'छेनी से नक्काशी और प्राकृतिक मोम पॉलिश',
      description: 'कर्नाटक के असली चंदन से तराशी गई मूर्ति जो दशकों तक दिव्य सुगंध बनाए रखती है।',
      tags: ['मैसूर चंदन', 'लकड़ी की नक्काशी', 'प्राकृतिक सुगंध', 'आध्यात्मिक', 'विरासत'],
    },
    'art-prod-6': {
      name: 'पॉटरी टाउन हाथ से बना टेराकोटा क्षारीय पानी का जग',
      material: 'प्राकृतिक लाल जलोढ़ मिट्टी',
      craftType: 'चाक पर ढलाई, लकड़ी के मुंगर से कुटाई और भूसे की भट्टी',
      description: 'प्राकृतिक रूप से पानी को ठंडा और क्षारीय रखने वाला प्रामाणिक टेराकोटा पानी का बर्तन।',
      tags: ['टेराकोटा', 'वाटर कूलर', 'पॉटरी टाउन', 'प्राकृतिक ठंडक', 'पर्यावरण अनुकूल'],
    },
  },
  kn: {
    'art-prod-1': {
      name: 'ಚನ್ನಪಟ್ಟಣ ಸಾಂಪ್ರದಾಯಿಕ ಲಾಕರ್‌ವೇರ್ ನೃತ್ಯ ಬೊಂಬೆ',
      material: 'ನೈಸರ್ಗಿಕ ಆಲೆ ಮರ (ಐವರಿ ವುಡ್) & ಸಾವಯವ ಅರಗು',
      craftType: 'ಸಾಂಪ್ರದಾಯಿಕ ಲೇತ್ ಕಡೆಯುವಿಕೆ & ತರಕಾರಿ ಬಣ್ಣದ ಲಾಕರ್',
      description: 'ಚನ್ನಪಟ್ಟಣದ ನೈಸರ್ಗಿಕ ಆಲೆ ಮರದಿಂದ ಮಾಡಿದ ಮಕ್ಕಳಿಗೆ ಸುರಕ್ಷಿತವಾದ ಲಾಕರ್ ಬೊಂಬೆ.',
      tags: ['ಚನ್ನಪಟ್ಟಣ', 'ಮರದ ಬೊಂಬೆಗಳು', 'ನೈಸರ್ಗಿಕ ಅರಗು', 'ಜಿಐ ಟ್ಯಾಗ್', 'ಕೈಯಿಂದ ಮಾಡಿದ್ದು'],
    },
    'art-prod-2': {
      name: 'ರಾಮನಗರ ಶುದ್ಧ ಹಿಪ್ಪುನೇರಳೆ ಕಚ್ಚಾ ರೇಷ್ಮೆ ಶಾಲು (ಸ್ಟೋಲ್)',
      material: '100% ರಾಮನಗರ ಹಿಪ್ಪುನೇರಳೆ ರೇಷ್ಮೆ ನೂಲು',
      craftType: 'ಸಾಂಪ್ರದಾಯಿಕ ಕುಳಿ ಮಗ್ಗ ನೇಯ್ಗೆ & ಜರಿ ಅಂಚು',
      description: 'ರಾಮನಗರದ ರೇಷ್ಮೆ ಗೂಡುಗಳಿಂದ ತೆಗೆದ ನೈಸರ್ಗಿಕ ಬಣ್ಣದ ಶುದ್ಧ ಕೈಮಗ್ಗದ ರೇಷ್ಮೆ ಶಾಲು.',
      tags: ['ರಾಮನಗರ ರೇಷ್ಮೆ', 'ಶುದ್ಧ ರೇಷ್ಮೆ', 'ಕೈಮಗ್ಗ', 'ನೈಸರ್ಗಿಕ ಬಣ್ಣ', 'ಪಾರಂಪರಿಕ'],
    },
    'art-prod-3': {
      name: 'ಬಿದರಿ ಶುದ್ಧ ಬೆಳ್ಳಿ ನಕ್ಷೆಯ ಕೋಸ್ಟರ್ ಸೆಟ್ (4 ಪೀಸ್)',
      material: 'ಸತು-ತಾಮ್ರದ ಮಿಶ್ರಲೋಹ & 99.9% ಶುದ್ಧ ಬೆಳ್ಳಿ ತಂತಿ',
      craftType: 'ಕೈಯಿಂದ ಬೆಳ್ಳಿ ತಂತಿ ಜಡಿತ & ಕೋಟೆ ಮಣ್ಣಿನ ಸಂಸ್ಕರಣೆ',
      description: 'ಬಿದರ್ ಲೋಹ ಕುಶಲಕರ್ಮಿಗಳು ಶುದ್ಧ ಬೆಳ್ಳಿ ತಂತಿಯಿಂದ ಕೆತ್ತಿದ 4 ಪೀಸ್ ಕೋಸ್ಟರ್ ಸೆಟ್.',
      tags: ['ಬಿದರಿ ಕಲೆ', 'ಬೆಳ್ಳಿ ಜಡಿತ', 'ಬಿದರ್ ಮೆಟಲ್', 'ಜಿಐ ಕಲೆ', 'ಹಸ್ತಕೆತ್ತನೆ'],
    },
    'art-prod-4': {
      name: 'ಧಾರವಾಡ ಕಸೂತಿ ಕೈ ಕಸೂತಿಯ ಕಲಾತ್ಮಕ ಗೋಡೆ ವಸ್ತ್ರ',
      material: 'ಕೈಮಗ್ಗದ ಹತ್ತಿ ಬಟ್ಟೆ & ರೇಷ್ಮೆ ಕಸೂತಿ ದಾರ',
      craftType: 'ಎಳೆ ಎಣಿಸಿ ಹೊಲಿದ ಕಸೂತಿ (ಗವಂತಿ & ಮುರ್ಗಿ ಹೊಲಿಗೆ)',
      description: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರು ಕೈಯಿಂದ ನೇಯ್ದ ಪವಿತ್ರ ದೇಗುಲ ರಥದ ಗೋಡೆ ವಸ್ತ್ರ.',
      tags: ['ಕಸೂತಿ', 'ಕೈ ಕಸೂತಿ', 'ಧಾರವಾಡ', 'ಪಾರಂಪರಿಕ ವಸ್ತ್ರ', 'ಕೈಮಗ್ಗ'],
    },
    'art-prod-5': {
      name: 'ಮೈಸೂರು ಸುಗಂಧಿತ ಶ್ರೀಗಂಧದ ಕೈಕೆತ್ತನೆಯ ವಿಗ್ರಹ',
      material: 'ಕರ್ನಾಟಕದ ಅಪ್ಪಟ ಶ್ರೀಗಂಧ & ನೈಸರ್ಗಿಕ ಜೇನುಮೇಣ',
      craftType: 'ಉಳಿಯಿಂದ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆ & ಜೇನುಮೇಣದ ಪಾಲಿಶ್',
      description: 'ಕರ್ನಾಟಕದ ಸುಗಂಧಿತ ಶ್ರೀಗಂಧದಲ್ಲಿ ಕೆತ್ತಿದ, ದಶಕಗಳ ಕಾಲ ಸುವಾಸನೆ ಬೀರುವ ಪವಿತ್ರ ವಿಗ್ರಹ.',
      tags: ['ಮೈಸೂರು ಶ್ರೀಗಂಧ', 'ಮರದ ಕೆತ್ತನೆ', 'ನೈಸರ್ಗಿಕ ಸುಗಂಧ', 'ಧಾರ್ಮಿಕ', 'ಪಾರಂಪರಿಕ'],
    },
    'art-prod-6': {
      name: 'ಪಾಟ್ರಿ ಟೌನ್ ಕೆಂಪು ಮಣ್ಣಿನ ತಂಪು ನೀರಿನ ಕೂಜಾ',
      material: 'ಕೆರೆಯ ನೈಸರ್ಗಿಕ ಕೆಂಪು ಜೇಡಿಮಣ್ಣು',
      craftType: 'ಕುಂಬಾರರ ಚಕ್ರ, ತಟ್ಟೆಯಿಂದ ಬಡಿತ & ಹೊಟ್ಟಿನ ಬೆಂಕಿ ಬೇಯಿಸುವಿಕೆ',
      description: 'ವಿದ್ಯುತ್ ಇಲ್ಲದೆ ನೀರನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ತಂಪಾಗಿಸುವ ಮತ್ತು ಕ್ಷಾರೀಯಗೊಳಿಸುವ ಕೆಂಪು ಮಣ್ಣಿನ ಕೂಜಾ.',
      tags: ['ಮಣ್ಣಿನ ಮಡಕೆ', 'ತಂಪು ಕೂಜಾ', 'ಪಾಟ್ರಿ ಟೌನ್', 'ನೈಸರ್ಗಿಕ ತಂಪು', 'ಪರಿಸರಸ್ನೇಹಿ'],
    },
  },
  te: {
    'art-prod-1': {
      name: 'చన్నపట్న సాంప్రదాయ లక్క చెక్క నాట్య బొమ్మ',
      material: 'సహజ ఆలె చెక్క & సహజ లక్క జిగురు',
      craftType: 'లేత్‌పై చెక్కడము & సహజ రంగుల అద్దకం',
      description: 'పిల్లల కోసం సురక్షితమైన సహజ రంగులతో రూపొందించిన చన్నపట్న చెక్క బొమ్మ.',
      tags: ['చన్నపట్న', 'చెక్క బొమ్మలు', 'సహజ లక్క', 'జీఐ ట్యాగ్', 'చేతితో చేసినది'],
    },
    'art-prod-2': {
      name: 'రామనగర స్వచ్ఛమైన పట్టు చేనేత శాలువా',
      material: '100% రామనగర మల్బరీ పట్టు నూలు',
      craftType: 'సాంప్రదాయ మగ్గం నేత & జరీ అంచు',
      description: 'రామనగర పట్టు గూళ్ల నుంచి తీసిన సహజ రంగుల పట్టు శాలువా.',
      tags: ['రామనగర పట్టు', 'స్వచ్ఛమైన పట్టు', 'చేనేత', 'సహజ రంగు', 'సాంప్రదాయక'],
    },
    'art-prod-3': {
      name: 'బిద్రి స్వచ్ఛమైన వెండి చెక్కడపు కోస్టర్ సెట్',
      material: 'జింక్-రాగి మిశ్రమం & 99.9% స్వచ్ఛమైన వెండి తీగ',
      craftType: 'చేతితో వెండి తీగ పొదగడం & కోట మట్టి రంగు',
      description: 'బిదర్ కళాకారులు స్వచ్ఛమైన వెండితో చెక్కిన 4 కోస్టర్ల సమితి.',
      tags: ['బిద్రి క్రాఫ్ట్', 'వెండి పొదుగు', 'బిదర్ లోహం', 'జీఐ క్రాఫ్ట్', 'చేతిపని'],
    },
    'art-prod-4': {
      name: 'ధార్వాడ్ కసూతి చేతి ఎంబ్రాయిడరీ గోడ వస్త్రం',
      material: 'చేనేత కాటన్ వస్త్రం & సిల్క్ ఎంబ్రాయిడరీ దారాలు',
      craftType: 'దారాలు లెక్కించి కుట్టిన కసూతి కుట్టుపని',
      description: 'ఉత్తర కర్ణాటక మహిళలు చేతితో కుట్టిన ఆలయ రథం గోడ వస్త్రం.',
      tags: ['కసూతి', 'చేతి ఎంబ్రాయిడరీ', 'ధార్వాడ్', 'హెరిటేజ్ టెక్స్‌టైల్', 'చేనేత'],
    },
    'art-prod-5': {
      name: 'మైసూర్ సుగంధ గంధపు చెక్క విగ్రహం',
      material: 'కర్ణాటక గంధపు చెక్క & తేనెటీగల మైనం',
      craftType: 'ఉలితో చెక్కడం & మైనం పాలిష్',
      description: 'కర్ణాటక సుగంధ గంధపు చెక్కతో చెక్కిన పవిత్ర విగ్రహం.',
      tags: ['మైసూర్ గంధం', 'చెక్క చెక్కడం', 'సహజ సువాసన', 'ఆధ్యాత్మికం', 'సాంప్రదాయ'],
    },
    'art-prod-6': {
      name: 'పాటరీ టౌన్ ఎర్ర మట్టి నీటి కూజా',
      material: 'సహజ ఎర్ర బంకమట్టి',
      craftType: 'చక్రంపై తిప్పడం & పొట్టు మంటల్లో కాల్చడం',
      description: 'నీటిని సహజంగా చల్లబరిచే ఎర్ర మట్టి నీటి పాత్ర.',
      tags: ['టెర్రకోట', 'వాటర్ కూలర్', 'పాటరీ టౌన్', 'సహజ చల్లదనం', 'ఎకో ఫ్రెండ్లీ'],
    },
  },
  ta: {
    'art-prod-1': {
      name: 'சென்னப்பட்னா பாரம்பரிய அரக்கு மர நடன பொம்மை',
      material: 'இயற்கை ஆலே மரம் (ஐவரி வுட்) & இயற்கை அரக்கு',
      craftType: 'பாரம்பரிய லேத் கடைசல் & காய்கறி சாயம்',
      description: 'குழந்தைகளுக்கு 100% பாதுகாப்பான இயற்கை வண்ணங்களில் செய்யப்பட்ட சென்னப்பட்னா மர பொம்மை.',
      tags: ['சென்னப்பட்னா', 'மர பொம்மைகள்', 'இயற்கை அரக்கு', 'ஜிஐ குறியீடு', 'கையால் செய்யப்பட்டது'],
    },
    'art-prod-2': {
      name: 'ராமநகரா தூய பட்டு கைத்தறி துண்டு (ஸ்டோல்)',
      material: '100% ராமநகரா மல்பெரி பட்டு நூல்',
      craftType: 'பாரம்பரிய குழித்தறி நெசவு & ஜரி பார்டர்',
      description: 'ராமநகரா பட்டுக்கூடுகளிலிருந்து நூற்கப்பட்ட இயற்கை சாயமிட்ட தூய பட்டு துண்டு.',
      tags: ['ராமநகரா பட்டு', 'தூய பட்டு', 'கைத்தறி', 'இயற்கை சாயம்', 'பாரம்பரிய'],
    },
    'art-prod-3': {
      name: 'பிதார் பித்ரிவேர் தூய வெள்ளி கோஸ்டர் செட்',
      material: 'துத்தநாக-செம்பு கலவை & 99.9% தூய வெள்ளி கம்பி',
      craftType: 'கையால் வெள்ளி கம்பி பதித்தல் & கோட்டை மண் சாயம்',
      description: 'பிதார் உலோக கைவினைஞர்களால் தூய வெள்ளியால் செதுக்கப்பட்ட 4 துண்டுகள் கோஸ்டர் தொகுப்பு.',
      tags: ['பித்ரிவேர்', 'வெள்ளி வேலைப்பாடு', 'பிதார் உலோகம்', 'ஜிஐ கைவினை', 'கைவேலை'],
    },
    'art-prod-4': {
      name: 'தார்வாட் கசூதி கைத்தையல் சுவர் அலங்கார துணி',
      material: 'கைத்தறி பருத்தி துணி & பட்டு தையல் நூல்',
      craftType: 'நூல்களை எண்ணி தைத்த கசூதி தையல் (கவந்தி & முர்கி)',
      description: 'வட கர்நாடக பெண்கள் கையால் தைத்த பாரம்பரிய கோவில் தேர் சுவர் துணி.',
      tags: ['கசூதி', 'கைத்தையல்', 'தார்வாட்', 'பாரம்பரிய துணி', 'கைத்தறி'],
    },
    'art-prod-5': {
      name: 'மைசூர் சந்தன மரம் கைச்செதுக்கல் தெய்வீக சிலை',
      material: 'கர்நாடக நறுமண சந்தன மரம் & தேன்மெழுகு',
      craftType: 'உளியால் செதுக்குதல் & தேன்மெழுகு மெருகு',
      description: 'கர்நாடக சந்தன மரத்தில் செதுக்கப்பட்ட தலைமுறைகளுக்கும் நறுமணம் வீசும் புனித சிலை.',
      tags: ['மைசூர் சந்தனம்', 'மரச் செதுக்கல்', 'இயற்கை நறுமணம்', 'ஆன்மீகம்', 'பாரம்பரிய'],
    },
    'art-prod-6': {
      name: 'பாட்டரி டவுன் செம்மண் குளிர்ச்சி நீர் கூஜா',
      material: 'இயற்கை ஏரி செம்மண்',
      craftType: 'சக்கரத்தில் சுழற்றுதல், தட்டுதல் & உமி சூளையில் சுடுதல்',
      description: 'இயற்கையாக நீரை குளிர்ச்சியாகவும் ஆரோக்கியமாகவும் வைத்திருக்கும் செம்மண் கூஜா.',
      tags: ['மண் கூஜா', 'குளிர்ச்சி கூஜா', 'பாட்டரி டவுன்', 'இயற்கை குளிர்ச்சி', 'சுற்றுச்சூழல் நட்பு'],
    },
  },
  ml: {
    'art-prod-1': {
      name: 'ചന്നപട്ന പരമ്പരാഗത അരക്ക് മരപ്പാവ',
      material: 'ആലെ മരം (ഐവറി വുഡ്) & പ്രകൃതിദത്ത അരക്ക്',
      craftType: 'ലേത്തിൽ കടഞ്ഞെടുത്തത് & പ്രകൃതിദത്ത അരക്ക് ചായം',
      description: 'കുട്ടികൾക്ക് തികച്ചും സുരക്ഷിതമായ പ്രകൃതിദത്ത ചായങ്ങളിൽ തീർത്ത ചന്നപട്ന മരപ്പാവ.',
      tags: ['ചന്നപട്ന', 'മരപ്പാവകൾ', 'പ്രകൃതിദത്ത അരക്ക്', 'ജിഐ ടാഗ്', 'കൈകൊണ്ട് നിർമ്മിച്ചത്'],
    },
    'art-prod-2': {
      name: 'രാമനഗര ശുദ്ധ പട്ട് കൈത്തറി ഷോൾ (സ്റ്റോൾ)',
      material: '100% രാമനഗര മൾബറി പട്ടുനൂൽ',
      craftType: 'പരമ്പരാഗത തറി നെയ്ത്ത് & സരി ബോർഡർ',
      description: 'രാമനഗര പട്ടുനൂലിൽ തീർത്ത പ്രകൃതിദത്ത ചായം പൂശിയ ശുദ്ധ പട്ട് ഷോൾ.',
      tags: ['രാമനഗര പട്ട്', 'ശുദ്ധ പട്ട്', 'കൈത്തറി', 'പ്രകൃതിദത്ത ചായം', 'പൈതൃകം'],
    },
    'art-prod-3': {
      name: 'ബിദ്രി ശുദ്ധമായ വെള്ളി കൊത്തുപണി കോസ്റ്റർ സെറ്റ്',
      material: 'സിങ്ക്-ചെമ്പ് മിശ്രലോഹം & 99.9% ശുദ്ധമായ വെള്ളി കമ്പി',
      craftType: 'കൈകൊണ്ട് വെള്ളി കമ്പി പതിപ്പിക്കൽ & കോട്ട മണ്ണിൽ കറുപ്പിക്കൽ',
      description: 'ബിദർ ശിൽപ്പികൾ ശുദ്ധമായ വെള്ളിയിൽ കൊത്തിയെടുത്ത 4 കോസ്റ്ററുകളുടെ കൂട്ടം.',
      tags: ['ബിദ്രി ക്രാഫ്റ്റ്', 'വെള്ളി കൊത്തുപണി', 'ബിദർ ലോഹം', 'ജിഐ ക്രാഫ്റ്റ്', 'കൈവേല'],
    },
    'art-prod-4': {
      name: 'ധാർവാഡ് കസൂതി കൈത്തയ്യൽ ചുവർ വസ്ത്രം',
      material: 'കൈത്തറി പരുത്തി തുണി & പട്ട് തയ്യൽ നൂൽ',
      craftType: 'നൂലുകൾ എണ്ണി തുന്നിയ കസൂതി തയ്യൽ',
      description: 'ഉത്തര കർണാടക സ്ത്രീകൾ കൈകൊണ്ട് തുന്നിയ ക്ഷേത്ര രഥ ചുവർ വസ്ത്രം.',
      tags: ['കസൂതി', 'കൈത്തയ്യൽ', 'ധാർവാഡ്', 'പൈതൃക വസ്ത്രം', 'കൈത്തറി'],
    },
    'art-prod-5': {
      name: 'മൈസൂർ ചന്ദനമരം കൊത്തുപണി വിഗ്രഹം',
      material: 'കർണാടക ചന്ദനമരം & തേനീച്ച മെഴുക്',
      craftType: 'ഉളി കൊത്തുപണി & തേനീച്ച മെഴുക് പോളിഷ്',
      description: 'കർണാടക ചന്ദനമരത്തിൽ കൊത്തിയെടുത്ത തലമുറകളോളം സുഗന്ധം പരത്തുന്ന വിശുദ്ധ വിഗ്രഹം.',
      tags: ['മൈസൂർ ചന്ദനം', 'മര കൊത്തുപണി', 'പ്രകൃതിദത്ത സുഗന്ധം', 'ആത്മീയത', 'പൈതൃകം'],
    },
    'art-prod-6': {
      name: 'പോട്ടറി ടൗൺ ചുവന്ന കളിമൺ തണുപ്പ് വെള്ള കൂജ',
      material: 'പ്രകൃതിദത്ത ചുവന്ന കളിമണ്ണ്',
      craftType: 'ചക്രത്തിൽ ഉണ്ടാക്കൽ, തട്ടി ബലപ്പെടുത്തൽ & ഉമി തീയിൽ ചുട്ടെടുക്കൽ',
      description: 'വൈദ്യുതിയില്ലാതെ ജലം തണുപ്പുള്ളതാക്കുന്ന ചുവന്ന കളിമൺ കൂജ.',
      tags: ['കളിമൺ കൂജ', 'തണുപ്പ് കൂജ', 'പോട്ടറി ടൗൺ', 'പ്രകൃതിദത്ത തണുപ്പ്', 'പരിസ്ഥിതി സൗഹൃദം'],
    },
  },
};

// Main dynamic translator helper for buyer items
export function getLocalizedCraft(craft: CraftItem, language: AppLanguage, t: any): CraftItem {
  const langPack = BUYER_PRODUCT_TRANSLATIONS[language] || BUYER_PRODUCT_TRANSLATIONS['en'];
  const local = langPack[craft.id];
  
  if (!local) {
    return {
      ...craft,
      category: translateCategory(craft.category, language, t) as any
    };
  }

  // Map steps with localized content
  const localizedSteps = craft.originSteps.map((step, idx) => {
    const localStep = local.originSteps[idx];
    return {
      ...step,
      stage: localStep ? localStep.stage : step.stage,
      description: localStep ? localStep.description : step.description
    };
  });

  // Map artisan with localized info
  const localizedArtisan = {
    ...craft.artisan,
    name: local.artisanName || craft.artisan.name,
    bio: local.artisanBio || craft.artisan.bio,
    location: local.artisanLocation || craft.artisan.location,
    region: local.artisanRegion || craft.artisan.region
  };

  return {
    ...craft,
    title: local.title || craft.title,
    category: translateCategory(craft.category, language, t) as any,
    materials: local.materials || craft.materials,
    provenanceStory: local.provenanceStory || craft.provenanceStory,
    originSteps: localizedSteps,
    artisan: localizedArtisan,
    audioStory: {
      ...craft.audioStory,
      title: local.audioTitle || craft.audioStory.title,
      transcript: local.audioTranscript || craft.audioStory.transcript,
      artisanName: local.artisanName || craft.audioStory.artisanName
    }
  };
}

// Main dynamic translator helper for seller items (ArtisanProduct)
export function getLocalizedArtisanProduct(product: ArtisanProduct, language: AppLanguage, t: any): ArtisanProduct {
  const langPack = SELLER_PRODUCT_TRANSLATIONS[language] || SELLER_PRODUCT_TRANSLATIONS['en'];
  const local = langPack[product.id];

  if (!local) {
    return {
      ...product,
      category: translateCategory(product.category, language, t)
    };
  }

  return {
    ...product,
    name: local.name || product.name,
    category: translateCategory(product.category, language, t),
    material: local.material || product.material,
    craftType: local.craftType || product.craftType,
    description: local.description || product.description,
    tags: local.tags || product.tags
  };
}
