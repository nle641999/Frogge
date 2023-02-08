import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState.js';
import { ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART } from '../../utils/actions';
import { Container, Col, Row } from 'react-bootstrap';
import '../../styles/Cart.css';

const stripePromise = loadStripe('pk_test_51MXFOQIQxvdIT6er2UoSF4oR3FFxpt80NgzPzRx9bN5ZyArev6SFBgUJH7t3GswREKYH12OGEF6LrmatzpeR09f6009qdGxJlm');

const Cart = () => {
  const [stripe, setStripe] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [error, setError] = useState(null);
  const [state, dispatch] = useStoreContext();

  const [isLoading, setLoading] = useState(true);

  React.useEffect(() => {
    stripePromise.then(value => {
      setStripe(value);
    });

  }, []);
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      setLoading(false);
    };
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  const quantities = state.cart.reduce((acc, product) => {
    acc[product.id] = product.purchaseQuantity || 1;
    return acc;
  }, {});

  // const handleQuantityChange = (id, value) => {
  //   dispatch({
  //     type: ADD_MULTIPLE_TO_CART,
  //     products: [{ id, quantity: value, purchaseQuantity: value }],
  //   });
  // };

  // (function() {
  //   let productList = [];
  
  //   function addProduct() {
  //     if (productList.length === 0) {
  //       // existing code here
  //       productList.push(product);
  //     }
  //   }
  // })();

  function calculateTotal() {
    let sum = 0
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    })
    return sum.toFixed(2);
  }

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const handleCheckout = async () => {
    window.open("https://buy.stripe.com/test_aEU01L0mw8VAaqs8ww", "_blank");
    // try {
    //   if (!stripe) {
    //     return;
    //   }

    //   if (!checkout) {
    //     getCheckout({
    //       variables: {
    //         input: {
    //           items: state.cart.map((product) => ({
    //             id: product.id,
    //             quantity: quantities[product.id],
    //           })),
    //         },
    //       },
    //     });
    //     return;
      }

  //     const stripe = await stripePromise;
  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: checkout.id,
  //     });

  //     if (error) {
  //       console.warn('Error:', error);
  //       setError(error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setError(error);
  //   }
  // };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="row">
      {console.log(state.cart)}
      {state.cart.map((product) => (
        <div className="col-7 col-sm-7 col-md-4 col-lg-2 col-xl-2">
        <div className="card cardCart" key={product._id}>
          <img className="cart-image"src={"/images/" + product.image} alt={product.name} />
          <p className="product-name">{product.name}</p>
          <p>Price: ${product.price}</p>

          {/* <label>
            Quantity:
            <input
              type="number"
              value={quantities[product.id]}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            />
          </label> */}
          <button className="btn btn-danger" onClick={() => removeFromCart(product)}>

            Remove from Cart
          </button>
        </div>
        </div>
      ))}
    </div>
      <p>Subtotal: ${calculateTotal()}</p>
      <button className="btn btn-success" onClick={handleCheckout}>Checkout</button>


    </>
  );
};
export default Cart;