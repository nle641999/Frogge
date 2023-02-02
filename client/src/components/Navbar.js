import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavbarBrand } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import Cart from "./Cart/Cart.js";

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
        className={navColour ? "sticky" : "navbar"}
      >
        <Container>
          <NavbarBrand href="/" className="d-flex">
            <img src={logo} className="img-fluid logo" alt="brand"/>
          </NavbarBrand>

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
                <Nav.Link onClick={() => setShowCart(true)}>
                  <AiOutlineShoppingCart style={{ marginBottom: "2px" }} /> 
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Cart showCart={showCart} setShowCart={setShowCart} />
    </>
  );
}

export default NavBar;