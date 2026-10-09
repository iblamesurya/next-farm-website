/**
 * Authoritative Web Crypto API HMAC-SHA256 Oracle
 * Source: ORIGINAL_REQUEST.md (R3), PROJECT.md (§ Payment & Verification API Contracts), survey_integrations.md.
 * Native W3C Web Crypto API (crypto.subtle) constant-time implementation.
 */

/**
 * Converts ArrayBuffer / Uint8Array to lowercase hex string.
 */
export function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts 64-character hex string into Uint8Array.
 */
export function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string length');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Generates official Razorpay HMAC-SHA256 signature using native Web Crypto API.
 * Formula: HMAC-SHA256(order_id + "|" + payment_id, secret)
 */
export async function generateRazorpaySignatureEdge(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  keySecret: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${razorpayOrderId}|${razorpayPaymentId}`);
  const keyBytes = encoder.encode(keySecret);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, data);
  return bufferToHex(signatureBuffer);
}

/**
 * Constant-time Web Crypto API HMAC verification matching Cloudflare Pages Edge runtime.
 */
export async function verifyRazorpaySignatureEdge(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  keySecret: string
): Promise<boolean> {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !keySecret) {
    return false;
  }

  // Razorpay HMAC-SHA256 signatures are exactly 64 hex characters (32 bytes)
  if (razorpaySignature.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(razorpaySignature)) {
    return false;
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${razorpayOrderId}|${razorpayPaymentId}`);
    const keyBytes = encoder.encode(keySecret);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signatureBytes = hexToUint8Array(razorpaySignature);

    return await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      signatureBytes as BufferSource,
      data
    );
  } catch (err) {
    return false;
  }
}

/**
 * Tampering Utilities for Adversarial Security Testing
 */
export function tamperSignature(signature: string, byteIndex: number = 0): string {
  if (signature.length < 2) return '00';
  const chars = signature.split('');
  // Invert a nibble
  const currentNibble = parseInt(chars[byteIndex] || '0', 16);
  const invertedNibble = (currentNibble ^ 1).toString(16);
  chars[byteIndex] = invertedNibble;
  return chars.join('');
}

export function truncateSignature(signature: string, length: number = 32): string {
  return signature.substring(0, length);
}
