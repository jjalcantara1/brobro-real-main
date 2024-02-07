import React from 'react';
import { useSelector } from 'react-redux';

const CartScreen = () => {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    return (
        <div>
            {cartItems.map(item => (
                <div key={item.product}>
                    {item.name} - {item.qty}
                </div>
            ))}
        </div>
    );
};

export default CartScreen;
