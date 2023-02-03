import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider} from './utils/GlobalState'
import SingleProduct from './components/SingleProduct/singleProduct';
import Navbar from './components/Navbar.js';
import Home from './components/Homepage/homepage.js';
import Cart from './components/Cart/Cart.js';
import Contact from './components/Contact/Contact.js';
import Footer from './components/Footer.js';

import "./style.css";
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div>
      <StoreProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
        </Routes>
        <Footer/>
        </StoreProvider>
        </div>
    </Router>
    </ApolloProvider>
  );
}


export default App;
