import React from 'react';
import './cart_item.css';

export interface CartItemData {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}

export interface CartItemProps extends CartItemData {
    onIncrement: (id: string) => void;
    onDecrement: (id: string) => void;
    onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({id, name, imageUrl, price, quantity, onIncrement, onDecrement, onRemove,}) => (
    <div className="cart-item">
        <div className="cart-item__product">
            <img src={imageUrl} alt={name} className="cart-item__image" />
            <span className="cart-item__name">{name}</span>
        </div>

        <div className="cart-item__quantity">
            <button
                className="cart-item__qty-btn"
                onClick={() => onDecrement(id)}
                disabled={quantity <= 1}
            >
                –
            </button>
            <span className="cart-item__qty-value">{quantity}</span>
            <button
                className="cart-item__qty-btn"
                onClick={() => onIncrement(id)}
            >
                +
            </button>
        </div>

        <span className="cart-item__price">${price.toFixed(2)}</span>
        <span className="cart-item__total">${(price * quantity).toFixed(2)}</span>

        <button
            className="cart-item__remove"
            onClick={() => onRemove(id)}
            title="Remove"
        >
            <img src='./src/assets/Delete.svg' alt='Remove' />
        </button>
    </div>
);
