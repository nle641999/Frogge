import React, {useEffect} from 'react';
import ProductItem from './productItem';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { Container, Row, Col } from "react-bootstrap";
import '../../styles/home.css'
import {UPDATE_PRODUCTS} from '../../utils/actions';

function Homepage() {
    // const products = [

    //     {
    //       name: 'Black Tee with Squares',
    //       sku: '49856',
    //       description:
    //         'Round neck tee in black. Features a print design of green squares simulating paint strokes.  100% cotton',
    //       image: 'black-shirt-squares.png',
    //     //   category: categories[0]._id,
    //       price: 55.00,
    //       quantity: 500
    //     },
    //     {
    //       name: 'Teel Solid Summer Tee',
    //       sku: '49857',
    //       description:
    //         'Round neck tee in solid teel color. Designed for extra comfort.  100% cotton',
    //       image: 'teel-t-shirt.png',
    //     //   category: categories[0]._id,
    //       price: 50.00,
    //       quantity: 200
    //     },
    //     {
    //       name: 'Orange Solid Tee',
    //       sku: '49858',
    //       description:
    //         'Round neck tee in solid orange color. Designed for extra comfort.  100% cotton',
    //       image: 'orange-t-shirt.png',
    //     //   category: categories[0]._id,
    //       price: 45.00,
    //       quantity: 280
    //     },
    //     {
    //       name: 'Blue Solid Tee',
    //       sku: '49859',
    //       description:
    //         'Round neck tee in solid blue color. Designed for extra comfort.  100% cotton',
    //       image: 'blue-t-shirt.png',
    //     //   category: categories[0]._id,
    //       price: 45.00,
    //       quantity: 260
    //     },
    //     {
    //       name: 'Yellow Solid Tee',
    //       sku: '49860',
    //       description:
    //         'Round neck tee in solid orange color. Designed for extra comfort.  100% cotton',
    //       image: 'yellow-t-shirt.png',
    //     //   category: categories[0]._id,
    //       price: 45.00,
    //       quantity: 210
    //     },
    //     {
    //       name: 'Pink Solid Tee',
    //       sku: '49861',
    //       description:
    //         'Round neck tee in solid pink color. Designed for extra comfort.  100% cotton',
    //       image: 'pink-t-shirt.png',
    //     //   category: categories[0]._id,
    //       price: 45.00,
    //       quantity: 275
    //     },
    //     {
    //       name: 'Lime Green Solid Tee',
    //       sku: '49862',
    //       description:
    //         'Round neck tee in solid lime green color. Designed for extra comfort.  100% cotton',
    //       image: 'green-t-shirt.png',
    //     //   category: categories[0]._id,
    //       price: 45.00,
    //       quantity: 300
    //     },
    //     {
    //       name: 'Red Solid Tee',
    //       sku: '49863',
    //       description:
    //         'Round neck tee in solid red color. Designed for extra comfort.  100% cotton',
    //       image: 'red-t-shirt.png',
    //     //   category: categories[0]._id,
    //       price: 45.00,
    //       quantity: 200
    //     }
    //   ];
    const [state, dispatch] = useStoreContext();

    // const { currentCategory } = state;
  
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
    <section>
     <Container fluid className="home-section" id="home">
      <Container className="home-content">
        <Row>
          <Col md={7} className="home-header">
            {state.products.map((product) => (
                <ProductItem
                key={product._id}
                item={product}/>
                ))}
          
          </Col>

        </Row>
      </Container>
    </Container> 
  </section>
);
}


export default Homepage;