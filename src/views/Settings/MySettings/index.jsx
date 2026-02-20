import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Lock, Mail, User } from 'react-feather';
import './my-settings.scss';

const MySettings = () => {
    const [fullName, setFullName] = useState('Ashutosh Srivastav');
    const [email, setEmail] = useState('as9304596@gmail.com');
    const [password, setPassword] = useState('');
    const [twoFaSms, setTwoFaSms] = useState(false);

    return (
        <Container fluid className="my-settings-page">
            <div className="my-settings-content">
                <div className="my-settings-content-inner">
                    <h1 className="my-settings-title">My Settings</h1>

                    <Row className="my-settings-sections">
                        <Col md={4} className="my-settings-section-label">
                            <h2 className="my-settings-section-title">Profile</h2>
                            <p className="my-settings-section-desc">
                                Your personal information and account security settings.
                            </p>
                        </Col>
                        <Col md={8}>
                            <div className="my-settings-profile-block">
                                <div className="my-settings-avatar-wrap">
                                    <div className="my-settings-avatar">AS</div>
                                    <div className="my-settings-avatar-name">Ashutosh Srivastav</div>
                                </div>

                                <Form.Group className="my-settings-field">
                                    <Form.Label>Full Name</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="my-settings-input-icon">
                                            <User size={16} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Full Name"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="my-settings-field">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="my-settings-input-icon">
                                            <Mail size={16} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="my-settings-field">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="my-settings-input-icon">
                                            <Lock size={16} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter New Password"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </div>

                            {/* <div className="my-settings-2fa">
                                <div className="my-settings-section-label-inline">
                                    <h2 className="my-settings-section-title">Two-factor authentication (2FA)</h2>
                                    <p className="my-settings-section-desc">
                                        Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP) from an authenticator app.
                                    </p>
                                </div>
                                <div className="my-settings-2fa-option">
                                    <div className="my-settings-2fa-option-header">
                                        <span className="my-settings-2fa-option-label">Text Message (SMS)</span>
                                        <Form.Check
                                            type="switch"
                                            id="2fa-sms"
                                            checked={twoFaSms}
                                            onChange={(e) => setTwoFaSms(e.target.checked)}
                                            className="my-settings-2fa-switch"
                                        />
                                    </div>
                                    <p className="my-settings-2fa-option-desc">
                                        Receive a one-time passcode via SMS each time you log in.
                                    </p>
                                    <a href="#" className="my-settings-2fa-link">Business</a>
                                </div>
                            </div> */}

                            <div className="my-settings-actions">
                                <Button variant="primary" className="my-settings-save-btn">
                                    Save changes
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default MySettings;
