// Multilingual support, navigation, gallery, and lightbox
(function () {
  'use strict';

  /* ========================================
     Translation helpers
     ======================================== */

  let currentLang = localStorage.getItem('lang') || 'vi';

  function getAllTranslations() {
    if (window.translations) {
      return window.translations;
    }

    if (typeof translations !== 'undefined') {
      return translations;
    }

    return {};
  }

  function getDictionary() {
    const allTranslations = getAllTranslations();

    return allTranslations[currentLang] || {};
  }

  function getTranslation(key, fallback = '') {
    const dictionary = getDictionary();

    if (dictionary[key] !== undefined) {
      return dictionary[key];
    }

    return fallback;
  }

  function getProductTitle(item) {
    if (!item) {
      return '';
    }

    const key = `product_${item.id}_title`;

    return getTranslation(key, item.title || '');
  }

  function getProductDescription(item) {
    if (!item) {
      return '';
    }

    const key = `product_${item.id}_desc`;

    return getTranslation(key, item.desc || '');
  }

  function translatePage() {
    const dictionary = getDictionary();

    document
      .querySelectorAll('[data-i18n]')
      .forEach(function (element) {
        const key = element.getAttribute('data-i18n');

        if (dictionary[key] === undefined) {
          console.warn(
            `Missing "${currentLang}" translation for: ${key}`
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

  function updateLanguageButtons() {
    document
      .querySelectorAll('.lang-btn')
      .forEach(function (button) {
        const isActive =
          button.getAttribute('data-lang') === currentLang;

        button.classList.toggle('active', isActive);
        button.setAttribute(
          'aria-pressed',
          String(isActive)
        );
      });
  }

  /* ========================================
     Gallery variables
     ======================================== */

  const galleryGrid =
    document.getElementById('galleryGrid');

  const productTabs =
    document.querySelectorAll('.product-tab');

  const lightbox =
    document.getElementById('lightbox');

  const lightboxImage =
    document.getElementById('lightboxImage');

  const lightboxTitle =
    document.getElementById('lightboxTitle');

  const lightboxDesc =
    document.getElementById('lightboxDesc');

  const lightboxClose =
    document.getElementById('lightboxClose');

  const lightboxPrev =
    document.getElementById('lightboxPrev');

  const lightboxNext =
    document.getElementById('lightboxNext');

  const imageCounter =
    document.getElementById('imageCounter');

  let currentCategory = 'handbags';
  let currentItem = null;
  let currentImageIndex = 0;

  /* ========================================
     Language switching
     ======================================== */

  function setLanguage(lang) {
    const allTranslations = getAllTranslations();

    if (!allTranslations[lang]) {
      console.warn(`Unknown language: ${lang}`);
      return;
    }

    currentLang = lang;

    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    translatePage();
    updateLanguageButtons();

    // Rebuild dynamically created gallery cards.
    if (galleryGrid) {
      renderGallery();
    }

    // Update the popup immediately if it is open.
    if (
      currentItem &&
      lightbox &&
      lightbox.classList.contains('open')
    ) {
      updateLightbox();
    }
  }

  document
    .querySelectorAll('.lang-btn')
    .forEach(function (button) {
      button.addEventListener(
        'click',
        function (event) {
          event.preventDefault();

          const language =
            button.getAttribute('data-lang');

          setLanguage(language);
        }
      );
    });

  /* ========================================
     Mobile navigation
     ======================================== */

  const nav =
    document.getElementById('mainNav');

  const navToggle =
    document.getElementById('navToggle');

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
    window.location.pathname.split('/').pop() ||
    'index.html';

  document
    .querySelectorAll('.nav-link')
    .forEach(function (link) {
      const href = link.getAttribute('href');

      if (
        href === currentPage ||
        (href === 'index.html' && currentPage === '')
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }

      link.addEventListener('click', function () {
        if (nav) {
          nav.classList.remove('open');
        }

        if (navToggle) {
          navToggle.setAttribute(
            'aria-expanded',
            'false'
          );
        }
      });
    });

  /* ========================================
     Year updater
     ======================================== */

  const yearElement =
    document.getElementById('year');

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }

  /* ========================================
     Contact form
     ======================================== */

  const contactForm =
    document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener(
      'submit',
      function (event) {
        event.preventDefault();

        const message =
          currentLang === 'vi'
            ? 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.'
            : 'Thanks! We will be in touch soon.';

        alert(message);
        contactForm.reset();
      }
    );
  }

  /* ========================================
     Gallery data helpers
     ======================================== */

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

    const basePath =
      imagePath.replace(/\.[^/.]+$/, '');

    return [
      `${basePath}-400.jpg 400w`,
      `${basePath}-800.jpg 800w`,
      `${basePath}-1200.jpg 1200w`,
      `${basePath}-1600.jpg 1600w`
    ].join(', ');
  }

  function addImageFallback(
    imageElement,
    originalPath
  ) {
    imageElement.addEventListener(
      'error',
      function () {
        if (
          imageElement.dataset.fallbackAttempted ===
          'true'
        ) {
          console.error(
            'Could not load image:',
            originalPath
          );

          return;
        }

        imageElement.dataset.fallbackAttempted =
          'true';

        imageElement.removeAttribute('srcset');
        imageElement.removeAttribute('sizes');
        imageElement.src = originalPath;
      }
    );
  }

  /* ========================================
     Gallery rendering
     ======================================== */

  function renderGallery() {
    if (!galleryGrid) {
      return;
    }

    const items = getCurrentGalleryItems();

    galleryGrid.innerHTML = '';

    items.forEach(function (item) {
      const firstImage =
        Array.isArray(item.images) &&
        item.images.length > 0
          ? item.images[0]
          : '';

      const translatedTitle =
        getProductTitle(item);

      const responsiveSrcset =
        createImageSrcset(firstImage);

      const galleryItem =
        document.createElement('article');

      galleryItem.className = 'gallery-item';

      /*
        The entire image wrapper is clickable.
      */
      const imageWrapper =
        document.createElement('div');

      imageWrapper.className =
        'gallery-image-wrapper';

      imageWrapper.dataset.id =
        String(item.id);

      imageWrapper.setAttribute(
        'role',
        'button'
      );

      imageWrapper.setAttribute(
        'tabindex',
        '0'
      );

      imageWrapper.setAttribute(
        'aria-label',
        `${getTranslation('view', 'View')} ${translatedTitle}`
      );

      const image =
        document.createElement('img');

      image.className = 'gallery-image';
      image.src = firstImage;
      image.alt = translatedTitle;
      image.loading = 'lazy';

      if (responsiveSrcset) {
        image.srcset = responsiveSrcset;

        image.sizes =
          '(max-width: 720px) calc(100vw - 2rem), ' +
          '(max-width: 1100px) 33vw, 25vw';
      }

      addImageFallback(image, firstImage);

      imageWrapper.appendChild(image);

      const overlay =
        document.createElement('div');

      overlay.className = 'gallery-overlay';

      const viewButton =
        document.createElement('button');

      viewButton.className =
        'gallery-view-btn';

      viewButton.type = 'button';

      /*
        The wrapper is the main interactive element,
        so this visual button does not need a second
        keyboard focus.
      */
      viewButton.tabIndex = -1;
      viewButton.textContent =
        getTranslation('view', 'View');

      overlay.appendChild(viewButton);
      imageWrapper.appendChild(overlay);

      if (
        Array.isArray(item.images) &&
        item.images.length > 1
      ) {
        const countBadge =
          document.createElement('span');

        countBadge.className = 'image-count';
        countBadge.textContent =
          String(item.images.length);

        imageWrapper.appendChild(countBadge);
      }

      const titleElement =
        document.createElement('h3');

      titleElement.className =
        'gallery-item-title';

      titleElement.textContent =
        translatedTitle;

      const tagsElement =
        document.createElement('p');

      tagsElement.className =
        'gallery-item-tags';

      if (Array.isArray(item.tags)) {
        item.tags.forEach(function (tag) {
          const tagElement =
            document.createElement('span');

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

    attachGalleryListeners(items);
  }

  /* ========================================
     Click the entire gallery image
     ======================================== */

  function attachGalleryListeners(items) {
    if (!galleryGrid) {
      return;
    }

    galleryGrid
      .querySelectorAll('.gallery-image-wrapper')
      .forEach(function (imageWrapper) {
        function openSelectedProduct() {
          const productId =
            Number(imageWrapper.dataset.id);

          const selectedItem =
            items.find(function (item) {
              return item.id === productId;
            });

          if (selectedItem) {
            openLightbox(selectedItem);
          }
        }

        imageWrapper.addEventListener(
          'click',
          openSelectedProduct
        );

        imageWrapper.addEventListener(
          'keydown',
          function (event) {
            if (
              event.key === 'Enter' ||
              event.key === ' '
            ) {
              event.preventDefault();
              openSelectedProduct();
            }
          }
        );
      });
  }

  /* ========================================
     Gallery category tabs
     ======================================== */

  productTabs.forEach(function (tab) {
    tab.addEventListener(
      'click',
      function (event) {
        event.preventDefault();

        productTabs.forEach(
          function (otherTab) {
            otherTab.classList.remove('active');
          }
        );

        tab.classList.add('active');

        currentCategory =
          tab.getAttribute('data-category') ||
          'handbags';

        renderGallery();
      }
    );
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

    const titleKey =
      `product_${currentItem.id}_title`;

    const descriptionKey =
      `product_${currentItem.id}_desc`;

    const translatedTitle =
      getProductTitle(currentItem);

    const translatedDescription =
      getProductDescription(currentItem);

    /*
      The popup uses the original uploaded image.
    */
    lightboxImage.removeAttribute('srcset');
    lightboxImage.removeAttribute('sizes');
    lightboxImage.src = imagePath;
    lightboxImage.alt = translatedTitle;

    /*
      These data-i18n attributes allow translatePage()
      to update the open popup when the language changes.
    */
    lightboxTitle.setAttribute(
      'data-i18n',
      titleKey
    );

    lightboxDesc.setAttribute(
      'data-i18n',
      descriptionKey
    );

    lightboxTitle.textContent =
      translatedTitle;

    lightboxDesc.textContent =
      translatedDescription;

    if (currentItem.images.length > 1) {
      if (imageCounter) {
        imageCounter.textContent =
          `${currentImageIndex + 1} / ${currentItem.images.length}`;

        imageCounter.style.display = 'block';
      }

      if (lightboxPrev) {
        lightboxPrev.style.display =
          currentImageIndex > 0
            ? 'flex'
            : 'none';
      }

      if (lightboxNext) {
        lightboxNext.style.display =
          currentImageIndex <
          currentItem.images.length - 1
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

    if (lightboxTitle) {
      lightboxTitle.removeAttribute('data-i18n');
    }

    if (lightboxDesc) {
      lightboxDesc.removeAttribute('data-i18n');
    }
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener(
      'click',
      function () {
        if (
          currentItem &&
          currentImageIndex > 0
        ) {
          currentImageIndex -= 1;
          updateLightbox();
        }
      }
    );
  }

  if (lightboxNext) {
    lightboxNext.addEventListener(
      'click',
      function () {
        if (
          currentItem &&
          currentImageIndex <
          currentItem.images.length - 1
        ) {
          currentImageIndex += 1;
          updateLightbox();
        }
      }
    );
  }

  if (lightboxClose) {
    lightboxClose.addEventListener(
      'click',
      closeLightbox
    );
  }

  if (lightbox) {
    lightbox.addEventListener(
      'click',
      function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      }
    );
  }

  document.addEventListener(
    'keydown',
    function (event) {
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
        currentImageIndex <
        currentItem.images.length - 1
      ) {
        currentImageIndex += 1;
        updateLightbox();
      }
    }
  );

  /* ========================================
     Initialize website
     ======================================== */

  setLanguage(currentLang);
})();