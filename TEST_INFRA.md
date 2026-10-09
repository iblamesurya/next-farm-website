# Next Farm Bio Sciences - E2E Test Suite Infrastructure & Architecture

## 1. Test Philosophy & Testing Methodology

The Next Farm Bio Sciences testing infrastructure operates under a **Requirements-Driven, Opaque-Box Testing** paradigm. Rather than testing internal implementation artifacts or mocks that mirror implementation bugs, the test suite evaluates the platform against the strict behavioral contracts specified in `ORIGINAL_REQUEST.md` (R1 through R5) and `PROJECT.md`.

### Core Methodological Pillars
1. **Requirements-Driven Opaque-Box Execution**:
   Tests treat the platform as an opaque boundary, evaluating observable behaviors: HTTP status codes, JSON payload integrity, cryptographic HMAC signatures, dosage calculations, and SQL persistence.
2. **Authoritative Expected Output Derivation**:
   Every expected value is derived from authoritative project specifications:
   - **Catalog & Pricing**: `pomelli_export/catalog/catalog_products.md` and `PROJECT.md § Product Catalog`. Standard prices: Rs. 5,000 (5L Can) and Rs. 1,199 (1L Bottle).
   - **Diagnostic & Acreage Mathematics**: Volumetric formula $Q = \text{Acreage} \times (\text{Depth} / 1.0) \times R_{\text{base}} \times M_{\text{severity}}$ with economical 5L Can / 1L Bottle pack allocation.
   - **Payment Security**: W3C Web Crypto API (`crypto.subtle`) HMAC SHA-256 constant-time verification matching Cloudflare Pages Edge Runtime.
   - **Regulatory Compliance**: Coastal Aquaculture Authority (CAA) Approved, ISO 9001:2015, and 100% Antibiotic-Free certifications.
3. **Progressive Testability & Zero External Network Flakiness**:
   Tests run self-contained and isolated in Node.js 24 using native TypeScript execution (`strip-types`), without depending on flaky external networks or live merchant phones while validating real cryptographic and algorithmic truth.
4. **Adversarial & Boundary Verification**:
   The suite includes intentional attacks: 1-byte HMAC tampering, truncated signatures, wrong API secret keys, zero/negative pond depth, invalid Indian phone formats, and attempted Cash on Delivery bypasses.

---

## 2. Test Architecture & Directory Layout

```text
next-farm-website/
├── TEST_INFRA.md                    # This document: Architecture & feature coverage matrix
├── TEST_READY.md                    # Ready status, test counts, runner instructions
└── tests/
    └── e2e/
        ├── runner.ts                # Master CLI test runner with ANSI formatted reporting
        ├── framework.ts             # Zero-dependency test runner & matchers (describe, it, expect)
        ├── oracles/
        │   ├── catalog-oracle.ts    # Authoritative catalog data, 11 formulations, zero-LaTeX check
        │   ├── diagnostic-oracle.ts # Dynamic acreage & depth volume calculator & pack allocator
        │   ├── crypto-oracle.ts     # Native Web Crypto HMAC SHA-256 signer, verifier & tamperers
        │   ├── d1-mock-oracle.ts    # Cloudflare D1 SQL simulator with atomic #NF-XXXX sequencing
        │   ├── notification-oracle.ts # Telegram audible HTML payload & WhatsApp link validators
        │   └── seo-aeo-oracle.ts    # robots.txt, sitemap.xml, llms.txt & Schema.org JSON-LD validators
        ├── tier1-features.test.ts   # Tier 1: Feature Coverage (R1 to R5 acceptance criteria)
        ├── tier2-boundaries.test.ts # Tier 2: Boundary, Adversarial & Corner Cases
        ├── tier3-pairwise.test.ts   # Tier 3: Cross-Feature Pairwise Combinatorial Flows
        └── tier4-scenarios.test.ts  # Tier 4: Real-World Commercial Aqua Farmer Field Scenarios
```

---

## 3. Four-Tier Test Suite Breakdown

### Tier 1: Feature Coverage (28 Test Cases)
Verifies baseline happy paths and contractual expectations for each requirement:
- **R1 (Storefront & Catalog)**:
  - `R1.1`: Exactly 11 formulations exist with unique slugs.
  - `R1.2`: Pre-paid pricing: 5L @ Rs. 5,000 / 1L @ Rs. 1,199 across all products.
  - `R1.3`: Mandatory regulatory trust badges present (CAA Approved, ISO 9001:2015, 100% Antibiotic-Free).
  - `R1.4`: Strict 0 LaTeX syntax or broken math formatting in headlines, mechanisms, and dosage tables.
  - `R1.5`: Bacterial strains and CFU counts defined per clinical standard.
  - `R1.6`: Studio 1:1 packshots and downloadable spec sheet PDF paths validated.
- **R2 (Pond Doctor Diagnostic Engine)**:
  - `R2.1`: White Gut / White Feces maps to Next Gut (primary) + Next Viro Nill (support).
  - `R2.2`: Toxic Ammonia Spikes maps to Next Converter (primary) + Next Remedy (support).
  - `R2.3`: Benthic Sludge maps to Next Sludge (primary) + Next Pro Plus (support).
  - `R2.4`: Vibrio / Red Disease maps to Next Vibriosis (primary) + Next Viro Nill (support).
  - `R2.5`: Molting Cramps & Soft Shell maps to Next-Min (primary) + Next Softner (support).
  - `R2.6`: Depth-adjusted volumetric requirement calculation and 5L/1L pack allocation.
  - `R2.7`: 1-Click bundle generation creates valid `CartItem` arrays.
- **R3 (Pre-Paid Checkout & D1 Edge Storage)**:
  - `R3.1`: Zero-OTP 3-field customer identification (Full Name, WhatsApp Mobile, Village/Mandal).
  - `R3.2`: Strict Cash on Delivery (COD) rejection (`COD_NOT_PERMITTED`).
  - `R3.3`: Edge Web Crypto HMAC SHA-256 verification of authentic Razorpay payment proof.
  - `R3.4`: Cloudflare D1 atomic order sequence counter (`#NF-1001`, `#NF-1002`).
  - `R3.5`: Order persistence and status lifecycle transition from `PENDING` to `PAID`.
- **R4 (Merchant & Customer Notifications)**:
  - `R4.1`: Telegram message construction with `#NF-XXXX`, customer name, mobile, village, items, and total ₹.
  - `R4.2`: Audible ringtone alert enforcement (`disable_notification: false`).
  - `R4.3`: Balanced HTML formatting tags (`<b>`, `<a>`) in Telegram templates.
  - `R4.4`: Pre-filled WhatsApp link for merchant hotline (`+91 8977656444`).
  - `R4.5`: Telegram bot endpoint uses official token (`8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA`).
- **R5 (AEO & SEO Optimization Layer)**:
  - `R5.1`: `robots.txt` grants full crawl access to Googlebot, GPTBot, PerplexityBot, ClaudeBot.
  - `R5.2`: `sitemap.xml` indexes homepage, Pond Doctor, and all 11 formulation routes.
  - `R5.3`: `/llms.txt` semantic manifest provides treatment index for White Gut, Ammonia, and WSSV.
  - `R5.4`: `/llms-full.txt` provides deep clinical protocols across all 11 formulations.
  - `R5.5`: Schema.org JSON-LD structured data formats `Product`, `Offer`, and `VeterinaryBusiness`.

### Tier 2: Boundary, Adversarial & Corner Cases (28 Test Cases)
Stress tests boundary conditions, invalid inputs, and security violations:
- **R1 Boundaries**:
  - `R1-B1`: Non-standard or zero pricing rejected.
  - `R1-B2`: Uncertified formulation rejected if regulatory badge is missing/false.
  - `R1-B3`: Rejects LaTeX mathematical syntax in product copy.
  - `R1-B4`: Empty microbial strains array rejected.
  - `R1-B5`: Missing or empty CFU count rejected.
- **R2 Boundaries**:
  - `R2-B1`: Zero pond water depth ($0.0\text{m}$) throws validation error.
  - `R2-B2`: Negative pond water depth ($-0.5\text{m}$) throws validation error.
  - `R2-B3`: Zero pond acreage ($0.0\text{ ac}$) throws validation error.
  - `R2-B4`: Negative pond acreage ($-2.0\text{ ac}$) throws validation error.
  - `R2-B5`: Empty symptom selection array throws validation error.
  - `R2-B6`: Micro-acreage ($0.05\text{ ac}$ nursery tank) handled without NaN.
  - `R2-B7`: Macro-acreage ($500.0\text{ ac}$ corporate farm) computed without overflow.
- **R3 Boundaries**:
  - `R3-B1`: 1-byte tamper in Razorpay HMAC signature fails verification.
  - `R3-B2`: Truncated signature (<64 hex characters) rejected immediately.
  - `R3-B3`: Signature verified against wrong secret key fails.
  - `R3-B4`: Signature payload mutated (`orderId` or `paymentId` altered) fails.
  - `R3-B5`: Indian phone validation rejects empty, <10, >10, and alphabetic inputs.
  - `R3-B6`: Empty cart or 0/negative total rejected.
- **R4 Boundaries**:
  - `R4-B1`: Telegram HTML special characters (`<`, `>`, `&`) sanitized against injection.
  - `R4-B2`: Mismatched/unclosed HTML tags in message template flagged.
  - `R4-B3`: Silent notification (`disable_notification: true`) flagged as violation.
  - `R4-B4`: WhatsApp link safely URL-encodes special characters, spaces, and punctuation.
  - `R4-B5`: Missing chat ID or empty text rejected.
- **R5 Boundaries**:
  - `R5-B1`: `robots.txt` validator flags missing AI crawler rules.
  - `R5-B2`: Sitemap validator flags missing formulation routes.
  - `R5-B3`: `llms.txt` validator flags missing clinical disease keywords.
  - `R5-B4`: JSON-LD validator rejects invalid offer price or non-INR currency.
  - `R5-B5`: JSON-LD validator rejects structured data missing `VeterinaryBusiness`.

### Tier 3: Cross-Feature Pairwise Combinations (6 Test Cases)
Validates integrated state transitions across feature boundaries:
- `Pairwise 1`: White Gut (2.5 Ac, 1.2m) -> 1-Click Bundle -> Cart Modifier (+1 Can) -> Pre-Paid Checkout -> HMAC Verification -> D1 Persistence -> Telegram Audible Alert -> WhatsApp Link.
- `Pairwise 2`: Toxic Ammonia (4.0 Ac, 1.5m) -> 1-Click Bundle -> COD Payment Attempt Rejected -> Switch Pre-Paid -> HMAC Verification -> D1 Persistence.
- `Pairwise 3`: Benthic Sludge (1.0 Ac, 1.0m) -> 1-Click Bundle -> Item Removal -> Recomputed Subtotal -> Pre-Paid Flow.
- `Pairwise 4`: Vibrio Outbreak (3.0 Ac, 1.0m) -> Tampered HMAC Rejected -> Order Kept PENDING -> Resubmit Genuine HMAC -> Transition to PAID.
- `Pairwise 5`: Molting Cramps (5.0 Ac, 4.0 Ft) -> Feet-to-Meters Depth Conversion -> Mineral Allocation -> WhatsApp Contact Context.
- `Pairwise 6`: Multi-Symptom Complex (White Gut + Vibrio Red) -> 3-Product Synergistic Prescription (Next Gut + Next Vibriosis + Next Viro Nill) -> Full E2E Flow.

### Tier 4: Real-World Commercial Aqua Farmer Application Scenarios (5 Test Cases)
Validates end-to-end commercial field operations:
- `Scenario 1`: Farmer Ramesh Naidu (Krishna District) - 3-Acre Acute White Gut Outbreak on DOC 45 with feed drop -> Pond Doctor volumetric dose -> Pre-paid checkout -> D1 order `#NF-1001` -> Telegram audible alert -> 1-tap WhatsApp contact link.
- `Scenario 2`: Farmer Venkat Rao (West Godavari) - 2.5-Acre Deep Pond (1.5m) Ammonia & Black Mud Spike -> Dual-symptom prescription -> Reserve 5L can cart modifier -> COD rejection guard -> UPI pre-paid payment -> D1 paid order.
- `Scenario 3`: Farmer Subba Rao (Nellore) - 4-Acre Severe Vibrio Parahaemolyticus Outbreak (TCBS green colonies >150 CFU) -> Next Vibriosis emergency allocation -> Adversarial HMAC tampering detected & rejected -> Genuine authorization completed.
- `Scenario 4`: Farmer Prasad Varma (Bapatla) - 5-Acre Post-Rain Soft Shell & Molt Spasm Crisis (4.5 ft depth) -> Next-Min ionic mineral allocation -> Pre-paid payment verified -> WhatsApp technical helpline link verified.
- `Scenario 5`: Farm Manager Lakshmi (Corporate Aqua Farm) - 10-Acre Pre-Stocking Biosecurity & Zooplankton Bloom Setup -> Bulk 5L industrial can allocation -> Paise conversion -> Web Crypto verification -> D1 logging.

---

## 4. Feature Inventory Coverage Matrix

| Feature ID | Feature Name | Tier 1 Coverage | Tier 2 Coverage | Tier 3 Coverage | Tier 4 Coverage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F1** | Scaffolding & Tooling | R1.1, R1.2 | R1-B1 | PW 1, PW 2 | Scenarios 1-5 |
| **F2** | Brand System & Badges | R1.3, R1.6 | R1-B2 | PW 1 | Scenario 1 |
| **F3** | 11 Core Formulations | R1.1, R1.5 | R1-B4, R1-B5 | PW 1, PW 6 | Scenarios 1-5 |
| **F4** | Mobile Storefront & PDPs | R1.4, R1.6 | R1-B3 | PW 1 | Scenario 1 |
| **F5** | Pond Doctor Engine | R2.1 - R2.5 | R2-B5 | PW 1, PW 2, PW 6 | Scenarios 1, 2, 3 |
| **F6** | Acreage Calculator | R2.6 | R2-B1 to R2-B4, R2-B6, R2-B7 | PW 1, PW 5 | Scenarios 1, 2, 4, 5 |
| **F7** | 1-Click Bundles | R2.7 | R2-B6 | PW 1 to PW 6 | Scenarios 1 to 5 |
| **F8** | Persistent Cart Drawer | R3.1 | R3-B6 | PW 1, PW 3 | Scenarios 1, 2 |
| **F9** | Zero-OTP Checkout | R3.1 | R3-B5 | PW 1, PW 2 | Scenarios 1 to 5 |
| **F10** | Pre-Paid Gateway | R3.2 | R3-B6 | PW 2 | Scenarios 1, 2 |
| **F11** | Edge HMAC Verifier | R3.3 | R3-B1 to R3-B4 | PW 1, PW 4 | Scenarios 1 to 5 |
| **F12** | Cloudflare D1 Schema | R3.4, R3.5 | R3-B6 | PW 1 to PW 6 | Scenarios 1 to 5 |
| **F13** | Telegram Alerts | R4.1 - R4.3, R4.5 | R4-B1 to R4-B3, R4-B5 | PW 1 | Scenarios 1, 2 |
| **F14** | Pre-filled WhatsApp | R4.4 | R4-B4 | PW 1, PW 5 | Scenarios 1, 4 |
| **F15** | Order Success Page | R4.1, R4.4 | R4-B4 | PW 1 | Scenarios 1, 4 |
| **F16** | AI Crawler Access | R5.1 | R5-B1 | - | - |
| **F17** | Dynamic Sitemap | R5.2 | R5-B2 | - | - |
| **F18** | LLM Manifests | R5.3, R5.4 | R5-B3 | - | - |
| **F19** | Schema.org JSON-LD | R5.5 | R5-B4, R5-B5 | - | - |
| **F20** | E2E Test Suite Track | 28 Tests | 28 Tests | 6 Tests | 5 Tests |

---

## 5. Execution Instructions

### Running the Entire E2E Test Suite
```bash
node tests/e2e/runner.ts
```

### Running Specific Tiers
```bash
node tests/e2e/runner.ts --tier=1
node tests/e2e/runner.ts --tier=2
node tests/e2e/runner.ts --tier=3
node tests/e2e/runner.ts --tier=4
```

### Exit Codes & Semantics
- **Exit Code 0**: All executed test assertions passed.
- **Exit Code 1**: One or more assertions failed or an uncaught exception occurred. Detailed failure reports with error messages and stack traces are printed to stderr/stdout.
