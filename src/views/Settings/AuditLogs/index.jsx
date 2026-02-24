import React, { useState } from 'react';
import { Container, Dropdown, Nav, Table } from 'react-bootstrap';
import {
    Calendar,
    ChevronDown,
    ChevronRight,
    Grid,
    User,
    X,
    Zap,
} from 'react-feather';
import './settings-audit-logs.scss';

const SAMPLE_LOGS = [
    {
        id: '1',
        date: 'Jul 29, 2024',
        time: '3:17:20 PM',
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        userInitials: 'JD',
        role: 'Admin',
        event: 'User Login (2FA)',
        status: 'Success',
        statusVariant: 'success',
    },
    {
        id: '2',
        date: 'Jul 29, 2024',
        time: '3:16:15 PM',
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        userInitials: 'JD',
        role: 'Admin',
        event: 'User Logout',
        status: 'Success',
        statusVariant: 'success',
    },
    {
        id: '3',
        date: 'Jul 26, 2024',
        time: '2:52:19 PM',
        userName: 'Jane Smith',
        userEmail: 'jane.smith@example.com',
        userInitials: 'JS',
        role: 'User',
        event: 'User Login (Failed, Invalid Credentials)',
        status: 'Failed',
        statusVariant: 'failed',
    },
];

const AuditLogsSettings = () => {
    const [activeTab, setActiveTab] = useState('user');
    const [expandedRow, setExpandedRow] = useState(null);
    const [showStatusChip] = useState(true);

    const removeStatusFilter = () => {
        // In real app: setShowStatusChip(false) and update filter state
    };

    return (
        <Container fluid className="settings-audit-logs-page">
            <div className="settings-audit-logs-content">
                <div className="settings-audit-logs-inner">
                    <h1 className="settings-audit-logs-title">Audit Logs</h1>

                    <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)} className="settings-audit-logs-tabs">
                        <Nav.Item>
                            <Nav.Link eventKey="user" className="settings-audit-logs-tab">
                                User
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="task" className="settings-audit-logs-tab">
                                Task
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div className="settings-audit-logs-filters">
                        <Dropdown className="settings-audit-logs-filter-dropdown">
                            <Dropdown.Toggle variant="light" size="sm" className="settings-audit-logs-filter-btn">
                                <Calendar size={16} />
                                <span>Date</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>Date filter options</Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="settings-audit-logs-filter-dropdown">
                            <Dropdown.Toggle variant="light" size="sm" className="settings-audit-logs-filter-btn">
                                <User size={16} />
                                <span>User</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>User filter options</Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="settings-audit-logs-filter-dropdown">
                            <Dropdown.Toggle variant="light" size="sm" className="settings-audit-logs-filter-btn">
                                <Zap size={16} />
                                <span>Event</span>      
                            </Dropdown.Toggle>
                            <Dropdown.Menu>Event filter options</Dropdown.Menu>
                        </Dropdown>
                        {showStatusChip && (
                            <span className="settings-audit-logs-chip">
                                <Grid size={14} />
                                Status
                                <button
                                    type="button"
                                    className="settings-audit-logs-chip-remove"
                                    onClick={removeStatusFilter}
                                    aria-label="Remove Status filter"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        )}
                    </div>

                    <div className="settings-audit-logs-table-wrap">
                        <Table className="settings-audit-logs-table" bordered>
                            <thead>
                                <tr>
                                    <th className="settings-audit-logs-col-expand" />
                                    <th className="settings-audit-logs-col-date">Date</th>
                                    <th className="settings-audit-logs-col-user">User</th>
                                    <th className="settings-audit-logs-col-role">Role</th>
                                    <th className="settings-audit-logs-col-event">Event</th>
                                    <th className="settings-audit-logs-col-status">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SAMPLE_LOGS.map((log) => (
                                    <React.Fragment key={log.id}>
                                        <tr
                                            className="settings-audit-logs-row"
                                            onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                                        >
                                            <td className="settings-audit-logs-col-expand">
                                                <span className="settings-audit-logs-expand-icon">
                                                    {expandedRow === log.id ? (
                                                        <ChevronDown size={16} />
                                                    ) : (
                                                        <ChevronRight size={16} />
                                                    )}
                                                </span>
                                            </td>
                                            <td className="settings-audit-logs-col-date">
                                                <span className="settings-audit-logs-date">{log.date}</span>
                                                <span className="settings-audit-logs-time">{log.time}</span>
                                            </td>
                                            <td className="settings-audit-logs-col-user">
                                                <span className="settings-audit-logs-avatar">{log.userInitials}</span>
                                                <span className="settings-audit-logs-user-info">
                                                    <span className="settings-audit-logs-user-name">{log.userName}</span>
                                                    <span className="settings-audit-logs-user-email">{log.userEmail}</span>
                                                </span>
                                            </td>
                                            <td className="settings-audit-logs-col-role">
                                                <span className={`settings-audit-logs-pill settings-audit-logs-pill-role`}>
                                                    {log.role}
                                                </span>
                                            </td>
                                            <td className="settings-audit-logs-col-event">{log.event}</td>
                                            <td className="settings-audit-logs-col-status">
                                                <span
                                                    className={`settings-audit-logs-pill settings-audit-logs-pill-status settings-audit-logs-pill-status--${log.statusVariant}`}
                                                >
                                                    {log.status}
                                                </span>
                                            </td>
                                        </tr>
                                        {expandedRow === log.id && (
                                            <tr className="settings-audit-logs-detail-row">
                                                <td colSpan={6} className="settings-audit-logs-detail-cell">
                                                    Additional details for this log entry can be shown here.
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AuditLogsSettings;
