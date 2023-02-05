import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries.js';
import CartItem from './CartItem';
import { useStoreContext } from '../../utils/GlobalState.js';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import '../../styles/Cart.css';

const Cart = ({showCart, setShowCart}) => {
  const [state, dispatch] = useStoreContext();
  const [checkout, { data, loading, error }] = useLazyQuery(QUERY_CHECKOUT);

  const toggleCart = () => {
    setShowCart(!showCart);
    dispatch({
      type: TOGGLE_CART,
    });
  };

  const handleCheckout = async () => {
    // Trigger the QUERY_CHECKOUT query to get the checkout data from the server
    await checkout();

    if (data && data.checkout) {
      // Load the Stripe instance
      const stripe = await loadStripe('YOUR_PUBLISHABLE_KEY');

      // Redirect the user to the Stripe checkout page
      const { id } = data.checkout;
      const stripeCheckout = stripe.redirectToCheckout({
        sessionId: id,
      });
    } else {
      // Handle the error case
      console.error(error);
    }
  };

  return (
    <div className="cart">
      <div className="cart-icon" onClick={toggleCart}>
        <i className="fa fa-shopping-cart"></i>
        {state.cart.length > 0 && (
          <div className="cart-count">{state.cart.length}</div>
        )}
      </div>
      {showCart && (
        <div className="cart-preview">
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <button onClick={toggleCart}>x</button>
          </div>
          <ul>
{state.cart.length && (state.cart.map((product) => (
  <CartItem key={product.id} product={product} />
)))}

          </ul>
          <div className="cart-footer">
            <button className="btn btn-success" onClick={handleCheckout}>
              Checkout
            </button>
            <p>
              SubTotal: $
              {state.cart && state.cart.length > 0 ? state.cart
                .reduce((acc, product) => acc + product.price, 0)
                .toFixed(2):0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;