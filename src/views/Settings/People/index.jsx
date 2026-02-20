import React, { useMemo, useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup, Modal, Table } from 'react-bootstrap';
import { ChevronDown, Lock, Plus, Search, Upload, User, X } from 'react-feather';
import './settings-people.scss';

const INVITE_ROLES = [
    { id: 'member', label: 'Member', description: 'Can access all public items in your Workspace.' },
    { id: 'guest', label: 'Guest', description: 'Limited access to specific items.' },
];

const PeopleSettings = () => {
    const [query, setQuery] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmails, setInviteEmails] = useState('');
    const [inviteRole, setInviteRole] = useState(INVITE_ROLES[0]);

    const users = useMemo(
        () => [
            {
                initials: 'JD',
                name: 'James Doe',
                email: 'james.doe@example.com',
                role: 'Owner',
                lastActive: 'Feb 20',
                invitedBy: '',
                invitedOn: '20/02/2026',
            },
        ],
        []
    );

    const filteredUsers = users.filter((u) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(q);
    });

    return (
        <Container fluid className="settings-people-page">
            <div className="settings-people-content settings-people-content--full">
                <div className="settings-people-content-inner">
                    <div className="settings-people-header">
                        <div className="settings-people-title-wrap">
                            <h3 className="settings-people-title" style={{ fontSize: "1.0rem" }}>Manage people</h3>
                        </div>
                    </div>

                    <div className="settings-people-toolbar">
                        <InputGroup className="settings-people-search">
                            <InputGroup.Text>
                                <Search size={16} />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search or invite by email"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </InputGroup>

                        <Button className="settings-people-invite" onClick={() => setShowInviteModal(true)}>
                            <Plus size={16} />
                            Invite people
                        </Button>
                    </div>

                    <div className="settings-people-subtoolbar">
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" size="sm" className="settings-people-filter">
                                All Users (1)
                                <ChevronDown size={16} className="ms-1" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item active>All Users</Dropdown.Item>
                                <Dropdown.Item>Owners</Dropdown.Item>
                                <Dropdown.Item>Members</Dropdown.Item>
                                <Dropdown.Item>Guests</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="settings-people-table-card">
                        <Table responsive className="settings-people-table mb-0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Last active</th>
                                    <th>Invited by</th>
                                    <th>Invited on</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u) => (
                                    <tr key={u.email}>
                                        <td>
                                            <div className="settings-people-name">
                                                <span className="settings-people-avatar">{u.initials}</span>
                                                <span className="settings-people-name-text">{u.name}</span>
                                                {u.role === 'Owner' && (
                                                    <span className="settings-people-badge">Owner</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="text-muted">{u.email}</td>
                                        <td>{u.role}</td>
                                        <td className="text-muted">{u.lastActive}</td>
                                        <td className="text-muted">{u.invitedBy || '-'}</td>
                                        <td className="text-muted">{u.invitedOn}</td>
                                        <td className="text-end">
                                            <Button variant="link" className="settings-people-ellipsis">
                                                ...
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Invite people modal */}
            <Modal
                show={showInviteModal}
                onHide={() => setShowInviteModal(false)}
                centered
                className="invite-people-modal"
            >
                <Modal.Header className="invite-people-modal-header">
                    <Modal.Title className="invite-people-modal-title d-flex align-items-center gap-2">
                        Invite people <span className="fw-normal ms-2" style={{ color: "#666", fontWeight: 400 }}></span>
                    </Modal.Title>
                    <Button
                        variant="flush-dark"
                        className="invite-people-modal-close"
                        onClick={() => setShowInviteModal(false)}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </Button>
                </Modal.Header>
                <Modal.Body className="invite-people-modal-body">
                    <Form>
                        <Form.Group className="invite-people-form-group mb-3">
                            <Form.Label className="fw-semibold mb-1">Invite by email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email, comma or space separated"
                                value={inviteEmails}
                                onChange={(e) => setInviteEmails(e.target.value)}
                                className="py-2"
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label className="fw-semibold mb-2">Invite as</Form.Label>
                            <div
                                className="d-flex align-items-start bg-light rounded-3 px-3 py-2"
                                style={{ background: "#f6f6fa", border: "none" }}
                            >
                                <span
                                    className="d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                                    style={{
                                        background: "#ececf3",
                                        borderRadius: "6px",
                                        width: 32,
                                        height: 32,
                                        marginTop: 2,
                                    }}
                                >
                                    <User size={18} color="#888" />
                                </span>
                                <div className="flex-grow-1">
                                    <Dropdown.Toggle
                                        variant="link"
                                        className="p-0 border-0 bg-transparent shadow-none d-flex align-items-center no-caret"
                                        style={{
                                            fontWeight: 600,
                                            fontSize: "0.97rem",
                                            color: "#202123",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {inviteRole.label}
                                        <ChevronDown size={14} className="ms-1" />
                                    </Dropdown.Toggle>
                                    <div className="text-muted" style={{ fontSize: "0.9rem", marginTop: 2 }}>
                                        {inviteRole.description}
                                    </div>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="invite-people-modal-footer justify-content-between">
                    <Button variant="link" className="invite-people-modal-cancel px-3" onClick={() => setShowInviteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        className="invite-people-modal-send px-4"
                        style={{
                            background: "#6846f5",
                            borderColor: "#6846f5",
                            borderRadius: 6,
                            fontWeight: 600
                        }}
                        onClick={() => {
                            // TODO: send invite
                            setShowInviteModal(false);
                            setInviteEmails('');
                        }}
                    >
                        Send invite
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PeopleSettings;

