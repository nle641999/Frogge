// import React, { useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/client';
// import { QUERY_CHECKOUT } from '../../utils/queries.js';
// // import { idbPromise } from '../../utils/helpers';
// import CartItem from './CartItem';
// import Auth from '../../utils/auth';
// import { useStoreContext } from '../../utils/GlobalState';
// import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';

// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const Cart = () => {
//   const [state, dispatch] = useStoreContext();
//   const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

//   useEffect(() => {
//     if (data) {
//       stripePromise.then((res) => {
//         res.redirectToCheckout({ sessionId: data.checkout.session });
//       });
//     }
//   }, [data]);

//   // useEffect(() => {
//   //   async function getCart() {
//   //     const cart = await idbPromise('cart', 'get');
//   //     dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
//   //   }

//   //   if (!state.cart.length) {
//   //     getCart();
//   //   }
//   // }, [state.cart.length, dispatch]);

//   function toggleCart() {
//     dispatch({ type: TOGGLE_CART });
//   }

//   function calculateTotal() {
//     let sum = 0;
//     state.cart.forEach((item) => {
//       sum += item.price * item.purchaseQuantity;
//     });
//     return sum.toFixed(2);
//   }

//   function submitCheckout() {
//     const productIds = [];

//     state.cart.forEach((item) => {
//       for (let i = 0; i < item.purchaseQuantity; i++) {
//         productIds.push(item._id);
//       }
//     });

//     getCheckout({
//       variables: { products: productIds },
//     });
//   }

//   if (!state.cartOpen) {
//     return (
//       <div className="cart-closed" onClick={toggleCart}>
//         <span role="img" aria-label="trash">
//           🛒
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="cart">
//       <div className="close" onClick={toggleCart}>
//         [close]
//       </div>
//       <h2>Shopping Cart</h2>
//       {state.cart.length ? (
//         <div>
//           {state.cart.map((item) => (
//             <CartItem key={item._id} item={item} />
//           ))}

//           <div className="flex-row space-between">
//             <strong>Total: ${calculateTotal()}</strong>

//             {Auth.loggedIn() ? (
//               <button onClick={submitCheckout}>Checkout</button>
//             ) : (
//               <span>(log in to check out)</span>
//             )}
//           </div>
//         </div>
//       ) : (
//         <h3>
//           <span role="img" aria-label="shocked">
//             😱
//           </span>
//           You haven't added anything to your cart yet!
//         </h3>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries.js';
import CartItem from './CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState.js';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import '../../styles/Cart.css';

const Cart = ({showCart, setShowCart}) => {
  const [state, dispatch] = useStoreContext();
  const [checkout, { data, loading, error }] = useLazyQuery(QUERY_CHECKOUT);

  // useEffect(() => {
    // Check if there is a stored cart in the IndexedDB and dispatch an action to add its items to the cart
    // idbPromise('cart', 'get')
    //   .then((cart) => {
    //     if (cart) {
    //       dispatch({
    //         type: ADD_MULTIPLE_TO_CART,
    //         products: cart.products,
    //       });
    //     }
    //   });
  // }, [dispatch]);

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