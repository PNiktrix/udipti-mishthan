// ============================================================
// filter.js — Product filtering and search logic
// ============================================================

const Filter = (() => {
  let activeCategory = 'all';
  let activeCustomOption = null;
  let searchQuery = '';
  let sortBy = 'default';

  const setCategory = (cat) => {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    apply();
  };

  const setCustomOption = (option) => {
    activeCustomOption = activeCustomOption === option ? null : option;
    document.querySelectorAll('.special-cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.option === activeCustomOption);
    });
    apply();
  };

  const setSearch = (query) => {
    searchQuery = query.toLowerCase().trim();
    apply();
  };

  const setSort = (sort) => {
    sortBy = sort;
    apply();
  };

  const apply = () => {
    let products = Products.getAll();

    // Category filter
    if (activeCategory !== 'all') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Custom option filter
    if (activeCustomOption) {
      products = products.filter(p =>
        p.customOptions && p.customOptions.includes(activeCustomOption)
      );
    }

    // Search
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        (p.tags && p.tags.some(t => t.includes(searchQuery)))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      products.sort((a, b) => Products.getDefaultPrice(a) - Products.getDefaultPrice(b));
    } else if (sortBy === 'price-desc') {
      products.sort((a, b) => Products.getDefaultPrice(b) - Products.getDefaultPrice(a));
    } else if (sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      products.sort((a, b) => b.reviews - a.reviews);
    }

    Products.renderGrid(products, 'products-grid');

    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = `${products.length} sweets found`;
  };

  const reset = () => {
    activeCategory = 'all';
    activeCustomOption = null;
    searchQuery = '';
    sortBy = 'default';
    const searchInput = document.getElementById('product-search');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === 'all');
    });
    document.querySelectorAll('.special-cat-btn').forEach(btn => btn.classList.remove('active'));
    apply();
  };

  return { setCategory, setCustomOption, setSearch, setSort, apply, reset };
})();

window.Filter = Filter;
