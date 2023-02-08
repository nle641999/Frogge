import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useStoreContext } from "../../utils/GlobalState";
import Dropdown from 'react-bootstrap/Dropdown';
import { idbPromise } from "../../utils/helpers";
import Button from 'react-bootstrap/Button';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import '../../styles/home.css';
import '../../styles/singleProduct.css';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import InputGroup from 'react-bootstrap/InputGroup';

function SingleProduct( item ) {
  const params = useParams();
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: {
      productId: params.productId
    }
  })
  if (loading) {
    return <div>Loading...</div>;
  }

  const currentProduct = data?.product || {}
  // console.log(currentProduct)
  const [state, dispatch] = useStoreContext()
  
  const {
    _id,
    sku,
    description,
    name,
    price,
    quantity,
    image
  } = item;
  

  const addToCart = () => {
    const itemInCart = state.cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="single-product-container">
     {/* <a href="/" style={{ color: black }}>← Back to Products</a> */}
    <div className='workhero'>
      <div className='clothing-image'>
        <img className="img-style"src={require(`../../../public/images/${currentProduct.image}`)}/>
      </div>
       <div className='clothing-info'style={{paddingBottom: "30px"}}>
        <h2 className='product-name'>{currentProduct.name}
        <p className='product-price' style={{paddingTop: "16px"}}>${currentProduct.price}.00</p></h2>
      
        <p className="description-text">{currentProduct.description}. 
        <br></br>
        <p style={{color: "grey", fontSize: "14px", paddingTop: "10px"}}>Number in Stock: {currentProduct.quantity}</p> </p>

          <div className='buying-info'>
            <div className='form-ctrl'>
              <Form.Control

                className='sizing'
                defaultValue={1}
              />

         <Dropdown>
        {/* <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">

         {/* <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">

          Size
        </Dropdown.Toggle> */}


        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1">Small</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Large</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> 
       </div> 
          </div>
          <div className="d-flex">
            <Button className="cartBtn" variant="success" onClick={addToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
{/* <div className="d-flex">
<input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" ></input>
<div className="dropdown">
<button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Size
</button>
<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
<button className="dropdown-item" type="button">X-Large</button>
<button className="dropdown-item" type="button">Large</button>
<button className="dropdown-item" type="button">Medium</button>
<button className="dropdown-item" type="button">Small</button>
</div>
</div>
</div> */}
{/* <div className="d-flex">
  <button className="btn btn-success flex-shrink-0" type="button">
    <i className="bi-cart-fill me-1"></i>
    Add to Cart
  </button>
  <button className="btn btn-outline-secondary flex-shrink-0" style="margin-left: 16px" type="button">
    <i className="bi-cart-fill me-1"></i>
    Remove from Cart
  </button>
</div> */}