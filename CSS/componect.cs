/* ============================================================
   components.css — Product cards, filters, reviews, gallery etc.
   ============================================================ */

/* ---- Product section bg ---- */
.products-section {
  background: var(--cream-mid);
  padding: 80px 0;
}

/* ---- Filter bar ---- */
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}
.category-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}
.category-scroll::-webkit-scrollbar { height: 3px; }
.cat-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 0.88rem;
  font-weight: 700;
  white-space: nowrap;
  background: var(--white);
  border: 1.5px solid var(--cream-dark);
  color: var(--text-mid);
  transition: var(--transition);
  flex-shrink: 0;
}
.cat-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.cat-btn.active {
  background: var(--brown);
  border-color: var(--brown);
  color: white;
}
.cat-icon { font-size: 1rem; }
.special-cats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.special-cat-btn {
  padding: 7px 14px;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 700;
  background: transparent;
  border: 1.5px solid var(--cream-dark);
  color: var(--text-mid);
  transition: var(--transition);
}
.special-cat-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.special-cat-btn.active {
  background: var(--gold);
  border-color: var(--gold);
  color: white;
}
.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.product-count {
  font-size: 0.88rem;
  color: var(--text-light);
}
.sort-select {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1.5px solid var(--cream-dark);
  background: var(--white);
  font-size: 0.88rem;
  color: var(--text-dark);
  cursor: pointer;
  outline: none;
  transition: var(--transition);
}
.sort-select:focus { border-color: var(--gold); }

/* ---- Product grid ---- */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.no-products {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: var(--text-light);
  font-size: 1.1rem;
}

/* ---- Product card ---- */
.product-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  position: relative;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-med);
}
.product-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
}
.product-img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card:hover .product-img-wrap img {
  transform: scale(1.06);
}
.festival-badge {
  position: absolute;
  top: 10px; left: 10px;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  z-index: 2;
}
.product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(92,45,10,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}
.product-card:hover .product-overlay { opacity: 1; }
.quick-view {
  background: white;
  color: var(--brown);
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 700;
  pointer-events: none;
}
.wishlist-heart {
  position: absolute;
  top: 10px; right: 10px;
  width: 34px; height: 34px;
  border-radius: 50%;
  background: white;
  color: var(--text-light);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 3;
  transition: var(--transition);
  line-height: 1;
}
.wishlist-heart:hover, .wishlist-heart.active {
  background: #FFE4E1;
  color: #E74C3C;
  transform: scale(1.1);
}
.product-info {
  padding: 16px;
}
.product-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.tag {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(200,134,10,0.1);
  color: var(--gold);
  font-weight: 700;
  text-transform: capitalize;
}
.product-name {
  font-size: 1.02rem;
  color: var(--brown);
  margin-bottom: 6px;
  cursor: pointer;
  transition: var(--transition);
}
.product-name:hover { color: var(--gold); }
.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}
.stars { font-size: 0.85rem; }
.star.full { color: var(--gold-light); }
.star.half { color: var(--gold-light); opacity: 0.6; }
.star.empty { color: var(--cream-dark); }
.review-count { font-size: 0.78rem; color: var(--text-light); }
.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid var(--cream-dark);
  padding-top: 10px;
  margin-top: 4px;
}
.product-price {
  display: flex;
  align-items: baseline;
  gap: 3px;
}
.price-label {
  font-size: 0.72rem;
  color: var(--text-light);
  text-transform: uppercase;
}
.price-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--brown);
}
.price-unit {
  font-size: 0.72rem;
  color: var(--text-light);
}
.add-to-cart-btn {
  padding: 8px 14px;
  background: var(--brown);
  color: white;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
  transition: var(--transition);
}
.add-to-cart-btn:hover {
  background: var(--gold);
  transform: translateY(-1px);
}

/* ---- Reviews section ---- */
.reviews-section {
  background: var(--cream);
  padding: 80px 0;
}
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
.review-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  border-left: 3px solid var(--gold);
}
.review-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-med);
}
.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.reviewer-avatar {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--brown));
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.reviewer-info { flex: 1; min-width: 0; }
.reviewer-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--brown);
}
.reviewer-location {
  font-size: 0.78rem;
  color: var(--text-light);
}
.review-stars {
  font-size: 0.9rem;
  color: var(--gold-light);
  letter-spacing: 2px;
}
.review-text {
  font-size: 0.9rem;
  color: var(--text-mid);
  font-style: italic;
  line-height: 1.7;
  margin-bottom: 16px;
}
.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--cream-dark);
  padding-top: 12px;
}
.review-product {
  font-size: 0.78rem;
  color: var(--gold);
  font-weight: 700;
}
.review-date {
  font-size: 0.75rem;
  color: var(--text-light);
}

/* ---- Festival section ---- */
.festival-preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.festival-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 28px 20px;
  text-align: center;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 2px solid transparent;
}
.festival-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-med);
  border-color: var(--gold);
}
.festival-icon { font-size: 2.8rem; }
.festival-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--brown);
}
.festival-desc {
  font-size: 0.82rem;
  color: var(--text-light);
  line-height: 1.5;
}
.festival-cta {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--gold);
  margin-top: 4px;
}

/* ---- Gift boxes section ---- */
.gift-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.gift-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
}
.gift-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-med);
}
.gift-card-img {
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--cream-dark), var(--cream));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
}
.gift-card-body { padding: 20px; }
.gift-card-body h3 { color: var(--brown); margin-bottom: 8px; font-size: 1rem; }
.gift-card-body p { font-size: 0.88rem; color: var(--text-mid); margin-bottom: 14px; }
.gift-price {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--gold);
}

/* ---- Gallery section ---- */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.gallery-item {
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  cursor: zoom-in;
  aspect-ratio: 1;
}
.gallery-item img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.gallery-item:hover img { transform: scale(1.08); }
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(92,45,10,0.5);
  opacity: 0;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}
.gallery-item:hover .gallery-overlay { opacity: 1; }

/* ---- Contact page ---- */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 48px;
  align-items: start;
}
.contact-info { display: flex; flex-direction: column; gap: 20px; }
.contact-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
}
.contact-card:hover { transform: translateX(4px); }
.contact-icon {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}
.contact-card-text h4 { color: var(--brown); margin-bottom: 4px; font-size: 0.9rem; }
.contact-card-text p, .contact-card-text a {
  font-size: 0.9rem;
  color: var(--text-mid);
  line-height: 1.5;
}
.contact-card-text a:hover { color: var(--gold); }
.contact-map {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-med);
}
.contact-map iframe {
  display: block;
  width: 100%;
  height: 400px;
  border: 0;
}

/* ---- About page ---- */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}
.team-card {
  text-align: center;
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 28px 20px;
  box-shadow: var(--shadow-soft);
}
.team-card-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
.team-card h3 { font-size: 1rem; color: var(--brown); margin-bottom: 8px; }
.team-card p { font-size: 0.88rem; color: var(--text-mid); }

/* ---- Page hero ---- */
.page-hero {
  background: linear-gradient(135deg, var(--brown) 0%, var(--brown-mid) 100%);
  padding: 120px 0 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 40px,
    rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 80px
  );
}
.page-hero h1 { color: var(--gold-pale); }
.page-hero p { color: rgba(255,255,255,0.7); max-width: 600px; margin: 16px auto 0; }

/* ---- Timeline (About) ---- */
.timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 2px;
  background: var(--gold);
  transform: translateX(-50%);
}
.timeline-item {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
}
.timeline-item:nth-child(odd) .timeline-content { grid-column: 1; text-align: right; }
.timeline-item:nth-child(odd) .timeline-dot { grid-column: 2; }
.timeline-item:nth-child(odd) .timeline-empty { grid-column: 3; }
.timeline-item:nth-child(even) .timeline-empty { grid-column: 1; }
.timeline-item:nth-child(even) .timeline-dot { grid-column: 2; }
.timeline-item:nth-child(even) .timeline-content { grid-column: 3; }
.timeline-dot {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 0 0 6px rgba(200,134,10,0.2);
  justify-self: center;
}
.timeline-content {
  background: var(--white);
  border-radius: var(--radius);
  padding: 16px 20px;
  box-shadow: var(--shadow-soft);
}
.timeline-content h4 { color: var(--brown); margin-bottom: 4px; }
.timeline-content p { font-size: 0.88rem; color: var(--text-mid); margin: 0; }

/* ---- Order section ---- */
.order-section {
  background: linear-gradient(135deg, var(--brown) 0%, var(--brown-mid) 100%);
  padding: 80px 0;
  text-align: center;
}
.order-section h2 { color: var(--gold-pale); }
.order-section p { color: rgba(255,255,255,0.7); margin: 16px auto 32px; max-width: 560px; }
.order-methods {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.order-method {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: var(--radius-lg);
  padding: 24px 32px;
  color: white;
  text-align: center;
  transition: var(--transition);
  min-width: 160px;
}
.order-method:hover {
  background: rgba(255,255,255,0.18);
  transform: translateY(-4px);
}
.order-method-icon { font-size: 2.2rem; margin-bottom: 10px; }
.order-method-label { font-size: 0.9rem; font-weight: 700; }
.order-method-sub { font-size: 0.8rem; opacity: 0.7; margin-top: 4px; }
