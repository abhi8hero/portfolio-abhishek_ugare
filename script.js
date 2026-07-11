/* ============================================================
   PORTFOLIO — SHARED JAVASCRIPT
   - Theme toggle (light/dark, localStorage persistence)
   - Hamburger / mobile menu
   - Scroll-reveal with IntersectionObserver
   - Image modal (guard: only runs if modal exists on page)
   ============================================================ */

'use strict';

/* ── THEME SYSTEM ───────────────────────────────────────────
   Runs FIRST (before body paints) to avoid flash of wrong theme
   ─────────────────────────────────────────────────────────── */
(function () {
  var saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}());

/* Toggle called by the button onclick */
function toggleTheme() {
  var html    = document.documentElement;
  var isDark  = html.getAttribute('data-theme') === 'dark';
  var next    = isDark ? 'light' : 'dark';

  if (next === 'dark') {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}

/* ── HAMBURGER MENU ─────────────────────────────────────── */
(function () {
  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close on any link/button click inside mobile menu
  menu.addEventListener('click', function (e) {
    const t = e.target;
    if (t.tagName === 'A' || t.tagName === 'BUTTON') {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    }
  });
}());

/* ── HAMBURGER MENU ATTENTION ─────────────────────────────────────── */
(function () {
  const btn = document.getElementById('hamburgerBtn');

  if (!btn || window.innerWidth >= 768) return;

  const STORAGE_KEY = 'menuHintSeen';
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

  // Check if user has clicked within the last 7 days
  const lastClicked = localStorage.getItem(STORAGE_KEY);

  if (lastClicked) {
    const elapsed = Date.now() - Number(lastClicked);

    if (elapsed < SEVEN_DAYS) {
      return; // Don't show hint
    } else {
      localStorage.removeItem(STORAGE_KEY); // Expired
    }
  }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'hint-overlay';
  document.body.appendChild(overlay);

  // Save timestamp when user clicks the menu
  btn.addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, Date.now());
  });

  window.addEventListener('load', function () {
    setTimeout(function () {

      overlay.classList.add('show');

      btn.classList.add('hint');
      btn.classList.add('open');

      setTimeout(function () {

        btn.classList.remove('hint');
        btn.classList.remove('open');
        overlay.classList.remove('show');

      }, 1000);

    }, 1000);
  });
})();


/* ── SCROLL REVEAL ──────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
}());


/* ── IMAGE MODAL ────────────────────────────────────────── */
var imgModal     = document.getElementById('imgModal');
var imgModalImg  = document.getElementById('imgModalImg');
var imgModalClose = document.getElementById('imgModalClose');

function openImgModal(src) {
  if (!imgModal || !imgModalImg) return;
  imgModalImg.src = src;
  imgModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeImgModal() {
  if (!imgModal) return;
  imgModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (imgModalClose) {
  imgModalClose.addEventListener('click', closeImgModal);
}
if (imgModal) {
  imgModal.addEventListener('click', function (e) {
    if (e.target === imgModal) closeImgModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeImgModal();
  });
}
