// ============================================================
// wishlist.js — Wishlist with localStorage persistence
// ============================================================

const Wishlist = (() => {
  const STORAGE_KEY = 'udipti_wishlist';
  let ids = new Set();

  const load = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      ids = new Set(stored ? JSON.parse(stored) : []);
    } catch {
      ids = new Set();
    }
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    updateBadge();
    updateHeartIcons();
  };

  const toggle = (id) => {
    if (ids.has(id)) {
      ids.delete(id);
    } else {
      ids.add(id);
    }
    save();
  };

  const has = (id) => ids.has(id);

  const getIds = () => [...ids];

  const updateBadge = () => {
    const count = ids.size;
    document.querySelectorAll('.wishlist-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  };

  const updateHeartIcons = () => {
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = parseInt(btn.dataset.wishlistId);
      btn.classList.toggle('active', ids.has(id));
      btn.setAttribute('aria-label', ids.has(id) ? 'Remove from wishlist' : 'Add to wishlist');
    });
  };

  const renderWishlistPage = (allProducts) => {
    const container = document.getElementById('wishlist-grid');
    const emptyEl = document.getElementById('wishlist-empty');
    if (!container) return;

    const wishlistProducts = allProducts.filter(p => ids.has(p.id));

    if (wishlistProducts.length === 0) {
      container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    container.innerHTML = wishlistProducts.map(p => Products.renderCard(p)).join('');
  };

  load();

  return { toggle, has, getIds, updateBadge, updateHeartIcons, renderWishlistPage, load };
})();

window.Wishlist = Wishlist;
