import React, { useState } from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

const products = [
  {
    id: 1,
    name: 'Смартфон XYZ Pro',
    price: 29999,
    originalPrice: 34999,
    image: 'https://via.placeholder.com/300x200?text=Smartphone',
    description: 'Флагманский смартфон с камерой 108MP и батареей 5000мАч',
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: 'Ноутбук ABC Ultra',
    price: 59999,
    originalPrice: 69999,
    image: 'https://via.placeholder.com/300x200?text=Laptop',
    description: 'Ультрабук для работы и игр с процессором Intel i7',
    rating: 4.6,
    isNew: false
  },
  {
    id: 3,
    name: 'Наушники SoundMaster',
    price: 8999,
    originalPrice: 11999,
    image: 'https://via.placeholder.com/300x200?text=Headphones',
    description: 'Беспроводные наушники с шумоподавлением и 30ч автономностью',
    rating: 4.5,
    isNew: true
  },
  {
    id: 4,
    name: 'Смарт-часы WatchFit',
    price: 12999,
    image: 'https://via.placeholder.com/300x200?text=Watch',
    description: 'Смарт-часы с отслеживанием пульса, сна и GPS-навигацией',
    rating: 4.3,
    isNew: false
  },
  {
    id: 5,
    name: 'Игровая приставка GameBox',
    price: 34999,
    originalPrice: 39999,
    image: 'https://via.placeholder.com/300x200?text=Console',
    description: 'Новейшая игровая консоль с поддержкой 4K и ray tracing',
    rating: 4.9,
    isNew: true
  },
  {
    id: 6,
    name: 'Электронная книга ReadMe',
    price: 7999,
    originalPrice: 9999,
    image: 'https://via.placeholder.com/300x200?text=EReader',
    description: 'Водонепроницаемый ридер с экраном E-Ink и подсветкой',
    rating: 4.4,
    isNew: false
  }
];

const ProductList = ({ onAddToCart }) => {
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);

  // Filter products with 20% or more discount
  const getFilteredProducts = () => {
    if (!showOnlyDiscounted) return products;

    return products.filter(product => {
      if (!product.originalPrice) return false;
      const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      return discountPercent >= 20;
    });
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Каталог товаров</h2>
        <div className="filter-controls">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={showOnlyDiscounted}
              onChange={(e) => setShowOnlyDiscounted(e.target.checked)}
            />
            Показать только товары со скидкой 20% и более
          </label>
          {showOnlyDiscounted && (
            <span className="filter-count">
              Показано {filteredProducts.length} из {products.length} товаров
            </span>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products-message">
          <p>Товаров со скидкой 20% и более не найдено</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;