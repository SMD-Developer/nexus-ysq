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
                initials: 'AS',
                name: 'Ashutosh Srivastar',
                email: 'as9304596@gmail.com',
                role: 'Owner',
                lastActive: 'Feb 18',
                invitedBy: '',
                invitedOn: '10/11/2025',
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
                            <h1 className="settings-people-title">Manage people</h1>
                            <a href="#" className="settings-people-learn-more">Learn more</a>
                        </div>
                        <Button variant="outline-secondary" size="sm" className="settings-people-export">
                            <Upload size={12} />
                            Export
                        </Button>
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
                    <Modal.Title className="invite-people-modal-title">
                        Invite people <span className="invite-people-modal-title-light">for free</span>
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
                        <Form.Group className="invite-people-form-group">
                            <Form.Label>Invite by email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email, comma or space separated"
                                value={inviteEmails}
                                onChange={(e) => setInviteEmails(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="invite-people-form-group">
                            <Form.Label>Invite as</Form.Label>
                            <Dropdown className="invite-people-role-dropdown">
                                <Dropdown.Toggle variant="outline-secondary" className="invite-people-role-toggle">
                                    <span className="invite-people-role-icon-wrap">
                                        <User size={16} />
                                    </span>
                                    <ChevronDown size={16} className="invite-people-role-chevron" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {INVITE_ROLES.map((role) => (
                                        <Dropdown.Item
                                            key={role.id}
                                            active={inviteRole.id === role.id}
                                            onClick={() => setInviteRole(role)}
                                        >
                                            <span className="invite-people-role-option-label">{role.label}</span>
                                            <span className="invite-people-role-option-desc">{role.description}</span>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Text className="invite-people-role-description">
                                {inviteRole.description}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="invite-people-modal-footer">
                    <Button variant="link" className="invite-people-modal-cancel" onClick={() => setShowInviteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        className="invite-people-modal-send"
                        onClick={() => {
                            // TODO: send invite
                            setShowInviteModal(false);
                            setInviteEmails('');
                        }}
                    >
                        Send free invite
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PeopleSettings;

