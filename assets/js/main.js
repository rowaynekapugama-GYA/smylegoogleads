/* ==========================================================
   Smyl Dental | Landing page behaviour
   - Pushes tracking events to GTM / Google Ads (tags live in each page's <head>)
   - Tracks phone clicks and booking clicks
   - Shows today's hours and open/closed status
   - Handles the call back form and redirect to thank-you
   ========================================================== */
(function () {
  var C = window.SMYL_CONFIG || {};
  window.dataLayer = window.dataLayer || [];

  /* ---------- Tagging ----------
     GTM and the Google tag are installed directly in each page's <head>.
     Nothing is loaded here, to avoid double-firing. */
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  // Generic event helper. Pushes to dataLayer (for GTM) and fires a gtag conversion if configured.
  window.smylTrack = function (eventName, label) {
    window.dataLayer.push({ event: eventName, label: label || '' });
    if (window.gtag && C.GOOGLE_ADS_ID) {
      window.gtag('event', eventName, { event_category: 'landing_page', event_label: label || '' });
      var convLabel = eventName === 'phone_click' ? C.CONVERSION_LABEL_CALL
                    : eventName === 'booking_thank_you' ? C.CONVERSION_LABEL_BOOKING : '';
      if (convLabel) { window.gtag('event', 'conversion', { send_to: C.GOOGLE_ADS_ID + '/' + convLabel }); }
    }
  };

  /* ---------- Click tracking ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a, button');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) { window.smylTrack('phone_click', a.dataset.track || 'tel'); }
    else if (a.dataset.track) { window.smylTrack(a.dataset.track, a.textContent.trim()); }
  });

  /* ---------- Hours ---------- */
  function fmt(t) {
    var p = t.split(':'), h = parseInt(p[0], 10), m = p[1];
    var ampm = h >= 12 ? 'pm' : 'am'; h = h % 12; if (h === 0) h = 12;
    return h + (m === '00' ? '' : ':' + m) + ampm;
  }
  function nowInTz() {
    try {
      var s = new Date().toLocaleString('en-US', { timeZone: C.TIMEZONE || 'Australia/Brisbane' });
      return new Date(s);
    } catch (err) { return new Date(); }
  }
  function updateHours() {
    if (!C.HOURS) return;
    var now = nowInTz(), day = now.getDay(), h = C.HOURS[day];
    if (!h) return;
    var mins = now.getHours() * 60 + now.getMinutes();
    var o = h.open.split(':'), c = h.close.split(':');
    var openM = +o[0] * 60 + +o[1], closeM = +c[0] * 60 + +c[1];
    var isOpen = mins >= openM && mins < closeM;
    var label = isOpen ? 'Open now until ' + fmt(h.close) : (mins < openM ? 'Opens today at ' + fmt(h.open) : 'Open tomorrow');
    document.querySelectorAll('[data-today-hours]').forEach(function (el) { el.textContent = 'Today ' + fmt(h.open) + ' to ' + fmt(h.close); });
    document.querySelectorAll('[data-open-status]').forEach(function (el) {
      el.textContent = label;
      el.classList.toggle('is-open', isOpen);
    });
    document.querySelectorAll('[data-day]').forEach(function (el) {
      el.classList.toggle('today', parseInt(el.getAttribute('data-day'), 10) === day);
    });
  }
  updateHours();

  /* ---------- Booking embed (optional) ---------- */
  var embed = document.getElementById('bookingEmbed');
  var panel = document.getElementById('bookingPanel');
  if (embed && C.BOOKING_EMBED_URL) {
    var fr = document.createElement('iframe');
    fr.src = C.BOOKING_EMBED_URL;
    fr.title = 'Book an appointment online with Smyl Dental';
    fr.loading = 'lazy';
    fr.style.height = (C.BOOKING_EMBED_HEIGHT || 760) + 'px';
    embed.appendChild(fr);
    embed.hidden = false;
    if (panel) { panel.hidden = true; }
  }

  /* ---------- Call back form ---------- */
  var form = document.getElementById('callbackForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('[name="website"]') && form.querySelector('[name="website"]').value) { return; } // honeypot
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Sending...'; btn.disabled = true;
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.source = 'Google Ads landing page';
      data.page = window.location.href;
      data.submitted_at = new Date().toISOString();
      window.smylTrack('form_submit', 'callback');
      var go = function () { window.location.href = 'thank-you.html?src=form'; };
      if (!C.FORM_ENDPOINT) { go(); return; }
      fetch(C.FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(go).catch(function () {
        btn.textContent = original; btn.disabled = false;
        alert('Sorry, something went wrong sending your request. Please call us on ' + (C.PHONE_DISPLAY || '07 4516 2065') + '.');
      });
    });
  }

  /* ---------- Thank-you conversion ---------- */
  if (document.body.classList.contains('page-thank-you')) {
    window.smylTrack('booking_thank_you', 'thank_you_page');
  }

  /* ---------- Smooth scroll to booking (offset for sticky header) ---------- */
  document.querySelectorAll('a[href="#book"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.getElementById('book');
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
