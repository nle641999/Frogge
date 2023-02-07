import React, { useState } from 'react';
import '../../styles/Main.css';
import '../../styles/Contact.css';

import { validateEmail } from '../../utils/helpers';
import { Container } from 'react-bootstrap';


function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'name') {
      setName(inputValue);
    } else {
      setMessage(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setErrorMessage('Name is required');
      return;
    }

    if (!message) {
      setErrorMessage('Message is required');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Email is invalid');
      return;
    }

    window.location.href="mailto:altrent@pacbell.net?subject="+name+"&body="+message
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
    <Container 
     expand="md"
    >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h3 className='mainText'>Contact Us</h3>
      <br>
      </br>
      <h5 className='mainText'>Hello, please enter your information to contact us.</h5>
      <form className="form" id="fields">
        <input
          className="form-control"
          value={name}
          name="name"
          onChange={handleInputChange}
          type="text"
          placeholder="Enter Name"
          required
        />
        <input
          className="form-control"
          value={email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Enter Email"
          
        />
        <input
          className="form-control"
          value={message}
          name="message"
          onChange={handleInputChange}
          type="text"
          placeholder="Enter message"
          required
        />
        <input type="submit" className="btn btn-success" onClick={handleFormSubmit}/>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
    </Container>
    </>
  );
}

export default Contact;