import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { AlignLeft, Bell, Calendar, CheckSquare, Clock, CreditCard, Inbox, Plus, Search, Settings, Tag, ChevronDown, X } from 'react-feather';
import { Button, Container, Dropdown, Form, InputGroup, Nav, Navbar, Modal } from 'react-bootstrap';
import { toggleCollapsedNav } from '../../redux/action/Theme';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import CustomInput from './CustomInput';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import HkBadge from '../../components/@hk-badge/@hk-badge';

//Images
import avatar2 from '../../assets/img/avatar2.jpg';
import avatar3 from '../../assets/img/avatar3.jpg';
import avatar4 from '../../assets/img/avatar4.jpg';
import avatar10 from '../../assets/img/avatar10.jpg';
import avatar12 from '../../assets/img/avatar12.jpg';
import { ThemeSwitcher } from '../../utils/theme-provider/theme-switcher';
import './topnav.scss';



const TopNav = ({ navCollapsed, toggleCollapsedNav }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");

    const CloseSearchInput = () => {
        setSearchValue("");
        setShowDropdown(false);
    }

    const pageVariants = {
        initial: {
            opacity: 0,
            y: 10
        },
        open: {
            opacity: 1,
            y: 0
        },
        close: {
            opacity: 0,
            y: 10
        }
    };



    return (
        <Navbar expand="xl" className="hk-navbar navbar-light fixed-top workspace-navbar" >
            <Container fluid>
                {/* Start Nav */}
                <div className="nav-start-wrap">
                    <Button variant="flush-dark" onClick={() => toggleCollapsedNav(!navCollapsed)} className="btn-icon btn-rounded flush-soft-hover navbar-toggle d-xl-none">
                        <span className="icon">
                            <span className="feather-icon"><AlignLeft /></span>
                        </span>
                    </Button>

                    {/* Workspace Dropdown */}
                    <Dropdown className="workspace-nav-dropdown d-none d-xl-flex">
                        <Dropdown.Toggle variant="flush-dark" className="workspace-dropdown-toggle">
                            <div className="workspace-avatar-sm">
                                <span className="avatar-letter">w</span>
                            </div>
                            <span className="workspace-name-text">Workspace 1</span>
                            <ChevronDown size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="workspace-dropdown-menu">
                            <div className="dropdown-header">
                                <div className="workspace-avatar">
                                    <span className="avatar-letter">W</span>
                                </div>
                                <div className="workspace-info">
                                    <div className="workspace-title">Workspace 1</div>
                                </div>
                            </div>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="/pages/profile">
                                <Settings size={16} className="me-2" />
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/settings/people">
                                <Plus size={16} className="me-2" />
                                People
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                className="create-workspace-item"
                                onClick={() => setShowCreateWorkspaceModal(true)}
                            >
                                <Plus size={16} className="me-2" />
                                Create Workspace
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <div className="dropdown-section-title">Switch Workspaces</div>
                            <Dropdown.Item>
                                <div className="workspace-avatar-xs">
                                    <span className="avatar-letter">S</span>
                                </div>
                                <span>Workspace 2</span>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Plus size={16} className="me-2" />
                                Add Another Workspace
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Center Search */}
                <div className="nav-center-wrap">
                    <Dropdown as={Form} className="navbar-search-center" show={showDropdown} autoClose={() => setShowDropdown(!showDropdown)} >
                        <Dropdown.Toggle as="div" className="no-caret bg-transparent">
                            <InputGroup className="d-xl-flex d-none search-input-center" style={{ minWidth: 240, maxWidth: 320, width: "100%" }}>
                                <InputGroup.Text className="bg-transparent border-0 px-2" style={{ paddingRight: 0 }}>
                                    {/* <span className="feather-icon">
                                        <Search size={18} />
                                    </span> */}
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    style={{
                                        background: "transparent",
                                        border: "1px solid #444950",
                                        borderLeft: "none",
                                        color: "#fff",
                                        height: 32,
                                        fontSize: 15,
                                        minWidth: 120,
                                        boxShadow: "none"
                                    }}
                                    placeholder="Search..."
                                    aria-label="Search"
                                    onFocus={() => setShowDropdown(true)}
                                    onBlur={() => setShowDropdown(false)}
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                />
                            </InputGroup>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={motion.div}
                            initial="initial"
                            animate={showDropdown ? "open" : "close"}
                            variants={pageVariants}
                            transition={{ duration: 0.3 }}
                            className={classNames("p-0")}
                        >
                            {/* Mobile Search */}
                            <Dropdown.Item className="d-xl-none bg-transparent">
                                <InputGroup className="mobile-search">
                                    <span className="input-affix-wrapper input-search">
                                        <Form.Control type="text" placeholder="Search..." aria-label="Search" value={searchValue} onChange={e => setSearchValue(e.target.value)} onFocus={() => setShowDropdown(true)} autoFocus />
                                        <span className="input-suffix" onClick={CloseSearchInput} >
                                            <span className="btn-input-clear">
                                                <i className="bi bi-x-circle-fill" />
                                            </span>
                                            <span className="spinner-border spinner-border-sm input-loader text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </span>
                                        </span>
                                    </span>
                                </InputGroup>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {/* /Center Search */}

                {/* End Nav */}
                <div className="nav-end-wrap">
                    <Nav className="navbar-nav flex-row">
                        {/* <Nav.Item className='ms-2'>
                            <ThemeSwitcher />
                        </Nav.Item> */}
                        {/* <Nav.Item>
                            <Button variant="flush-dark" as={Link} to="/apps/email" className="btn-icon btn-rounded flush-soft-hover">
                                <span className="icon">
                                    <span className=" position-relative">
                                        <span className="feather-icon"><Inbox /></span>
                                        <HkBadge bg="primary" soft pill size="sm" className="position-top-end-overflow-1" >4</HkBadge>
                                    </span>
                                </span>
                            </Button>
                        </Nav.Item> */}
                        <Nav.Item>
                            <Dropdown className="dropdown-notifications">
                                <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                    <span className="icon">
                                        <span className="position-relative">
                                            <span className="feather-icon"><Bell /></span>
                                            <HkBadge bg="success" indicator className="position-top-end-overflow-1" />
                                        </span>
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="p-0">
                                    <Dropdown.Header className="px-4 fs-6">
                                        Notifications
                                        <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover">
                                            <span className="icon">
                                                <span className="feather-icon"><Settings /></span>
                                            </span>
                                        </Button>
                                    </Dropdown.Header>
                                    <SimpleBar className="dropdown-body  p-2">
                                        <Dropdown.Item>
                                            <div className="media">
                                                <div className="media-head">
                                                    <div className="avatar avatar-rounded avatar-sm">
                                                        <img src={avatar2} alt="user" className="avatar-img" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div>
                                                        <div className="notifications-text">Morgan Freeman accepted your invitation to join the team</div>
                                                        <div className="notifications-info">
                                                            <HkBadge bg="success" soft >Collaboration</HkBadge>
                                                            <div className="notifications-time">Today, 10:14 PM</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div className="media">
                                                <div className="media-head">
                                                    <div className="avatar  avatar-icon avatar-sm avatar-success avatar-rounded">
                                                        <span className="initial-wrap">
                                                            <span className="feather-icon"><Inbox /> </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div>
                                                        <div className="notifications-text">New message received from Alan Rickman</div>
                                                        <div className="notifications-info">
                                                            <div className="notifications-time">Today, 7:51 AM</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div className="media">
                                                <div className="media-head">
                                                    <div className="avatar  avatar-icon avatar-sm avatar-pink avatar-rounded">
                                                        <span className="initial-wrap">
                                                            <span className="feather-icon"><Clock /></span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div>
                                                        <div className="notifications-text">You have a follow up with Jampack Head on Friday, Dec 19 at 9:30 am</div>
                                                        <div className="notifications-info">
                                                            <div className="notifications-time">Yesterday, 9:25 PM</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div className="media">
                                                <div className="media-head">
                                                    <div className="avatar avatar-sm avatar-rounded">
                                                        <img src={avatar3} alt="user" className="avatar-img" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div>
                                                        <div className="notifications-text">Application of Sarah Williams is waiting for your approval</div>
                                                        <div className="notifications-info">
                                                            <div className="notifications-time">Today 10:14 PM</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div className="media">
                                                <div className="media-head">
                                                    <div className="avatar avatar-sm avatar-rounded">
                                                        <img src={avatar10} alt="user" className="avatar-img" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div>
                                                        <div className="notifications-text">Winston Churchil shared a document with you</div>
                                                        <div className="notifications-info">
                                                            <HkBadge bg="violet" soft >File Manager</HkBadge>
                                                            <div className="notifications-time">2 Oct, 2021</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div className="media">
                                                <div className="media-head">
                                                    <div className="avatar  avatar-icon avatar-sm avatar-danger avatar-rounded">
                                                        <span className="initial-wrap">
                                                            <span className="feather-icon"><Calendar /></span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div>
                                                        <div className="notifications-text">Last 2 days left for the project to be completed</div>
                                                        <div className="notifications-info">
                                                            <HkBadge bg="orange" soft >Updates</HkBadge>
                                                            <div className="notifications-time">14 Sep, 2021</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </SimpleBar>
                                    <div className="dropdown-footer">
                                        <Link to="#"><u>View all notifications</u>
                                        </Link>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <Dropdown className="ps-2">
                                <Dropdown.Toggle as={Link} to="#" className="no-caret">
                                    <div className="avatar avatar-rounded avatar-xs">
                                        <img src={avatar12} alt="user" className="avatar-img" />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                    <div className="p-2">
                                        <div className="media">
                                            <div className="media-head me-2">
                                                <div className="avatar avatar-primary avatar-sm avatar-rounded">
                                                    <span className="initial-wrap">Hk</span>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <Dropdown>
                                                    <Dropdown as={Link} to="#" className="d-block fw-medium text-dark">Hencework</Dropdown>
                                                    {/* <Dropdown.Menu align="end">
                                                        <div className="p-2">
                                                            <div className="media align-items-center active-user mb-3">
                                                                <div className="media-head me-2">
                                                                    <div className="avatar avatar-primary avatar-xs avatar-rounded">
                                                                        <span className="initial-wrap">Hk</span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <Link to="#" className="d-flex link-dark">Hencework <i className="ri-checkbox-circle-fill fs-7 text-primary ms-1" />
                                                                    </Link>
                                                                    <Link to="#" className="d-block fs-8 link-secondary">
                                                                        <u>Manage your account</u>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="media align-items-center mb-3">
                                                                <div className="media-head me-2">
                                                                    <div className="avatar avatar-xs avatar-rounded">
                                                                        <img src={avatar12} alt="user" className="avatar-img" />
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <Link to="#" className="d-block link-dark">Jampack Team</Link>
                                                                    <Link to="#" className="d-block fs-8 link-secondary">contact@hencework.com</Link>
                                                                </div>
                                                            </div>
                                                            <Button variant="outline-light" size="sm" className="btn-block">
                                                                <span>
                                                                    <span className="icon">
                                                                        <span className="feather-icon">
                                                                            <Plus />
                                                                        </span>
                                                                    </span>
                                                                    <span>Add Account</span></span>
                                                            </Button>
                                                        </div>
                                                    </Dropdown.Menu> */}
                                                </Dropdown>
                                                <div className="fs-7">contact@hencework.com</div>
                                                <Link to="#" className="d-block fs-8 link-secondary">
                                                    <u>Sign Out</u>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Divider as="div" />
                                    <Dropdown.Item as={Link} to="/pages/profile" >Profile</Dropdown.Item>
                                    {/* <Dropdown.Item>
                                        <span className="me-2">Offers</span>
                                        <span className="badge badge-sm badge-soft-pink">2</span>
                                    </Dropdown.Item>
                                    <Dropdown.Divider as="div" />
                                    <h6 className="dropdown-header">Manage Account</h6>
                                    <Dropdown.Item>
                                        <span className="dropdown-icon feather-icon">
                                            <CreditCard />
                                        </span>
                                        <span>Payment methods</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <span className="dropdown-icon feather-icon">
                                            <CheckSquare />
                                        </span>
                                        <span>Subscriptions</span>
                                    </Dropdown.Item> */}
                                    <Dropdown.Item>
                                        <span className="dropdown-icon feather-icon">
                                            <Settings />
                                        </span>
                                        <span>Settings</span>
                                    </Dropdown.Item>
                                    {/* <Dropdown.Divider as="div" />
                                    <Dropdown.Item>
                                        <span className="dropdown-icon feather-icon">
                                            <Tag />
                                        </span>
                                        <span>Raise a ticket</span>
                                    </Dropdown.Item> */}
                                    <Dropdown.Divider as="div" />
                                    <Dropdown.Item>
                                        Terms &amp; Conditions
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        Help &amp; Support
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                    </Nav>
                </div>
                {/* /End Nav */}
            </Container>

            {/* Create Workspace Modal */}
            <Modal
                show={showCreateWorkspaceModal}
                onHide={() => setShowCreateWorkspaceModal(false)}
                centered
                className="create-workspace-modal"
            >
                <Modal.Header>
                    <Modal.Title>Create a Workspace</Modal.Title>
                    <Button
                        variant="flush-dark"
                        className="btn-icon btn-rounded"
                        onClick={() => setShowCreateWorkspaceModal(false)}
                    >
                        <X size={20} />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label>Workspace Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workspace name"
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                autoFocus
                            />
                            <Form.Text className="text-muted">
                                Choose a name that represents your team or project
                            </Form.Text>
                        </Form.Group>

                        {/* <Form.Group className="mb-4">
                            <Form.Label>Workspace Avatar</Form.Label>
                            <div className="workspace-avatar-picker">
                                <div className="avatar-option active">A</div>
                                <div className="avatar-option">B</div>
                                <div className="avatar-option">C</div>
                                <div className="avatar-option">D</div>
                                <div className="avatar-option">E</div>
                            </div>
                        </Form.Group> */}

                        <Form.Group className="mb-4">
                            <Form.Label>Description (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="What's this workspace for?"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowCreateWorkspaceModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            // Handle workspace creation here
                            setShowCreateWorkspaceModal(false);
                            setWorkspaceName("");
                        }}
                    >
                        Create Workspace
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
}

const mapStateToProps = ({ theme }) => {
    const { navCollapsed } = theme;
    return { navCollapsed }
};

export default connect(mapStateToProps, { toggleCollapsedNav })(TopNav);