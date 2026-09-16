/**
 * 📊 GOOGLE ANALYTICS, WITH CONSENT — Artist Archive.
 *
 * 🗳️ Steph, 2026-09-16: *"i think we should do google analytics for ads etc in
 * the future"*, and, asked who should see a cookie banner: **only where it is
 * legally required.**
 *
 * ⚠️ ONE FILE FOR BOTH SITES. The marketing site and the community board differ
 * only by their measurement ID, which arrives as `data-ga` on the script tag.
 * ⛔ Two copies of consent logic is two places for it to go quietly wrong, and
 * the wrong one is the one that keeps collecting.
 *
 * ⭐ TWO LAYERS, AND ONLY THE FIRST ONE HAS TO BE RIGHT:
 * 1. **Consent Mode** tells Google to collect NOTHING in the EEA and the UK
 *    until it is told otherwise. ▶️ Google applies this **by IP, at its end**,
 *    so it does not depend on this file guessing anybody's location.
 * 2. **The banner** is shown when the browser's own timezone looks European.
 *    ⚠️ It is a convenience, not the boundary - if it guesses wrong nothing
 *    leaks, because layer 1 already refused.
 *
 * ⛔ NO IP LOOKUP AND NO GEO SERVICE. A third-party request to ask where
 * somebody is, in order to decide whether to ask permission to measure them, is
 * the thing the banner exists to avoid.
 *
 * 🚨 THE PRIVACY POLICY IS PART OF THIS CHANGE, NOT A FOLLOW-UP. It said in
 * writing that the site used no analytics, and §14 promises a cookie choice
 * where consent is required. Both were updated in the same commit as this file.
 */
(function () {
  var script = document.currentScript;
  var GA_ID = script && script.getAttribute('data-ga');
  if (!GA_ID) return;

  var STORE_KEY = 'aa-analytics-consent';

  /**
   * ⚠️ WRAPPED, ALWAYS. Storage throws rather than returning null in a private
   * window and wherever site data is blocked - and an exception here would stop
   * the rest of the page's scripts, to measure a visit.
   */
  function remembered() {
    try { return window.localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function remember(value) {
    try { window.localStorage.setItem(STORE_KEY, value); } catch (e) { /* fine */ }
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // 🇪🇺 The EEA, plus the UK and Switzerland. ⚠️ Region-specific defaults are
  // sent FIRST and take precedence over the general one below, which is the
  // order Google's own documentation uses.
  var CONSENT_REQUIRED = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
    'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL',
    'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH',
  ];

  var saved = remembered();

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: CONSENT_REQUIRED,
    wait_for_update: 500,
  });
  // ⚠️ Everywhere else, analytics runs. ⛔ Advertising storage stays denied
  // everywhere until there is actually advertising to store anything for -
  // Google Ads is the reason this exists, but it is not wired up yet, and
  // defaults that describe a thing that does not exist are defaults nobody
  // revisits.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  });

  // ⚠️ A REMEMBERED ANSWER IS APPLIED BEFORE ANYTHING LOADS, so somebody who
  // already said yes is not asked twice and is not measured twice either.
  if (saved === 'granted' || saved === 'denied') {
    gtag('consent', 'update', { analytics_storage: saved });
  }

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(tag);

  gtag('js', new Date());
  gtag('config', GA_ID);

  /**
   * ⚠️ THE TIMEZONE IS THE ONLY SIGNAL USED, and it never leaves the browser.
   * ▶️ A traveller or a VPN can make this wrong in both directions, which is
   * exactly why it is not the boundary: Consent Mode above already refused by
   * IP. ⭐ Being asked unnecessarily is a small annoyance; being measured
   * without being asked is the thing that must not happen, and this cannot
   * cause it.
   */
  function looksEuropean() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      return tz.indexOf('Europe/') === 0
        || tz === 'Atlantic/Canary' || tz === 'Atlantic/Madeira'
        || tz === 'Atlantic/Azores' || tz === 'Atlantic/Reykjavik';
    } catch (e) {
      // ⚠️ No timezone means no answer, and no answer means ASK. The safe
      // direction is the one where somebody sees a banner they did not need.
      return true;
    }
  }

  if (saved || !looksEuropean()) return;

  function decide(granted) {
    var value = granted ? 'granted' : 'denied';
    remember(value);
    gtag('consent', 'update', { analytics_storage: value });
    var bar = document.getElementById('aa-consent');
    if (bar) bar.remove();
  }

  function showBanner() {
    var bar = document.createElement('div');
    bar.id = 'aa-consent';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie choice');
    bar.innerHTML =
      '<div class="aa-consent-text">Artist Archive would like to measure how this site is used, '
      + 'with Google Analytics. Nothing is set unless you say yes. '
      + '<a href="https://www.artistarchiveapp.com/privacypolicy">Privacy policy</a></div>'
      + '<div class="aa-consent-buttons">'
      + '<button type="button" id="aa-consent-no">No thanks</button>'
      + '<button type="button" id="aa-consent-yes">That’s fine</button>'
      + '</div>';

    var css = document.createElement('style');
    // ⚠️ The sites' own tokens are not available here (the board and the
    // marketing site name them differently), so the few colours are literal and
    // taken from the shared palette both already use.
    css.textContent =
      '#aa-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#FFFFFF;'
      + 'border-top:1px solid #E3DEDA;padding:14px 18px;display:flex;gap:16px;align-items:center;'
      + 'flex-wrap:wrap;font-size:12.5px;line-height:1.6;color:#4A4542;'
      // ⚠️ iPhones with a home bar: without this the buttons sit under it.
      + 'padding-bottom:calc(14px + env(safe-area-inset-bottom,0px))}'
      + '#aa-consent .aa-consent-text{flex:1;min-width:220px}'
      + '#aa-consent a{color:#8C2340}'
      + '#aa-consent .aa-consent-buttons{display:flex;gap:10px;flex:0 0 auto}'
      + '#aa-consent button{font:inherit;font-size:11px;letter-spacing:.08em;text-transform:uppercase;'
      + 'border-radius:8px;padding:10px 16px;cursor:pointer;border:1px solid #E3DEDA;'
      + 'background:#FFFFFF;color:#12100E}'
      + '#aa-consent #aa-consent-yes{background:#8C2340;border-color:#8C2340;color:#FFFFFF}'
      + '@media(max-width:520px){#aa-consent .aa-consent-buttons{width:100%}'
      + '#aa-consent button{flex:1}}';

    document.head.appendChild(css);
    document.body.appendChild(bar);
    document.getElementById('aa-consent-yes').onclick = function () { decide(true); };
    document.getElementById('aa-consent-no').onclick = function () { decide(false); };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
