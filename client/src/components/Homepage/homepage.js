import React, {useEffect} from 'react';
import ProductItem from './productItem';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { Container, Row, Col } from "react-bootstrap";
import '../../styles/home.css'
import {UPDATE_PRODUCTS} from '../../utils/actions';

function Homepage() {
    const [state, dispatch] = useStoreContext();

    // const { currentCategory } = state;
  
    const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
    const products = data?.products || []
    console.log(products)
    useEffect(() => {
      if (data) {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: data.products,
        });
      }
    }, [data, dispatch]);

    
return (
<section className="homepageContainer container">
<div className='row justify-content-sm-center'>

            {state.products.map((product) => (
              <ProductItem
              key={product._id}
              item={product}/>
              ))}
              </div>
              </section>

);
}


export default Homepage;