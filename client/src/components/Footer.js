import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {AiFillGithub} from "react-icons/ai";
import {FaUser} from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="border-top fixed-bottom">
      <Row>
      <Col md="7" className="footer-copywright">
          <h5>© Frogge Inc.</h5>
        </Col>
        {/* <Col md="4" className="footer-copywright">
          <h3></h3>
        </Col> */}
        <Col md="2" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/nle641999/Frogge"
                style={{ color: "#8cb288" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>

            <li className="social-icons">
              <a
                href="https://frogge-e-commerce.herokuapp.com/contact"
                style={{ color: "#8cb288" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaUser />
              </a>
            </li>

          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;