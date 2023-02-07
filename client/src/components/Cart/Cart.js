import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries.js';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState.js';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { Container, Col, Row } from 'react-bootstrap';

const stripePromise = loadStripe('pk_test_51MXFOQIQxvdIT6er2UoSF4oR3FFxpt80NgzPzRx9bN5ZyArev6SFBgUJH7t3GswREKYH12OGEF6LrmatzpeR09f6009qdGxJlm');

const Cart = () => {
  const [stripe, setStripe] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [error, setError] = useState(null);
  const [state, dispatch] = useStoreContext();
  const [quantities, setQuantities] = useState(
    state.cart.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  useEffect(() => {
    stripePromise.then(setStripe);
  }, []);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    };
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch])

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
    dispatch({
      type: ADD_MULTIPLE_TO_CART,
      products: [{ id, quantity: value }],
    });
  };

  function calculateTotal() {
    let sum = 0
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    })
    return sum.toFixed(2);
  }

  const handleCheckout = async () => {
    try {
      if (!stripe) {
        return;
      }

      if (!checkout) {
        getCheckout({
          variables: {
            input: {
              items: state.cart.map((product) => ({
                id: product.id,
                quantity: quantities[product.id],
              })),
            },
          },
        });
        return;
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkout.id,
      });

      if (error) {
        console.warn('Error:', error);
        setError(error);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="row">
      {console.log(state.cart)}
      {state.cart.map((product) => (
        <div className="col-7 col-sm-7 col-md-4 col-lg-2 col-xl-2">
        <div className="card" key={product._id}>
          <img className="cart-image"src={"/images/" + product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>Price: ${product.price}</p>
          {/* <label>
            Quantity:
            <input
              type="number"
              value={quantities[product.id]}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            />
          </label> */}
          <button onClick={() => dispatch({ type: TOGGLE_CART, productId: product.id })}>
            Remove from Cart
          </button>
        </div>
        </div>
      ))}
    </div>
      <p>Subtotal: ${calculateTotal()}</p>
      <button onClick={handleCheckout}>Checkout</button>


    </Container>
  );
};

export default Cart;