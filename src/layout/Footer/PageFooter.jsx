import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ExternalLink } from "react-feather";
import { Link } from "react-router-dom";

const PageFooter = () => {
  return (
    <div className="hk-footer">
      <Container as="footer" className="footer">
        <Row>
          <Col xl={8}>
            <p className="footer-text text-center">
              <span className="copy-text">
                Nexus © {new Date().getFullYear()} All rights reserved.
              </span>
              <Link to="#">Privacy Policy</Link>
              <span className="footer-link-sep">|</span>
              <Link to="#">T&amp;C</Link>
              {/* <span className="footer-link-sep">|</span>
              <Link to="#">System Status</Link> */}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageFooter;
