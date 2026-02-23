import React, { useMemo, useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { ChevronDown, Download, Grid, List, Plus, Search } from 'react-feather';
import './settings-teams.scss';

const TEAM_MEMBERS = [
    { id: 1, initials: 'PN', name: 'Phillip Ng', avatarColor: 'pink' },
    { id: 2, initials: 'GK', name: 'Gautam Kumar', avatarColor: 'purple' },
    { id: 3, initials: 'J', name: 'Jack', avatarColor: 'purple' },
    { id: 4, initials: 'A', name: 'Ashutosh', avatarColor: 'purple' },
    { id: 5, initials: 'SR', name: 'Santosh Roshan', avatarColor: 'purple' },
    { id: 6, initials: 'J', name: 'James', avatarColor: 'purple' },
];

const TeamsSettings = () => {
    const [query, setQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [statusFilter, setStatusFilter] = useState('Status');
    const [teamFilter, setTeamFilter] = useState('Team');
    const [accountFilter, setAccountFilter] = useState('Account type');
    const [managerFilter, setManagerFilter] = useState('Manager');
    const [sortBy, setSortBy] = useState('Sort');

    const filteredMembers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return TEAM_MEMBERS;
        return TEAM_MEMBERS.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.initials.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <Container fluid className="settings-teams-page">
            <div className="settings-teams-content">
                <div className="settings-teams-content-inner">
                    {/* Header: title + Export + Invite */}
                    <div className="settings-teams-header">
                        <h1 className="settings-teams-title">All People</h1>
                        <div className="settings-teams-actions">
                            {/* <Button
                                variant="outline"
                                className="settings-teams-export"
                                onClick={() => {}}
                            >
                                <Download size={16} />
                                Export
                            </Button> */}
                            <Button
                                className="settings-teams-invite"
                                onClick={() => {}}
                            >
                                Invite
                            </Button>
                        </div>
                    </div>

                    {/* Filters row */}
                    <div className="settings-teams-filters">
                        {/* Search + layout toggle */}
                        <div className="settings-teams-search-layout">
                            <InputGroup className="settings-teams-search">
                                <InputGroup.Text>
                                    <Search size={16} />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </InputGroup>
                            <div className="settings-teams-view-toggle">
                                <button
                                    type="button"
                                    className={`settings-teams-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    aria-label="Grid view"
                                >
                                    <Grid size={18} />
                                </button>
                                <button
                                    type="button"
                                    className={`settings-teams-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                    aria-label="List view"
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Member cards grid */}
                    <div className={`settings-teams-grid ${viewMode === 'list' ? 'settings-teams-grid--list' : ''}`}>
                        {filteredMembers.map((member) => (
                            <div key={member.id} className="settings-teams-card">
                                <div
                                    className={`settings-teams-card-avatar settings-teams-card-avatar--${member.avatarColor}`}
                                >
                                    {member.initials}
                                </div>
                                <div className="settings-teams-card-info">
                                    <span className="settings-teams-card-name">{member.name}</span>
                                    <span className="settings-teams-card-status" aria-hidden="true" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default TeamsSettings;
