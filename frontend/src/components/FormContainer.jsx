import React from "react";
import { Container, Row, Col } from "react-bootstrap";

//whatever we want to wrap, we want to wrap with this container so we need a children parameter
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
