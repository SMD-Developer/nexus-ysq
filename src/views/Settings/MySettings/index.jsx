import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Lock, Mail, User } from 'react-feather';
import './my-settings.scss';

const MySettings = () => {
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
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
                                    <div className="my-settings-avatar">JD</div>
                                    <div className="my-settings-avatar-name">John Doe</div>
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
                                    <Form.Label>Change Password</Form.Label>
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
                        </Col>
                    </Row>

                    {/* Language & Region Section */}
                    <Row className="my-settings-sections mt-5">
                        <Col md={4} className="my-settings-section-label">
                            <h2 className="my-settings-section-title">Timezone</h2>
                            <p className="my-settings-section-desc">
                                Customize your timezone.
                            </p>
                        </Col>
                        <Col md={8}>
                            <Form>
                                <Form.Group className="mb-3" controlId="timezoneSelect">
                                    <Form.Label>Timezone</Form.Label>
                                    <Form.Select>
                                        <option>Asia/Kolkata</option>
                                        {/* Add more timezones as needed */}
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                    {/* Time & Date Format Section */}
                    <Row className="my-settings-sections mt-5">
                        <Col md={4} className="my-settings-section-label">
                            <h2 className="my-settings-section-title">Time & Date format</h2>
                            <p className="my-settings-section-desc">
                                Select the way time & dates are displayed.
                            </p>
                        </Col>
                        <Col md={8}>
                            <Form>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Start of the calendar week</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            id="calendarStartSunday"
                                            label="Sunday"
                                            name="calendarStart"
                                            defaultChecked
                                            className="me-4"
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="calendarStartMonday"
                                            label="Monday"
                                            name="calendarStart"
                                            className="d-inline-block"
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Time format</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            id="timeFormat24"
                                            label="24 hour"
                                            name="timeFormat"
                                            defaultChecked
                                            className="me-4"
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="timeFormat12"
                                            label="12 hour"
                                            name="timeFormat"
                                            className="d-inline-block"
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Date format</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            id="dateFormatMDY"
                                            label="mm/dd/yyyy"
                                            name="dateFormat"
                                            defaultChecked
                                            className="me-4"
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="dateFormatDMY"
                                            label="dd/mm/yyyy"
                                            name="dateFormat"
                                            className="d-inline-block"
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
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
