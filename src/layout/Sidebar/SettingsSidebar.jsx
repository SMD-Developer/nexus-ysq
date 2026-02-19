import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ChevronLeft, User } from 'react-feather';
import './settings-sidebar.scss';

const SettingsSidebar = ({ show = false, toggleSidebar, onCollapse }) => {
    const handleLinkClick = () => {
        if (toggleSidebar && window.innerWidth <= 1199) {
            toggleSidebar();
        }
    };

    const items = [
        { label: 'People', to: '/settings/people', active: true },
        { label: 'Upgrade' },
        { label: 'App Center' },
        { label: 'Settings' },
        { label: 'Work Schedule' },
        { label: 'Spaces' },
        { label: 'Security & Permissions' },
        { label: 'Audit Logs' },
        { label: 'Teams' },
        { label: 'Task Types' },
    ];

    return (
        <div className={classNames('settings-sidebar', { show })}>
            <div className="settings-sidebar-header">
                <div className="settings-sidebar-title">All settings</div>
                {onCollapse && (
                    <Button
                        variant="flush-dark"
                        size="sm"
                        className="settings-sidebar-close"
                        onClick={onCollapse}
                        title="Close settings sidebar"
                    >
                        <ChevronLeft size={18} />
                    </Button>
                )}
            </div>

            <SimpleBar className="settings-sidebar-content">
                <div className="settings-sidebar-nav">
                    <Nav className="flex-column">
                        {items.map((i) => (
                            <Nav.Item key={i.label}>
                                {i.to ? (
                                    <Nav.Link
                                        as={NavLink}
                                        to={i.to}
                                        className="settings-sidebar-link"
                                        activeClassName="is-active"
                                        onClick={handleLinkClick}
                                    >
                                        <span className="settings-sidebar-icon" aria-hidden="true">
                                            <User size={16} />
                                        </span>
                                        <span>{i.label}</span>
                                    </Nav.Link>
                                ) : (
                                    <button
                                        type="button"
                                        className={classNames('settings-sidebar-link settings-sidebar-link-btn', {
                                            'is-active': i.active,
                                        })}
                                    >
                                        <span className="settings-sidebar-icon" aria-hidden="true">
                                            <User size={16} />
                                        </span>
                                        <span>{i.label}</span>
                                    </button>
                                )}
                            </Nav.Item>
                        ))}
                    </Nav>
                </div>

                <div className="settings-sidebar-footer">
                    <div className="settings-sidebar-user">
                        <Nav.Link
                            as={NavLink}
                            to="/settings/my-settings"
                            className="settings-sidebar-footer-link mx-4"
                            activeClassName="is-active"
                            onClick={handleLinkClick}
                        >
                            <span className="settings-sidebar-icon" aria-hidden="true">
                                <User size={16} />
                            </span>
                            My Settings
                        </Nav.Link>
                    </div>
                    {/* <Button variant="link" className="settings-sidebar-footer-link">
                        <span className="settings-sidebar-icon" aria-hidden="true">
                            <User size={16} />
                        </span>
                        Log out
                    </Button> */}
                </div>
            </SimpleBar>
        </div>
    );
};

export default SettingsSidebar;

