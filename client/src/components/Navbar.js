import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import Cart from "./Cart/Cart.js";
import '../styles/Main.css';

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showCart, setShowCart] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <>
      <Navbar
        expanded={expand}
        fixed="top"
        expand="md"
        className={"color-nav"}
      >
        <Container >
          <Navbar.Brand href="/" className="d-inline-block align-top">
            <div className="company-name">
            <img src ="../images/logo-dark-green-background.png" alt="logo" width="58"/> F R O G G E
            </div>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => {
              updateExpanded(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#contact">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> Contact
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
              <Nav.Link
                  as={Link}
                  to="/Cart"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineShoppingCart style={{ marginBottom: "2px" }} /> Cart
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    
    </>
  );
}

export default NavBar;