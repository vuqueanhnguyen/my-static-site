// Gallery data - easily update with your own images and descriptions
const galleryItems = [
  {
    id: 1,
    title: 'Buttercup Tote',
    desc: 'Soft leather finish with delicate embroidered details and a roomy interior.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tote', 'Summer', 'Featured']
  },
  {
    id: 2,
    title: 'Classic Satchel',
    desc: 'Structured lines and subtle hardware make this bag a polished everyday companion.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Satchel', 'Professional', 'Classic']
  },
  {
    id: 3,
    title: 'Woven Crossbody',
    desc: 'Lightweight, elegant, and perfect for carrying essentials with comfort and charm.',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=800&q=80',
    tags: ['Crossbody', 'Casual', 'Travel']
  },
  {
    id: 4,
    title: 'Evening Clutch',
    desc: 'Hand-stitched details and a refined silhouette for special nights out.',
    image: 'https://images.unsplash.com/photo-1520962915462-2f277ed0b07a?auto=format&fit=crop&w=800&q=80',
    tags: ['Clutch', 'Evening', 'Special']
  },
  {
    id: 5,
    title: 'Leather Backpack',
    desc: 'Functional and stylish, perfect for work or travel. Hand-dyed premium leather.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    tags: ['Backpack', 'Travel', 'Professional']
  },
  {
    id: 6,
    title: 'Vintage Hobo Bag',
    desc: 'Soft, slouchy design with rich texture and vintage-inspired hardware details.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
    tags: ['Hobo', 'Vintage', 'Casual']
  },
  {
    id: 7,
    title: 'Minaudière Box Bag',
    desc: 'Compact and elegant, with a structured frame and chain strap for evenings.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Box Bag', 'Elegant', 'Small']
  },
  {
    id: 8,
    title: 'Weekender Tote',
    desc: 'Spacious interior with sturdy handles, perfect for weekend getaways or daily errands.',
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=800&q=80',
    tags: ['Tote', 'Large', 'Travel']
  }
];

// Render gallery on page load
document.addEventListener('DOMContentLoaded', function() {
  const galleryGrid = document.getElementById('galleryGrid');
  
  galleryItems.forEach(item => {
    const galleryItem = document.createElement('article');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
      <div class="gallery-image-wrapper">
        <img src="${item.image}" alt="${item.title}" class="gallery-image" loading="lazy">
        <div class="gallery-overlay">
          <button class="gallery-view-btn" data-id="${item.id}">View</button>
        </div>
      </div>
      <h3 class="gallery-item-title">${item.title}</h3>
      <p class="gallery-item-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</p>
    `;
    galleryGrid.appendChild(galleryItem);
  });
  
  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  
  document.querySelectorAll('.gallery-view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      const item = galleryItems.find(i => i.id === id);
      
      lightboxImage.src = item.image;
      lightboxTitle.textContent = item.title;
      lightboxDesc.textContent = item.desc;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
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
});
