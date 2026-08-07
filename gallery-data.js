// Gallery data - Handbags and Hats collections (with multiple images per product)
const handbagItems = [
  {
    id: 1,
    title: 'Handmade crochet bag',
    desc: 'The handbag stands out for the meticulous attention to detail in every crochet stitch and its elegant design',
    images: [
      'images/Bag1_1.jpg',
      'images/Bag1_2.jpg',
      'images/Bag1_3.jpg',
      'images/Bag1_4.jpg'
    ],
    tags: ['Crochet1', 'Summer', 'Featured']
  },
  {
    id: 2,
    title: 'Handmade crochet bag 2',
    desc: 'Structured lines and subtle hardware make this bag a polished everyday companion.',
    images: [
      'images/Bag2_1.jpg',
      'images/Bag2_2.jpg',
      'images/Bag2_3.jpg',
      'images/Bag2_4.jpg'
    ],
    tags: ['Crochet2', 'Professional', 'Classic']
  },
  {
    id: 3,
    title: 'Handmade crochet bag 3',
    desc: 'Lightweight, elegant, and perfect for carrying essentials with comfort and charm.',
    images: [
      'images/Bag3_1.jpg',
      'images/Bag3_2.jpg',
      'images/Bag3_3.jpg',
      'images/Bag3_4.jpg'
    ],
    tags: ['Crossbody', 'Casual', 'Travel']
  },
  {
    id: 4,
    title: 'Handmade crochet bag 4',
    desc: 'Hand-stitched details and a refined silhouette for special nights out.',
    images: [
      'images/Bag4_1.jpg',
      'images/Bag4_2.jpg',
      'images/Bag4_3.jpg',
      'images/Bag4_4.jpg'
    ],
    tags: ['Clutch', 'Evening', 'Special']
  }
  /*,
  {
    id: 5,
    title: 'Leather Backpack',
    desc: 'Functional and stylish, perfect for work or travel. Hand-dyed premium leather.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Backpack', 'Travel', 'Professional']
  },
  {
    id: 6,
    title: 'Vintage Hobo Bag',
    desc: 'Soft, slouchy design with rich texture and vintage-inspired hardware details.',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Hobo', 'Vintage', 'Casual']
  },
  {
    id: 7,
    title: 'Minaudière Box Bag',
    desc: 'Compact and elegant, with a structured frame and chain strap for evenings.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520962915462-2f277ed0b07a?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Box Bag', 'Elegant', 'Small']
  },
  {
    id: 8,
    title: 'Weekender Tote',
    desc: 'Spacious interior with sturdy handles, perfect for weekend getaways or daily errands.',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Tote', 'Large', 'Travel']
  }
  */
];

const hatItems = [
  {
    id: 101,
    title: 'Straw Summer Hat',
    desc: 'Lightweight and breathable, perfect for sunny days. Handwoven natural straw with silk band.',
    images: [
      'https://images.unsplash.com/photo-1523521041103-b860113b3b78?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529631819178-1bffc26076b5?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Straw', 'Summer', 'Featured']
  },
  {
    id: 102,
    title: 'Straw Summer Hat 2',
    desc: 'Classic French-inspired beret in soft merino wool. Warm and stylish for any season.',
    images: [
      'https://images.unsplash.com/photo-1529631819178-1bffc26076b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539076519371-39c669300bf0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588350921529-8ac0c3a6b89f?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Beret', 'Classic', 'Warm']
  },
  {
    id: 103,
    title: 'Straw Summer Hat 3',
    desc: 'Elegant felt hat with a broad brim, perfect for sun protection and sophisticated style.',
    images: [
      'https://images.unsplash.com/photo-1539076519371-39c669300bf0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533022266282-e7bdf34f27a5?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Felt', 'Elegant', 'Sun Protection']
  },
  {
    id: 104,
    title: 'Casual Baseball Cap',
    desc: 'Comfortable and versatile cotton cap with embroidered details. Perfect for everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1588350921529-8ac0c3a6b89f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523521041103-b860113b3b78?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529631819178-1bffc26076b5?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Cap', 'Casual', 'Sports']
  },
  {
    id: 105,
    title: 'Vintage Cloche Hat',
    desc: 'Timeless 1920s-inspired cloche hat in soft fabric. Perfect for vintage lovers.',
    images: [
      'https://images.unsplash.com/photo-1533022266282-e7bdf34f27a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588368514544-77706fa90dc6?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Vintage', 'Elegant', 'Retro']
  },
  {
    id: 106,
    title: 'Knit Beanie',
    desc: 'Cozy and warm knit beanie, hand-knitted with premium yarn. Winter essential.',
    images: [
      'https://images.unsplash.com/photo-1588368514544-77706fa90dc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523521041103-b860113b3b78?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539076519371-39c669300bf0?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Beanie', 'Winter', 'Cozy']
  }
];

// Render gallery on page load
document.addEventListener('DOMContentLoaded', function() {
  const galleryGrid = document.getElementById('galleryGrid');
  const productTabs = document.querySelectorAll('.product-tab');
  let currentCategory = 'handbags';
  
  function renderGallery(items) {
    galleryGrid.innerHTML = '';
    items.forEach(item => {
      const galleryItem = document.createElement('article');
      galleryItem.className = 'gallery-item';
      // use the original uploaded image as the primary src to avoid missing resized filenames
      const firstImage = item.images[0] || '';
      // build srcset hints (optional) but keep original image as fallback
      
      let srcset = '';
      if(firstImage.startsWith('images/')) {
        const base = firstImage.replace(/\.[^/.]+$/, '');
        srcset = `${base}-400.jpg 400w, ${base}-800.jpg 800w, ${base}-1200.jpg 1200w, ${base}-1600.jpg 1600w`;
      }
      
      galleryItem.innerHTML = `
        <div class="gallery-image-wrapper">
          <img src="${firstImage}" srcset="${srcset}" sizes="(max-width:600px) 100vw, (max-width:1100px) 50vw, 33vw" alt="${item.title}" class="gallery-image" loading="lazy">
          <div class="gallery-overlay">
            <button class="gallery-view-btn" data-id="${item.id}">View</button>
          </div>
          ${item.images.length > 1 ? `<span class="image-count">${item.images.length}</span>` : ''}
        </div>
        <h3 class="gallery-item-title">${item.title}</h3>
        <p class="gallery-item-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</p>
      `;
      galleryGrid.appendChild(galleryItem);
    });
    attachLightboxListeners(items);
  }
  
  // Tab switching
  productTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      productTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderGallery(currentCategory === 'handbags' ? handbagItems : hatItems);
    });
  });
  
  function attachLightboxListeners(items) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const imageCounter = document.getElementById('imageCounter');
    
    let currentImageIndex = 0;
    let currentItem = null;
    
    function openLightbox(item) {
      currentItem = item;
      currentImageIndex = 0;
      updateLightboxImage();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    
    function updateLightboxImage() {
      if(!currentItem) return;

      // load the original uploaded image as the lightbox source
      const rawPath = currentItem.images[currentImageIndex] || '';
      lightboxImage.src = rawPath;
      // remove any srcset to avoid browser selecting a missing file
      lightboxImage.removeAttribute('srcset');

      lightboxTitle.textContent = currentItem.title;
      lightboxDesc.textContent = currentItem.desc;

      // Update image counter and button visibility
      if(currentItem.images.length > 1) {
        imageCounter.textContent = `${currentImageIndex + 1} / ${currentItem.images.length}`;
        imageCounter.style.display = 'block';
        lightboxPrev.style.display = currentImageIndex > 0 ? 'block' : 'none';
        lightboxNext.style.display = currentImageIndex < currentItem.images.length - 1 ? 'block' : 'none';
      } else {
        imageCounter.style.display = 'none';
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
      }
    }
    
    document.querySelectorAll('.gallery-view-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        const item = items.find(i => i.id === id);
        openLightbox(item);
      });
    });
    
    lightboxPrev.addEventListener('click', function() {
      if(currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
      }
    });
    
    lightboxNext.addEventListener('click', function() {
      if(currentItem && currentImageIndex < currentItem.images.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
      }
    });
    
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
      if(e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Initialize with handbags
  renderGallery(handbagItems);
});