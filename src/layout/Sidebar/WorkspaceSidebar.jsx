import React, { useState } from 'react';
import { Button, Dropdown, Nav, Modal, Form } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import {
    Plus,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    Settings,
    Layout,
    Home as HomeIcon,
    MessageSquare,
    CheckSquare,
    UserCheck,
    Calendar,
    List,
    MoreHorizontal,
    Star,
    Users,
    X,
    Lock,
} from 'react-feather';
import * as TablerIcons from 'tabler-icons-react';
import HkBadge from '../../components/@hk-badge/@hk-badge';
import './workspace-sidebar.scss';

const WorkspaceSidebar = ({ userName = "Ashutosh Srivastar", show = false, toggleSidebar, onCollapse }) => {
    const [expandedSections, setExpandedSections] = useState({
        myTasks: true,
        spaces: true,
    });
    const [showCreateSpaceModal, setShowCreateSpaceModal] = useState(false);
    const [spaceName, setSpaceName] = useState('');
    const [spaceDescription, setSpaceDescription] = useState('');
    const [makePrivate, setMakePrivate] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('S');

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleLinkClick = () => {
        // Close sidebar on mobile when a link is clicked
        if (toggleSidebar && window.innerWidth <= 1199) {
            toggleSidebar();
        }
    };

    // Workspace sections data
    const mainMenuItems = [
        { name: 'Home', icon: <HomeIcon size={18} />, path: '/dashboard' },
        { name: 'Assigned Comments', icon: <MessageSquare size={18} />, path: '/apps/comments' },
    ];

    const myTasksItems = [
        { name: 'Assigned to me', icon: <UserCheck size={16} />, path: '/apps/taskboard/projects-board' },
        { name: 'Today & Overdue', icon: <Calendar size={16} />, path: '/apps/todo/task-list' },
        { name: 'Personal List', icon: <List size={16} />, path: '/apps/todo/gantt' },
    ];

    const spacesItems = [
        { 
            name: 'All Tasks', 
            subtitle: `${userName}'s Workspace`, 
            icon: <TablerIcons.Template size={16} />, 
            path: '/apps/taskboard/projects-board' 
        },
        { 
            name: 'Team Space', 
            icon: <Users size={16} />, 
            path: '/spaces/team-space',
            hasMenu: true
        },
        { 
            name: 'Project 1', 
            icon: <TablerIcons.LayoutKanban size={16} />, 
            path: '/apps/taskboard/kanban-board', 
            count: '3',
            hasMenu: true
        },
        { 
            name: 'Project 2', 
            icon: <TablerIcons.LayoutKanban size={16} />, 
            path: '/apps/taskboard/pipeline', 
            count: '3',
            hasMenu: true
        },
        { 
            name: 'Project Notes', 
            icon: <TablerIcons.FileCheck size={16} />, 
            path: '/apps/file-manager/list-view',
            hasMenu: true
        },
    ];

    return (
        <div className={classNames("workspace-sidebar", { "show": show })}>
            {/* Workspace Header */}
            <div className="workspace-header">
                <div className="workspace-title-section">
                    <span className="workspace-title">Home</span>
                    <div className="workspace-actions">
                        <Button variant="flush-dark" size="sm" className="workspace-add-btn">
                            <Plus size={18} />
                            <ChevronDown size={14} />
                        </Button>
                    </div>
                </div>
                {onCollapse && (
                    <Button 
                        variant="flush-dark" 
                        size="sm" 
                        className="workspace-close-btn"
                        onClick={onCollapse}
                        title="Close workspace sidebar"
                    >
                        <ChevronLeft size={18} />
                    </Button>
                )}
            </div>

            {/* Workspace Menu Content */}
            <SimpleBar className="workspace-content">
                <div className="workspace-menu">
                    {/* Main Navigation */}
                    <div className="menu-section">
                        <Nav className="flex-column workspace-nav">
                            {mainMenuItems.map((item, index) => (
                                <Nav.Item key={index}>
                                    <Nav.Link as={NavLink} to={item.path} className="workspace-nav-link" onClick={handleLinkClick}>
                                        <span className="nav-icon">{item.icon}</span>
                                        <span className="nav-text">{item.name}</span>
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>

                    {/* My Tasks Section */}
                    <div className="menu-section">
                        <div
                            className="section-header clickable"
                            onClick={() => toggleSection('myTasks')}
                        >
                            <span className="section-icon">
                                <CheckSquare size={16} />
                            </span>
                            <span className="section-title">My Tasks</span>
                            <span className="section-arrow ms-auto">
                                {expandedSections.myTasks ? 
                                    <ChevronDown size={14} /> : 
                                    <ChevronRight size={14} />
                                }
                            </span>
                        </div>
                        {expandedSections.myTasks && (
                            <Nav className="flex-column workspace-nav sub-nav">
                                {myTasksItems.map((item, index) => (
                                    <Nav.Item key={index}>
                                        <Nav.Link as={NavLink} to={item.path} className="workspace-nav-link" onClick={handleLinkClick}>
                                            <span className="nav-icon">{item.icon}</span>
                                            <span className="nav-text">{item.name}</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        )}
                    </div>

                    {/* More Section */}
                    <div className="menu-section">
                        <Nav className="flex-column workspace-nav">
                            <Nav.Item>
                                <Nav.Link href="#" className="workspace-nav-link">
                                    <span className="nav-icon"><MoreHorizontal size={18} /></span>
                                    <span className="nav-text">More</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    {/* Favorites Section */}
                    <div className="menu-section">
                        <div className="section-header">
                            <span className="section-title">Favorites</span>
                        </div>
                        <div className="section-help-text">
                            Click <Star size={12} /> to add favorites to your sidebar.
                        </div>
                    </div>

                    {/* Spaces Section */}
                    <div className="menu-section">
                        <div className="section-header">
                            <span className="section-title">Spaces</span>
                            <Button variant="link" size="sm" className="section-action"
                            onClick={() => setShowCreateSpaceModal(true)}>
                                <Plus size={16} />
                            </Button>
                        </div>
                        <Nav className="flex-column workspace-nav sub-nav">
                            {spacesItems.map((item, index) => (
                                <Nav.Item key={index}>
                                    <Nav.Link as={NavLink} to={item.path} className="workspace-nav-link" onClick={handleLinkClick}>
                                        <span className="nav-icon">
                                            {item.icon}
                                        </span>
                                        <span className="nav-text">
                                            {item.name}
                                            {item.subtitle && <small className="nav-subtitle">{item.subtitle}</small>}
                                        </span>
                                        {item.count && <span className="nav-count">{item.count}</span>}
                                        {item.hasMenu && (
                                            <span className="nav-menu-dots">
                                                <MoreHorizontal size={14} />
                                            </span>
                                        )}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                        <div className="section-footer">
                            <Button 
                                variant="link" 
                                size="sm" 
                                className="add-space-btn"
                                onClick={() => setShowCreateSpaceModal(true)}
                            >
                                <Plus size={16} />
                                <span>New Space</span>
                            </Button>
                        </div>
                    </div>

                    {/* Customize Sidebar Footer */}
                    <div className="customize-footer">
                        <Button variant="link" className="customize-btn" as={NavLink} to="/pages/account">
                            <Settings size={16} className="me-2" />
                            Customize Sidebar
                        </Button>
                    </div>
                </div>
            </SimpleBar>

            {/* Create Space Modal */}
            <Modal 
                show={showCreateSpaceModal} 
                onHide={() => setShowCreateSpaceModal(false)}
                centered
                className="create-space-modal"
            >
                <Modal.Header>
                    <Modal.Title>Create a Space</Modal.Title>
                    <Button 
                        variant="flush-dark" 
                        className="btn-icon btn-rounded"
                        onClick={() => setShowCreateSpaceModal(false)}
                    >
                        <X size={20} />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-description">
                        A Space represents teams, departments, or groups, each with its own Lists, workflows, and settings.
                    </p>

                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label>Icon & name</Form.Label>
                            <div className="space-icon-name-group">
                                <div className="space-icon-picker">
                                    <div className="space-icon-selected">{selectedIcon}</div>
                                </div>
                                <Form.Control 
                                    type="text" 
                                    placeholder="e.g. Marketing, Engineering, HR"
                                    value={spaceName}
                                    onChange={(e) => setSpaceName(e.target.value)}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Description <span className="text-muted">(optional)</span></Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                placeholder="What is this space about?"
                                value={spaceDescription}
                                onChange={(e) => setSpaceDescription(e.target.value)}
                            />
                        </Form.Group>

                        <div className="space-permission-section mb-4">
                            <div className="permission-header">
                                <Lock size={16} />
                                <span>Default permission</span>
                                <Button variant="link" size="sm" className="permission-dropdown">
                                    Full edit <ChevronDown size={14} />
                                </Button>
                            </div>
                        </div>

                        <div className="space-privacy-section mb-4">
                            <div className="privacy-toggle">
                                <div className="privacy-info">
                                    <div className="privacy-title">Make Private</div>
                                    <div className="privacy-description">Only you and invited members have access</div>
                                </div>
                                <Form.Check 
                                    type="switch"
                                    id="private-switch"
                                    checked={makePrivate}
                                    onChange={(e) => setMakePrivate(e.target.checked)}
                                />
                            </div>
                        </div>

                        <div className="use-templates-section">
                            <Button variant="link" className="use-templates-btn">
                                Use Templates
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary"
                        className="btn-continue"
                        onClick={() => {
                            // Handle space creation here
                            setShowCreateSpaceModal(false);
                            setSpaceName('');
                            setSpaceDescription('');
                            setMakePrivate(false);
                        }}
                    >
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WorkspaceSidebar;
