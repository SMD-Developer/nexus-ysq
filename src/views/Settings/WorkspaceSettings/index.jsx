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

                    {/* Custom branding */}
                    <section className="settings-workspace-section settings-workspace-section-box">
                        <div className="settings-workspace-section-header">
                            <h2 className="settings-workspace-section-title">Custom branding</h2>
                            <span className="settings-workspace-enterprise-badge">Enterprise</span>
                        </div>
                        <div className="settings-workspace-row settings-workspace-row-toggle">
                            <label className="settings-workspace-label">Enable custom branding</label>
                            <div className="settings-workspace-value">
                                <Form.Check
                                    type="switch"
                                    id="custom-branding-switch"
                                    checked={customBranding}
                                    onChange={(e) => setCustomBranding(e.target.checked)}
                                    className="settings-workspace-switch"
                                />
                            </div>
                        </div>
                        <div className="settings-workspace-row settings-workspace-row-with-desc">
                            <div className="settings-workspace-label-wrap">
                                <label className="settings-workspace-label">Round logo</label>
                                <p className="settings-workspace-desc">
                                    We recommend a 72 x 72 px PNG file. This logo is used in-app as your Workspace avatar.
                                </p>
                            </div>
                            <div className="settings-workspace-value">
                                <Button variant="light" size="sm" className="settings-workspace-add-btn">
                                    Add
                                </Button>
                            </div>
                        </div>
                        <div className="settings-workspace-row settings-workspace-row-with-desc">
                            <div className="settings-workspace-label-wrap">
                                <label className="settings-workspace-label">Rectangle logo</label>
                                <p className="settings-workspace-desc">
                                    We recommend a 232 x 48 px PNG file. This logo appears on emails, your login screen, and public links to items like Forms, Docs, Dashboards, and tasks.
                                </p>
                            </div>
                            <div className="settings-workspace-value">
                                <Button variant="light" size="sm" className="settings-workspace-add-btn">
                                    Add
                                </Button>
                            </div>
                        </div>
                        <div className="settings-workspace-row settings-workspace-row-with-desc">
                            <div className="settings-workspace-label-wrap">
                                <label className="settings-workspace-label">Social media graphic</label>
                                <p className="settings-workspace-desc">
                                    We recommend a 500 x 260 px PNG file. This graphic serves as the preview image when ClickUp links are shared.
                                </p>
                            </div>
                            <div className="settings-workspace-value">
                                <Button variant="light" size="sm" className="settings-workspace-add-btn">
                                    Add
                                </Button>
                            </div>
                        </div>
                        <div className="settings-workspace-row">
                            <label className="settings-workspace-label">Color scheme</label>
                            <div className="settings-workspace-value settings-workspace-color-row">
                                <div className="settings-workspace-swatches">
                                    {COLOR_SWATCHES.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`settings-workspace-swatch ${selectedColor === color ? 'active' : ''}`}
                                            style={{ background: color }}
                                            onClick={() => setSelectedColor(color)}
                                            aria-label={`Color ${color}`}
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        className="settings-workspace-swatch settings-workspace-swatch-edit"
                                        aria-label="Edit color"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="settings-workspace-row">
                            <label className="settings-workspace-label">Custom URL</label>
                            <div className="settings-workspace-value settings-workspace-url-wrap">
                                <Form.Control
                                    type="text"
                                    value={customUrl}
                                    onChange={(e) => setCustomUrl(e.target.value)}
                                    className="settings-workspace-url-input"
                                    placeholder="app"
                                />
                                <span className="settings-workspace-url-suffix">.nexus.com</span>
                            </div>
                        </div>
                    </section>

                    {/* Personal Layout */}
                    <section className="settings-workspace-section">
                        <h2 className="settings-workspace-section-title">Personal Layout</h2>
                        <div className="settings-workspace-subsection">
                            <div className="settings-workspace-row settings-workspace-row-toggle">
                                <div className="settings-workspace-label-wrap">
                                    <label className="settings-workspace-label">Personal Workspace Layout</label>
                                    <p className="settings-workspace-desc">
                                        Work by yourself? Turn this on to maximize your efficiency by removing features designed for team collaboration.
                                    </p>
                                </div>
                                <div className="settings-workspace-value">
                                    <Form.Check
                                        type="switch"
                                        id="personal-layout-switch"
                                        checked={personalLayout}
                                        onChange={(e) => setPersonalLayout(e.target.checked)}
                                        className="settings-workspace-switch"
                                    />
                                </div>
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
