// ============================================================
// products.js — Product rendering and data handling
// ============================================================

const Products = (() => {
  let allProducts = [];

  const load = async () => {
    try {
      const res = await fetch('data/products.json');
      allProducts = await res.json();
      return allProducts;
    } catch (e) {
      console.error('Failed to load products:', e);
      return [];
    }
  };

  const getAll = () => allProducts;

  const getById = (id) => allProducts.find(p => p.id === id);

  const getByCategory = (cat) => {
    if (cat === 'all') return allProducts;
    return allProducts.filter(p => p.category === cat);
  };

  const getByFestival = (festival) => allProducts.filter(p =>
    p.festivalTags && p.festivalTags.includes(festival)
  );

  const getByTag = (tag) => allProducts.filter(p =>
    p.tags && p.tags.includes(tag)
  );

  const getByCustomOption = (option) => allProducts.filter(p =>
    p.customOptions && p.customOptions.includes(option)
  );

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '<span class="star full">★</span>';
    if (half) stars += '<span class="star half">★</span>';
    for (let i = full + (half ? 1 : 0); i < 5; i++) stars += '<span class="star empty">☆</span>';
    return stars;
  };

  const getDefaultPrice = (product) => {
    if (typeof product.prices === 'object') {
      const defaultWeight = product.defaultWeight;
      return product.prices[defaultWeight] || Object.values(product.prices)[0];
    }
    return product.price;
  };

  const renderCard = (product) => {
    const price = getDefaultPrice(product);
    const inWishlist = Wishlist.has(product.id);
    const tags = product.tags ? product.tags.slice(0, 2).map(t => `<span class="tag">${t.replace(/-/g, ' ')}</span>`).join('') : '';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-wrap" onclick="Modal.open(${product.id})">
          <img src="${product.image}" alt="${product.name}" loading="lazy"
               onerror="this.src='data/images/placeholder.jpg'">
          ${product.festivalSpecial ? '<span class="festival-badge">Festival Special</span>' : ''}
          <div class="product-overlay">
            <span class="quick-view">Quick View</span>
          </div>
        </div>
        <button class="wishlist-heart ${inWishlist ? 'active' : ''}"
          data-wishlist-id="${product.id}"
          onclick="event.stopPropagation(); Wishlist.toggle(${product.id})"
          aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
          ♥
        </button>
        <div class="product-info">
          <div class="product-tags">${tags}</div>
          <h3 class="product-name" onclick="Modal.open(${product.id})">${product.name}</h3>
          <div class="product-rating">
            <div class="stars">${renderStars(product.rating)}</div>
            <span class="review-count">(${product.reviews})</span>
          </div>
          <div class="product-bottom">
            <div class="product-price">
              <span class="price-label">From</span>
              <span class="price-value">₹${price.toLocaleString()}</span>
              <span class="price-unit">/ ${product.defaultWeight}</span>
            </div>
            <button class="add-to-cart-btn" onclick="Modal.open(${product.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  };

  const renderGrid = (products, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (products.length === 0) {
      container.innerHTML = '<div class="no-products">No sweets found in this category 😔</div>';
      return;
    }
    container.innerHTML = products.map(renderCard).join('');
    Wishlist.updateHeartIcons();
  };

  return { load, getAll, getById, getByCategory, getByFestival, getByTag, getByCustomOption, renderCard, renderGrid, renderStars, getDefaultPrice };
})();

window.Products = Products;
