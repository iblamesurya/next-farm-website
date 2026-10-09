/**
 * WhatsApp Direct Link Generators
 * Enables 1-tap merchant and farmer coordination
 * Source: ORIGINAL_REQUEST.md (R4), survey_integrations.md § 4.2
 */

export const MERCHANT_WHATSAPP_NUMBER = '918977656444';

/**
 * Generates pre-filled WhatsApp link for farmer to contact Next Farm merchant helpline.
 */
export function generateCustomerToMerchantWhatsAppLink(
  displayOrderId: string,
  customerName?: string
): string {
  const namePart = customerName ? ` My name is ${customerName}.` : '';
  const text = encodeURIComponent(
    `Hello Next Farm Bio Sciences, I have placed order ${displayOrderId}.${namePart} Please update my dispatch schedule.`
  );
  return `https://wa.me/${MERCHANT_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Generates pre-filled WhatsApp link for merchant helpline with order total.
 */
export function generateMerchantWhatsAppLink(
  displayOrderId: string,
  totalInr: number
): string {
  const text = encodeURIComponent(
    `Hello Next Farm Bio Sciences Team, I have placed a pre-paid order ${displayOrderId} (Total ₹${totalInr.toLocaleString('en-IN')}). Please provide dispatch details and technical application instructions.`
  );
  return `https://wa.me/${MERCHANT_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Generates pre-filled WhatsApp link for merchant to contact farmer directly.
 */
export function generateMerchantToFarmerWhatsAppLink(
  phone: string,
  customerName: string,
  displayOrderId: string
): string {
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  const text = encodeURIComponent(
    `Hello ${customerName}, your Next Farm order ${displayOrderId} has been received and confirmed! We are preparing your shipment.`
  );
  return `https://wa.me/91${cleanPhone}?text=${text}`;
}
