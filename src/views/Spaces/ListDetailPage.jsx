import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Dropdown, Form, InputGroup, Modal, Nav } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    List,
    Grid,
    Plus,
    Filter,
    Clock,
    User,
    Search,
    Settings,
    ChevronDown,
    Calendar,
    Flag,
    BarChart2,
    Columns,
    Eye,
    Tag,
    MessageCircle,
    Share2,
    MoreHorizontal,
    Send,
    Bell,
    Check,
    ArrowUp,
    ArrowDown,
    UserPlus,
    Star,
    Smile,
    Paperclip,
    AtSign
} from 'react-feather';
import './ListDetailPage.scss';

const formatDateShort = (d) => {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
const formatDayOfWeek = (d) => {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};
const toYMD = (d) => {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    return date.toISOString().slice(0, 10);
};
const addDays = (d, n) => {
    const date = new Date(d);
    date.setDate(date.getDate() + n);
    return date;
};
const nextWeekday = (d, day) => {
    const date = new Date(d);
    const cur = date.getDay();
    let add = day - cur;
    if (add <= 0) add += 7;
    date.setDate(date.getDate() + add);
    return date;
};

const dummyUsers = [
    { value: 'ashutosh', label: 'Ashutosh Srivastava' },
    { value: 'john', label: 'John Doe' },
    { value: 'sarah', label: 'Sarah Smith' },
    { value: 'michael', label: 'Michael Johnson' },
    { value: 'emma', label: 'Emma Williams' },
];

const newTask = (name = 'New task', extra = {}) => ({
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    assignee: null,
    dueDate: null,
    priority: null,
    completed: false,
    subtasks: [],
    ...extra,
});

const getDefaultTasksForList = () => [
    { ...newTask('Task  1'), id: 't1' },
    { ...newTask('Task 2'), id: 't2' },
];

// Recursive: toggle completed for a task by id anywhere in the tree
const toggleTaskInTree = (taskList, id) =>
    taskList.map((t) => {
        if (t.id === id) return { ...t, completed: !t.completed };
        if (t.subtasks?.length)
            return { ...t, subtasks: toggleTaskInTree(t.subtasks, id) };
        return t;
    });

// Recursive: add a new subtask to a parent task by id
const addSubtaskInTree = (taskList, parentId, subTask = null) => {
    const toAdd = subTask || newTask('New subtask');
    return taskList.map((t) => {
        if (t.id === parentId)
            return { ...t, subtasks: [...(t.subtasks || []), toAdd] };
        if (t.subtasks?.length)
            return { ...t, subtasks: addSubtaskInTree(t.subtasks, parentId, toAdd) };
        return t;
    });
};

// Count only top-level incomplete tasks for section header
const countTopLevelIncomplete = (taskList) =>
    taskList.filter((t) => !t.completed).length;

// Find a task by id in the tree
const findTaskInTree = (taskList, id) => {
    if (!taskList?.length) return null;
    for (const t of taskList) {
        if (t.id === id) return t;
        const found = findTaskInTree(t.subtasks || [], id);
        if (found) return found;
    }
    return null;
};

// Update a task by id in the tree
const updateTaskInTree = (taskList, id, updates) => {
    return (taskList || []).map((t) => {
        if (t.id === id) return { ...t, ...updates };
        if (t.subtasks?.length)
            return { ...t, subtasks: updateTaskInTree(t.subtasks, id, updates) };
        return t;
    });
};

const ListDetailPage = () => {
    const { folderName, listId } = useParams();
    const [tasks, setTasks] = useState(getDefaultTasksForList);
    const [todoExpanded, setTodoExpanded] = useState(true);
    const [viewMode, setViewMode] = useState('list');
    const [addingToParentId, setAddingToParentId] = useState(null);
    const [addingTopLevel, setAddingTopLevel] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [status, setStatus] = useState('Open');
    const [assignees, setAssignees] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [timeEstimate, setTimeEstimate] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedSubtaskId, setSelectedSubtaskId] = useState(null);
    const [subtaskSortBy, setSubtaskSortBy] = useState('manual');
    const [assigneeSearch, setAssigneeSearch] = useState('');
    const [showMentionModal, setShowMentionModal] = useState(false);
    const [showCustomFieldMenu, setShowCustomFieldMenu] = useState(false);

    const todoCount = useMemo(() => countTopLevelIncomplete(tasks), [tasks]);

    const toggleTask = (id) => {
        setTasks((prev) => toggleTaskInTree(prev, id));
    };

    const openAddSubtask = (parentId) => (e) => {
        e.stopPropagation();
        setAddingToParentId(parentId);
        setAddingTopLevel(false);
        setNewTaskName('');
    };

    const openAddTask = () => {
        setAddingTopLevel(true);
        setAddingToParentId(null);
        setNewTaskName('');
    };

    const saveNewTask = () => {
        const name = newTaskName.trim() || 'New task';
        if (addingToParentId) {
            setTasks((prev) => addSubtaskInTree(prev, addingToParentId, newTask(name)));
        } else if (addingTopLevel) {
            setTasks((prev) => [...prev, newTask(name)]);
        }
        setAddingToParentId(null);
        setAddingTopLevel(false);
        setNewTaskName('');
    };

    const cancelAdd = () => {
        setAddingToParentId(null);
        setAddingTopLevel(false);
        setNewTaskName('');
    };

    const handleNewTaskKeyDown = (e) => {
        if (e.key === 'Enter') saveNewTask();
        if (e.key === 'Escape') cancelAdd();
    };

    const resetCreateTaskForm = () => {
        setTaskTitle('');
        setStatus('Open');
        setAssignees([]);
        setStartDate('');
        setEndDate('');
        setPriority('Medium');
        setTimeEstimate('');
        setTags([]);
        setDescription('');
        setAttachments([]);
    };

    const selectedTask = useMemo(
        () => (selectedTaskId ? findTaskInTree(tasks, selectedTaskId) : null),
        [tasks, selectedTaskId]
    );

    // When viewing a subtask, displayTask is the subtask and parentTask is the task; otherwise displayTask is the task
    const displayTaskId = selectedSubtaskId || selectedTaskId;
    const displayTask = useMemo(
        () => (displayTaskId ? findTaskInTree(tasks, displayTaskId) : null),
        [tasks, displayTaskId]
    );
    const parentTask = useMemo(
        () => (selectedSubtaskId && selectedTaskId ? findTaskInTree(tasks, selectedTaskId) : null),
        [tasks, selectedSubtaskId, selectedTaskId]
    );

    const openTaskDetail = (task) => (e) => {
        if (e.target.closest('.list-detail-add-subtask-btn') || e.target.closest('.form-check')) return;
        setSelectedTaskId(task.id);
        setSelectedSubtaskId(null);
    };

    const openSubtaskDetail = (subtask, parentTaskId) => (e) => {
        e.stopPropagation();
        if (e.target.closest('.form-check')) return;
        setSelectedSubtaskId(subtask.id);
        setSelectedTaskId(parentTaskId);
    };

    const closeTaskDetail = () => {
        setSelectedTaskId(null);
        setSelectedSubtaskId(null);
    };

    const backToParentTask = () => setSelectedSubtaskId(null);

    const updateSelectedTask = (updates) => {
        if (!displayTaskId) return;
        setTasks((prev) => updateTaskInTree(prev, displayTaskId, updates));
    };

    const saveCreateTaskModal = () => {
        const task = newTask(taskTitle.trim() || 'New task', {
            assignee: assignees?.[0]?.label || null,
            dueDate: endDate || null,
            priority: priority || null,
            status,
            description: description || null,
            timeEstimate: timeEstimate || null,
        });
        setTasks((prev) => [...prev, task]);
        setShowCreateTaskModal(false);
        resetCreateTaskForm();
    };


    const renderAddFormRow = (depth = 0) => (
        <tr key="add-form" className="list-detail-add-form-row">
            <td className="list-detail-col-name" colSpan={5}>
                <span
                    className="list-detail-task-indent"
                    style={{ width: depth * 20 }}
                />
                <Form.Control
                    type="text"
                    size="sm"
                    className="list-detail-new-task-input"
                    placeholder="Enter task name..."
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    onKeyDown={handleNewTaskKeyDown}
                    autoFocus
                />
                <Button
                    variant="primary"
                    size="sm"
                    className="list-detail-save-task-btn"
                    onClick={saveNewTask}
                >
                    Save
                </Button>
                <Button
                    variant="flush-dark"
                    size="sm"
                    className="list-detail-cancel-task-btn"
                    onClick={cancelAdd}
                >
                    Cancel
                </Button>
            </td>
        </tr>
    );

    // Recursively render task rows (task + its subtasks) for incomplete tasks only
    const renderTaskRows = (taskList, depth = 0) => {
        if (!taskList || !taskList.length) return null;
        return taskList
            .filter((t) => !t.completed)
            .flatMap((task) => {
                const isAddingHere = addingToParentId === task.id && selectedTaskId !== task.id;
                return [
                    <tr
                        key={task.id}
                        className={classNames('list-detail-task-row', {
                            'list-detail-task-row-sub': depth > 0,
                        })}
                        data-depth={depth}
                        onClick={openTaskDetail(task)}
                    >
                        <td className="list-detail-col-name">
                            <span
                                className="list-detail-task-indent"
                                style={{ width: depth * 20 }}
                            />
                            <Form.Check
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                            />
                            <span
                                className="list-detail-add-subtask-btn list-detail-add-subtask-btn-inline"
                                onClick={openAddSubtask(task.id)}
                                title="Add subtask"
                            >
                                <Plus size={14} />
                            </span>
                            <span>{task.name}</span>
                        </td>
                        <td className="list-detail-col-assignee">
                            <User size={14} className="text-muted" />
                        </td>
                        <td className="list-detail-col-due">
                            <Calendar size={14} className="text-muted" />
                        </td>
                        <td className="list-detail-col-priority">
                            <Flag size={14} className="text-muted" />
                        </td>
                        <td className="list-detail-col-add" />
                    </tr>,
                    isAddingHere ? renderAddFormRow(depth + 1) : null,
                    ...(task.subtasks?.length
                        ? renderTaskRows(task.subtasks, depth + 1)
                        : []),
                ].filter(Boolean);
            });
    };

    return (
        <div className="hk-pg-body py-0">
            <div className="list-detail-wrap">
                {/* Top navigation bar */}
                <header className="list-detail-header">
                    <Nav as="ul" className="list-detail-nav-tabs">
                        <Nav.Item as="li">
                            <Nav.Link
                                active={viewMode === 'list'}
                                onClick={() => setViewMode('list')}
                                className="list-detail-tab"
                            >
                                <List size={14} />
                                List
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link
                                active={viewMode === 'board'}
                                onClick={() => setViewMode('board')}
                                className="list-detail-tab"
                            >
                                <Grid size={14} />
                                Board
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link className="list-detail-tab list-detail-tab-add">
                                <Plus size={13} />
                                View
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div className="list-detail-header-actions">
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Filter">
                            <Filter size={15} />
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Timeline">
                            <Clock size={15} />
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Me mode">
                            <User size={15} />
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Assignee">
                            <span className="list-detail-letter">A</span>
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Search">
                            <Search size={15} />
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Settings">
                            <Settings size={15} />
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            className="ms-2 list-detail-add-task-btn"
                            onClick={() => setShowCreateTaskModal(true)}
                        >
                            <Plus size={14} />
                            Task
                            <ChevronDown size={12} />
                        </Button>
                    </div>
                </header>

                {/* Secondary toolbar */}
                <div className="list-detail-toolbar">
                    <div className="list-detail-toolbar-left">
                        <Button variant="light" size="sm" className="list-detail-status-btn active">
                            <BarChart2 size={13} />
                            Status
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover">
                            <Search size={14} />
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover">
                            <Columns size={14} />
                        </Button>
                    </div>
                </div>

                {/* Task list body */}
                <SimpleBar className="list-detail-body">
                    <div className="list-detail-content">
                        {/* Section header */}
                        <div
                            className="list-detail-section-header"
                            onClick={() => setTodoExpanded(!todoExpanded)}
                        >
                            <ChevronDown
                                size={14}
                                className={classNames('list-detail-section-chevron', {
                                    'rotate-270': !todoExpanded,
                                })}
                            />
                            <span className="list-detail-section-dot" />
                            <span className="list-detail-section-title">TO DO</span>
                            <span className="list-detail-section-count">{todoCount}</span>
                        </div>

                        {todoExpanded && (
                            <div className="list-detail-table-wrap">
                                <table className="list-detail-table table">
                                <thead>
                                    <tr>
                                        <th className="list-detail-col-name">Name</th>
                                        <th className="list-detail-col-assignee">Assignee</th>
                                        <th className="list-detail-col-due">Due date</th>
                                        <th className="list-detail-col-priority">Priority</th>
                                        <th className="list-detail-col-add text-center">
                                            <button
                                                type="button"
                                                className="btn btn-link p-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowCustomFieldMenu((prev) => !prev);
                                                }}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {renderTaskRows(tasks)}
                                        {addingTopLevel && renderAddFormRow(0)}
                                        <tr
                                            className="list-detail-add-row"
                                            onClick={addingTopLevel ? undefined : openAddTask}
                                        >
                                            <td colSpan={5}>
                                                <Plus size={13} className="me-2" />
                                                Add Task
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {showCustomFieldMenu && (
                                    <div
                                        className="list-detail-custom-fields-menu"
                                        style={{
                                            position: 'fixed',
                                            top: 140,
                                            right: 32,
                                            width: 260,
                                            maxHeight: 480,
                                            backgroundColor: '#ffffff',
                                            borderRadius: 8,
                                            boxShadow: '0 10px 40px rgba(15, 23, 42, 0.18)',
                                            padding: 16,
                                            zIndex: 1050,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>Fields</div>
                                            <button
                                                type="button"
                                                className="btn btn-link btn-sm p-0"
                                                onClick={() => setShowCustomFieldMenu(false)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <Form.Control
                                            type="search"
                                            size="sm"
                                            placeholder="Search for new or existing fields"
                                            className="mb-2"
                                            style={{ fontSize: 12 }}
                                        />
                                        <div className="d-flex mb-2" style={{ fontSize: 12 }}>
                                            <button
                                                type="button"
                                                className="btn btn-link p-0 me-3"
                                                style={{ fontWeight: 600 , fontSize: 12}}
                                            >
                                                Create new
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-link p-0 text-muted"
                                                style={{ fontWeight: 600 , fontSize: 12}}
                                            >
                                                Add existing
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 4,
                                                paddingTop: 8,
                                                borderTop: '1px solid #e5e7eb',
                                                fontSize: 12,
                                                overflowY: 'auto',
                                                maxHeight: 320,
                                            }}
                                        >
                                            {[
                                                'Dropdown',
                                                'Text',
                                                'Date',
                                                'Text area (Long Text)',
                                                'Number',
                                                'Labels',
                                                'Checkbox',
                                                'Money',
                                                'Website',
                                                'Formula',
                                                'Custom Text',
                                                'Summary',
                                            ].map((field) => (
                                                <div
                                                    key={field}
                                                    className="d-flex align-items-center py-1"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <span>{field}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </SimpleBar>
            </div>

            {/* Create Task Modal (same as WorkspaceSidebar) */}
            <Modal
                show={showCreateTaskModal}
                onHide={() => {
                    setShowCreateTaskModal(false);
                    resetCreateTaskForm();
                }}
                size="lg"
                centered
                className="task-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </Form.Group>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
                                    <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Assignees</Form.Label>
                            <Select
                                options={dummyUsers}
                                isMulti
                                value={assignees}
                                onChange={(selected) => setAssignees(selected || [])}
                            />
                        </Form.Group>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Time Estimate</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. 3h 30m"
                                value={timeEstimate}
                                onChange={(e) => setTimeEstimate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect
                                isMulti
                                options={[]}
                                value={tags}
                                onChange={(selected) => setTags(selected || [])}
                            />
                        </Form.Group>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Attachments</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    setAttachments((prev) => [...prev, ...files]);
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowCreateTaskModal(false);
                            resetCreateTaskForm();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveCreateTaskModal}>
                        Save Task
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Task / Subtask Detail Modal */}
            <Modal
                show={!!displayTask}
                onHide={closeTaskDetail}
                size="xl"
                centered
                className="task-detail-modal"
            >
                {displayTask && (
                    <>
                        <Modal.Header closeButton className="task-detail-modal-header">
                            <div className="task-detail-breadcrumb">
                                <span>Space 1</span>
                                <ChevronDown size={12} />
                                <span>{decodeURIComponent(folderName || '') || 'List'}</span>
                                <Plus size={12} />
                            </div>
                            <div className="task-detail-header-actions">
                                <span className="task-detail-created">Created Feb 23</span>
                                <Button variant="flush-dark" size="sm" className="btn-icon">
                                    <MoreHorizontal size={16} />
                                </Button>
                            </div>
                        </Modal.Header>
                        <Modal.Body className="task-detail-modal-body p-0">
                            <div className="task-detail-main">
                                <div className="task-detail-content">
                                    <div className="task-detail-title-row">
                                        <Dropdown className="task-detail-type-pill">
                                            <Dropdown.Toggle
                                                variant="light"
                                                size="sm"
                                                className="task-detail-type-toggle"
                                                // Remove default dropdown arrow
                                                style={{ display: 'flex', alignItems: 'center' }}
                                                bsPrefix="task-detail-type-toggle-custom"
                                            >
                                                {parentTask ? 'Subtask' : 'Task'}
                                                <ChevronDown size={12} style={{ marginLeft: 4 }} />
                                            </Dropdown.Toggle>
                                        </Dropdown>
                                        {parentTask && (
                                            <button
                                                type="button"
                                                className="task-detail-subtask-of-link"
                                                onClick={backToParentTask}
                                            >
                                                <Eye size={14} />
                                                Subtask of {parentTask.name}
                                            </button>
                                        )}
                                        <h1 className="task-detail-name">{displayTask.name}</h1>
                                    </div>
                                    <div className="task-detail-fields row">
                                        <div className="col-md-6">
                                            <div className="task-detail-field">
                                                <Eye size={14} />
                                                <span className="label">Status</span>
                                                <Form.Select size="sm" value={displayTask.status || 'TO DO'} onChange={(e) => updateSelectedTask({ status: e.target.value })}>
                                                    <option>TO DO</option>
                                                    <option>Open</option>
                                                    <option>In Progress</option>
                                                    <option>Review</option>
                                                    <option>Completed</option>
                                                </Form.Select>
                                            </div>
                                            <div className="task-detail-field">
                                                <Calendar size={14} />
                                                <span className="label">Dates</span>
                                                <Dropdown align="start" className="task-detail-dates-dropdown">
                                                    <Dropdown.Toggle as="span" className="task-detail-field-value-toggle">
                                                        <span className="value">
                                                            {displayTask.startDate && displayTask.dueDate
                                                                ? `${formatDateShort(displayTask.startDate)} → ${formatDateShort(displayTask.dueDate)}`
                                                                : 'Start → Due'}
                                                        </span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="task-detail-dates-menu" onClick={(e) => e.stopPropagation()}>
                                                        <div className="task-detail-dates-row">
                                                            <InputGroup size="sm" className="task-detail-dates-inputs">
                                                                <InputGroup.Text><Calendar size={14} /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="date"
                                                                    value={displayTask.startDate || ''}
                                                                    onChange={(e) => updateSelectedTask({ startDate: e.target.value || null })}
                                                                />
                                                            </InputGroup>
                                                            <span className="task-detail-dates-sep">→</span>
                                                            <InputGroup size="sm" className="task-detail-dates-inputs">
                                                                <InputGroup.Text><Calendar size={14} /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="date"
                                                                    value={displayTask.dueDate || ''}
                                                                    onChange={(e) => updateSelectedTask({ dueDate: e.target.value || null })}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                        <div className="task-detail-dates-body">
                                                            <div className="task-detail-dates-calendars-wrap">
                                                                <div className="task-detail-dates-calendar">
                                                                    <div className="task-detail-dates-calendar-title">Start date</div>
                                                                    <DatePicker
                                                                        selected={displayTask.startDate ? new Date(displayTask.startDate) : null}
                                                                        onChange={(d) => updateSelectedTask({ startDate: d ? toYMD(d) : null })}
                                                                        inline
                                                                        calendarClassName="task-detail-datepicker"
                                                                    />
                                                                </div>
                                                                <div className="task-detail-dates-calendar">
                                                                    <div className="task-detail-dates-calendar-title">Due date</div>
                                                                    <DatePicker
                                                                        selected={displayTask.dueDate ? new Date(displayTask.dueDate) : null}
                                                                        onChange={(d) => updateSelectedTask({ dueDate: d ? toYMD(d) : null })}
                                                                        inline
                                                                        calendarClassName="task-detail-datepicker"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="task-detail-field">
                                                <Clock size={14} />
                                                <span className="label">Time estimate</span>
                                                <span className="value">{displayTask.timeEstimate || 'Empty'}</span>
                                            </div>
                                            <div className="task-detail-field">
                                                <Tag size={14} />
                                                <span className="label">Tags</span>
                                                <span className="value">Empty</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="task-detail-field">
                                                <User size={14} />
                                                <span className="label">Assignees</span>
                                                <Dropdown align="start" className="task-detail-assignee-dropdown">
                                                    <Dropdown.Toggle as="span" className="task-detail-field-value-toggle">
                                                        <span className="value">{displayTask.assignee || 'Empty'}</span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="task-detail-assignee-menu" onClick={(e) => e.stopPropagation()}>
                                                        <div className="task-detail-assignee-title">{displayTask.assignee || 'Empty'}</div>
                                                        <InputGroup size="sm" className="task-detail-assignee-search">
                                                            <InputGroup.Text><Search size={14} /></InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Search or enter email..."
                                                                value={assigneeSearch}
                                                                onChange={(e) => setAssigneeSearch(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        <button
                                                            type="button"
                                                            className="task-detail-assignee-item task-detail-assignee-me"
                                                            onClick={() => { updateSelectedTask({ assignee: 'Me' }); }}
                                                        >
                                                            <span className="task-detail-assignee-avatar task-detail-assignee-avatar-me">AS</span>
                                                            <span className="task-detail-assignee-online" />
                                                            <span>Me</span>
                                                        </button>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="task-detail-field">
                                                <Flag size={14} />
                                                <span className="label">Priority</span>
                                                <Dropdown align="start" className="task-detail-priority-dropdown">
                                                    <Dropdown.Toggle as="span" className="task-detail-field-value-toggle">
                                                        <span className="value">
                                                            {displayTask.priority ? (
                                                                <>
                                                                    <span
                                                                        className={classNames('task-detail-priority-flag', {
                                                                            'priority-urgent': displayTask.priority === 'Urgent',
                                                                            'priority-high': displayTask.priority === 'High',
                                                                            'priority-normal': displayTask.priority === 'Normal',
                                                                            'priority-low': displayTask.priority === 'Low',
                                                                        })}
                                                                        style={{
                                                                            marginRight: 6,
                                                                            display: 'inline-flex',
                                                                            alignItems: 'center',
                                                                        }}
                                                                    >
                                                                        <Flag
                                                                            size={14}
                                                                            color={
                                                                                displayTask.priority === 'Urgent'
                                                                                    ? '#dc2626'
                                                                                    : displayTask.priority === 'High'
                                                                                    ? '#f59e42'
                                                                                    : displayTask.priority === 'Normal'
                                                                                    ? '#3b82f6'
                                                                                    : displayTask.priority === 'Low'
                                                                                    ? '#7dd07d'
                                                                                    : undefined
                                                                            }
                                                                        />
                                                                    </span>
                                                                    {displayTask.priority}
                                                                </>
                                                            ) : 'Empty'}
                                                        </span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="task-detail-priority-menu" onClick={(e) => e.stopPropagation()}>
                                                        <div className="task-detail-priority-section-title">Task Priority</div>
                                                        {[
                                                            { id: 'Urgent', label: 'Urgent', flagClass: 'priority-urgent', color: '#dc2626' },
                                                            { id: 'High', label: 'High', flagClass: 'priority-high', color: '#f59e42' },
                                                            { id: 'Normal', label: 'Normal', flagClass: 'priority-normal', color: '#3b82f6' },
                                                            { id: 'Low', label: 'Low', flagClass: 'priority-low', color: '#7dd07d' },
                                                        ].map((p) => (
                                                            <Dropdown.Item
                                                                key={p.id}
                                                                className="task-detail-priority-item"
                                                                onClick={() => updateSelectedTask({ priority: p.id })}
                                                            >
                                                                <span
                                                                    className={classNames('task-detail-priority-flag', p.flagClass)}
                                                                    style={{
                                                                        marginRight: 6,
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    <Flag size={14} color={p.color} />
                                                                </span>
                                                                <span>{p.label}</span>
                                                            </Dropdown.Item>
                                                        ))}

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="task-detail-description">
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            placeholder={parentTask ? 'Add description' : 'Add description'}
                                            value={displayTask.description || ''}
                                            onChange={(e) => updateSelectedTask({ description: e.target.value })}
                                        />
                                    </div>
                                    <div className="task-detail-custom-fields">
                                        <span className="task-detail-section-label">Add Custom Fields</span>
                                        {parentTask && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="task-detail-action-link"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setAddingToParentId(displayTask.id);
                                                        setNewTaskName('');
                                                    }}
                                                >
                                                    <Plus size={14} /> Add subtask
                                                </button>
                                                <span className="task-detail-action-link">Relate items or add dependencies</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="task-detail-subtasks">
                                        <div
                                            className="task-detail-subtasks-header"
                                            onClick={() => updateSelectedTask({ subtasksExpanded: !displayTask.subtasksExpanded })}
                                        >
                                            <ChevronDown
                                                size={16}
                                                className={classNames({ 'rotate-270': displayTask.subtasksExpanded === false })}
                                            />
                                            <span className="task-detail-section-label">Subtasks</span>
                                            <span className="task-detail-subtasks-count">
                                                {(displayTask.subtasks || []).filter((s) => !s.completed).length} of {(displayTask.subtasks || []).length}
                                            </span>
                                            <div className="task-detail-subtasks-actions" onClick={(e) => e.stopPropagation()}>
                                                <Dropdown align="end" className="task-detail-sort-dropdown">
                                                    <Dropdown.Toggle variant="flush-dark" size="sm" className="task-detail-sort-toggle">
                                                        Sort
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="task-detail-sort-menu">
                                                        <div className="task-detail-sort-menu-title">Sorting</div>
                                                        <Dropdown.Item
                                                            className={classNames('task-detail-sort-item', { active: subtaskSortBy === 'manual' })}
                                                            onClick={() => setSubtaskSortBy('manual')}
                                                        >
                                                            <span className="task-detail-sort-item-icon">
                                                                <ArrowUp size={14} />
                                                                <ArrowDown size={14} />
                                                            </span>
                                                            <span>Manual</span>
                                                            {subtaskSortBy === 'manual' && <Check size={16} className="task-detail-sort-check" />}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            className={classNames('task-detail-sort-item', { active: subtaskSortBy === 'status' })}
                                                            onClick={() => setSubtaskSortBy('status')}
                                                        >
                                                            <span className="task-detail-sort-item-icon" />
                                                            <span>Status</span>
                                                            {subtaskSortBy === 'status' && <Check size={16} className="task-detail-sort-check" />}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            className={classNames('task-detail-sort-item', { active: subtaskSortBy === 'priority' })}
                                                            onClick={() => setSubtaskSortBy('priority')}
                                                        >
                                                            <span className="task-detail-sort-item-icon" />
                                                            <span>Priority</span>
                                                            {subtaskSortBy === 'priority' && <Check size={16} className="task-detail-sort-check" />}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            className={classNames('task-detail-sort-item', { active: subtaskSortBy === 'dueDate' })}
                                                            onClick={() => setSubtaskSortBy('dueDate')}
                                                        >
                                                            <span className="task-detail-sort-item-icon" />
                                                            <span>Due Date</span>
                                                            {subtaskSortBy === 'dueDate' && <Check size={16} className="task-detail-sort-check" />}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            className={classNames('task-detail-sort-item', { active: subtaskSortBy === 'name' })}
                                                            onClick={() => setSubtaskSortBy('name')}
                                                        >
                                                            <span className="task-detail-sort-item-icon" />
                                                            <span>Name</span>
                                                            {subtaskSortBy === 'name' && <Check size={16} className="task-detail-sort-check" />}
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <span
                                                    className="task-detail-subtask-add-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setAddingToParentId(displayTask.id);
                                                        setNewTaskName('');
                                                    }}
                                                >
                                                    <Plus size={16} />
                                                </span>
                                            </div>
                                        </div>
                                        {displayTask.subtasksExpanded !== false && (
                                            <div className="task-detail-subtasks-list">
                                                {(displayTask.subtasks || []).map((st) => (
                                                    <div
                                                        key={st.id}
                                                        className="task-detail-subtask-row task-detail-subtask-row-clickable"
                                                        onClick={openSubtaskDetail(st, parentTask ? displayTask.id : selectedTaskId)}
                                                    >
                                                        <Form.Check
                                                            type="checkbox"
                                                            checked={!!st.completed}
                                                            onChange={(e) => {
                                                                e.stopPropagation();
                                                                setTasks((prev) => toggleTaskInTree(prev, st.id));
                                                            }}
                                                        />
                                                        <span className="task-detail-subtask-name">{st.name}</span>
                                                        <User size={14} className="text-muted" />
                                                        <Flag size={14} className="text-muted" />
                                                    </div>
                                                ))}
                                                {addingToParentId === displayTask.id && (
                                                    <div className="task-detail-subtask-add-form">
                                                        <Form.Control
                                                            size="sm"
                                                            placeholder="Enter subtask name..."
                                                            value={newTaskName}
                                                            onChange={(e) => setNewTaskName(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const name = newTaskName.trim() || 'New subtask';
                                                                    updateSelectedTask({ subtasks: [...(displayTask.subtasks || []), newTask(name)] });
                                                                    setNewTaskName('');
                                                                    setAddingToParentId(null);
                                                                }
                                                                if (e.key === 'Escape') setAddingToParentId(null);
                                                            }}
                                                            autoFocus
                                                        />
                                                        <Button size="sm" variant="primary" onClick={() => {
                                                            const name = newTaskName.trim() || 'New subtask';
                                                            updateSelectedTask({ subtasks: [...(displayTask.subtasks || []), newTask(name)] });
                                                            setNewTaskName('');
                                                            setAddingToParentId(null);
                                                        }}>Save</Button>
                                                        <Button size="sm" variant="flush-dark" onClick={() => { setAddingToParentId(null); setNewTaskName(''); }}>Cancel</Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="task-detail-activity">

                                    {/* Header */}
                                    <div className="task-detail-activity-header">
                                        <span>Activity</span>
                                        <Search size={14} />
                                        <Bell size={14} />
                                        <span className="task-detail-activity-badge">1</span>
                                    </div>

                                    {/* Activity log */}
                                    <div className="task-detail-activity-log">
                                        <div className="task-detail-activity-item">You created this task</div>
                                        <div className="task-detail-activity-meta">Feb 18 at 2:22 pm</div>
                                        <a href="#show-more" className="task-detail-activity-more">Show more</a>
                                        <div className="task-detail-activity-item">You created subtask: wee</div>
                                        <div className="task-detail-activity-meta">3 hours ago</div>
                                        <div className="task-detail-activity-item">You created subtask: web app design</div>
                                        <div className="task-detail-activity-meta">5 hours ago</div>
                                    </div>

                                    {/* Comment box — toolbar lives INSIDE */}
                                    <div className="task-detail-comment mt-5">
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            placeholder="Add a comment..."
                                            className="task-detail-comment-input"
                                        />

                                        {/* ── Toolbar row ── */}
                                        <div className="task-detail-comment-toolbar">

                                            <button
                                                type="button"
                                                className="task-detail-comment-action-btn"
                                                title="Attach file"
                                                onClick={() => alert('Attach file functionality coming soon!')}
                                            >
                                                <Paperclip size={13} />
                                            </button>
                                            <button
                                                type="button"
                                                className="task-detail-comment-action-btn"
                                                title="Attach file"
                                                onClick={() => alert('Mention Task functionality coming soon!')}
                                            >
                                                <AtSign size={13} />
                                            </button>
                                            <button
                                                type="button"
                                                className="task-detail-comment-action-btn"
                                                title="Mention people"
                                                onClick={() => setShowMentionModal(true)}
                                            >
                                                <span role="img" aria-label="mention">👤</span>
                                            </button>

                                            {/* Spacer pushes send to the right */}
                                            <span className="task-detail-comment-spacer" />

                                            {/* Send */}
                                            <button type="button" className="task-detail-comment-send-btn" title="Send">
                                                <Send size={13} />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>

            {/* Mention people modal */}
            <Modal
                show={showMentionModal}
                onHide={() => setShowMentionModal(false)}
                centered
                className="task-detail-mention-modal"
                contentClassName="task-detail-mention-modal-content"
            >
                <Modal.Body className="p-0">
                    <div className="task-detail-mention-modal-body">
                        <InputGroup size="sm" className="task-detail-mention-search-wrap">
                            <InputGroup.Text className="task-detail-mention-search-icon">
                                <Search size={16} />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search or enter email..."
                                className="task-detail-mention-search-input"
                                autoFocus
                            />
                        </InputGroup>
                        <button
                            type="button"
                            className="task-detail-mention-option task-detail-mention-me"
                            onClick={() => { /* select Me */ setShowMentionModal(false); }}
                        >
                            <span className="task-detail-mention-avatar task-detail-mention-avatar-me">AS</span>
                            <span className="task-detail-mention-online" />
                            <span>Me</span>
                        </button>
                        <button
                            type="button"
                            className="task-detail-mention-option task-detail-mention-invite"
                            onClick={() => { /* invite */ setShowMentionModal(false); }}
                        >
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ListDetailPage;