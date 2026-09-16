/* ============================================================
   The PropertyScope — app.js
   Shared behaviours: nav, hero slideshow, reveal-on-scroll,
   service accordion, gallery lightbox, contact form, back-to-top
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var iconOpen = document.getElementById('iconMenuOpen');
      var iconClose = document.getElementById('iconMenuClose');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden', isOpen);
        iconClose.classList.toggle('hidden', !isOpen);
      }
    });
    // Close mobile menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        var iconOpen = document.getElementById('iconMenuOpen');
        var iconClose = document.getElementById('iconMenuClose');
        if (iconOpen && iconClose) { iconOpen.classList.remove('hidden'); iconClose.classList.add('hidden'); }
      });
    });
  }

  /* ---------- Sticky header background on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Reveal-on-scroll animation ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     Hero Slideshow — Ken Burns, multi-directional, min 8 images
     ============================================================ */
  var slideshow = document.getElementById('heroSlideshow');
  if (slideshow) {
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('.hero-slide'));
    var dotsWrap = document.getElementById('heroDots');
    var directions = ['kb-left', 'kb-right', 'kb-up', 'kb-down'];
    var current = 0;
    var intervalMs = 5500;
    var timer = null;

    // Build dot indicators
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); resetTimer(); });
        dotsWrap.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsWrap) return;
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    function activate(index) {
      slides.forEach(function (slide, i) {
        directions.forEach(function (d) { slide.classList.remove(d); });
        if (i === index) {
          // Force reflow so the Ken Burns animation restarts each time
          slide.classList.remove('active');
          void slide.offsetWidth;
          slide.classList.add('active');
          slide.classList.add(directions[i % directions.length]);
        } else {
          slide.classList.remove('active');
        }
      });
      updateDots();
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      activate(current);
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, intervalMs);
    }

    var nextBtn = document.getElementById('heroNext');
    var prevBtn = document.getElementById('heroPrev');
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetTimer(); });

    // Pause on hover / focus for readability, resume on leave
    slideshow.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    slideshow.addEventListener('mouseleave', resetTimer);

    if (slides.length) {
      activate(0);
      resetTimer();
    }
  }

  /* ---------- Services accordion ---------- */
  var serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card) {
    var toggleBtn = card.querySelector('.service-toggle');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', function () {
      var isOpen = card.classList.contains('open');
      // Close others for a tidy accordion feel
      serviceCards.forEach(function (c) { c.classList.remove('open'); });
      if (!isOpen) card.classList.add('open');
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightboxIndex = 0;

  function openLightbox(i) {
    if (!lightbox || !galleryItems.length) return;
    lightboxIndex = i;
    var item = galleryItems[lightboxIndex];
    var full = item.getAttribute('data-full') || item.querySelector('img').src;
    var caption = item.getAttribute('data-caption') || '';
    lightboxImg.src = full;
    lightboxImg.alt = caption;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function lightboxNext() { openLightbox((lightboxIndex + 1) % galleryItems.length); }
  function lightboxPrev() { openLightbox((lightboxIndex - 1 + galleryItems.length) % galleryItems.length); }

  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () { openLightbox(i); });
  });
  var lbClose = document.getElementById('lightboxClose');
  var lbNext = document.getElementById('lightboxNext');
  var lbPrev = document.getElementById('lightboxPrev');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', lightboxNext);
  if (lbPrev) lbPrev.addEventListener('click', lightboxPrev);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
  });

  /* ---------- Gallery filter (category chips) ---------- */
  var filterChips = document.querySelectorAll('.filter-chip');
  if (filterChips.length && galleryItems.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('active-chip'); });
        chip.classList.add('active-chip');
        var cat = chip.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = cat === 'all' || item.getAttribute('data-category') === cat;
          item.parentElement.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Contact form (client-side validation demo) ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var formStatus = document.getElementById('formStatus');
    contactForm.addEventListener('submit', function (e) {
      var name = contactForm.querySelector('#name');
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      var valid = true;
      [name, email, message].forEach(function (field) {
        if (!field) return;
        if (!field.value.trim()) {
          field.classList.add('border-red-500');
          valid = false;
        } else {
          field.classList.remove('border-red-500');
        }
      });
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && email.value && !emailPattern.test(email.value)) {
        email.classList.add('border-red-500');
        valid = false;
      }

      if (!formStatus) return;
      if (!valid) {
        e.preventDefault();
        formStatus.textContent = 'Please fill in all required fields with a valid email address.';
        formStatus.className = 'mt-4 text-sm font-medium text-red-600';
        return;
      }
    });
  }

});
