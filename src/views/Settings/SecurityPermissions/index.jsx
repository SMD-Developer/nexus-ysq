import React, { useState, useMemo } from 'react';
import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { Lock, Plus, Search } from 'react-feather';
import './settings-security-permissions.scss';

const ROLES = ['GUEST', 'LIMITED MEMBER', 'MEMBER', 'ADMIN'];

const INVITE_PERMISSIONS = [
    {
        category: 'COLLABORATION',
        actions: [
            {
                id: 'invite-members',
                label: 'Invite Members',
                description: 'Gives the user permission to invite members to the Workspace.',
            },
            {
                id: 'invite-guests',
                label: 'Invite Guests',
                description: 'Gives the user permission to invite guests to the Workspace.',
            },
            {
                id: 'invite-limited-members',
                label: 'Invite Limited Members',
                description: 'Gives the user permission to invite limited members to the Workspace.',
            },
        ],
    },
];

const CUSTOM_PERMISSIONS = [
    {
        category: 'MANAGE ACTIONS',
        actions: [
            {
                id: 'manage-users',
                label: 'Manage Users',
                description:
                    'Grants the user permission to view and manage all members and guests in a Workspace. This includes adding and removing users, changing roles, and managing invites.',
            },
            {
                id: 'manage-teams',
                label: 'Manage Teams',
                description:
                    'Grants the user permission to manage all teams in a Workspace. This includes the ability to add, edit, and remove teams, as well as manage their members.',
            },
            {
                id: 'git',
                label: 'Git',
                description:
                    'Allows the user to see and open the Github/Bitbucket/Gitlab modal on tasks and use all the features within it.',
            },
            {
                id: 'edit-statuses',
                label: 'Edit Statuses',
                description:
                    'Gives the user the permission to create, edit, and delete statuses. If you have Edit Statuses toggled on, but Delete Items off, you will not be able to delete statuses.',
            },
            {
                id: 'manage-tags',
                label: 'Manage Tags',
                description:
                    'Gives the user the permission to create, edit, and delete tags. If you have Manage Tags toggled on, but Delete Items off, you will not be able to delete tags.',
            },
            {
                id: 'send-email',
                label: 'Send Email (Email ClickApp)',
                description: 'Gives the user the permission to send email through the Email ClickApp.',
            },
            {
                id: 'add-email-accounts',
                label: 'Add Email Accounts (Email ClickApp)',
                description: 'Gives the user the permission to add authorized email accounts through the Email ClickApp.',
            },
        ],
    },
];

const initialInviteState = () => {
    const s = {};
    INVITE_PERMISSIONS.forEach(({ actions }) =>
        actions.forEach((a) => {
            s[a.id] = { GUEST: false, 'LIMITED MEMBER': false, MEMBER: true, ADMIN: true };
        })
    );
    return s;
};

const initialCustomState = () => {
    const s = {};
    CUSTOM_PERMISSIONS.forEach(({ actions }) =>
        actions.forEach((a) => {
            const isManage = a.id === 'manage-users' || a.id === 'manage-teams';
            s[a.id] = {
                GUEST: false,
                'LIMITED MEMBER': false,
                MEMBER: isManage ? false : true,
                ADMIN: true,
            };
        })
    );
    return s;
};

const SecurityPermissions = () => {
    const [invitePerms, setInvitePerms] = useState(initialInviteState);
    const [customPerms, setCustomPerms] = useState(initialCustomState);
    const [searchAction, setSearchAction] = useState('');

    const setInvite = (actionId, role, value) => {
        setInvitePerms((prev) => ({
            ...prev,
            [actionId]: { ...prev[actionId], [role]: value },
        }));
    };

    const setCustom = (actionId, role, value) => {
        setCustomPerms((prev) => ({
            ...prev,
            [actionId]: { ...prev[actionId], [role]: value },
        }));
    };

    const filteredCustomSections = useMemo(() => {
        const q = searchAction.trim().toLowerCase();
        if (!q)
            return CUSTOM_PERMISSIONS;
        return CUSTOM_PERMISSIONS.map((sec) => ({
            ...sec,
            actions: sec.actions.filter(
                (a) =>
                    a.label.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q)
            ),
        })).filter((sec) => sec.actions.length > 0);
    }, [searchAction]);

    return (
        <Container fluid className="settings-security-page">
            <div className="settings-security-content">
                <div className="settings-security-inner">
                    {/* Section 1: Invite Permissions */}
                    <section className="settings-security-section">
                        <div className="settings-security-section-header">
                            <h2 className="settings-security-section-title">Invite Permissions</h2>
                            <a href="#learn-invite" className="settings-security-learn">Learn more</a>
                        </div>
                        <div className="settings-security-table-wrap">
                            <Table className="settings-security-table" bordered>
                                <thead>
                                    <tr>
                                        <th className="settings-security-col-action">ACTIONS</th>
                                        {ROLES.map((r) => (
                                            <th key={r} className="settings-security-col-role">
                                                {r}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {INVITE_PERMISSIONS.map(({ category, actions }) => (
                                        <React.Fragment key={category}>
                                            <tr className="settings-security-category-row">
                                                <td colSpan={1 + ROLES.length} className="settings-security-category">
                                                    {category}
                                                </td>
                                            </tr>
                                            {actions.map((action) => (
                                                <tr key={action.id}>
                                                    <td className="settings-security-col-action">
                                                        <div className="settings-security-action-label">
                                                            {action.label}
                                                        </div>
                                                        <div className="settings-security-action-desc">
                                                            {action.description}
                                                        </div>
                                                    </td>
                                                    {ROLES.map((role) => (
                                                        <td key={role} className="settings-security-col-role">
                                                            <Form.Check
                                                                type="switch"
                                                                id={`invite-${action.id}-${role}`}
                                                                checked={!!invitePerms[action.id]?.[role]}
                                                                onChange={(e) =>
                                                                    setInvite(action.id, role, e.target.checked)
                                                                }
                                                                className="settings-security-toggle"
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </section>

                    {/* Section 2: Custom Role Permissions */}
                    <section className="settings-security-section">
                        <div className="settings-security-section-header settings-security-section-header--custom">
                            <div className="settings-security-custom-title-wrap">
                                <Lock size={18} className="settings-security-lock-icon" />
                                <h2 className="settings-security-section-title">Custom Role Permissions</h2>
                                <a href="#learn-custom" className="settings-security-learn">Learn more</a>
                            </div>
                            <div className="settings-security-custom-toolbar">
                                <InputGroup className="settings-security-search">
                                    <InputGroup.Text>
                                        <Search size={16} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search for action..."
                                        value={searchAction}
                                        onChange={(e) => setSearchAction(e.target.value)}
                                    />
                                </InputGroup>
                                <Button className="settings-security-new-role">
                                    <Plus size={16} />
                                    New Role
                                </Button>
                            </div>
                        </div>
                        <div className="settings-security-table-wrap">
                            <Table className="settings-security-table" bordered>
                                <thead>
                                    <tr>
                                        <th className="settings-security-col-action">ACTIONS</th>
                                        {ROLES.map((r) => (
                                            <th key={r} className="settings-security-col-role">
                                                {r}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomSections.map(({ category, actions }) => (
                                        <React.Fragment key={category}>
                                            <tr className="settings-security-category-row">
                                                <td colSpan={1 + ROLES.length} className="settings-security-category">
                                                    {category}
                                                </td>
                                            </tr>
                                            {actions.map((action) => (
                                                <tr key={action.id}>
                                                    <td className="settings-security-col-action">
                                                        <div className="settings-security-action-label">
                                                            {action.label}
                                                        </div>
                                                        <div className="settings-security-action-desc">
                                                            {action.description}
                                                        </div>
                                                    </td>
                                                    {ROLES.map((role) => (
                                                        <td key={role} className="settings-security-col-role">
                                                            <Form.Check
                                                                type="switch"
                                                                id={`custom-${action.id}-${role}`}
                                                                checked={!!customPerms[action.id]?.[role]}
                                                                onChange={(e) =>
                                                                    setCustom(action.id, role, e.target.checked)
                                                                }
                                                                className="settings-security-toggle"
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </section>
                </div>
            </div>
        </Container>
    );
};

export default SecurityPermissions;
