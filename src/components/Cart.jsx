import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onRemoveItem, onClearCart, onClose, className }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className={className}>
      {/* Close button */}
      {onClose && (
        <button className="close-cart-btn" onClick={onClose} aria-label="Закрыть корзину">
          ✕
        </button>
      )}
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Ваша корзина пуста</p>
        </div>
      ) : (
        <>
          <h2>Корзина</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.product.name}</h4>
                  <p>{item.product.price.toLocaleString()} ₽ × {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button className="remove-item-btn" onClick={() => onRemoveItem(item.product.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Итого: {total.toLocaleString()} ₽</h3>
            <button className="clear-cart-btn" onClick={onClearCart}>
              Очистить корзину
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;