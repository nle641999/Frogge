import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {AiFillGithub, AiFillContacts} from "react-icons/ai";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>© {year} Frogge</h3>
        </Col>
        <Col md="4" className="footer-copywright">

        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/nle641999/Frogge"
                style={{ color: "green" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>

            <li className="social-icons">
              <a
                href="https://frogge-e-commerce.herokuapp.com/contact"
                style={{ color: "green" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillContacts />
              </a>
            </li>

          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;