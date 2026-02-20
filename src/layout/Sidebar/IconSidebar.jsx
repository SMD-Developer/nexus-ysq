import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
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
        { name: 'Teams', icon: <Users size={20} />, path: '/apps/contacts/contact-list' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings/my-settings' },
        // { name: 'More', icon: <MoreHorizontal size={20} />, path: '#' },
    ];

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
                        <Nav.Link as="a" href="#" className="icon-nav-link" title="Logout">
                            <span className="icon-wrapper"><LogOut size={20} /></span>
                            <span className="icon-label">Logout</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
};

export default IconSidebar;
