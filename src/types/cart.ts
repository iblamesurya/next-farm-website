export interface CartItem {
  productId: string;
  slug: string;
  packSize: '5L' | '1L';
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
