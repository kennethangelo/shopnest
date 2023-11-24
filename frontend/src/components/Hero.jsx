import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">ShopNest Authentication</h1>
          <p className="text-center mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            accusamus eum explicabo architecto aliquid consequuntur reiciendis
            fugiat ducimus modi, dolores tempora suscipit ad cum, placeat
            mollitia esse. Odit, aut rerum.
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Sign Up</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
