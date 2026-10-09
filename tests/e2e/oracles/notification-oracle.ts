/**
 * Authoritative Notification Oracle (Telegram Bot & WhatsApp)
 * Source: ORIGINAL_REQUEST.md (R4), PROJECT.md (§ Notifications), survey_integrations.md.
 */

export const TELEGRAM_CONFIG = {
  botToken: '8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA',
  botUsername: '@nextfarmbiosciencessurya_bot',
  endpointUrl: 'https://api.telegram.org/bot8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA/sendMessage',
  merchantWhatsAppNumber: '918977656444'
};

export interface TelegramMessagePayload {
  chat_id: string | number;
  text: string;
  parse_mode: 'HTML';
  disable_notification: boolean; // Must be false for audible sound alert
}

/**
 * Escapes HTML characters for Telegram HTML mode.
 */
export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Builds authoritative Telegram notification message HTML.
 */
export function buildTelegramOrderMessage(order: {
  displayOrderId: string;
  customerName: string;
  customerPhone: string;
  villageMandal: string;
  items: Array<{ productName: string; packSize: string; quantity: number }>;
  totalAmountInr: number;
}): string {
  const safeName = escapeTelegramHtml(order.customerName);
  const safeVillage = escapeTelegramHtml(order.villageMandal);
  const safePhone = order.customerPhone.replace(/\D/g, '');

  const itemsList = order.items
    .map(i => `- ${escapeTelegramHtml(i.productName)} (${i.packSize}) x ${i.quantity}`)
    .join('\n');

  const farmerWaText = encodeURIComponent(
    `Hello ${order.customerName}, your Next Farm order ${order.displayOrderId} has been received and confirmed! We are preparing your shipment.`
  );
  const farmerWaUrl = `https://wa.me/91${safePhone}?text=${farmerWaText}`;

  return [
    `<b>🚨 NEW PRE-PAID ORDER PAID!</b>`,
    ``,
    `<b>Order ID:</b> ${order.displayOrderId}`,
    `<b>Customer:</b> ${safeName}`,
    `<b>Phone:</b> ${safePhone}`,
    `<b>Village/Mandal:</b> ${safeVillage}`,
    `<b>Items:</b>`,
    itemsList,
    `<b>Total Paid:</b> ₹${order.totalAmountInr.toLocaleString('en-IN')} (Razorpay Pre-Paid)`,
    ``,
    `<a href="${farmerWaUrl}">Tap to Contact Farmer via WhatsApp</a>`
  ].join('\n');
}

/**
 * Generates customer WhatsApp support link.
 */
export function generateCustomerToMerchantWhatsAppLink(displayOrderId: string, customerName: string): string {
  const text = encodeURIComponent(
    `Hello Next Farm Bio Sciences, I have placed order ${displayOrderId}. My name is ${customerName}. Please update my dispatch schedule.`
  );
  return `https://wa.me/${TELEGRAM_CONFIG.merchantWhatsAppNumber}?text=${text}`;
}

/**
 * Validates Telegram payload structure and acceptance criteria.
 */
export function validateTelegramPayload(payload: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!payload.chat_id) {
    errors.push('Missing chat_id');
  }

  if (payload.parse_mode !== 'HTML') {
    errors.push(`parse_mode must be 'HTML', got ${payload.parse_mode}`);
  }

  // Acceptance criteria: must emit audible sound alerts (disable_notification must be false)
  if (payload.disable_notification !== false) {
    errors.push(`disable_notification must be explicitly false for audible ringtone alerts, got ${payload.disable_notification}`);
  }

  if (!payload.text || typeof payload.text !== 'string') {
    errors.push('Missing or invalid text field');
  } else {
    // Check balanced HTML tags
    const openB = (payload.text.match(/<b>/g) || []).length;
    const closeB = (payload.text.match(/<\/b>/g) || []).length;
    if (openB !== closeB) {
      errors.push(`Mismatched <b> tags: ${openB} opened vs ${closeB} closed`);
    }

    const openA = (payload.text.match(/<a\s+href="[^"]*">/g) || []).length;
    const closeA = (payload.text.match(/<\/a>/g) || []).length;
    if (openA !== closeA) {
      errors.push(`Mismatched <a> tags: ${openA} opened vs ${closeA} closed`);
    }

    // Check required keywords
    if (!payload.text.includes('🚨 NEW PRE-PAID ORDER PAID!')) {
      errors.push('Missing order alert header');
    }
    if (!payload.text.includes('wa.me')) {
      errors.push('Missing WhatsApp quick contact link in Telegram text');
    }
  }

  return { valid: errors.length === 0, errors };
}
