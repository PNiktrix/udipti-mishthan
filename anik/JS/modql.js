// ============================================================
// modal.js — Product detail popup modal
// ============================================================

const Modal = (() => {
  let currentProduct = null;
  let selectedWeight = null;
  let selectedOption = null;
  let currentImgIndex = 0;

  const open = (productId) => {
    const product = Products.getById(productId);
    if (!product) return;
    currentProduct = product;
    selectedWeight = product.defaultWeight;
    selectedOption = product.customOptions ? product.customOptions[0] : null;
    currentImgIndex = 0;
    render();
    const modal = document.getElementById('product-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
  };

  const getPrice = () => {
    if (!currentProduct) return 0;
    const prices = currentProduct.prices;
    if (typeof prices === 'object') {
      return prices[selectedWeight] || Object.values(prices)[0];
    }
    return prices;
  };

  const render = () => {
    const p = currentProduct;
    const modal = document.getElementById('product-modal');
    const inWishlist = Wishlist.has(p.id);
    const images = p.images && p.images.length > 0 ? p.images : [p.image];

    const weightOptions = Object.keys(p.prices).map(w => `
      <button class="weight-btn ${w === selectedWeight ? 'active' : ''}"
        onclick="Modal.selectWeight('${w}')">${w}</button>
    `).join('');

    const customOptHtml = p.customOptions ? p.customOptions.map(opt => `
      <button class="custom-opt-btn ${opt === selectedOption ? 'active' : ''}"
        onclick="Modal.selectOption('${opt}')">
        ${CONFIG.customOptions[opt]?.icon || ''} ${CONFIG.customOptions[opt]?.label || opt}
      </button>
    `).join('') : '';

    const thumbnails = images.map((img, i) => `
      <div class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="Modal.setImg(${i})">
        <img src="${img}" alt="${p.name}" onerror="this.src='data/images/placeholder.jpg'">
      </div>
    `).join('');

    modal.innerHTML = `
      <div class="modal-backdrop" onclick="Modal.close()"></div>
      <div class="modal-box">
        <button class="modal-close" onclick="Modal.close()">✕</button>
        <div class="modal-inner">
          <div class="modal-gallery">
            <div class="modal-main-img">
              <img id="modal-main-image" src="${images[0]}" alt="${p.name}"
                onerror="this.src='data/images/placeholder.jpg'">
              ${p.festivalSpecial ? '<span class="festival-badge-modal">Festival Special 🎉</span>' : ''}
            </div>
            ${images.length > 1 ? `<div class="modal-thumbs">${thumbnails}</div>` : ''}
          </div>
          <div class="modal-details">
            <div class="modal-header">
              <h2 class="modal-product-name">${p.name}</h2>
              <button class="modal-wishlist ${inWishlist ? 'active' : ''}"
                data-wishlist-id="${p.id}"
                onclick="Wishlist.toggle(${p.id}); Modal.refreshWishlist()">
                ♥
              </button>
            </div>
            <div class="modal-rating">
              <div class="stars">${Products.renderStars(p.rating)}</div>
              <span>(${p.reviews} reviews)</span>
            </div>
            <p class="modal-desc">${p.description}</p>

            ${p.nutrition ? `
            <div class="modal-nutrition">
              <span class="nutrition-icon">💚</span>
              <span>${p.nutrition}</span>
            </div>` : ''}

            <div class="modal-section">
              <label class="modal-label">Choose Weight:</label>
              <div class="weight-options">${weightOptions}</div>
            </div>

            ${customOptHtml ? `
            <div class="modal-section">
              <label class="modal-label">Sweetness Preference:</label>
              <div class="custom-options">${customOptHtml}</div>
            </div>` : ''}

            <div class="modal-price-row">
              <div class="modal-price" id="modal-price">₹${getPrice().toLocaleString()}</div>
              <span class="modal-weight-label">for ${selectedWeight}</span>
            </div>

            <div class="modal-actions">
              <button class="btn-add-cart" onclick="Modal.addToCart()">
                🛒 Add to Cart
              </button>
              <button class="btn-order-now" onclick="Modal.orderNow()">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.326c-.176.531-.892 1.035-1.466 1.168-.384.088-.882.158-2.562-.551-2.215-.929-3.649-3.165-3.759-3.314-.109-.148-1-1.328-1-2.543s.636-1.81.864-2.064c.229-.253.497-.316.663-.316l.479.009c.154.007.362-.059.566.432.21.51.713 1.752.776 1.879.063.127.105.274.021.441l-.291.504c-.128.222-.255.468-.109.728.673 1.183 1.345 1.888 2.369 2.572.22.144.347.12.474-.073l.632-.896c.126-.232.253-.194.424-.116.172.077 1.079.509 1.264.601.185.093.308.139.354.217.045.079.045.455-.131.983z"/></svg>
                Order on WhatsApp
              </button>
            </div>

            <div class="modal-lead-time">
              ⏰ ${CONFIG.orderLeadTime}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const selectWeight = (w) => {
    selectedWeight = w;
    document.querySelectorAll('.weight-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim() === w);
    });
    const priceEl = document.getElementById('modal-price');
    if (priceEl) priceEl.textContent = `₹${getPrice().toLocaleString()}`;
    const labelEl = document.querySelector('.modal-weight-label');
    if (labelEl) labelEl.textContent = `for ${w}`;
  };

  const selectOption = (opt) => {
    selectedOption = opt;
    document.querySelectorAll('.custom-opt-btn').forEach(btn => {
      btn.classList.toggle('active', btn.onclick.toString().includes(`'${opt}'`));
    });
    // Re-render custom options
    const customContainer = document.querySelector('.custom-options');
    if (customContainer && currentProduct.customOptions) {
      customContainer.innerHTML = currentProduct.customOptions.map(o => `
        <button class="custom-opt-btn ${o === selectedOption ? 'active' : ''}"
          onclick="Modal.selectOption('${o}')">
          ${CONFIG.customOptions[o]?.icon || ''} ${CONFIG.customOptions[o]?.label || o}
        </button>
      `).join('');
    }
  };

  const setImg = (index) => {
    currentImgIndex = index;
    const images = currentProduct.images && currentProduct.images.length > 0
      ? currentProduct.images : [currentProduct.image];
    const mainImg = document.getElementById('modal-main-image');
    if (mainImg) mainImg.src = images[index];
    document.querySelectorAll('.modal-thumb').forEach((th, i) => {
      th.classList.toggle('active', i === index);
    });
  };

  const addToCart = () => {
    if (!currentProduct) return;
    Cart.add(currentProduct, selectedWeight, selectedOption);
    const btn = document.querySelector('.btn-add-cart');
    if (btn) {
      btn.textContent = '✓ Added!';
      btn.style.background = '#4CAF50';
      setTimeout(() => {
        btn.textContent = '🛒 Add to Cart';
        btn.style.background = '';
      }, 1500);
    }
  };

  const orderNow = () => {
    if (!currentProduct) return;
    Cart.add(currentProduct, selectedWeight, selectedOption);
    setTimeout(() => Cart.orderOnWhatsApp(), 300);
  };

  const refreshWishlist = () => {
    const btn = document.querySelector('.modal-wishlist');
    if (btn && currentProduct) {
      btn.classList.toggle('active', Wishlist.has(currentProduct.id));
    }
  };

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  return { open, close, selectWeight, selectOption, setImg, addToCart, orderNow, refreshWishlist };
})();

window.Modal = Modal;