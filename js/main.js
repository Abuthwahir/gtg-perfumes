/* =============================
   GTG Perfumes - Main JavaScript
   ============================= */

document.addEventListener('DOMContentLoaded', () => {
  const fragranceGallerySets = {
    original: [
      { src: 'assets/OriginalAngle1.png', alt: 'GTG Perfume - Original angle 1' },
      { src: 'assets/OriginalAngle2.png', alt: 'GTG Perfume - Original angle 2' },
      { src: 'assets/OriginalAngle3.png', alt: 'GTG Perfume - Original angle 3' },
    ],
    lily: [
      { src: 'assets/LilyAngle1.png', alt: 'GTG Perfume - Lily angle 1' },
      { src: 'assets/LilyAngle2.png', alt: 'GTG Perfume - Lily angle 2' },
      { src: 'assets/LilyAngle3.png', alt: 'GTG Perfume - Lily angle 3' },
    ],
    rose: [
      { src: 'assets/RoseAngle1.png', alt: 'GTG Perfume - Rose angle 1' },
      { src: 'assets/RoseAngle2.png', alt: 'GTG Perfume - Rose angle 2' },
      { src: 'assets/RoseAngle3.png', alt: 'GTG Perfume - Rose angle 3' },
    ],
  };
  const fragranceBottleImages = {
    original: { src: 'assets/original.png', alt: 'Original bottle' },
    lily: { src: 'assets/Lily.png', alt: 'Lily bottle' },
    rose: { src: 'assets/Rose.png', alt: 'Rose bottle' },
  };
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const galleryImages = Array.from(document.querySelectorAll('.gallery-main .gallery-img'));
  const galleryDots = Array.from(document.querySelectorAll('.gallery-dot'));
  const galleryThumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
  const galleryMain = document.querySelector('.gallery-main');
  const prevArrow = document.querySelector('.gallery-arrow.prev');
  const nextArrow = document.querySelector('.gallery-arrow.next');
  const subCards = Array.from(document.querySelectorAll('.sub-card'));
  const fragranceOptions = Array.from(document.querySelectorAll('.frag-option'));
  const accordionItems = Array.from(document.querySelectorAll('.accordion-item'));
  const statsSection = document.querySelector('.stats-section');
  const fadeElements = Array.from(document.querySelectorAll('.fade-in-up'));
  const lazyImages = Array.from(document.querySelectorAll('img[data-src]'));
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterInput = document.getElementById('newsletterEmail');
  const newsletterStatus = document.getElementById('newsletterStatus');
  const cartStatus = document.getElementById('cartStatus');
  const navSearchBtn = document.getElementById('navSearchBtn');
  const searchPanel = document.getElementById('searchPanel');
  const siteSearchForm = document.getElementById('siteSearchForm');
  const siteSearchInput = document.getElementById('siteSearchInput');
  const searchPanelStatus = document.getElementById('searchPanelStatus');

  let currentImageIndex = 0;
  let currentThumbIndex = 0;
  let autoSlideId = null;
  let hasCountedStats = false;

  function setMobileNavState(isOpen) {
    if (!hamburger || !mobileNav) {
      return;
    }

    hamburger.classList.toggle('active', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', () => {
    setMobileNavState(!mobileNav?.classList.contains('open'));
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileNavState(false));
  });

  setMobileNavState(false);

  function setSearchPanelStatus(type, message) {
    if (!searchPanelStatus) {
      return;
    }

    searchPanelStatus.hidden = false;
    searchPanelStatus.textContent = message;
    searchPanelStatus.classList.remove('success', 'error');
    searchPanelStatus.classList.add(type);
  }

  function clearSearchPanelStatus() {
    if (!searchPanelStatus) {
      return;
    }

    searchPanelStatus.hidden = true;
    searchPanelStatus.textContent = '';
    searchPanelStatus.classList.remove('success', 'error');
  }

  function setSearchPanelState(isOpen) {
    if (!navSearchBtn || !searchPanel) {
      return;
    }

    searchPanel.classList.toggle('open', isOpen);
    searchPanel.setAttribute('aria-hidden', String(!isOpen));
    navSearchBtn.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      window.setTimeout(() => siteSearchInput?.focus(), 60);
      return;
    }

    clearSearchPanelStatus();
  }

  function highlightSearchTarget(element) {
    if (!element) {
      return;
    }

    element.classList.remove('search-highlight-target');

    window.requestAnimationFrame(() => {
      element.classList.add('search-highlight-target');

      window.setTimeout(() => {
        element.classList.remove('search-highlight-target');
      }, 1800);
    });
  }

  function goToSearchTarget(element, afterScroll) {
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (typeof afterScroll === 'function') {
      window.setTimeout(afterScroll, 120);
    }

    window.setTimeout(() => highlightSearchTarget(element), 240);
  }

  function runSiteSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();

    if (!query) {
      setSearchPanelStatus('error', 'Type a fragrance or section name to search.');
      siteSearchInput?.focus();
      return;
    }

    const productSection = document.getElementById('product');
    const productInfo = document.querySelector('.product-info');
    const collectionSection = document.querySelector('.collection-inner');
    const comparisonSection = document.querySelector('.comparison-inner');
    const footerNewsletter = document.querySelector('.footer-newsletter');
    const homeContent = document.querySelector('.hero-content');
    const singleCard = document.querySelector('.sub-card[data-sub="single"]');
    const doubleCard = document.querySelector('.sub-card[data-sub="double"]');

    const searchTargets = [
      {
        label: 'Original fragrance',
        keywords: ['original'],
        action: () => {
          const option = document.querySelector('.sub-card[data-sub="single"] .frag-option[data-fragrance="original"]');
          singleCard?.click();
          option?.click();
          goToSearchTarget(productSection || productInfo, () => option?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        },
      },
      {
        label: 'Lily fragrance',
        keywords: ['lily'],
        action: () => {
          const option = document.querySelector('.sub-card[data-sub="single"] .frag-option[data-fragrance="lily"]');
          singleCard?.click();
          option?.click();
          goToSearchTarget(productSection || productInfo, () => option?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        },
      },
      {
        label: 'Rose fragrance',
        keywords: ['rose'],
        action: () => {
          const option = document.querySelector('.sub-card[data-sub="single"] .frag-option[data-fragrance="rose"]');
          singleCard?.click();
          option?.click();
          goToSearchTarget(productSection || productInfo, () => option?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        },
      },
      {
        label: 'Product section',
        keywords: ['perfume', 'product', 'fragrance', 'fragrances', 'shop'],
        action: () => goToSearchTarget(productSection || productInfo),
      },
      {
        label: 'Single subscription',
        keywords: ['single subscription', 'single'],
        action: () => {
          singleCard?.click();
          goToSearchTarget(singleCard || productSection);
        },
      },
      {
        label: 'Double subscription',
        keywords: ['double subscription', 'double'],
        action: () => {
          doubleCard?.click();
          goToSearchTarget(doubleCard || productSection);
        },
      },
      {
        label: 'Collection section',
        keywords: ['collection', 'signature', 'scents'],
        action: () => goToSearchTarget(collectionSection),
      },
      {
        label: 'Comparison table',
        keywords: ['compare', 'comparison', 'choice', 'gtg'],
        action: () => goToSearchTarget(comparisonSection),
      },
      {
        label: 'Contact section',
        keywords: ['contact', 'newsletter', 'subscribe', 'email', 'footer'],
        action: () => {
          goToSearchTarget(footerNewsletter, () => newsletterInput?.focus());
        },
      },
      {
        label: 'Home section',
        keywords: ['home', 'hero', 'best life'],
        action: () => goToSearchTarget(homeContent),
      },
    ];

    const match = searchTargets.find((target) => {
      return target.keywords.some((keyword) => query.includes(keyword));
    });

    if (!match) {
      setSearchPanelStatus('error', 'No match found. Try Original, Lily, Rose, Collection, or Contact.');
      return;
    }

    match.action();
    setSearchPanelStatus('success', `Showing ${match.label}.`);
  }

  navSearchBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    setSearchPanelState(!searchPanel?.classList.contains('open'));
  });

  siteSearchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    runSiteSearch(siteSearchInput?.value || '');
  });

  siteSearchInput?.addEventListener('input', () => {
    clearSearchPanelStatus();
  });

  document.addEventListener('click', (event) => {
    if (!searchPanel?.classList.contains('open')) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (searchPanel.contains(target) || navSearchBtn?.contains(target)) {
      return;
    }

    setSearchPanelState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchPanel?.classList.contains('open')) {
      setSearchPanelState(false);
    }
  });

  function showImage(index) {
    if (!galleryImages.length) {
      return;
    }

    currentImageIndex = (index + galleryImages.length) % galleryImages.length;

    const activeThumb = galleryThumbs[currentThumbIndex];
    const activeThumbSlideIndex = activeThumb ? getThumbSlideIndex(activeThumb, currentThumbIndex) : -1;

    if (activeThumbSlideIndex !== currentImageIndex) {
      const matchingThumbIndex = galleryThumbs.findIndex((thumb, thumbIndex) => {
        return getThumbSlideIndex(thumb, thumbIndex) === currentImageIndex;
      });

      currentThumbIndex = matchingThumbIndex >= 0 ? matchingThumbIndex : 0;
    }

    galleryImages.forEach((image, imageIndex) => {
      const isActive = imageIndex === currentImageIndex;
      image.classList.toggle('active', isActive);
      image.setAttribute('aria-hidden', String(!isActive));
    });

    galleryDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentImageIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    galleryThumbs.forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === currentThumbIndex;
      thumb.classList.toggle('active', isActive);
      thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function getThumbSlideIndex(thumb, fallbackIndex) {
    const datasetIndex = Number.parseInt(thumb.dataset.slideIndex || '', 10);
    return Number.isNaN(datasetIndex) ? fallbackIndex : datasetIndex;
  }

  function updateGalleryForFragrance(fragrance) {
    const gallerySet = fragranceGallerySets[fragrance] || fragranceGallerySets.original;

    galleryImages.forEach((image, index) => {
      const nextImage = gallerySet[index];
      if (!nextImage) {
        return;
      }

      image.src = nextImage.src;
      image.alt = nextImage.alt;
    });

    currentImageIndex = 0;
    currentThumbIndex = 0;
    showImage(0);
    startAutoSlide();
  }

  function updateIncludedImages() {
    const singleSelectedFragrance = document.querySelector('.sub-card[data-sub="single"] .frag-option.selected')?.dataset.fragrance || 'original';
    const doubleSelectedFragrance = document.querySelector('.sub-card[data-sub="double"] .fragrance-options[data-fragrance-set="double-one"] .frag-option.selected')?.dataset.fragrance || 'original';
    const singleIncludedImage = document.querySelector('.single-monthly-included-img');
    const doubleIncludedImage = document.querySelector('.double-monthly-included-img');
    const singleImageData = fragranceBottleImages[singleSelectedFragrance] || fragranceBottleImages.original;
    const doubleImageData = fragranceBottleImages[doubleSelectedFragrance] || fragranceBottleImages.original;

    if (singleIncludedImage) {
      singleIncludedImage.src = singleImageData.src;
      singleIncludedImage.alt = singleImageData.alt;
    }

    if (doubleIncludedImage) {
      doubleIncludedImage.src = doubleImageData.src;
      doubleIncludedImage.alt = doubleImageData.alt;
    }
  }

  function startAutoSlide() {
    if (!galleryImages.length) {
      return;
    }

    clearInterval(autoSlideId);
    autoSlideId = window.setInterval(() => showImage(currentImageIndex + 1), 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideId);
    autoSlideId = null;
  }

  prevArrow?.addEventListener('click', () => showImage(currentImageIndex - 1));
  nextArrow?.addEventListener('click', () => showImage(currentImageIndex + 1));

  galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const matchingThumbIndex = galleryThumbs.findIndex((thumb, thumbIndex) => {
        return getThumbSlideIndex(thumb, thumbIndex) === index;
      });

      if (matchingThumbIndex >= 0) {
        currentThumbIndex = matchingThumbIndex;
      }

      showImage(index);
    });
  });

  galleryThumbs.forEach((thumb, index) => {
    thumb.setAttribute('role', 'button');
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('aria-label', `Show product image ${index + 1}`);

    thumb.addEventListener('click', () => {
      currentThumbIndex = index;
      showImage(getThumbSlideIndex(thumb, index));
    });
    thumb.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        currentThumbIndex = index;
        showImage(getThumbSlideIndex(thumb, index));
      }
    });
  });

  galleryMain?.addEventListener('mouseenter', stopAutoSlide);
  galleryMain?.addEventListener('mouseleave', startAutoSlide);

  updateGalleryForFragrance('original');
  updateIncludedImages();

  function getSelectedCard() {
    return document.querySelector('.sub-card.selected') || subCards[0] || null;
  }

  function setSelectedCard(nextCard) {
    subCards.forEach((card) => {
      const isSelected = card === nextCard;
      card.classList.toggle('selected', isSelected);

      const body = card.querySelector('.sub-card-body');
      if (body) {
        body.setAttribute('aria-hidden', String(!isSelected));
      }
    });
  }

  function getSelectedSubscription() {
    return getSelectedCard()?.dataset.sub || 'single';
  }

  function getSelectedFragrances() {
    const selectedCard = getSelectedCard();
    if (!selectedCard) {
      return ['original'];
    }

    const fragranceGroups = Array.from(selectedCard.querySelectorAll('.fragrance-options'));
    if (!fragranceGroups.length) {
      return ['original'];
    }

    return fragranceGroups.map((group) => {
      return group.querySelector('.frag-option.selected')?.dataset.fragrance || 'original';
    });
  }

  function formatLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function updateCartLink() {
    const subscription = getSelectedSubscription();
    const fragrances = getSelectedFragrances();
    const cartButton = document.getElementById('addToCartBtn');
    const cartInfo = document.getElementById('cartInfo');

    if (cartStatus) {
      cartStatus.hidden = true;
      cartStatus.textContent = '';
    }

    if (subscription === 'double' && fragrances.length > 1) {
      const [fragranceOne, fragranceTwo] = fragrances;

      if (cartButton) {
        cartButton.href = `#cart-double-${fragranceOne}-${fragranceTwo}`;
        cartButton.dataset.subscription = subscription;
        cartButton.dataset.variant = `${fragranceOne}-${fragranceTwo}`;
        cartButton.title = `Add to cart: ${formatLabel(subscription)} | ${formatLabel(fragranceOne)} + ${formatLabel(fragranceTwo)}`;
      }

      if (cartInfo) {
        cartInfo.textContent = `${formatLabel(subscription)} | ${formatLabel(fragranceOne)} + ${formatLabel(fragranceTwo)}`;
      }

      return;
    }

    const fragrance = fragrances[0] || 'original';
    const variant = `${fragrance}-subscribe`;

    if (cartButton) {
      cartButton.href = `#cart-${variant}`;
      cartButton.dataset.subscription = subscription;
      cartButton.dataset.variant = variant;
      cartButton.title = `Add to cart: ${formatLabel(subscription)} | ${formatLabel(fragrance)} | Subscribe`;
    }

    if (cartInfo) {
      cartInfo.textContent = `${formatLabel(subscription)} | ${formatLabel(fragrance)} | Subscribe`;
    }
  }

  subCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.frag-option')) {
        return;
      }

      setSelectedCard(card);
      updateCartLink();
    });
  });

  fragranceOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();

      const group = option.closest('.fragrance-options');
      if (!group) {
        return;
      }

      group.querySelectorAll('.frag-option').forEach((item) => item.classList.remove('selected'));
      option.classList.add('selected');

      const radio = option.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }

      const parentCard = option.closest('.sub-card');
      if (parentCard) {
        setSelectedCard(parentCard);
      }

      updateGalleryForFragrance(option.dataset.fragrance || 'original');
      updateIncludedImages();
      updateCartLink();
    });
  });

  setSelectedCard(getSelectedCard());
  updateCartLink();

  document.getElementById('addToCartBtn')?.addEventListener('click', (event) => {
    event.preventDefault();

    const subscription = getSelectedSubscription();
    const fragrances = getSelectedFragrances();
    let message = '';

    if (subscription === 'double' && fragrances.length > 1) {
      message = `Added to cart: ${formatLabel(subscription)} subscription with ${formatLabel(fragrances[0])} and ${formatLabel(fragrances[1])}.`;
    } else {
      const fragrance = fragrances[0] || 'original';
      message = `Added to cart: ${formatLabel(subscription)} subscription, ${formatLabel(fragrance)}, Subscribe.`;
    }

    if (cartStatus) {
      cartStatus.hidden = false;
      cartStatus.textContent = message;
    }

    window.console.log(message);
  });

  function setAccordionState(openItem) {
    accordionItems.forEach((item) => {
      const isOpen = item === openItem;
      const trigger = item.querySelector('.accordion-trigger');
      const icon = item.querySelector('.accordion-icon');

      item.classList.toggle('open', isOpen);
      trigger?.setAttribute('aria-expanded', String(isOpen));

      if (icon) {
        icon.textContent = isOpen ? '-' : '+';
      }
    });
  }

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      setAccordionState(isOpen ? null : item);
    });
  });

  setAccordionState(document.querySelector('.accordion-item.open') || accordionItems[0] || null);

  function countUp(element, target, suffix = '', duration = 2000) {
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);

      element.textContent = `${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window && statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || hasCountedStats) {
          return;
        }

        hasCountedStats = true;

        document.querySelectorAll('.stat-number[data-target]').forEach((element) => {
          const target = Number.parseInt(element.dataset.target || '0', 10);
          const suffix = element.dataset.suffix || '';
          countUp(element, target, suffix);
        });
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  } else {
    document.querySelectorAll('.stat-number[data-target]').forEach((element) => {
      element.textContent = `${element.dataset.target || '0'}${element.dataset.suffix || ''}`;
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    fadeElements.forEach((element) => revealObserver.observe(element));
  } else {
    fadeElements.forEach((element) => element.classList.add('visible'));
  }

  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const image = entry.target;
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
        lazyObserver.unobserve(image);
      });
    }, { threshold: 0.01, rootMargin: '200px' });

    lazyImages.forEach((image) => lazyObserver.observe(image));
  }

  function setNewsletterStatus(type, message) {
    if (!newsletterStatus) {
      return;
    }

    newsletterStatus.hidden = false;
    newsletterStatus.textContent = message;
    newsletterStatus.classList.remove('success', 'error');
    newsletterStatus.classList.add(type);
  }

  newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!newsletterInput) {
      return;
    }

    newsletterInput.value = newsletterInput.value.trim();

    if (!newsletterInput.value || !newsletterInput.checkValidity()) {
      setNewsletterStatus('error', 'Please enter a valid email address.');
      newsletterInput.focus();
      return;
    }

    setNewsletterStatus('success', "Thank you for subscribing. We'll keep you updated.");
    newsletterForm.reset();
  });

  newsletterInput?.addEventListener('input', () => {
    if (!newsletterStatus) {
      return;
    }

    newsletterStatus.hidden = true;
    newsletterStatus.textContent = '';
    newsletterStatus.classList.remove('success', 'error');
  });
});
