# Smyl Dental | Google Ads Landing Page

Static landing page and thank-you page for Smyl Dental (Augustine Heights QLD), built for Google Ads conversions. No build step, plain HTML/CSS/JS, deploys anywhere (GitHub Pages, Vercel, Netlify, cPanel).

## Files

```
index.html            Landing page
thank-you.html        Thank-you / conversion page
assets/css/style.css  All styling
assets/js/config.js   EDIT THIS: tracking IDs, form endpoint, booking embed, hours
assets/js/main.js     Tracking, hours logic, call back form, booking embed
assets/img/           Logo + dentist photos
assets/funds/         Health fund logos
```

The footer of each page has a Landing Page / Thank You Page switcher so you can flick between them.

## Before go-live (assets/js/config.js)

1. **Tracking** – set `GTM_ID` (preferred) or `GOOGLE_ADS_ID` + the two conversion labels.
   - `phone_click` fires on every tel: link (header, hero, sticky bar, footer).
   - `booking_thank_you` fires on thank-you.html load.
   - `book_external` fires when someone opens Core Practice booking.
   All events also push to `dataLayer`, so GTM triggers can use them directly.
2. **Thank-you page** – set `thank-you.html` as the booking confirmation / redirect page in Core Practice so completed bookings land on it and fire the conversion. (`FORM_ENDPOINT` in config.js is only used if a call back form is added later.)
3. **Booking widget** – Core Practice serves the booking page with `X-Frame-Options: SAMEORIGIN`, so it cannot be iframed. The booking section therefore shows a booking panel that opens live availability in a new tab. If Core Practice supplies an embeddable widget URL for the practice, paste it into `BOOKING_EMBED_URL` and the inline widget renders automatically under the banner.
4. **Hours** – update `HOURS` if trading hours change. The page shows "Open now until 5pm" / "Opens today at 8am" based on Brisbane time.

## Notes

- Both pages carry `noindex, nofollow` so they do not compete with smyldental.com.au in organic search. Remove the meta tag if you want them indexed.
- The map is a keyless Google Maps embed. If you want the branded GBP pin, swap the iframe `src` for the share > embed code from Google Maps.
- Favicon is pulled from smyldental.com.au. Drop a local `favicon.png` in `assets/img/` and update the `<link rel="icon">` if the main site moves.
- Team photos are in the same order as the main site: Dr Yasoda Thubati, Dr Muhsina Manaleppa Veettil, Dr Priya Nair.

## Deploy to GitHub Pages

1. Create a repo and upload these files to the root (or unzip and push).
2. Settings > Pages > Deploy from branch > `main` / root.
3. Point `ads.smyldental.com.au` (or similar) at Pages via a CNAME, then use that URL as the final URL in Google Ads.
