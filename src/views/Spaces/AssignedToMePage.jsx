import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Form } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import {
    Bookmark,
    ChevronDown,
    Columns,
    Flag,
    Layout,
    Plus,
    Search,
    Settings,
    Square,
} from 'react-feather';
import './ListDetailPage.scss';
import './assigned-to-me.scss';

const defaultTasks = [
    {
        id: '1',
        name: 'Unique Task',
        priority: 'normal',
        dueDate: 'Today',
    },
];

// Column keys for the two swappable columns (Name is always first)
const COL_PRIORITY = 'priority';
const COL_DUE_DATE = 'dueDate';

const AssignedToMePage = () => {
    const [tasks, setTasks] = useState(defaultTasks);
    const [todoCount] = useState(1);
    const [addingTask, setAddingTask] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    // Order of right columns: ['priority', 'dueDate'] or ['dueDate', 'priority']
    const [columnOrder, setColumnOrder] = useState([COL_PRIORITY, COL_DUE_DATE]);

    const swapPriorityAndDueDate = () => {
        setColumnOrder((prev) =>
            prev[0] === COL_PRIORITY ? [COL_DUE_DATE, COL_PRIORITY] : [COL_PRIORITY, COL_DUE_DATE]
        );
    };

    const handleAddTask = () => {
        if (addingTask) return;
        setAddingTask(true);
        setNewTaskName('');
    };

    const handleSaveNewTask = () => {
        const name = newTaskName.trim() || 'New task';
        setTasks((prev) => [...prev, { id: `t-${Date.now()}`, name, priority: null, dueDate: null }]);
        setAddingTask(false);
        setNewTaskName('');
    };

    const handleCancelAdd = () => {
        setAddingTask(false);
        setNewTaskName('');
    };

    return (
        <div className="hk-pg-body py-0">
            <div className="list-detail-wrap assigned-me-wrap">
                {/* Breadcrumb + actions header */}
                <header className="assigned-me-header">
                    <nav className="assigned-me-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/apps/taskboard/assigned-to-me" className="assigned-me-breadcrumb-link">
                            My Tasks
                        </Link>
                        <span className="assigned-me-breadcrumb-sep">/</span>
                        <span className="assigned-me-breadcrumb-current">Assigned to me</span>
                    </nav>
                    <div className="list-detail-header-actions">
                        <Dropdown align="end" className="d-inline-block">
                            <Dropdown.Toggle
                                variant="flush-dark"
                                size="sm"
                                className="btn-icon btn-rounded flush-soft-hover"
                                title="Columns"
                                id="assigned-me-columns-dropdown"
                            >
                                <Columns size={15} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={swapPriorityAndDueDate}>
                                    Swap Priority & Due date
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Select">
                            <Square size={15} />
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Search">
                            <Search size={15} />
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Settings">
                            <Settings size={15} />
                        </Button>
                    </div>
                </header>

                {/* White card: Status filter + table */}
                <div className="list-detail-toolbar">
                    <div className="list-detail-toolbar-left">
                        <Button variant="light" size="sm" className="list-detail-status-btn active">
                            <Layout size={13} />
                            Status
                        </Button>
                        <Button variant="flush-dark" size="sm" className="btn-icon btn-rounded flush-soft-hover" title="Pin">
                            <Bookmark size={14} />
                        </Button>
                        <button
                            type="button"
                            className="assigned-me-status-pill"
                            onClick={() => {}}
                        >
                            <span className="assigned-me-status-dot" />
                            <span>TO DO</span>
                            <span className="assigned-me-status-count">{todoCount}</span>
                        </button>
                    </div>
                </div>

                <SimpleBar className="list-detail-body">
                    <div className="list-detail-content">
                        <div className="list-detail-table-wrap">
                            <table className="list-detail-table table assigned-me-table">
                                <thead>
                                    <tr>
                                        <th className="list-detail-col-name">Name</th>
                                        {columnOrder.map((key) =>
                                            key === COL_PRIORITY ? (
                                                <th key={key} className="list-detail-col-priority sm">Priority</th>
                                            ) : (
                                                <th key={key} className="list-detail-col-due assigned-me-col-due">
                                                    Due date
                                                    <ChevronDown size={14} className="assigned-me-sort-icon" />
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr key={task.id} className="list-detail-task-row assigned-me-task-row">
                                            <td className="list-detail-col-name">
                                                <span className="assigned-me-task-icon" />
                                                <span>{task.name}</span>
                                            </td>
                                            {columnOrder.map((key) =>
                                                key === COL_PRIORITY ? (
                                                    <td key={key} className="list-detail-col-priority">
                                                        <Flag size={14} className="text-muted" />
                                                    </td>
                                                ) : (
                                                    <td key={key} className="list-detail-col-due">
                                                        <span className="assigned-me-due-text">{task.dueDate || '—'}</span>
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                    {addingTask && (
                                        <tr className="assigned-me-add-form-row">
                                            <td colSpan={3}>
                                                <Form.Control
                                                    type="text"
                                                    size="sm"
                                                    className="list-detail-new-task-input"
                                                    placeholder="Enter task name..."
                                                    value={newTaskName}
                                                    onChange={(e) => setNewTaskName(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleSaveNewTask();
                                                        if (e.key === 'Escape') handleCancelAdd();
                                                    }}
                                                    autoFocus
                                                />
                                                <Button variant="primary" size="sm" className="list-detail-save-task-btn" onClick={handleSaveNewTask}>
                                                    Save
                                                </Button>
                                                <Button variant="flush-dark" size="sm" className="list-detail-cancel-task-btn" onClick={handleCancelAdd}>
                                                    Cancel
                                                </Button>
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="list-detail-add-row" onClick={addingTask ? undefined : handleAddTask}>
                                        <td colSpan={3}>
                                            <Plus size={13} className="me-2" />
                                            Add Task
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
};

export default AssignedToMePage;
