import React from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';

const MOCK_WORKSPACES = [
    {
        id: 1,
        name: "Ashutosh Workspace",
        plan: 'Free Forever • people',
        initials: 'A',
        canLeave: false,
    },
    {
        id: 2,
        name: "Test Workspace",
        plan: 'Free Forever • people',
        initials: 'T',
        canLeave: true,
    },
    {
        id: 3,
        name: 'Test Workspace 2',
        plan: 'Free Forever • people',
        initials: 'Tw2',
        canLeave: true,
    },
    {
        id: 4,
        name: "Test Workspace 3",
        plan: 'Free Forever • 6 people',
        initials: 'T3',
        canLeave: true,
    },
];

const WorkspacesSettings = () => {
    return (
        <Container fluid className="py-4 d-flex flex-column align-items-center">
            <div style={{ maxWidth: 640, width: '100%' }}>
                <h2
                    className="mb-4"
                    style={{
                        fontSize: '22px',
                        fontWeight: 400,
                        textAlign: 'left',
                        color: '#1f2937',
                        fontFamily: 'DM Sans',
                    }}
                >
                    My Workspaces
                </h2>

                <Card>
                    <ListGroup variant="flush">
                        {MOCK_WORKSPACES.map((ws) => (
                            <ListGroup.Item
                                key={ws.id}
                                className="d-flex align-items-center justify-content-between"
                                style={{ paddingBlock: 16 }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 999,
                                            backgroundColor: '#f97316',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: 14,
                                        }}
                                    >
                                        {ws.initials}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{ws.name}</div>
                                        <div style={{ fontSize: 12, color: '#6b7280' }}>{ws.plan}</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <Button variant="light" size="sm" onClick={() => window.location.href = '/settings/workspace'}>
                                        Settings
                                    </Button>
                                    {ws.canLeave && (
                                        <Button
                                            size="sm"
                                            style={{
                                                backgroundColor: '#fee2e2',
                                                borderColor: '#fee2e2',
                                                color: '#f97373',
                                                fontSize: 12,
                                            }}
                                        >
                                            Leave
                                        </Button>
                                    )}
                                </div>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item
                            className="d-flex align-items-center"
                            style={{ paddingBlock: 16 }}
                        >
                            <Button
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 999,
                                    backgroundColor: '#e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#4b5563',
                                    fontWeight: 600,
                                    fontSize: 18,
                                    marginRight: 12,
                                }}
                                onClick={() => setShowCreateSpaceModal(true)}
                            >
                                +
                            </Button>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>New Workspace</div>
                                <div style={{ fontSize: 12, color: '#6b7280' }}>
                                    Create new workspace for your next project.
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </Container>
    );
};

export default WorkspacesSettings;

