import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CommanFooter1 from "../../CommanFooter1";
import { useTheme } from "../../../../utils/theme-provider/theme-provider";

//Images
import nexusImg from "../../../../assets/img/logo-light.svg";
import nexusImgDark from "../../../../assets/img/logo-dark.svg";

import signupBg from "../../../../assets/img/signup-bg.jpg";
import slide1 from "../../../../assets/img/slide1.jpg";
import slide2 from "../../../../assets/img/slide2.jpg";

const Signup = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { theme } = useTheme();

  return (
    <div className="hk-pg-wrapper py-0">
      <div className="hk-pg-body py-0">
        <Container fluid>
          <Row className="auth-split">
            <Col
              xl={7}
              lg={6}
              md={7}
              sm={10}
              className="position-relative mx-auto"
            >
              <div className="auth-content flex-column pt-8 pb-md-8 pb-13">
                <div className="text-center mb-7">
                  <Link to="/" className="navbar-brand me-0">
                    {theme === "light" ? (
                      <img
                        src={nexusImg}
                        alt="brand"
                        className="brand-img d-inline-block"
                      />
                    ) : (
                      <img
                        src={nexusImgDark}
                        alt="brand"
                        className="brand-img d-inline-block"
                      />
                    )}
                  </Link>
                </div>
                <Form className="w-100">
                  <Row>
                    <Col xxl={5} xl={7} lg={10} className="mx-auto">
                      <h4 className="text-center mb-4">Sign Up to Nexus</h4>
                      <Row className="gx-3">
                        <Col lg={12} as={Form.Group} className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            placeholder="Enter your name"
                            type="text"
                          />
                        </Col>
                        <Col lg={12} as={Form.Group} className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            placeholder="Enter your email id"
                            type="text"
                          />
                        </Col>
                        <Col lg={12} as={Form.Group} className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <InputGroup className="password-check">
                            <span className="input-affix-wrapper affix-wth-text">
                              <Form.Control
                                placeholder="6+ characters"
                                type={showPassword ? "text" : "password"}
                              />
                              <Link
                                to="#"
                                className="input-suffix text-primary text-uppercase fs-8 fw-medium"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <span>Hide</span>
                                ) : (
                                  <span>Show</span>
                                )}
                              </Link>
                            </span>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Form.Check id="logged_in" className="form-check-sm mb-3">
                        <Form.Check.Input type="checkbox" defaultChecked />
                        <Form.Check.Label className="text-muted fs-7">
                          By creating an account you specify that you have read
                          and agree with our <Link to="#">Tearms of use</Link>{" "}
                          and <Link to="#">Privacy policy</Link>. We may keep
                          you inform about latest updates through our default{" "}
                          <Link to="#">notification settings</Link>
                        </Form.Check.Label>
                      </Form.Check>
                      <Button
                        variant="primary"
                        className="btn-rounded btn-uppercase btn-block"
                        as={Link}
                        to="login-classic"
                      >
                        Create account
                      </Button>
                      <p className="p-xs mt-2 text-center">
                        Already a member ?{" "}
                        <Link to="/auth/login-classic">
                          <u>Sign In</u>
                        </Link>
                      </p>
                    </Col>
                  </Row>
                </Form>
              </div>
              {/* Page Footer */}
              <CommanFooter1 />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
