export const socialLinks = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "998901234567",
  whatsappMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
    "Hello, I would like to learn more about IKAT collections.",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/ikatbyasmira",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/ikatbyasmira",
  maps:
    process.env.NEXT_PUBLIC_MAPS_URL ??
    "https://maps.google.com/?q=Samarkand%2C%20Uzbekistan",
};

export function getWhatsAppUrl(message = socialLinks.whatsappMessage) {
  return `https://wa.me/${socialLinks.whatsappNumber}?text=${encodeURIComponent(message)}`;
}