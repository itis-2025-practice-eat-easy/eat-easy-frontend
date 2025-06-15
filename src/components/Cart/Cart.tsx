import React, { useState } from 'react';
import {CartItem, type CartItemData} from './CartItem';
import './cart.css';

export const Cart: React.FC = () => {
  //заглушка!!!
  const [items, setItems] = useState<CartItemData[]>([
    {
      id: '1',
      name: 'Chococheese Cake',
      imageUrl: '/images/chococheese.png',
      price: 2.5,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Pink Donuts',
      imageUrl: '/images/pink-donut.png',
      price: 2.8,
      quantity: 1,
    },
    {
      id: '3',
      name: 'Pink Sweet',
      imageUrl: '/images/pink-sweet.png',
      price: 2.1,
      quantity: 1,
    },
  ]);

  const handleIncrement = (id: string) => {
    setItems(prev =>
        prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
    );
  };

  const handleDecrement = (id: string) => {
    setItems(prev =>
        prev.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
    );
  };

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, x) => sum + x.price * x.quantity, 0);

  const handleCheckout = () => {
    // здесь могла бы быть навигация или вызов API
    alert(`Checkout: total = $${total.toFixed(2)}`);
  };

  return (
      <div className="cart">
        <h1 className="cart__title">My Cart</h1>

        <div className="cart__header">
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
          <span></span>
        </div>

        {items.length
            ? items.map(item => (
                <CartItem
                    key={item.id}
                    {...item}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemove={handleRemove}
                />
            ))
            : <p className="cart__empty">Your cart is empty.</p>
        }

        <div className="cart__footer">
          <span className="cart__footer-label">Total:</span>
          <span className="cart__footer-value">${total.toFixed(2)}</span>
        </div>

        <button
            className="cart__checkout-btn"
            onClick={handleCheckout}
            disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
  );
};
