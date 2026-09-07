/**
 * Utility functions for phone dialing and WhatsApp linking
 */

export function getPrimaryPhoneNumber(phoneStr?: string): string {
  if (!phoneStr) return "+919876543210";
  // Split on delimiters like "/", ",", "or", "|" and take the first number
  const firstPart = phoneStr.split(/[\/,|]|\bor\b/i)[0]?.trim() || phoneStr;
  const digits = firstPart.replace(/[^0-9]/g, "");
  if (!digits) return "+919876543210";
  return `+${digits}`;
}

export function getCleanWhatsAppNumber(waStr?: string): string {
  if (!waStr) return "919876543210";
  // If multiple numbers entered, take the first number
  const firstPart = waStr.split(/[\/,|]|\bor\b/i)[0]?.trim() || waStr;
  let digits = firstPart.replace(/[^0-9]/g, "");
  if (!digits) return "919876543210";

  // Remove leading 0 if present (e.g. 09876543210)
  if (digits.startsWith("0")) {
    digits = digits.substring(1);
  }

  // If 10 digits (e.g. standard Indian mobile without country code), prepend 91
  if (digits.length === 10) {
    digits = `91${digits}`;
  }

  return digits;
}

export function getWhatsAppUrl(phoneStr?: string, message?: string): string {
  const cleanPhone = getCleanWhatsAppNumber(phoneStr);
  const text = message ? encodeURIComponent(message.trim()) : "";
  return `https://api.whatsapp.com/send?phone=${cleanPhone}${text ? `&text=${text}` : ""}`;
}
