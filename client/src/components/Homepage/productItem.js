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
    _id,
    sku,
    description,
    name,
    price,
    quantity,
    image
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
<div className=" col-7 col-sm-7 col-md-4 col-lg-2 col-xl-2 clothe-card cardAll">

 <Card className="card"style={{ width: '16rem' }}>
      <Card.Img variant="top" className="clotheImg"src={require(`../../../public/images/${item.image}`)} />
      <Link to={`/product/${item._id}`}>
      <div className='image_overlay image_overlay_blur'>
            <h2 className='image_title'>{item.name}</h2>
            <p className='image_description'>{item.description}</p>
        </div>
      </Link>
    </Card>
    <Card.Text style={{ marginTop: '14px'}}>
         <Card.Title style={{ fontWeight: 'bold',
         fontSize: '19px',
         marginBottom: "5px" }}>{item.name}</Card.Title>
        {/* <br></br> */}
        {/* Sku: {item._id}
        <br></br> */}
        <br></br>
        ${item.price}.00
        </Card.Text>
        <Button variant="success">Add to Cart</Button>
        <br></br>
      </div>
  );
}

export default ProductItem;