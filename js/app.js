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

  /* ---------- News & Insights ---------- */
  var newsGrid = document.getElementById('newsGrid');
  if (newsGrid) {
    var newsArticles = [
      {
        id: 'market-signals',
        category: 'Market Intelligence',
        title: 'Reading the signals behind a changing property market',
        excerpt: 'A practical editorial look at the questions buyers, developers, and investors can ask when assessing property opportunities in a changing market.',
        date: 'September 17, 2026',
        datetime: '2026-09-17',
        image: 'images/optimized/image7.jpg',
        alt: 'Contemporary residential architecture',
        author: 'The PropertyScope Editorial Team',
        content: [
          'Property decisions are stronger when they begin with clear questions. What is driving demand in a location? Which services and infrastructure support long-term use? How does the intended property use affect the decision?',
          'This editorial framework is designed to help readers organize their own research. It does not replace professional advice or verified local market data, but it can make conversations with agents, developers, and researchers more productive.'
        ]
      },
      {
        id: 'responsible-development',
        category: 'Real Estate News',
        title: 'Why responsible development starts with better information',
        excerpt: 'Reliable information helps property stakeholders weigh opportunity, planning, access, and community needs before decisions are made.',
        date: 'September 12, 2026',
        datetime: '2026-09-12',
        image: 'images/optimized/image5.jpg',
        alt: 'Family home with landscaped lawn',
        author: 'The PropertyScope Editorial Team',
        content: [
          'Good property development depends on more than a compelling building concept. It also requires attention to land use, access, services, construction quality, and the needs of the people who will use the finished space.',
          'For readers following development activity, asking how a project responds to its context is a useful starting point for informed discussion.'
        ]
      },
      {
        id: 'location-research',
        category: 'Investment Insights',
        title: 'A disciplined way to compare emerging locations',
        excerpt: 'Investors can build a clearer picture of a location by comparing demand, connectivity, services, planned development, and use cases.',
        date: 'September 8, 2026',
        datetime: '2026-09-08',
        image: 'images/optimized/image1.jpg',
        alt: 'Aerial view of a residential neighbourhood',
        author: 'The PropertyScope Research Desk',
        content: [
          'Location comparisons become more useful when they are based on the same set of questions. Consider who the property is intended to serve, how people reach it, and what essential services are available nearby.',
          'A structured comparison can reveal both strengths and open questions without relying on unverified promises or one-dimensional rankings.'
        ]
      },
      {
        id: 'housing-design',
        category: 'Property & Housing',
        title: 'Design choices that shape everyday housing experience',
        excerpt: 'From natural light to circulation and outdoor space, practical design choices can influence how a home works for its occupants.',
        date: 'September 3, 2026',
        datetime: '2026-09-03',
        image: 'images/optimized/image9.jpg',
        alt: 'Warm living room interior',
        author: 'The PropertyScope Editorial Team',
        content: [
          'Housing quality is experienced in everyday details: how rooms connect, where daylight enters, how storage is handled, and whether outdoor areas are usable and comfortable.',
          'These details are worth considering alongside location, cost, and construction quality when reviewing a residential project or property listing.'
        ]
      },
      {
        id: 'propertyscope-field-notes',
        category: 'PropertyScope Activities',
        title: 'Field notes: listening to the people shaping property markets',
        excerpt: 'Our editorial and research work starts with conversations across the property ecosystem, from professionals and developers to communities and buyers.',
        date: 'August 28, 2026',
        datetime: '2026-08-28',
        image: 'images/optimized/image10.jpg',
        alt: 'Modern black and white duplex residence',
        author: 'The PropertyScope Editorial Team',
        content: [
          'Property markets are shaped by many perspectives. Site visits, interviews, and stakeholder conversations help bring those perspectives into focus and give readers a fuller view of the issues affecting the sector.',
          'The PropertyScope uses these activities to support clear, responsible, and solutions-oriented coverage.'
        ]
      },
      {
        id: 'market-research-questions',
        category: 'Market Intelligence',
        title: 'Five questions to take into your next market conversation',
        excerpt: 'A concise checklist for turning a property conversation into a more useful research and due-diligence discussion.',
        date: 'August 21, 2026',
        datetime: '2026-08-21',
        image: 'images/optimized/image4.jpg',
        alt: 'Bright open-plan living room',
        author: 'The PropertyScope Research Desk',
        content: [
          'Useful questions create useful comparisons. Ask what evidence supports the opportunity, which assumptions remain uncertain, and how the property serves its intended users.',
          'Also ask what information should be independently verified before a financial or development decision is made.'
        ]
      }
    ];
    var newsSearch = document.getElementById('newsSearch');
    var newsEmpty = document.getElementById('newsEmpty');
    var activeNewsFilter = 'all';

    function renderNewsArticles() {
      var searchTerm = newsSearch ? newsSearch.value.trim().toLowerCase() : '';
      var visibleArticles = newsArticles.filter(function (article) {
        var matchesCategory = activeNewsFilter === 'all' || article.category === activeNewsFilter;
        var searchableText = (article.title + ' ' + article.excerpt).toLowerCase();
        return matchesCategory && (!searchTerm || searchableText.indexOf(searchTerm) !== -1);
      });

      newsGrid.innerHTML = visibleArticles.map(function (article) {
        return '<article class="bg-white rounded-xl overflow-hidden card-hover reveal in-view">' +
          '<img src="' + article.image + '" alt="' + article.alt + '" class="news-card-image w-full object-cover" loading="lazy">' +
          '<div class="p-6">' +
          '<p class="text-kpmred font-display font-semibold text-xs tracking-[0.14em] mb-3">' + article.category + '</p>' +
          '<h3 class="font-display font-semibold text-xl text-kpmnavy leading-tight mb-3">' + article.title + '</h3>' +
          '<p class="text-gray-600 text-sm leading-relaxed mb-5">' + article.excerpt + '</p>' +
          '<div class="flex items-center justify-between gap-3 text-xs text-gray-500 mb-5"><time datetime="' + article.datetime + '">' + article.date + '</time><span>' + article.author.replace('The PropertyScope ', 'TPS ') + '</span></div>' +
          '<button type="button" class="text-kpmblue font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" data-article-id="' + article.id + '">Read More <span aria-hidden="true">&rarr;</span></button>' +
          '</div></article>';
      }).join('');
      if (newsEmpty) newsEmpty.classList.toggle('hidden', visibleArticles.length > 0);
      newsGrid.querySelectorAll('[data-article-id]').forEach(function (button) {
        button.addEventListener('click', function () { openArticle(button.getAttribute('data-article-id')); });
      });
    }

    var articleModal = document.getElementById('articleModal');
    var articleModalImage = document.getElementById('articleModalImage');
    var articleModalCategory = document.getElementById('articleModalCategory');
    var articleModalTitle = document.getElementById('articleModalTitle');
    var articleModalDate = document.getElementById('articleModalDate');
    var articleModalAuthor = document.getElementById('articleModalAuthor');
    var articleModalContent = document.getElementById('articleModalContent');

    function openArticle(articleId) {
      var article = newsArticles.find(function (item) { return item.id === articleId; });
      if (!article || !articleModal) return;
      articleModalImage.src = article.image;
      articleModalImage.alt = article.alt;
      articleModalCategory.textContent = article.category;
      articleModalTitle.textContent = article.title;
      articleModalDate.textContent = article.date;
      articleModalAuthor.textContent = article.author;
      articleModalContent.innerHTML = article.content.map(function (paragraph) { return '<p>' + paragraph + '</p>'; }).join('');
      articleModal.classList.add('open');
      articleModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeArticle() {
      if (!articleModal) return;
      articleModal.classList.remove('open');
      articleModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-news-filter]').forEach(function (filterButton) {
      filterButton.addEventListener('click', function () {
        document.querySelectorAll('[data-news-filter]').forEach(function (button) { button.classList.remove('active-chip'); });
        filterButton.classList.add('active-chip');
        activeNewsFilter = filterButton.getAttribute('data-news-filter').toLowerCase() === 'all' ? 'all' : filterButton.getAttribute('data-news-filter');
        renderNewsArticles();
      });
    });
    if (newsSearch) newsSearch.addEventListener('input', renderNewsArticles);
    document.querySelectorAll('[data-article-id]').forEach(function (button) {
      button.addEventListener('click', function () { openArticle(button.getAttribute('data-article-id')); });
    });
    var articleModalClose = document.getElementById('articleModalClose');
    if (articleModalClose) articleModalClose.addEventListener('click', closeArticle);
    if (articleModal) articleModal.addEventListener('click', function (event) { if (event.target === articleModal) closeArticle(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeArticle(); });
    renderNewsArticles();
  }

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
