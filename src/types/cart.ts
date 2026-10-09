export type CartPackSize = '5L' | '2L' | '1L';

export interface CartItem {
  productId: string;
  slug: string;
  packSize: CartPackSize;
  quantity: number;
  unitPrice: number;
  title: string;
  image: string;
  formatLabel?: string;
}

export interface CustomerProfile {
  fullName: string;
  whatsappMobile: string; // 10 digits
  villageMandal: string;
}
