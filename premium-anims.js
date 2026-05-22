/* ─────────────────────────────────────────────────────────────────
   CrocScore — Premium app shell controller
   - Injecte le bouton scan central dans le tab bar
   - Word reveal sur le titre hero
   - Cards rapides + premium teaser sur la home
   - Ripple effect partout
   - Sparkles décoratifs
   - Aucune fonction existante n'est modifiée
   ─────────────────────────────────────────────────────────────── */
(function() {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function init() {
    injectStatusPill();
    injectScanFab();
    enhanceHero();
    addHomeChips();
    setupRipple();
    setupSparkles();
    addAlertsToAccountPanel();
    removeAlertsFromNav();
  });

  /* ───── Retire complètement le bouton Alertes du tab bar ────── */
  function removeAlertsFromNav() {
    var alertes = document.querySelector('#bn-alertes');
    if (alertes) alertes.remove();
    var analyser = document.querySelector('#bn-analyser');
    if (analyser) analyser.remove();
  }

  /* ───── Ajoute "Mes alertes" dans le panneau compte ─────────── */
  function addAlertsToAccountPanel() {
    var panel = document.querySelector('.account-items');
    if (!panel || panel.querySelector('[data-cs-alerts]')) return;

    var item = document.createElement('div');
    item.className = 'account-item';
    item.setAttribute('data-cs-alerts', '1');
    item.innerHTML = ''
      + '<span class="account-item-icon">'
      +   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      +     '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>'
      +     '<path d="M13.73 21a2 2 0 0 1-3.46 0"/>'
      +   '</svg>'
      + '</span>'
      + '<span>Mes alertes</span>';
    item.addEventListener('click', function() {
      if (typeof window.closeAccount === 'function') window.closeAccount();
      setTimeout(function() {
        if (typeof window.openAlertModal === 'function') window.openAlertModal();
      }, 200);
    });

    // Insérer en haut de la liste
    panel.insertBefore(item, panel.firstChild);
  }

  /* ───── 0. Status pill (rappel app, décoratif) ───────────────── */
  function injectStatusPill() {
    if (document.querySelector('.cs-status-pill')) return;
    var pill = document.createElement('div');
    pill.className = 'cs-status-pill';

    function fmtTime() {
      var d = new Date();
      var h = String(d.getHours()).padStart(2, '0');
      var m = String(d.getMinutes()).padStart(2, '0');
      return h + ':' + m;
    }
    pill.innerHTML = '<span class="cs-status-time">' + fmtTime() + '</span>'
      + '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3.2-6.9"/><circle cx="20.5" cy="6" r="2.1" fill="currentColor"/></svg>'
      + '<span style="font-family:Fraunces,serif;font-weight:500;letter-spacing:-0.2px">CrocScore</span>';
    document.body.appendChild(pill);

    // Live clock update
    setInterval(function() {
      var t = pill.querySelector('.cs-status-time');
      if (t) t.textContent = fmtTime();
    }, 30000);
  }

  /* ───── 1. Inject scan FAB au milieu du bottom-nav ────────────── */
  function injectScanFab() {
    var nav = document.querySelector('.bottom-nav');
    if (!nav || nav.querySelector('.cs-scan-fab')) return;

    var fab = document.createElement('button');
    fab.className = 'cs-scan-fab';
    fab.setAttribute('aria-label', 'Scanner un produit');
    fab.type = 'button';
    fab.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M20 16v2a2 2 0 0 1-2 2h-2"/><path d="M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M4 12h16"/></svg>';
    fab.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.openScan === 'function') window.openScan();
    });

    var items = nav.querySelectorAll('.bn-item');
    if (items.length >= 4) {
      // Insère au milieu (avant l'item d'index Math.ceil(n/2))
      var insertIdx = Math.ceil(items.length / 2);
      nav.insertBefore(fab, items[insertIdx]);
    } else {
      nav.appendChild(fab);
    }

    // Si trop d'items, cacher "Alertes" (toujours accessible via la page Compte)
    // Si trop d'items, cacher "Alertes" (toujours accessible via la page Compte)
    items = nav.querySelectorAll('.bn-item');

  /* ───── 2. Word reveal sur titre hero ─────────────────────────── */
  function enhanceHero() {
    var h1 = document.querySelector('.hero h1');
    if (!h1 || h1.dataset.csEnhanced) return;
    h1.dataset.csEnhanced = '1';
    var counter = { i: 0 };
    walkAndWrap(h1, counter);
  }

  function walkAndWrap(node, counter) {
    var children = Array.prototype.slice.call(node.childNodes);
    children.forEach(function(child) {
      if (child.nodeType === 3) {
        var text = child.nodeValue;
        if (!text || !text.trim()) return;
        var parts = text.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function(p) {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            frag.appendChild(document.createTextNode(p));
          } else {
            var span = document.createElement('span');
            span.className = 'cs-word';
            span.style.setProperty('--w', counter.i++);
            span.textContent = p;
            frag.appendChild(span);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        walkAndWrap(child, counter);
      }
    });
  }

  /* ───── 3. Cards d'action rapides + premium teaser sur la home ─ */
  function addHomeChips() {
    var heroInner = document.querySelector('.hero > div:first-child');
    if (!heroInner || heroInner.querySelector('.cs-home-chips')) return;

    var chipsWrap = document.createElement('div');
    chipsWrap.className = 'cs-home-chips';
    chipsWrap.innerHTML = ''
      + chip('stats', 'Statistiques', 'Suivi nutritionnel de votre animal',
             '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>')
      + chip('add', 'Mon animal', 'Ajoutez le profil de votre compagnon',
             '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>');
    heroInner.appendChild(chipsWrap);

    chipsWrap.querySelector('[data-chip="stats"]').addEventListener('click', function() {
      if (typeof window.openStatsPanel === 'function') window.openStatsPanel();
    });
    chipsWrap.querySelector('[data-chip="add"]').addEventListener('click', function() {
      if (typeof window.openAddAnimal === 'function') window.openAddAnimal();
    });

    // Premium teaser
    var prem = document.createElement('div');
    prem.className = 'cs-home-premium';
    prem.innerHTML = ''
      + '<span class="cs-home-premium-pill">'
      +   '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9 9 2 9.5l5.5 4.5L6 22l6-4 6 4-1.5-8L22 9.5 15 9z"/></svg>'
      +   'Premium'
      + '</span>'
      + '<div class="cs-home-premium-title">Suivez l\u2019évolution<br/>de <em>votre animal</em>.</div>'
      + '<div class="cs-home-premium-sub">Résumé mensuel, alertes additifs, rapport vétérinaire PDF.</div>'
      + '<button type="button" class="cs-home-premium-btn">Découvrir Premium <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>';
    heroInner.appendChild(prem);

    prem.addEventListener('click', function() {
      if (typeof window.openPremModal === 'function') window.openPremModal();
    });

    // Disclaimer
    var disc = document.createElement('div');
    disc.className = 'cs-home-disclaimer';
    disc.innerHTML = ''
      + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8h.01"/></svg>'
      + '<span>Scores indicatifs. CrocScore ne remplace en aucun cas l\u2019avis d\u2019un vétérinaire. Données Open Pet Food Facts (ODbL).</span>';
    heroInner.appendChild(disc);
  }

  function chip(id, title, sub, icon) {
    return ''
      + '<button type="button" class="cs-home-chip" data-chip="' + id + '">'
      +   '<div class="cs-home-chip-icon">' + icon + '</div>'
      +   '<div>'
      +     '<div class="cs-home-chip-title">' + title + '</div>'
      +     '<div class="cs-home-chip-sub">' + sub + '</div>'
      +   '</div>'
      + '</button>';
  }

  /* ───── 4. Ripple effect sur tous les boutons cliquables ──────── */
  function setupRipple() {
    var selectors = [
      '.nav-cta', '.cta-btn', '.showcase-cta-btn',
      '.hero-search button', '.showcase-search button',
      '.plan-btn', '.auth-btn',
      '.bn-item', '.cs-scan-fab',
      '.cs-home-chip', '.cs-home-premium', '.cs-home-premium-btn',
      '.account-item', '.hero-scan',
      '.tab', '.auth-tab', '.score-card',
      '.bn-item button', 'button.feat-dot',
    ];
    document.addEventListener('click', function(e) {
      var target = null;
      for (var i = 0; i < selectors.length; i++) {
        var t = e.target.closest(selectors[i]);
        if (t) { target = t; break; }
      }
      if (!target) return;

      var rect = target.getBoundingClientRect();
      var cs = getComputedStyle(target);
      if (cs.position === 'static') target.style.position = 'relative';
      if (cs.overflow !== 'hidden') target.style.overflow = 'hidden';

      var ripple = document.createElement('span');
      ripple.className = 'cs-ripple';
      var size = Math.max(rect.width, rect.height) * 1.4;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      target.appendChild(ripple);
      setTimeout(function() {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 700);
    }, { passive: true });
  }

  /* ───── 5. Sparkles décoratifs ───────────────────────────────── */
  function setupSparkles() {
    function decorate(host, count) {
      if (!host || host.dataset.csSparkles) return;
      host.dataset.csSparkles = '1';
      var rect = host.getBoundingClientRect();
      for (var i = 0; i < count; i++) {
        var s = document.createElement('div');
        s.className = 'cs-sparkle';
        s.style.top = (8 + Math.random() * 84) + '%';
        s.style.left = (5 + Math.random() * 90) + '%';
        s.style.animationDelay = (i * 0.4 + Math.random() * 0.5) + 's';
        s.style.animationDuration = (2 + Math.random() * 2) + 's';
        host.appendChild(s);
      }
    }
    // Premium teaser sur la home
    document.querySelectorAll('.cs-home-premium').forEach(function(el) { decorate(el, 7); });
    // Premium plan dans le panneau compte
    document.querySelectorAll('.account-plan-card.premium').forEach(function(el) { decorate(el, 6); });
  }
})();
