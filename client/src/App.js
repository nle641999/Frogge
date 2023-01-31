import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,

  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SingleProduct from './components/SingleProduct/singleProduct';
import Home from './components/Homepage/Home.js';
import Cart from './components/Basket/Cart.js';
import Contact from './components/Contact/Contact.js';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';
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
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
        </Routes>
        <Footer/>
        </div>
    </Router>
    </ApolloProvider>
  );
}


export default App;
