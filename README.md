# Next Farm Bio Sciences — Aquaculture Biotechnology Platform 🦐🌿

> **High-Performance Aquaculture Probiotics, Mineral Formulations & Diagnostic Intelligence**  
> Serving Andhra Pradesh, Telangana, Tamil Nadu, and coastal aquaculture hubs across India.  
> 🏢 Head Office: Vijayawada, Andhra Pradesh, India.  
> 📞 WhatsApp Helpline: [+91 8977656444](https://wa.me/918977656444) | 🤖 Live Order Telegram Bot: [@nextfarmbiosciencessurya_bot](https://t.me/nextfarmbiosciencessurya_bot)

---

## 🌟 Executive Summary

Next Farm Bio Sciences is an Indian aquaculture biotechnology innovator manufacturing advanced bio-solutions for shrimp (*Litopenaeus vannamei*, *Penaeus monodon*) and fish culture. 

This platform provides:
1. **Mobile-First High-Speed Storefront:** Direct access to all 11 core clinical formulations with transparent pricing and 1-tap ordering.
2. **"Pond Doctor" Diagnostic Engine:** Interactive symptom diagnosis (White Gut, Toxic Ammonia, Benthic Sludge, Vibrio, Molt Cramps) with dynamic acreage/depth dosage calculation and 1-click bundle purchase.
3. **Frictionless Zero-OTP Pre-Paid Checkout:** Streamlined 3-field checkout (Farmer Name, WhatsApp Mobile, Village/Mandal) with browser auto-fill for returning farmers.
4. **Strict Pre-Paid Policy (Zero COD):** 100% pre-paid via Razorpay (UPI, GPay, PhonePe, Cards) with edge-native Web Crypto HMAC verification.
5. **Real-Time Audible Merchant Alerts:** Instant push notification with sound to the merchant's Telegram phone app upon payment confirmation, coupled with a 1-tap WhatsApp farmer callback button.
6. **AI Search Engine & AEO Optimization:** Native `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and Schema.org JSON-LD structured data for Google, Perplexity, GPTBot, and Claude.

---

## 📦 Product Catalog & Pricing Policy

All liquid probiotics and concentrates adhere to standardized transparent pricing:
- **5 Litre Commercial Cans:** ₹5,000
- **1 Litre Field Bottles:** ₹1,199

| S.No | Formulation | Primary Indication | Key Microbial / Chemical Strains | Pack Sizes |
|---|---|---|---|---|
| 1 | **Next Gut** | White Gut Disease, Gut Inflammation, Microvilli Repair | *Bacillus subtilis*, *Bacillus licheniformis*, *Lactobacillus acidophilus* (5B CFU/ml) | 5L / 1L |
| 2 | **Next Viro Nill** | Viral Biosecurity, Vibrio Suppression, Surface Tension Control | Synergistic Virucidal Phyto-extracts, Polyphenolic Bio-actives | 5L / 1L |
| 3 | **Next Converter** | Food Conversion Ratio (FCR) Enhancement, Protein Assimilation | Amylase, Protease, Cellulase, *Bacillus coagulans* | 5L / 1L |
| 4 | **Next Eco Bio Clean** | Benthic Black Sludge Degradation, Bottom Soil Oxidation | *Bacillus megaterium*, *Thiobacillus denitrificans*, *Nitrosomonas* | 5L / 1L |
| 5 | **Next F-Zone** | Fungal Spore Control, Gill Necrosis, Zoothamnium Prevention | Natural Antifungal Actives, Copper Peptide Complexes | 5L / 1L |
| 6 | **Next Grow Max** | Accelerated Juvenile & Adult Weight Gain, Molt Transition | Bio-available Peptides, Essential Amino Acids, Mineral Catalysts | 5L / 1L |
| 7 | **Next Oxy Fresh** | Hypoxia Emergency, Rapid Dissolved Oxygen (DO) Elevation | Stabilized Peroxygen Complexes, Catalytic Oxygen Donors | 5L / 1L |
| 8 | **Next Plankton Boom** | Natural Bloom Initiation, Zooplankton & Phytoplankton Stabilization | Micronutrient Chelates, Natural Algal Stimulants | 5L / 1L |
| 9 | **Next Quick Gas Nill** | Toxic Ammonia (NH3), Nitrite (NO2), Hydrogen Sulfide (H2S) Removal | *Nitrosomonas europaea*, *Nitrobacter winogradskyi*, High-Affinity Zeolite Actives | 5L / 1L |
| 10 | **Next Speed Mineral** | Soft Shell Syndrome, Molt Cramps, Osmotic Mineral Balance | Chelated Calcium, Magnesium, Potassium, Phosphorus, Zinc | 5L / 1L |
| 11 | **Next Super PS** | Photosynthetic Sludge Digestion, Anoxic Mud Odor Elimination | *Rhodobacter sphaeroides*, *Rhodopseudomonas palustris* (10B CFU/ml) | 5L / 1L |

---

## 🔬 Regulatory Compliance & Certifications

Every formulation manufactured by Next Farm Bio Sciences strictly complies with state and national aquaculture standards:
- 🛡️ **CAA Certified:** Approved by Coastal Aquaculture Authority (Government of India).
- 🏅 **ISO 9001:2015 Certified:** Quality Management System for biological culture and purity.
- 🚫 **100% Antibiotic-Free:** Zero banned chloramphenicol, nitrofuran, or unauthorized chemicals. Safe for export-oriented Vannamei shrimp crops.

---

## 🛠️ Architecture & Tech Stack

```mermaid
flowchart TD
    Client["Farmer Mobile Browser (PWA/Next.js 15)"] -->|Zero-OTP 3 Fields| Store["Storefront & Pond Doctor"]
    Store -->|Select Formulation / Bundle| Cart["Cart State (Persistent)"]
    Cart -->|Strict Pre-Paid Checkout| EdgeRoute["/api/checkout/create-order"]
    EdgeRoute -->|Reject COD (HTTP 400)| Block["Security Guard"]
    EdgeRoute -->|Create Razorpay Order| RZP["Razorpay Payment Gateway"]
    RZP -->|UPI / GPay / PhonePe / Card| Webhook["/api/checkout/verify-payment"]
    Webhook -->|Web Crypto HMAC SHA-256| Verify{"Valid Signature?"}
    Verify -->|No| Reject["403 Forbidden"]
    Verify -->|Yes| D1["Cloudflare D1 Database (#NF-XXXX)"]
    D1 --> Telegram["Telegram Bot (@nextfarmbiosciencessurya_bot)"]
    Telegram -->|Audible Alert| MerchantPhone["Merchant Mobile Notification"]
    D1 --> WhatsApp["1-Tap WhatsApp Link (+91 8977656444)"]
    WhatsApp --> FarmerChat["Instant Farmer Direct Chat"]
```

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons, Montserrat & Open Sans typography.
- **Runtime:** Edge Runtime / Cloudflare Pages Serverless Workers.
- **Database:** Cloudflare D1 SQL (`orders`, `order_items`, `customers`, `d1_sequence`).
- **Payment Gateway:** Razorpay Pre-Paid (Web Crypto W3C HMAC SHA-256 verification, zero mock bypasses).
- **Merchant Notifications:** Telegram Bot API (`disable_notification: false` audible sound alert) + WhatsApp direct chat protocol.
- **SEO / AEO Engine:** Dynamic robots.txt, sitemap.xml, llms.txt, and complete JSON-LD Structured Data.

---

## 🧪 Testing & Verification

The platform is fortified with an 80-test empirical verification suite covering:
1. **Tier 1 (Core Features):** Catalog pricing, regulatory badges, diagnostic engine, zero-OTP checkout, pre-paid payments, Telegram sound alerts, and SEO manifests.
2. **Tier 2 (Boundary & Corner Cases):** Non-standard price rejection, depth/acreage zero-boundary guards, 64-position HMAC single-byte mutation rejection, and HTML tag sanitization.
3. **Tier 3 (Pairwise Integration):** Full end-to-end flows from symptom diagnosis through cart modification, payment verification, D1 state change, and Telegram alert.
4. **Tier 4 (Farmer Scenarios):** Real-world farmer profiles across Krishna, West Godavari, Nellore, and Bapatla districts.
5. **Tier 5 (Adversarial Stress):** Edge Web Crypto HMAC stress test, multi-format Cash on Delivery rejection (`cod`, `cash_on_delivery`, `CASH_ON_DELIVERY`), and atomic `#NF-XXXX` sequence verification.

### Run Tests
```bash
# Run full 80-test E2E suite
npm test

# Run adversarial stress harness
npx tsx tests/empirical-challenger2.ts

# Run TypeScript type check
npm run type-check

# Run ESLint
npm run lint

# Run production build
npm run build
```

---

## 🚀 Deployment to Cloudflare Pages

### 1. Environment Variables Configuration
Configure the following environment variables in Cloudflare Pages dashboard or `.env.local`:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_BOT_TOKEN=8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### 2. Cloudflare D1 Database Provisioning
```bash
# Create Cloudflare D1 database
npx wrangler d1 create next-farm-db

# Apply SQL migrations
npx wrangler d1 execute next-farm-db --local --file=migrations/0001_initial_schema.sql
```

### 3. Build & Deploy
```bash
npm run pages:build
npx wrangler pages deploy .vercel/output/static
```

---

## 📞 Merchant & Customer Support
- **Support Hotline:** [+91 8977656444](https://wa.me/918977656444)
- **Telegram Alert Bot:** [@nextfarmbiosciencessurya_bot](https://t.me/nextfarmbiosciencessurya_bot)
- **Official Portal:** Next Farm Bio Sciences, Andhra Pradesh, India.
