import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Nav, ProgressBar, Row, Tab, Table } from 'react-bootstrap';
import { Calendar, ChevronDown, Flag, Folder, Layout, List as ListIcon, Plus, Star, User } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toggleCollapsedNav } from '../../redux/action/Theme';
import '../Spaces/TeamSpace/team-space.scss';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [activeView, setActiveView] = useState('overview');

    useEffect(() => {
        dispatch(toggleCollapsedNav(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const lists = [
        { name: 'Project 1', done: 0, total: 3 },
        { name: 'Project 2', done: 1, total: 4 },
        { name: 'list 1', done: 0, total: 0 },
    ];

    const folders = [{ name: 'Test' }];

    const workload = useMemo(
        () => [
            { label: 'In Progress', value: 1, color: '#2d7cff' },
            { label: 'To Do', value: 7, color: '#6c757d' },
        ],
        []
    );

    const workloadTotal = workload.reduce((sum, s) => sum + s.value, 0);
    const workloadGradient = workloadTotal
        ? `conic-gradient(${workload
            .map((s, idx) => {
                const prev = workload.slice(0, idx).reduce((sum, x) => sum + x.value, 0);
                const from = (prev / workloadTotal) * 360;
                const to = ((prev + s.value) / workloadTotal) * 360;
                return `${s.color} ${from}deg ${to}deg`;
            })
            .join(', ')})`
        : 'conic-gradient(rgba(255,255,255,.18) 0deg 360deg)';

    return (
        <>
            <Container fluid className="team-space-dashboard">
                <Tab.Container activeKey={activeView} onSelect={(k) => k && setActiveView(k)}>
                    <div className="hk-pg-header pg-header-wth-tab pt-7">
                        <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                            <div className="team-space-title-wrap">
                                <div className="team-space-title-row">
                                    <h1 className="pg-title mb-0 text-primary">Welcome back</h1>
                                    <Button variant="flush-dark" size="sm" className="btn-icon team-space-title-btn" aria-label="Options">
                                        <ChevronDown size={16} />
                                    </Button>
                                    <Button variant="flush-dark" size="sm" className="btn-icon team-space-title-btn" aria-label="Favorite">
                                        <Star size={16} />
                                    </Button>
                                </div>
                                <Nav variant="tabs" className="nav-light nav-line team-space-tabs">
                                    <Nav.Item>
                                        <Nav.Link eventKey="overview">
                                            <span className="nav-link-text">Overview</span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item className="ms-1">
                                        <Button variant="flush-dark" size="sm" className="team-space-add-view">
                                            <Plus size={16} />
                                            <span>View</span>
                                        </Button>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>
                    </div>

                    <div className="hk-pg-body">
                        <Tab.Content>
                            <Tab.Pane eventKey="overview">
                                <Row className="g-3">
                                    <Col xl={4} lg={6}>
                                        <Card className="team-space-card team-space-card--fixed h-100">
                                            <Card.Header className="team-space-card-header">Recent</Card.Header>
                                            <Card.Body>
                                                <ListGroup variant="flush" className="team-space-list">
                                                    <ListGroup.Item className="team-space-list-item">
                                                        <div className="team-space-item-title">Test</div>
                                                        <div className="team-space-item-subtitle">in Team Space</div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="team-space-list-item">
                                                        <div className="team-space-item-title">List</div>
                                                        <div className="team-space-item-subtitle">in Test</div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={4} lg={6}>
                                        <Card className="team-space-card team-space-card--fixed h-100">
                                            <Card.Header className="team-space-card-header">Spaces</Card.Header>
                                            <Card.Body>
                                                <ListGroup variant="flush" className="team-space-list">
                                                    <ListGroup.Item className="team-space-list-item">
                                                        <div className="team-space-item-title">Space1</div>
                                                        <div className="team-space-item-subtitle">in Work Space 1</div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="team-space-list-item">
                                                        <div className="team-space-item-title">Space2</div>
                                                        <div className="team-space-item-subtitle">in Work Space 1</div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={4} lg={12}>
                                        <Card className="team-space-card team-space-card--fixed h-100">
                                            <Card.Header className="team-space-card-header">Bookmarks</Card.Header>
                                            <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center py-6">
                                                <div className="team-space-bookmark-icon" aria-hidden="true">
                                                    <span className="bi bi-bookmark-plus" />
                                                </div>
                                                <div className="team-space-muted mt-3">
                                                    Bookmarks make it easy to save Nexus items.
                                                </div>
                                                <Button variant="primary" size="sm" className="mt-3">
                                                    Add Bookmark
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={12}>
                                        <Card className="team-space-card team-space-section-card team-space-section-card--tall">
                                            <Card.Header className="team-space-card-header">Folders</Card.Header>
                                            <Card.Body>
                                                <div className="team-space-folders-grid">
                                                    {folders.map((f) => (
                                                        <button key={f.name} type="button" className="team-space-folder-pill">
                                                            <Folder size={16} />
                                                            <span>{f.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={12}>
                                        <Card className="team-space-card team-space-section-card">
                                            <Card.Header className="team-space-card-header">Lists</Card.Header>
                                            <Card.Body className="p-0">
                                                <div className="team-space-table-wrap">
                                                    <Table responsive hover className="team-space-table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th className="text-center">Color</th>
                                                                <th>Progress</th>
                                                                <th className="text-center">Start</th>
                                                                <th className="text-center">End</th>
                                                                <th className="text-center">Priority</th>
                                                                <th className="text-center">Owner</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lists.map((l) => {
                                                                const pct = l.total > 0 ? Math.round((l.done / l.total) * 100) : 0;
                                                                return (
                                                                    <tr key={l.name}>
                                                                        <td className="team-space-table-name">
                                                                            <span className="team-space-table-bullet" aria-hidden="true" />
                                                                            <span>{l.name}</span>
                                                                        </td>
                                                                        <td className="text-center team-space-muted">-</td>
                                                                        <td>
                                                                            <div className="d-flex align-items-center gap-3">
                                                                                <ProgressBar
                                                                                    now={pct}
                                                                                    className="team-space-progress"
                                                                                />
                                                                                <div className="team-space-progress-text">
                                                                                    {l.done}/{l.total}
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <span className="team-space-icon-cell" aria-hidden="true">
                                                                                <Calendar size={14} />
                                                                            </span>
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <span className="team-space-icon-cell" aria-hidden="true">
                                                                                <Calendar size={14} />
                                                                            </span>
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <span className="team-space-icon-cell" aria-hidden="true">
                                                                                <Flag size={14} />
                                                                            </span>
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <span className="team-space-icon-cell" aria-hidden="true">
                                                                                <User size={14} />
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                            <tr className="team-space-new-row">
                                                                <td colSpan={7}>
                                                                    <Button variant="link" className="team-space-new-link">
                                                                        <Plus size={16} />
                                                                        <span>New List</span>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={6} xs={12}>
                                        <Card className="team-space-card team-space-section-card team-space-section-card--medium h-100">
                                            <Card.Header className="team-space-card-header">Resources</Card.Header>
                                            <Card.Body>
                                                <div className="team-space-dropzone">
                                                    <div className="team-space-dropzone-inner">
                                                        <span className="team-space-muted">Drop files here or </span>
                                                        <Button variant="link" className="team-space-dropzone-link p-0 ms-1">attach</Button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={6} xs={12}>
                                        <Card className="team-space-card team-space-section-card team-space-section-card--medium h-100">
                                            <Card.Header className="team-space-card-header">Workload by Status</Card.Header>
                                            <Card.Body>
                                                <div className="team-space-workload">
                                                    <div className="team-space-donut" style={{ background: workloadGradient }}>
                                                        <div className="team-space-donut-hole" />
                                                    </div>
                                                    <div className="team-space-workload-legend">
                                                        {workload.map((s) => (
                                                            <div key={s.label} className="team-space-legend-row">
                                                                <span className="team-space-legend-dot" style={{ background: s.color }} />
                                                                <span className="team-space-legend-label">{s.label}</span>
                                                                <span className="team-space-legend-value">{s.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="list">
                                <Card className="team-space-card">
                                    <Card.Body className="team-space-muted">
                                        List view coming soon.
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="board">
                                <Card className="team-space-card">
                                    <Card.Body className="team-space-muted">
                                        Board view coming soon.
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="calendar">
                                <Card className="team-space-card">
                                    <Card.Body className="team-space-muted">
                                        Calendar view coming soon.
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="gantt">
                                <Card className="team-space-card">
                                    <Card.Body className="team-space-muted">
                                        Gantt view coming soon.
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="table">
                                <Card className="team-space-card">
                                    <Card.Body className="team-space-muted">
                                        Table view coming soon.
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </Container>
        </>
    );
};

export default Dashboard;
