import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Edit2 } from 'react-feather';
import './settings-workspace.scss';

const COLOR_SWATCHES = [
    '#374151',
    '#7c3aed',
    '#2563eb',
    '#38bdf8',
    '#ec4899',
    '#a78bfa',
    '#f97316',
    '#14b8a6',
    '#84cc16',
];

const WorkspaceSettings = () => {
    const [workspaceName, setWorkspaceName] = useState("Ashutosh Workspace");
    const [customBranding, setCustomBranding] = useState(false);
    const [customUrl, setCustomUrl] = useState('app');
    const [personalLayout, setPersonalLayout] = useState(false);
    const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0]);

    return (
        <Container fluid className="settings-workspace-page">
            <div className="settings-workspace-content">
                <div className="settings-workspace-inner">
                    <h1 className="settings-workspace-title">Workspace Settings</h1>

                    {/* General */}
                    <section className="settings-workspace-section settings-workspace-section-box">
                        <h2 className="settings-workspace-section-title">General</h2>
                        <div className="settings-workspace-row">
                            <label className="settings-workspace-label">Avatar</label>
                            <div className="settings-workspace-value">
                                <span className="settings-workspace-avatar">A</span>
                            </div>
                        </div>
                        <div className="settings-workspace-row">
                            <label className="settings-workspace-label">Name</label>
                            <div className="settings-workspace-value">
                                <Form.Control
                                    type="text"
                                    value={workspaceName}
                                    onChange={(e) => setWorkspaceName(e.target.value)}
                                    className="settings-workspace-input"
                                    style={{ fontSize: '0.75rem' }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Danger zone */}
                    <section className="settings-workspace-section settings-workspace-danger">
                        <h2 className="settings-workspace-section-title">Danger zone</h2>
                        <div
                            className="settings-workspace-row"
                            style={{
                                border: '1px solid #F5CAC9',
                                background: '#FFF1F0',
                                borderRadius: 8,
                                padding: 20,
                                marginBottom: 10,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <label className="settings-workspace-label" style={{ marginBottom: 8 }}>
                                Delete this Workspace forever
                            </label>
                            <div className="settings-workspace-value">
                                <Button
                                    variant="outline-danger"
                                    className="settings-workspace-delete-btn"
                                    style={{ fontSize: '0.75rem', fontWeight: 500, padding: '8px 16px' }}
                                >
                                    Delete Workspace
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Container>
    );
};

export default WorkspaceSettings;
