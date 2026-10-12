import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productId);
      if (existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter(item => item.product.id !== productId);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      {!cartOpen && (
        <button
          className="cart-toggle"
          onClick={() => setCartOpen(true)}
          aria-label="Toggle cart"
        >
          🛒 Корзина ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      )}

      {/* Main Content */}
      <section id="center">
        <div className="hero">
          <h1>Виртуальный "Не"магазин</h1>
          <p>Добро пожаловать в мой "бесплатный" виртуальный "не"магазин!</p>
        </div>

        <ProductList onAddToCart={addToCart} />
      </section>

      {cartOpen && (
        <Cart
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onClose={() => setCartOpen(false)}
          className="cart open"
        />
      )}
    </>
  );
}

export default App;