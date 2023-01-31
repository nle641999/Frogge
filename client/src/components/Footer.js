import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer({ currentPage, handlePageChange}) {
  let date = new Date();
  let year = date.getFullYear();
  return (

    <Container fluid className="footer">
      <Row>
  
        <Col md="4" className="footer-copywright">
          <h3>© {year} Frogge Merch</h3>
        </Col>
  
          <a
            href="/contact"

            className={currentPage === 'Contact'}
          >
            Contact
          </a>

          
      </Row>
    </Container>
  
  );
}

export default Footer;