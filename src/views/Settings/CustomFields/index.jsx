import React from 'react';
import { Button, Card, Container, Form, Table, Badge } from 'react-bootstrap';

const CustomFieldsSettings = () => {
    return (
        <Container fluid className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0" style={{ fontSize: '20px', fontWeight: 600 }}>All Custom Fields</h4>
            </div>

            <Card>
                <Card.Body>
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
                        <div>
                            <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>All Fields</h5>
                            <Button
                                size="sm"
                                style={{
                                    borderRadius: 999,
                                    backgroundColor: '#f4ebff',
                                    color: '#7c3aed',
                                    border: 'none',
                                    fontSize: '12px',
                                    paddingInline: 16,
                                }}
                            >
                                Group by: Field type
                            </Button>
                            <span className="mx-2">|</span>
                            <Button
                                size="sm"
                                style={{
                                    borderRadius: 999,
                                    backgroundColor: '#f3f4f6',
                                    color: '#4b5563',
                                    border: 'none',
                                    fontSize: '12px',
                                    paddingInline: 16,
                                }}
                            >
                                Filter
                            </Button>
                        </div>
                        <div className="d-flex flex-wrap align-items-center gap-2 justify-content-end">
                            <Button
                                size="sm"
                                style={{
                                    borderRadius: 999,
                                    backgroundColor: '#7c3aed',
                                    borderColor: '#7c3aed',
                                    fontSize: '12px',
                                    paddingInline: 18,
                                    fontWeight: 600,
                                    
                                }}
                            >
                                Create new field
                            </Button>
                            <Form.Control
                                type="search"
                                size="sm"
                                placeholder="Search..."
                                style={{
                                    maxWidth: 220,
                                    borderRadius: 999,
                                    fontSize: '12px',
                                }}
                            />

                        </div>
                    </div>

                    <Table responsive hover size="sm" className="mb-0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location(s)</th>
                                <th>Created by</th>
                                <th>Date Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="small text-muted d-flex align-items-center gap-1">
                                        {/* Checkbox icon */}
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: 18,
                                                height: 18,
                                                border: "1.5px solid #AAA",
                                                borderRadius: 4,
                                                marginRight: 5,
                                            }}
                                            aria-label="Checkbox type"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 16 16">
                                                <rect x="2" y="2" width="12" height="12" rx="3" fill="#fff" stroke="#7c3aed" strokeWidth="2"></rect>
                                                <polyline points="4.5 8.5 7.5 11.5 11.5 5.5" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        Checkbox
                                    </div>
                                    <div>CEO Approval</div>
                                </td>
                                <td>
                                    <Badge bg="light" text="dark">
                                        New Template list
                                    </Badge>
                                </td>
                                <td>
                                    <Badge bg="primary" pill>
                                        YC1
                                    </Badge>{' '}
                                    <span className="small text-muted">Test1</span>
                                </td>
                                <td className="small text-muted">8/21/25</td>
                                <td className="text-end">
                                    <Button variant="link" size="sm">
                                        ...
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="py-2">
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="d-flex align-items-center"
                                        style={{ color: "#7c3aed", fontWeight: 600, paddingLeft: 0 }}
                                    >
                                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="7.2" stroke="#7c3aed" strokeWidth="1.6" />
                                            <path d="M8 4.5v7M4.5 8h7" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        <span className="ms-1">Create new field</span>
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="small text-muted d-flex align-items-center gap-1">
                                        {/* Checkbox icon */}
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: 18,
                                                height: 18,
                                                border: "1.5px solid #AAA",
                                                borderRadius: 4,
                                                marginRight: 5,
                                            }}
                                            aria-label="Checkbox type"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 16 16">
                                                <rect x="2" y="2" width="12" height="12" rx="3" fill="#fff" stroke="#7c3aed" strokeWidth="2"></rect>
                                                <polyline points="4.5 8.5 7.5 11.5 11.5 5.5" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        Checkbox
                                    </div>
                                    <div>Laptop Preparation</div>
                                </td>
                                <td>
                                    <Badge bg="light" text="dark">
                                        Onboarding List
                                    </Badge>
                                </td>
                                <td>
                                    <Badge bg="primary" pill>
                                        YC2
                                    </Badge>{' '}
                                    <span className="small text-muted">Test2</span>
                                </td>
                                <td className="small text-muted">8/19/25</td>
                                <td className="text-end">
                                    <Button variant="link" size="sm">
                                        ...
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="py-2">
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="d-flex align-items-center"
                                        style={{ color: "#7c3aed", fontWeight: 600, paddingLeft: 0 }}
                                    >
                                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="7.2" stroke="#7c3aed" strokeWidth="1.6" />
                                            <path d="M8 4.5v7M4.5 8h7" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        <span className="ms-1">Create new field</span>
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="small text-muted d-flex align-items-center gap-1">
                                        {/* Date icon */}
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: 18,
                                                height: 18,
                                                marginRight: 5,
                                            }}
                                            aria-label="Date type"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16">
                                                <rect x="2" y="4" width="12" height="10" rx="2" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
                                                <rect x="4.5" y="7" width="7" height="2.5" rx="1.25" fill="#e0e7ff" />
                                                <rect x="5.5" y="2" width="1.5" height="3" rx="0.75" fill="#7c3aed" />
                                                <rect x="9" y="2" width="1.5" height="3" rx="0.75" fill="#7c3aed" />
                                            </svg>
                                        </span>
                                        Date
                                    </div>
                                    <div>Complete date</div>
                                </td>
                                <td>
                                    <Badge bg="light" text="dark">
                                        Daily Operation Working...
                                    </Badge>
                                </td>
                                <td>
                                    <Badge bg="primary" pill>
                                        YC3
                                    </Badge>{' '}
                                    <span className="small text-muted">Test3</span>
                                </td>
                                <td className="small text-muted">8/21/25</td>
                                <td className="text-end">
                                    <Button variant="link" size="sm">
                                        ...
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="py-2">
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="d-flex align-items-center"
                                        style={{ color: "#7c3aed", fontWeight: 600, paddingLeft: 0 }}
                                    >
                                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="7.2" stroke="#7c3aed" strokeWidth="1.6" />
                                            <path d="M8 4.5v7M4.5 8h7" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        <span className="ms-1">Create new field</span>
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CustomFieldsSettings;

