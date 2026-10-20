/**
 * Canonical, site-wide contact details.
 *
 * These values mirror `data/contacts.json` (the admin-editable source of truth
 * used by the /contacts page) so that every other page in the project can
 * render the same phone numbers, addresses and email address.
 */
export const CONTACT_EMAIL = "info@virtualnexgen.com";
export const CONTACT_PHONE_US = "+1 341 888 6504";
export const CONTACT_PHONE_INDIA = "+91 9629596737";
export const CONTACT_ADDRESS_US =
  "2360 Hood Avenue, San Diego, CA, 92123";
export const CONTACT_ADDRESS_INDIA =
  "256, Srinivasa Spaces 3rd Floor, Kandasamy Layout, Papanaickenpalayam, Coimbatore, Tamil Nadu 641037";

/** Builds a `tel:` href from a human readable phone number. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** Builds a Google Maps search link for an address. */
export function mapHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;
}
