import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../styles/home.css';
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
      <div className="col-3 clothe-card">

         {/* <div className="card">
             <img className="card-img-top img-fluid" src="//placehold.it/500x200" alt="Card image cap"/>
             <div className="card-block">
                 <h4 className="card-title">{item.name}</h4>
                 <p className="card-text">asss</p>
             <p className="card-text"><small className="text-muted">fasjdkkld</small></p>
             </div> */}
 <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.description}{item.sku}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
      </div>
  );
}

export default ProductItem;
