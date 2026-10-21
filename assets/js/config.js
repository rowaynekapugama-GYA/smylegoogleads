/* ==========================================================
   Smyl Dental | Landing page configuration
   Edit this file only. No need to touch the HTML.
   ========================================================== */
window.SMYL_CONFIG = {
  // Google Tag Manager container (recommended). Leave blank to skip.
  GTM_ID: "",                       // e.g. "GTM-XXXXXXX"

  // Google Ads conversion tracking (used if GTM_ID is blank).
  GOOGLE_ADS_ID: "",                // e.g. "AW-123456789"
  CONVERSION_LABEL_CALL: "",        // e.g. "AbCdEfGhIj"  (phone click)
  CONVERSION_LABEL_BOOKING: "",     // e.g. "KlMnOpQrSt"  (thank-you page view)

  // Where the "Request a call back" form posts to.
  // Works with Formspree, FormSubmit, Make/Zapier webhooks, SmileOx inbound webhook, etc.
  // Leave blank to skip the post and go straight to the thank-you page (handy for testing).
  FORM_ENDPOINT: "",

  // Practice details (used by the JS for hours and tel links)
  PHONE_DISPLAY: "1300 007 695",
  PHONE_TEL: "1300007695",
  BOOKING_URL: "https://www.corepractice.is/practices/smyldental/smyl-dental#/",

  // Core Practice blocks the standard booking page from being iframed (X-Frame-Options: SAMEORIGIN).
  // If Core Practice provides an embeddable widget URL for the practice, paste it here and the
  // landing page will render it inline under the banner instead of the booking panel.
  BOOKING_EMBED_URL: "",
  BOOKING_EMBED_HEIGHT: 760,

  // Opening hours in 24h time. 0 = Sunday ... 6 = Saturday
  HOURS: {
    1: { open: "08:00", close: "17:00" },
    2: { open: "08:00", close: "17:00" },
    3: { open: "08:00", close: "17:00" },
    4: { open: "08:00", close: "20:00" },
    5: { open: "08:00", close: "17:00" },
    6: { open: "08:00", close: "15:00" },
    0: { open: "10:00", close: "15:00" }
  },
  TIMEZONE: "Australia/Brisbane"
};
