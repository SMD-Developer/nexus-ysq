import React from 'react';
import { Button, Nav, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import {
    Home,
    Settings,
    Users,
    MoreHorizontal,
    UserPlus,
    LogOut,
    ChevronRight
} from 'react-feather';
import './icon-sidebar.scss';

const IconSidebar = ({ onExpandWorkspace, showExpandButton = false }) => {
    const iconMenuItems = [
        { name: 'Home', icon: <Home size={20} />, path: '/Dashboard' },
        { name: 'Teams', icon: <Users size={20} />, path: '/settings/teams' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings/my-settings' },
        // { name: 'More', icon: <MoreHorizontal size={20} />, path: '#' },
    ];

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('workspace');
        localStorage.removeItem('settings');
        localStorage.removeItem('teams');
        localStorage.removeItem('trash');
        localStorage.removeItem('audit-logs');
    };

    return (
        <div className="icon-sidebar">
            <div className="icon-sidebar-header">
                <div className="workspace-icon">
                    <span className="workspace-letter">A</span>
                </div>
                {showExpandButton && onExpandWorkspace && (
                    <Button 
                        variant="flush-dark" 
                        size="sm" 
                        className="expand-workspace-btn"
                        onClick={onExpandWorkspace}
                        title="Open workspace"
                    >
                        <ChevronRight size={16} />
                    </Button>
                )}
            </div>
            
            <Nav className="flex-column icon-nav">
                {iconMenuItems.map((item, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link 
                            as={item.path !== '#' ? NavLink : 'a'} 
                            to={item.path !== '#' ? item.path : undefined}
                            href={item.path === '#' ? '#' : undefined}
                            className="icon-nav-link"
                            title={item.name}
                        >
                            <span className="icon-wrapper">{item.icon}</span>
                            <span className="icon-label">{item.name}</span>
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            <div className="icon-sidebar-footer">
                <Nav className="flex-column icon-nav">
                    <Nav.Item>
                        <Nav.Link as="a" href="#" className="icon-nav-link" title="Invite">
                            <span className="icon-wrapper"><UserPlus size={20} /></span>
                            <span className="icon-label">Invite</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            as="button"
                            type="button"
                            className="icon-nav-link"
                            title="Logout"
                            onClick={() => setShowLogoutModal(true)}
                            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: 0 }}
                        >
                            <span className="icon-wrapper"><LogOut size={20} /></span>
                            <span className="icon-label">Logout</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: '0.9rem', fontWeight: 500 }}>Logout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to logout?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowLogoutModal(false)} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleLogout} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                            Logout
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default IconSidebar;
