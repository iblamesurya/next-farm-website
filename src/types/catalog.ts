export type ProductCategory =
  | 'water-conditioner'
  | 'feed-supplement'
  | 'pathogen-control'
  | 'organic-digestion'
  | 'mineral-supplement';

export interface DosageScheduleItem {
  stage: string;
  dosage: string;
  frequency: string;
}

export interface ProductPricing {
  can5L: number;    // Standard: 5000
  bottle1L: number; // Standard: 1199
  mrp5L?: number;   // MRP: 6500
  mrp1L?: number;   // MRP: 1600
}

export interface RegulatoryBadges {
  caaApproved: boolean;
  isoCertified: boolean;
  antibioticFree: boolean;
}

export interface DosageProtocol {
  preventive: string;
  curative: string;
  schedule: DosageScheduleItem[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryDisplay?: string;
  headline?: string;
  overview?: string;
  indications: string[];
  pricing: ProductPricing;
  format5L?: string;
  format1L?: string;
  regulatoryBadges: RegulatoryBadges;
  strains: string[];
  cfuCount: string;
  biologicalMechanism: string;
  benefits?: string[];
  applicationMethod?: string;
  dosageProtocol: DosageProtocol;
  packshotImage: string;
  galleryImages: string[];
  specSheetPdf: string;
}
