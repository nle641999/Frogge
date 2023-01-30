import React from 'react';
import '../../styles/Main.css';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from '../../utils/queries';
import { useParams } from 'react-router-dom';

function SingleProduct() {
  const { productId }=useParams()
  const { loading, data }=useQuery(QUERY_PRODUCT, {
    variables: {
      id: productId
    }
  })
  const currentProduct = data?.product || {} 
  console.log (currentProduct)
  return (
  <>
    <div className="py-5">
      <div className="container my-1">
        {/* <Link to="/">← Back to Products</Link> */}
        <div className="container mt-4"></div>
        <div className="row gx-4 gx-lg-6 align-items-center">
          <div className="col-md-6">
            <img className="card-img-top mb-5 mb-md-2" 
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">{currentProduct.sku}</div>
            <h2 className="display-6 fw-bolder">{currentProduct.name}</h2>
            <div className="fs-5 mb-5">
                <span>{currentProduct.price}</span>
            </div>
            <p className="lead">{currentProduct.description}</p>
            <br>
            </br>
            <div className="d-flex">
              <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem"/>
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
            </div>
            <br>
            </br>
            <div className="d-flex">
              <button class="btn btn-success flex-shrink-0" type="button">
                <i className="bi-cart-fill me-1"></i>
                Add to Cart
              </button>
              <button className="btn btn-outline-secondary flex-shrink-0" style="margin-left: 16px" type="button">
                <i className="bi-cart-fill me-1"></i>
                Remove from Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default SingleProduct;