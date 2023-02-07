import React, {useEffect} from 'react';
import ProductItem from './productItem';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import '../../styles/home.css'
import {UPDATE_PRODUCTS} from '../../utils/actions';

function Homepage() {
    const [state, dispatch] = useStoreContext();  
    const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  
    useEffect(() => {
      if (data) {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: data.products,
        });
      }
    }, [data, dispatch]);

    
return (
<section className="homepageContainer">
<div className='row'>

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