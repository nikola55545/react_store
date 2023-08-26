import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cartActions'; // Import your removeFromCart action

const Cart = () => {
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch(); // Get the dispatch function

    const handleRemove = (item) => {
        dispatch(removeFromCart(item)); // Dispatch the removeFromCart action with the item to remove
    };

    return (
        <div>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.title}{' '}
                            <button onClick={() => handleRemove(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/">Continue Shopping</Link>
        </div>
    );
}

export default Cart;
