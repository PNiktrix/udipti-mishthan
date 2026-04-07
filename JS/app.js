// ============================================================
// app.js — Main app initialisation and page routing
// Path-aware: works from root (/) AND from pages/ subdirectory
// ============================================================

const App = (() => {

  // ---- Determine if we're inside pages/ subdirectory ----
  const isInPages = window.location.pathname.includes('/pages/');
  const BASE = isInPages ? '../' : '';

  // ---- Determine current page ----
  const getPage = () => {
    const path = window.location.pathname;
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    if (path.includes('gallery')) return 'gallery';
    if (path.includes('festival')) return 'festival';
    return 'home';
  };

  // ---- Build navigation HTML ----
  const buildNav = () => {
    const page = getPage();
    return `
      <nav class="main-nav" id="main-nav">
        <div class="nav-inner">
          <a href="${BASE}index.html" class="nav-logo">
            <img src="${BASE}data/images/logo.png" alt="Udipti Mishthan"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
            <span class="nav-logo-text" style="display:none">🍬 Udipti Mishthan</span>
          </a>
          <ul class="nav-links" id="nav-links-list">
            <li><a href="${BASE}index.html" class="${page === 'home' ? 'active' : ''}">Home</a></li>
            <li><a href="${BASE}index.html#products">Sweets</a></li>
            <li><a href="${BASE}pages/festival.html" class="${page === 'festival' ? 'active' : ''}">Festivals</a></li>
            <li><a href="${BASE}pages/gallery.html" class="${page === 'gallery' ? 'active' : ''}">Gallery</a></li>
            <li><a href="${BASE}pages/about.html" class="${page === 'about' ? 'active' : ''}">About Us</a></li>
            <li><a href="${BASE}pages/contact.html" class="${page === 'contact' ? 'active' : ''}">Contact</a></li>
          </ul>
          <div class="nav-actions">
            <button class="nav-icon-btn" id="search-toggle" aria-label="Search" title="Search sweets">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button class="nav-icon-btn" id="wishlist-toggle" aria-label="Wishlist" title="My Wishlist">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="wishlist-badge nav-badge" style="display:none">0</span>
            </button>
            <button class="nav-icon-btn" id="cart-toggle" aria-label="Cart" title="My Cart">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span class="cart-badge nav-badge" style="display:none">0</span>
            </button>
            <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div class="nav-search-bar" id="nav-search-bar">
          <input type="text" id="nav-search-input"
                 placeholder="Search sweets... (e.g. Besan Ladoo, Modak)"
                 autocomplete="off"
                 oninput="App.handleSearch(this.value)">
          <button onclick="document.getElementById('nav-search-bar').classList.remove('open')" aria-label="Close search">✕</button>
        </div>
      </nav>
    `;
  };

  // ---- Build footer ----
  const buildFooter = () => `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">🍬 Udipti Mishthan</div>
          <p class="footer-tagline">Sabke Mann ko bhaye,<br>muh mai jaate hi ghul jaaye</p>
          <div class="footer-social">
            <a href="${CONFIG.instagram}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="${CONFIG.facebook}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.326c-.176.531-.892 1.035-1.466 1.168-.384.088-.882.158-2.562-.551-2.215-.929-3.649-3.165-3.759-3.314-.109-.148-1-1.328-1-2.543s.636-1.81.864-2.064c.229-.253.497-.316.663-.316l.479.009c.154.007.362-.059.566.432.21.51.713 1.752.776 1.879.063.127.105.274.021.441l-.291.504c-.128.222-.255.468-.109.728.673 1.183 1.345 1.888 2.369 2.572.22.144.347.12.474-.073l.632-.896c.126-.232.253-.194.424-.116.172.077 1.079.509 1.264.601.185.093.308.139.354.217.045.079.045.455-.131.983z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="${BASE}index.html">Home</a></li>
            <li><a href="${BASE}index.html#products">Our Sweets</a></li>
            <li><a href="${BASE}pages/festival.html">Festival Specials</a></li>
            <li><a href="${BASE}pages/gallery.html">Gallery</a></li>
            <li><a href="${BASE}pages/about.html">About Us</a></li>
            <li><a href="${BASE}pages/contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Sweet Categories</h4>
          <ul>
            <li><a href="${BASE}index.html#products">Ladoo</a></li>
            <li><a href="${BASE}index.html#products">Modak</a></li>
            <li><a href="${BASE}index.html#products">Halwa</a></li>
            <li><a href="${BASE}index.html#products">Snacks</a></li>
            <li><a href="${BASE}index.html#products">Gift Boxes</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Contact Us</h4>
          <p>📍 ${CONFIG.address}</p>
          <p>📞 <a href="tel:+91${CONFIG.phone1}">${CONFIG.phone1}</a></p>
          <p>📞 <a href="tel:+91${CONFIG.phone2}">${CONFIG.phone2}</a></p>
          <p>📧 <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></p>
          <p>🕐 Mon–Fri: ${CONFIG.openingHours.weekdays}</p>
          <p>🕐 Sat–Sun: ${CONFIG.openingHours.weekends}</p>
          <p style="margin-top:8px;font-size:0.8rem;color:rgba(255,255,255,0.5)">⏰ ${CONFIG.orderLeadTime}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} Udipti Mishthan. All rights reserved. Made with 💛 in Mumbai.</p>
      </div>
    </footer>
  `;

  // ---- Cart drawer ----
  const buildCartDrawer = () => `
    <div class="cart-drawer" id="cart-drawer" role="dialog" aria-label="Shopping Cart" aria-modal="true">
      <div class="cart-backdrop" onclick="App.toggleCart()"></div>
      <div class="cart-panel">
        <div class="cart-header">
          <h3>🛒 Your Cart</h3>
          <button onclick="App.toggleCart()" aria-label="Close cart">✕</button>
        </div>
        <div id="cart-empty" class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <a href="${BASE}index.html#products" onclick="App.toggleCart()">Browse Sweets</a>
        </div>
        <div id="cart-items-list" class="cart-items-list"></div>
        <div class="cart-footer" id="cart-footer" style="display:none">
          <div class="cart-total-row">
            <span>Total:</span>
            <strong id="cart-total">₹0</strong>
          </div>
          <button class="btn-whatsapp-order" onclick="Cart.orderOnWhatsApp()">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            Order on WhatsApp
          </button>
          <button class="btn-clear-cart" onclick="Cart.clear()">🗑 Clear Cart</button>
        </div>
      </div>
    </div>
  `;

  // ---- Wishlist drawer ----
  const buildWishlistDrawer = () => `
    <div class="wishlist-drawer" id="wishlist-drawer" role="dialog" aria-label="Wishlist" aria-modal="true">
      <div class="cart-backdrop" onclick="App.toggleWishlist()"></div>
      <div class="cart-panel">
        <div class="cart-header">
          <h3>♥ My Wishlist</h3>
          <button onclick="App.toggleWishlist()" aria-label="Close wishlist">✕</button>
        </div>
        <div id="wishlist-empty" class="cart-empty">
          <div class="cart-empty-icon">♥</div>
          <p>Your wishlist is empty</p>
          <a href="${BASE}index.html#products" onclick="App.toggleWishlist()">Browse Sweets</a>
        </div>
        <div id="wishlist-grid" class="wishlist-grid"></div>
      </div>
    </div>
  `;

  // ---- Toast ----
  const buildToast = () => `
    <div class="cart-toast" id="cart-toast" role="status" aria-live="polite">
      <span>🛒 Added <strong class="toast-name"></strong> to cart!</span>
    </div>
  `;

  // ---- Product modal container ----
  const buildModalContainer = () => `<div id="product-modal" class="product-modal"></div>`;

  // ---- Inject shared UI ----
  const injectShared = () => {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = buildNav();

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = buildFooter();

    document.body.insertAdjacentHTML('beforeend', buildCartDrawer());
    document.body.insertAdjacentHTML('beforeend', buildWishlistDrawer());
    document.body.insertAdjacentHTML('beforeend', buildToast());
    document.body.insertAdjacentHTML('beforeend', buildModalContainer());

    // Nav scroll effect
    const nav = document.getElementById('main-nav');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      }, { passive: true });
    }

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links-list');
    hamburger?.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when link clicked
    navLinks?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
      });
    });

    // Cart toggle
    document.getElementById('cart-toggle')?.addEventListener('click', () => App.toggleCart());

    // Wishlist toggle
    document.getElementById('wishlist-toggle')?.addEventListener('click', () => App.toggleWishlist());

    // Search toggle
    document.getElementById('search-toggle')?.addEventListener('click', () => {
      document.getElementById('nav-search-bar')?.classList.toggle('open');
      document.getElementById('nav-search-input')?.focus();
    });

    // Close drawers on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.getElementById('cart-drawer')?.classList.remove('open');
        document.getElementById('wishlist-drawer')?.classList.remove('open');
        document.getElementById('nav-search-bar')?.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  };

  // ---- Toggle cart ----
  const toggleCart = () => {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    const isOpening = !drawer.classList.contains('open');
    drawer.classList.toggle('open');
    document.body.style.overflow = isOpening ? 'hidden' : '';
    if (isOpening) Cart.renderCartDrawer();
  };

  // ---- Toggle wishlist ----
  const toggleWishlist = () => {
    const drawer = document.getElementById('wishlist-drawer');
    if (!drawer) return;
    const isOpening = !drawer.classList.contains('open');
    drawer.classList.toggle('open');
    document.body.style.overflow = isOpening ? 'hidden' : '';
    if (isOpening) Wishlist.renderWishlistPage(Products.getAll());
  };

  // ---- Search handler ----
  const handleSearch = (value) => {
    if (typeof Filter !== 'undefined') {
      Filter.setSearch(value);
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // ---- Render category buttons ----
  const renderCategoryButtons = () => {
    const container = document.getElementById('category-buttons');
    if (!container) return;
    container.innerHTML = CONFIG.categories.map(cat => `
      <button class="cat-btn ${cat.id === 'all' ? 'active' : ''}"
        data-cat="${cat.id}"
        onclick="Filter.setCategory('${cat.id}')">
        <span class="cat-icon">${cat.icon}</span>
        <span>${cat.label}</span>
      </button>
    `).join('');
  };

  // ---- Render special category buttons ----
  const renderSpecialCatButtons = () => {
    const container = document.getElementById('special-cat-buttons');
    if (!container) return;
    container.innerHTML = CONFIG.specialCategories.map(cat => `
      <button class="special-cat-btn"
        data-option="${cat.filter}"
        onclick="Filter.setCustomOption('${cat.filter}')">
        ${cat.icon} ${cat.label}
      </button>
    `).join('');
  };

  // ---- Render reviews ----
  const renderReviews = async () => {
    const container = document.getElementById('reviews-grid');
    if (!container) return;
    try {
      const res = await fetch(`${BASE}data/reviews.json`);
      if (!res.ok) throw new Error('Failed');
      const reviews = await res.json();
      container.innerHTML = reviews.map(r => `
        <div class="review-card">
          <div class="review-header">
            <div class="reviewer-avatar">${r.avatar}</div>
            <div class="reviewer-info">
              <div class="reviewer-name">${r.name}</div>
              <div class="reviewer-location">📍 ${r.location}</div>
            </div>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          </div>
          <p class="review-text">"${r.comment}"</p>
          <div class="review-footer">
            <span class="review-product">🍬 ${r.product}</span>
            <span class="review-date">${new Date(r.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      `).join('');
    } catch (e) {
      console.warn('Reviews not loaded:', e);
    }
  };

  // ---- Render festival preview ----
  const renderFestivalPreview = () => {
    const container = document.getElementById('festival-preview');
    if (!container) return;
    container.innerHTML = CONFIG.festivals.map(f => `
      <a href="${BASE}pages/festival.html#${f.id}" class="festival-card">
        <div class="festival-icon">${f.icon}</div>
        <div class="festival-name">${f.name}</div>
        <div class="festival-desc">${f.description}</div>
        <div class="festival-cta">Shop Now →</div>
      </a>
    `).join('');
  };

  // ---- Home page init ----
  const initHome = () => {
    renderCategoryButtons();
    Filter.apply();
    renderSpecialCatButtons();
    renderReviews();
    renderFestivalPreview();

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => Filter.setSort(e.target.value));
    }
  };

  // ---- Main init ----
  const init = async () => {
    injectShared();
    await Products.load(BASE);
    Cart.updateBadge();
    Wishlist.updateBadge();

    const page = getPage();
    if (page === 'home') initHome();
  };

  return { init, toggleCart, toggleWishlist, handleSearch, initHome, BASE };
})();

window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());