import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Nav, Modal, Form } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
    Plus,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    Settings,
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
    HelpCircle,
    CheckCircle,
} from 'react-feather';
import * as TablerIcons from 'tabler-icons-react';
import './workspace-sidebar.scss';

const WorkspaceSidebar = ({ userName = "Ashutosh Srivastav", show = false, toggleSidebar, onCollapse }) => {
    const [expandedSections, setExpandedSections] = useState({
        myTasks: true,
        spaces: true,
    });
    const [showCreateSpaceModal, setShowCreateSpaceModal] = useState(false);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [spaceName, setSpaceName] = useState('');
    const [spaceDescription, setSpaceDescription] = useState('');
    const [makePrivate, setMakePrivate] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('S');
    const [taskTitle, setTaskTitle] = useState('');
    const [status, setStatus] = useState('Open');
    const [assignees, setAssignees] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [timeEstimate, setTimeEstimate] = useState('');
    const [sprintPoints, setSprintPoints] = useState('');
    const [trackTime, setTrackTime] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [expandedProjects, setExpandedProjects] = useState({});
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [spaceMenuPosition, setSpaceMenuPosition] = useState({ top: 0, left: 0 });
    const [showCreateListModal, setShowCreateListModal] = useState(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [folderDescription, setFolderDescription] = useState('');
    const [folderMakePrivate, setFolderMakePrivate] = useState(false);
    const [folderIcon, setFolderIcon] = useState('F');
    const [openMenu, setOpenMenu] = useState(null);

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
        { name: 'Home', icon: <HomeIcon size={18} />, path: '/Dashboard' },
    ];

    const myTasksItems = [
        { name: 'Assigned to me', icon: <UserCheck size={16} />, path: '/apps/taskboard/projects-board' },
    ];

    // Spaces data with UI control for Space "+", which will open Create Folder modal on click
    const spacesItems = [
        {
            name: 'Space 1',
            icon: <Users size={16} />,
            path: '/spaces/team-space',
            showAdd: true, // Treated as flag to show "+" on hover
            onAdd: () => setShowCreateFolderModal(true),  // Function to open modal (set this up in sidebar list UI)
            projects: [
                {
                    name: 'Folder 1',
                    icon: <TablerIcons.LayoutKanban size={16} />,
                    path: '/apps/file-manager/list-view',
                    count: 3,
                    showAdd: true,
                    hasMenu: true
                },
                {
                    name: 'Folder 2',
                    icon: <TablerIcons.LayoutKanban size={16} />,
                    path: '/apps/file-manager/list-view',
                    count: 2,
                    showAdd: true,
                    hasMenu: true
                },
                {
                    name: 'Folder 3',
                    icon: <TablerIcons.LayoutKanban size={16} />,
                    path: '/apps/file-manager/list-view',
                    count: 1,
                    showAdd: true,
                    hasMenu: true
                }
            ]
        },
    ];

    const dummyUsers = [
        { value: 'ashutosh', label: 'Ashutosh Srivastava' },
        { value: 'john', label: 'John Doe' },
        { value: 'sarah', label: 'Sarah Smith' },
        { value: 'michael', label: 'Michael Johnson' },
        { value: 'emma', label: 'Emma Williams' },
    ];

    const projectTasks = {
        "Folder 1": [
            { id: 1, name: "List 1", status: "Open" },
            { id: 2, name: "List 2", status: "In Progress" },
            { id: 3, name: "List 3", status: "Review" },
        ],
        "Folder 2": [
            { id: 1, name: "List 1", status: "Open" },
            { id: 2, name: "List 2", status: "In Progress" },
        ]
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            // Don't close when clicking a three-dot trigger or the menu itself
            if (
                e.target.closest('.nav-menu-dots') ||
                e.target.closest('.fixed-folder-menu') ||
                e.target.closest('.fixed-space-menu') ||
                e.target.closest('.fixed-list-menu')
            ) {
                return;
            }
            setOpenMenu(null);
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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
                            <Button variant="link" size="sm" className="section-action" onClick={() => setShowCreateSpaceModal(true)}>
                                <Plus size={16} />
                            </Button>
                        </div>
                        <Nav className="flex-column workspace-nav sub-nav">
                            {spacesItems.map((space, sIndex) => (
                                <Nav.Item key={sIndex}>
                                    {/* Space Row */}
                                    <div className="workspace-nav-link space-link">
                                        <span className="nav-icon">{space.icon}</span>

                                        <NavLink
                                            to={space.path}
                                            className="nav-text flex-grow-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {space.name}
                                            {space.subtitle && (
                                                <small className="nav-subtitle">{space.subtitle}</small>
                                            )}
                                        </NavLink>

                                        {space.count && <span className="nav-count">{space.count}</span>}

                                        {/* Plus Icon */}
                                        {space.showAdd && (
                                            <span
                                                className="nav-add-icon me-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (space.onAdd) space.onAdd();
                                                    else setShowCreateSpaceModal(true);
                                                }}
                                            >
                                                <Plus size={14} />
                                            </span>
                                        )}

                                        {/* Three Dots Menu */}
                                        {space.hasMenu && (
                                            <div
                                                className="nav-menu-dots me-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenu(null);
                                                    setOpenMenu({
                                                        type: 'space',
                                                        id: space.name
                                                    });
                                                }}
                                            >
                                                <MoreHorizontal size={14} />
                                            </div>
                                        )}

                                        {/* Expand / Collapse */}
                                        {space.projects && space.projects.length > 0 && (
                                            <span
                                                className="nav-expand-icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedProjects(prev => ({
                                                        ...prev,
                                                        [space.name]: !prev[space.name]
                                                    }));
                                                }}
                                            >
                                                {expandedProjects[space.name]
                                                    ? <ChevronDown size={14} />
                                                    : <ChevronRight size={14} />}
                                            </span>
                                        )}
                                    </div>

                                    {/* Folders inside this space */}
                                    {expandedProjects[space.name] && space.projects && space.projects.length > 0 && (
                                        <Nav className="flex-column workspace-nav sub-nav project-tasks">
                                            {space.projects.map((project, pIndex) => (
                                                <Nav.Item key={pIndex}>
                                                    <div className="workspace-nav-link project-link">
                                                        <span className="nav-icon">{project.icon}</span>
                                                        <NavLink
                                                            to={project.path}
                                                            className="nav-text flex-grow-1"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {project.name}
                                                        </NavLink>

                                                        {project.count && <span className="nav-count">{project.count}</span>}

                                                        {/* Add List Button */}
                                                        {project.showAdd && (
                                                            <span
                                                                className="nav-add-icon me-2"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowCreateListModal(true);
                                                                }}
                                                            >
                                                                <Plus size={14} />
                                                            </span>
                                                        )}

                                                        {/* Folder Menu */}
                                                        {project.hasMenu && (
                                                            <div
                                                                className="nav-menu-dots me-2"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setOpenMenu(null);
                                                                    setOpenMenu({
                                                                        type: 'folder',
                                                                        id: `${space.name}-${project.name}`
                                                                    });
                                                                }}
                                                            >
                                                                <MoreHorizontal size={14} />
                                                            </div>
                                                        )}

                                                        {/* Expand project tasks toggle */}
                                                        <span
                                                            className="nav-expand-icon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedProjects(prev => ({
                                                                    ...prev,
                                                                    [`tasks-${space.name}-${project.name}`]: !prev[`tasks-${space.name}-${project.name}`]
                                                                }));
                                                            }}
                                                        >
                                                            {expandedProjects[`tasks-${space.name}-${project.name}`]
                                                                ? <ChevronDown size={14} />
                                                                : <ChevronRight size={14} />}
                                                        </span>
                                                    </div>

                                                    {/* Task List inside folder */}
                                                    {expandedProjects[`tasks-${space.name}-${project.name}`] && projectTasks[project.name] && (
                                                        <Nav className="flex-column workspace-nav sub-nav project-tasks">
                                                            {projectTasks[project.name].map(task => (
                                                                <Nav.Item key={task.id}>
                                                                    <div className="workspace-nav-link list-link">
                                                                        <span className="nav-text">{task.name}</span>

                                                                        <span className="task-status">{task.status}</span>

                                                                        <div className="list-actions">
                                                                            {/* Plus Icon */}
                                                                            <span
                                                                                className="nav-add-icon"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setShowAddItemModal(true);
                                                                                }}
                                                                            >
                                                                                <Plus size={14} />
                                                                            </span>

                                                                            {/* Three Dots */}
                                                                            <span
                                                                                className="nav-menu-dots"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setOpenMenu(null);
                                                                                    setOpenMenu({
                                                                                        type: 'list',
                                                                                        id: `${space.name}-${project.name}-${task.id}`
                                                                                    });
                                                                                }}
                                                                            >
                                                                                <MoreHorizontal size={14} />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </Nav.Item>
                                                            ))}
                                                        </Nav>
                                                    )}
                                                </Nav.Item>
                                            ))}
                                        </Nav>
                                    )}
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

                </div>
            </SimpleBar>

            {/* Context Menus */}
            {openMenu?.type === 'folder' && (
                <div
                    className="fixed-folder-menu"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul>
                        <li>Rename Folder</li>
                        <li>Duplicate Folder</li>
                        <li>Move Folder</li>
                        <li>Delete Folder</li>
                    </ul>
                </div>
            )}

            {openMenu?.type === 'space' && (
                <div
                    className="fixed-space-menu"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul>
                        <li>Rename Space</li>
                        <li>Duplicate Space</li>
                        <li>Share Space</li>
                        <li>Delete Space</li>
                    </ul>
                </div>
            )}

            {openMenu?.type === 'list' && (
                <div
                    className="fixed-list-menu"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul>
                        <li>Favorite</li>
                        <li>Rename</li>
                        <li
                            onClick={() => {
                                setShowAddItemModal(true);
                                setOpenMenu(null);
                            }}
                        >
                            Create Task
                        </li>
                        <li>Duplicate</li>
                        <li>Delete</li>
                    </ul>
                </div>
            )}

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

                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label>Space Icon & name</Form.Label>
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

                        {/* <div className="space-privacy-section mb-4">
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
                        </div> */}

                        {/* <div className="use-templates-section">
                            <Button variant="link" className="use-templates-btn">
                                Use Templates
                            </Button>
                        </div> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="btn-continue"
                        onClick={() => {
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

            {/* Add Task Modal */}
            <Modal
                show={showAddItemModal}
                onHide={() => setShowAddItemModal(false)}
                size="lg"
                centered
                className="task-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        {/* Title */}
                        <Form.Group className="mb-3">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </Form.Group>

                        {/* Status & Priority Row */}
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option>Open</option>
                                        <option>In Progress</option>
                                        <option>Review</option>
                                        <option>Completed</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        {/* Assignees */}
                        <Form.Group className="mb-3">
                            <Form.Label>Assignees</Form.Label>
                            <Select
                                options={dummyUsers}
                                isMulti
                                value={assignees}
                                onChange={(selected) => setAssignees(selected || [])}
                            />
                        </Form.Group>

                        {/* Start and End Date */}
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        {/* Time Estimate & Sprint Points */}
                        <div className="row">
                            <div className="col-md-12">
                                <Form.Group className="mb-3">
                                    <Form.Label>Time Estimate</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. 3h 30m"
                                        value={timeEstimate}
                                        onChange={(e) => setTimeEstimate(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        {/* Track Time */}
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Track Time</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. 1h 20m"
                                value={trackTime}
                                onChange={(e) => setTrackTime(e.target.value)}
                            />
                        </Form.Group> */}

                        {/* Tags */}
                        <Form.Group className="mb-3">
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect
                                isMulti
                                options={tags}
                                value={tags}
                                onChange={(selected) => setTags(selected || [])}
                            />
                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        {/* Attachments */}
                        <Form.Group className="mb-3">
                            <Form.Label>Attachments</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setAttachments(prev => [...prev, ...files]);
                                }}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddItemModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowAddItemModal(false);
                            setTaskTitle('');
                            setStatus('Open');
                            setAssignees([]);
                            setStartDate('');
                            setEndDate('');
                            setPriority('Medium');
                            setTimeEstimate('');
                            setSprintPoints('');
                            setTrackTime('');
                            setTags([]);
                            setDescription('');
                            setAttachments([]);
                        }}
                    >
                        Save Task
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Create List Modal */}
            <Modal
                show={showCreateListModal}
                onHide={() => setShowCreateListModal(false)}
                centered
                className="task-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create List</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. Project, List of items, Campaign"
                                style={{ fontSize: '14px' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '14px' }}>Description (optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Tell us a bit about your List"
                                style={{ fontSize: '14px' }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateListModal(false)} style={{ fontSize: '14px' }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setShowCreateListModal(false)} style={{ fontSize: '14px' }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Create Folder Modal */}
            <Modal
                show={showCreateFolderModal}
                onHide={() => setShowCreateFolderModal(false)}
                centered
                className="create-folder-modal"
            >
                <Modal.Header>
                    <Modal.Title>Create Folder</Modal.Title>
                    <Button
                        variant="flush-dark"
                        className="btn-icon btn-rounded"
                        onClick={() => setShowCreateFolderModal(false)}
                    >
                        <X size={20} />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <p className="create-folder-modal-description">
                        Use Folders to organize your Lists, Docs, and more.
                    </p>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Folder Icon & Name</Form.Label>
                            <div className="folder-icon-name-group">
                                <div className="folder-icon-picker">
                                    <span className="folder-icon-selected">{folderIcon}</span>
                                </div>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. Project, Client, Team"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tell us a bit about your Folder (optional)"
                                value={folderDescription}
                                onChange={(e) => setFolderDescription(e.target.value)}
                            />
                        </Form.Group>

                        {/* <div className="folder-settings-section mb-4">
                            <div className="folder-settings-label">Settings</div>
                            <div
                                className="folder-settings-row"
                                role="button"
                                tabIndex={0}
                                onClick={() => {}}
                                onKeyDown={(e) => e.key === 'Enter' && (() => {})()}
                            >
                                <span className="folder-settings-icon">
                                    <CheckCircle size={18} />
                                </span>
                                <div className="folder-settings-text">
                                    <span className="folder-settings-title">Statuses</span>
                                    <span className="folder-settings-desc">Use Space statuses</span>
                                </div>
                                <HelpCircle size={16} className="folder-settings-help" />
                                <ChevronRight size={16} className="folder-settings-arrow" />
                            </div>
                        </div> */}

                        {/* <div className="folder-privacy-section mb-4">
                            <div className="folder-privacy-toggle">
                                <div className="folder-privacy-info">
                                    <span className="folder-privacy-title">Make private</span>
                                    <span className="folder-privacy-description">
                                        Only you and invited members have access
                                    </span>
                                </div>
                                <Form.Check
                                    type="switch"
                                    id="folder-private-switch"
                                    checked={folderMakePrivate}
                                    onChange={(e) => setFolderMakePrivate(e.target.checked)}
                                />
                            </div>
                        </div> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer className="create-folder-modal-footer">
                    {/* <Button variant="link" className="create-folder-use-templates" onClick={() => {}}>
                        Use Templates
                    </Button> */}
                    <Button
                        variant="primary"
                        className="create-folder-btn-create"
                        onClick={() => {
                            setShowCreateFolderModal(false);
                            setFolderName('');
                            setFolderDescription('');
                            setFolderMakePrivate(false);
                            setFolderIcon('F');
                        }}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default WorkspaceSidebar;