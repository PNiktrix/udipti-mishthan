// ============================================================
// cart.js — Cart management with localStorage persistence
// ============================================================

const Cart = (() => {
  const STORAGE_KEY = 'udipti_cart';

  let items = [];

  const load = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      items = stored ? JSON.parse(stored) : [];
    } catch {
      items = [];
    }
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadge();
    renderCartDrawer();
  };

  const add = (product, weight, customOption, qty = 1) => {
    const key = `${product.id}_${weight}_${customOption}`;
    const existing = items.find(i => i.key === key);
    const price = typeof product.prices === 'object'
      ? (product.prices[weight] || Object.values(product.prices)[0])
      : product.price;

    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        key,
        id: product.id,
        name: product.name,
        image: product.image,
        weight,
        customOption,
        price,
        qty
      });
    }
    save();
    showCartToast(product.name);
  };

  const remove = (key) => {
    items = items.filter(i => i.key !== key);
    save();
  };

  const updateQty = (key, delta) => {
    const item = items.find(i => i.key === key);
    if (item) {
      item.qty = Math.max(1, item.qty + delta);
      save();
    }
  };

  const clear = () => {
    items = [];
    save();
  };

  const getItems = () => [...items];

  const getTotal = () => items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const getCount = () => items.reduce((sum, i) => sum + i.qty, 0);

  const updateBadge = () => {
    const count = getCount();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  };

  const showCartToast = (name) => {
    const toast = document.getElementById('cart-toast');
    if (!toast) return;
    toast.querySelector('.toast-name').textContent = name;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  };

  const renderCartDrawer = () => {
    const container = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total');
    const emptyEl = document.getElementById('cart-empty');
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      if (totalEl) totalEl.textContent = '₹0';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    container.innerHTML = items.map(item => `
      <div class="cart-item" data-key="${item.key}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='data/images/placeholder.jpg'">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.weight} · ${item.customOption ? CONFIG.customOptions[item.customOption]?.label || item.customOption : ''}</div>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="Cart.updateQty('${item.key}', -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="Cart.updateQty('${item.key}', 1)">+</button>
          <button class="cart-remove" onclick="Cart.remove('${item.key}')">🗑</button>
        </div>
      </div>
    `).join('');

    if (totalEl) totalEl.textContent = `₹${getTotal().toLocaleString()}`;
  };

  const buildWhatsAppMessage = () => {
    if (items.length === 0) return null;
    let msg = `🙏 *Namaste! Order from Udipti Mishthan*\n\n`;
    items.forEach(item => {
      const opt = item.customOption ? ` (${CONFIG.customOptions[item.customOption]?.label || item.customOption})` : '';
      msg += `• ${item.name} — ${item.weight}${opt} × ${item.qty} = ₹${(item.price * item.qty).toLocaleString()}\n`;
    });
    msg += `\n*Total: ₹${getTotal().toLocaleString()}*\n\n`;
    msg += `📍 Delivery or Pickup?\n_Please confirm your address and preferred time._`;
    return msg;
  };

  const orderOnWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    if (!msg) { alert('Your cart is empty!'); return; }
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Initialize
  load();

  return { add, remove, updateQty, clear, getItems, getTotal, getCount, updateBadge, renderCartDrawer, orderOnWhatsApp, load };
})();

window.Cart = Cart;