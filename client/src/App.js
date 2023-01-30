import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,

  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Product from './components/pages/singleProduct';
import Home from './components/Navbar/Home.js';
import Cart from './components/Navbar/Cart.js';
import Contact from './components/pages/Contact.js';
import Footer from './components/Footer.js';
import Navbar from './components/pages/Navbar';
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
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
        <Footer/>
        </div>
    </Router>
    </ApolloProvider>
  );
}


export default App;
