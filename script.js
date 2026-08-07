// Multilingual support, navigation, gallery, and site interactivity
(function () {
  'use strict';

  /* ========================================
     Language support
     ======================================== */

  let currentLang = localStorage.getItem('lang') || 'vi';

  function getDictionary() {
    if (
      typeof translations !== 'undefined' &&
      translations[currentLang]
    ) {
      return translations[currentLang];
    }

    return {};
  }

  function getTranslation(key, fallback = '') {
    const dictionary = getDictionary();

    if (dictionary[key] !== undefined) {
      return dictionary[key];
    }

    return fallback;
  }

  function translatePage() {
    const dictionary = getDictionary();

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      const key = element.getAttribute('data-i18n');

      if (dictionary[key] === undefined) {
        console.warn(
          `Missing translation for "${key}" in language "${currentLang}"`
        );
        return;
      }

      if (
        element.tagName === 'INPUT' ||
        element.tagName === 'TEXTAREA'
      ) {
        element.placeholder = dictionary[key];
      } else {
        element.textContent = dictionary[key];
      }
    });
  }

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(function (button) {
      const isActive =
        button.getAttribute('data-lang') === currentLang;

      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function setLanguage(lang) {
    if (
      typeof translations === 'undefined' ||
      !translations[lang]
    ) {
      console.warn(`Unknown language: ${lang}`);
      return;
    }

    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    translatePage();
    updateLangButtons();

    // Rebuild dynamic gallery content in the selected language.
    if (galleryGrid) {
      renderGallery();
    }

    // Update an open lightbox immediately.
    if (
      currentItem &&
      lightbox &&
      lightbox.classList.contains('open')
    ) {
      updateLightbox();
    }
  }

  document.querySelectorAll('.lang-btn').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      setLanguage(button.getAttribute('data-lang'));
    });
  });

  /* ========================================
     Year updater
     ======================================== */

  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ========================================
     Mobile navigation
     ======================================== */

  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');

      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });
  }

  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function (link) {
    const linkPage = link.getAttribute('href');

    if (
      linkPage === currentPage ||
      (linkPage === 'index.html' && currentPage === '')
    ) {
      link.classList.add('active');
    }

    link.addEventListener('click', function () {
      if (nav) {
        nav.classList.remove('open');
      }

      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ========================================
     Contact form
     ======================================== */

  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const message =
        currentLang === 'vi'
          ? 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.'
          : 'Thanks! We will be in touch soon.';

      alert(message);
      form.reset();
    });
  }

  /* ========================================
     Gallery variables
     ======================================== */

  const galleryGrid = document.getElementById('galleryGrid');
  const productTabs = document.querySelectorAll('.product-tab');

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const imageCounter = document.getElementById('imageCounter');

  let currentCategory = 'handbags';
  let currentItem = null;
  let currentImageIndex = 0;

  /* ========================================
     Gallery translation helpers
     ======================================== */

  function getProductTitle(item) {
    const translationKey = `product_${item.id}_title`;

    return getTranslation(translationKey, item.title);
  }

  function getProductDescription(item) {
    const translationKey = `product_${item.id}_desc`;

    return getTranslation(translationKey, item.desc);
  }

  function getCurrentGalleryItems() {
    if (currentCategory === 'hats') {
      return typeof hatItems !== 'undefined'
        ? hatItems
        : [];
    }

    return typeof handbagItems !== 'undefined'
      ? handbagItems
      : [];
  }

  /* ========================================
     Responsive image helpers
     ======================================== */

  function isLocalImage(imagePath) {
    return (
      typeof imagePath === 'string' &&
      imagePath.startsWith('images/')
    );
  }

  function createImageSrcset(imagePath) {
    if (!isLocalImage(imagePath)) {
      return '';
    }

    const basePath = imagePath.replace(/\.[^/.]+$/, '');

    return [
      `${basePath}-400.jpg 400w`,
      `${basePath}-800.jpg 800w`,
      `${basePath}-1200.jpg 1200w`,
      `${basePath}-1600.jpg 1600w`
    ].join(', ');
  }

  function addImageFallback(image, originalPath) {
    image.addEventListener('error', function () {
      // If a resized file fails, retry with the original image.
      if (image.dataset.fallbackAttempted === 'true') {
        console.error('Image could not be loaded:', originalPath);
        return;
      }

      image.dataset.fallbackAttempted = 'true';
      image.removeAttribute('srcset');
      image.removeAttribute('sizes');
      image.src = originalPath;
    });
  }

  /* ========================================
     Render gallery
     ======================================== */

  function renderGallery() {
    if (!galleryGrid) {
      return;
    }

    const items = getCurrentGalleryItems();

    galleryGrid.innerHTML = '';

    items.forEach(function (item) {
      const firstImage =
        Array.isArray(item.images) && item.images.length > 0
          ? item.images[0]
          : '';

      const title = getProductTitle(item);
      const srcset = createImageSrcset(firstImage);

      const galleryItem = document.createElement('article');
      galleryItem.className = 'gallery-item';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'gallery-image-wrapper';
      imageWrapper.dataset.id = String(item.id);
      imageWrapper.setAttribute('role', 'button');
      imageWrapper.setAttribute('tabindex', '0');
      imageWrapper.setAttribute(
        'aria-label',
        `${getTranslation('view', 'View')} ${title}`
      );

      const image = document.createElement('img');
      image.className = 'gallery-image';
      image.src = firstImage;
      image.alt = title;
      image.loading = 'lazy';

      if (srcset) {
        image.srcset = srcset;
        image.sizes =
          '(max-width: 720px) calc(100vw - 2rem), ' +
          '(max-width: 1100px) 33vw, 25vw';
      }

      addImageFallback(image, firstImage);
      imageWrapper.appendChild(image);

      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';

      const viewButton = document.createElement('button');
      viewButton.className = 'gallery-view-btn';
      viewButton.type = 'button';
      viewButton.dataset.id = String(item.id);
      viewButton.textContent = getTranslation('view', 'View');

      overlay.appendChild(viewButton);
      imageWrapper.appendChild(overlay);

      if (item.images.length > 1) {
        const imageCount = document.createElement('span');
        imageCount.className = 'image-count';
        imageCount.textContent = String(item.images.length);
        imageWrapper.appendChild(imageCount);
      }

      const titleElement = document.createElement('h3');
      titleElement.className = 'gallery-item-title';
      titleElement.textContent = title;

      const tagsElement = document.createElement('p');
      tagsElement.className = 'gallery-item-tags';

      if (Array.isArray(item.tags)) {
        item.tags.forEach(function (tag) {
          const tagElement = document.createElement('span');
          tagElement.className = 'tag';
          tagElement.textContent = tag;
          tagsElement.appendChild(tagElement);
        });
      }

      galleryItem.appendChild(imageWrapper);
      galleryItem.appendChild(titleElement);
      galleryItem.appendChild(tagsElement);

      galleryGrid.appendChild(galleryItem);
    });

    attachGalleryButtons(items);
  }

  function attachGalleryButtons(items) {
  if (!galleryGrid) {
    return;
  }

  galleryGrid
    .querySelectorAll('.gallery-image-wrapper')
    .forEach(function (imageWrapper) {
      function openSelectedItem() {
        const productId = Number(imageWrapper.dataset.id);

        const item = items.find(function (product) {
          return product.id === productId;
        });

        if (item) {
          openLightbox(item);
        }
      }

      // Open by clicking anywhere on the image
      imageWrapper.addEventListener('click', function () {
        openSelectedItem();
      });

      // Keyboard accessibility
      imageWrapper.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openSelectedItem();
        }
      });
    });
  }

  /* ========================================
     Gallery category tabs
     ======================================== */

  productTabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      event.preventDefault();

      productTabs.forEach(function (otherTab) {
        otherTab.classList.remove('active');
      });

      tab.classList.add('active');

      currentCategory =
        tab.getAttribute('data-category') || 'handbags';

      renderGallery();
    });
  });

  /* ========================================
     Lightbox
     ======================================== */

  function openLightbox(item) {
    if (!lightbox) {
      return;
    }

    currentItem = item;
    currentImageIndex = 0;

    updateLightbox();

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    if (
      !currentItem ||
      !lightboxImage ||
      !lightboxTitle ||
      !lightboxDesc
    ) {
      return;
    }

    const imagePath =
      currentItem.images[currentImageIndex] || '';

    // Use the original image in the lightbox.
    lightboxImage.removeAttribute('srcset');
    lightboxImage.removeAttribute('sizes');
    lightboxImage.src = imagePath;
    lightboxImage.alt = getProductTitle(currentItem);

    // Translate the lightbox name and subtitle.
    lightboxTitle.textContent =
      getProductTitle(currentItem);

    lightboxDesc.textContent =
      getProductDescription(currentItem);

    if (currentItem.images.length > 1) {
      if (imageCounter) {
        imageCounter.textContent =
          `${currentImageIndex + 1} / ${currentItem.images.length}`;

        imageCounter.style.display = 'block';
      }

      if (lightboxPrev) {
        lightboxPrev.style.display =
          currentImageIndex > 0 ? 'flex' : 'none';
      }

      if (lightboxNext) {
        lightboxNext.style.display =
          currentImageIndex < currentItem.images.length - 1
            ? 'flex'
            : 'none';
      }
    } else {
      if (imageCounter) {
        imageCounter.style.display = 'none';
      }

      if (lightboxPrev) {
        lightboxPrev.style.display = 'none';
      }

      if (lightboxNext) {
        lightboxNext.style.display = 'none';
      }
    }
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove('open');
    document.body.style.overflow = '';

    currentItem = null;
    currentImageIndex = 0;
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function () {
      if (
        currentItem &&
        currentImageIndex > 0
      ) {
        currentImageIndex -= 1;
        updateLightbox();
      }
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', function () {
      if (
        currentItem &&
        currentImageIndex < currentItem.images.length - 1
      ) {
        currentImageIndex += 1;
        updateLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (
      !lightbox ||
      !lightbox.classList.contains('open')
    ) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (
      event.key === 'ArrowLeft' &&
      currentImageIndex > 0
    ) {
      currentImageIndex -= 1;
      updateLightbox();
    }

    if (
      event.key === 'ArrowRight' &&
      currentItem &&
      currentImageIndex < currentItem.images.length - 1
    ) {
      currentImageIndex += 1;
      updateLightbox();
    }
  });

  /* ========================================
     Initial setup
     ======================================== */

  setLanguage(currentLang);
})();
