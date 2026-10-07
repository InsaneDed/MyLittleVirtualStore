import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  // Calculate discount if original price is provided
  const discountPrice = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      {/* Discount badge */}
      {product.originalPrice && discountPrice > 0 && (
        <div className="product-badge">
          -{discountPrice}%
        </div>
      )}

      {/* New arrival badge */}
      {product.isNew && (
        <div className="product-badge" style={{ background: '#28a745' }}>
          Новинка
        </div>
      )}

      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <div className="product-name">{product.name}</div>

        {/* Rating */}
        <div className="product-rating">
          {[1, 2, 3, 4, 5].map(star => (
            <span key={star} className="product-rating-star">
              {star <= product.rating ? '★' : '☆'}
            </span>
          ))}
          <span> ({product.rating})</span>
        </div>

        {/* Price */}
        <div className="product-price-container">
          {product.originalPrice ? (
            <>
              <span className="product-price-original">
                {product.originalPrice.toLocaleString()} ₽
              </span>
              <span className="product-price-current">
                {product.price.toLocaleString()} ₽
              </span>
              <span className="product-price-discount">
                -{discountPrice}%
              </span>
            </>
          ) : (
            <span className="product-price-current">
              {product.price.toLocaleString()} ₽
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="product-add-to-cart"
          onClick={handleAddToCart}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductItem;