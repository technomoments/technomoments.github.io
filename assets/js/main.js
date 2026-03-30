(function () {
  'use strict';

  // ── Sticky Header ────────────────────────────────────────
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ── Hamburger Menu ───────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    // NO body overflow lock
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
      }
    });

    // Close ONLY when clicking a real destination link (not toggles)
    mobileMenu.querySelectorAll('a:not(.mobile-dropdown-toggle)').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // ── Mobile Accordion Dropdowns ───────────────────────────
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation(); // prevent closing the menu

      const dropdown = toggle.nextElementSibling;
      const isOpen = dropdown.style.display === 'flex';

      // Close all first
      document.querySelectorAll('.mobile-dropdown-toggle').forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
        t.classList.remove('open');
        if (t.nextElementSibling) t.nextElementSibling.style.display = 'none';
      });

      // Open this one if it was closed
      if (!isOpen) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.classList.add('open');
        dropdown.style.display = 'flex';
      }
    });
  });

  // ── Smooth Scroll ────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id && id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ── Scroll Reveal ────────────────────────────────────────
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Lucide Icons ─────────────────────────────────────────
  if (window.lucide) {
    lucide.createIcons();
  }

})();