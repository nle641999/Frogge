import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

function Homepage() {
// const [clotheList] = ({props}) => {
//     if(!props._id.length) {
//         return <h3>No Clothes Listed Yet</h3>;
//     }
return (
    <section>
    <Container fluid className="home-section" id="home">
      <Container className="home-content">
        <Row>
          <Col md={7} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
              Hi There!{" "}
              <span className="wave" role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>

            <h1 className="heading-name">
              I'M
              <strong className="main-name"> NICHOLAS LE</strong>
            </h1>
          </Col>

        </Row>
      </Container>
    </Container>
  </section>
);
}


export default Homepage;