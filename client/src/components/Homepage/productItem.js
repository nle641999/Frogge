import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { Container, Row, Col } from 'react-bootstrap';

function ProductItem({item}) {
//   const [state, dispatch] = useStoreContext();

  const {
    sku,
    description,
    name,
    price,
    quantity
  } = item;

  console.log('item in ProductItem', item)

//   const { cart } = state

//   const addToCart = () => {
//     const itemInCart = cart.find((cartItem) => cartItem._id === _id)
//     if (itemInCart) {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: _id,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//       idbPromise('cart', 'put', {
//         ...itemInCart,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//     } else {
//       dispatch({
//         type: ADD_TO_CART,
//         product: { ...item, purchaseQuantity: 1 }
//       });
//       idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
//     }
//   }

  return (
    <Container>
      <Row>
        <Col>
          <img className="card-img-top img-fluid" src="//placehold.it/500x200" alt="Card image cap"/>
          <h4 className="card-title">{item.name}</h4>
          <p className="card-text">${item.price}</p>
          <button class="btn btn-success flex-shrink-0" type="button">
          <i className="bi-cart-fill me-1"></i>
          Add to Cart
          </button>
        </Col>
      </Row>
    </Container>

  );
}

export default ProductItem;
