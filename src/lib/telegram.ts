/**
 * Telegram Bot Notification Engine
 * Serverless notification dispatcher with audible sound alert
 * Source: ORIGINAL_REQUEST.md (R4), survey_integrations.md § 4.1
 */

export const TELEGRAM_CONFIG = {
  botToken: '8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA',
  botUsername: '@nextfarmbiosciencessurya_bot',
  endpointUrl:
    'https://api.telegram.org/bot8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA/sendMessage',
  merchantWhatsAppNumber: '918977656444',
  disableNotification: false
};

export interface TelegramOrderData {
  displayOrderId: string;
  customerName: string;
  customerPhone: string;
  villageMandal: string;
  items: Array<{
    productName: string;
    packSize: string;
    quantity: number;
    unitPriceInr?: number;
  }>;
  totalAmountInr: number;
  razorpayPaymentId?: string;
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
export function buildTelegramOrderMessage(order: TelegramOrderData): string {
  const safeName = escapeTelegramHtml(order.customerName);
  const safeVillage = escapeTelegramHtml(order.villageMandal);
  const safePhone = order.customerPhone.replace(/\D/g, '').slice(-10);

  const itemsList = order.items
    .map(
      (i) =>
        `- ${escapeTelegramHtml(i.productName)} (${i.packSize}) x ${i.quantity}`
    )
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
 * Dispatches Telegram order alert with audible sound (`disable_notification: false`).
 */
export async function sendTelegramOrderNotification(order: TelegramOrderData): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN || TELEGRAM_CONFIG.botToken;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const messageHtml = buildTelegramOrderMessage(order);

  const payload = {
    chat_id: chatId || '7890123456', // default fallback for test/mock
    text: messageHtml,
    parse_mode: 'HTML',
    disable_notification: false, // AUDIBLE SOUND ALERT ENABLED
    disable_web_page_preview: true
  };

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn('[Telegram Dispatch API Warning]', err);
      return false;
    }
    return true;
  } catch (error) {
    console.warn('[Telegram Dispatch Network Warning]', error);
    return false;
  }
}
