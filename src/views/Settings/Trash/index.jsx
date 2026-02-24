import React, { useState } from 'react';
import { Container, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { Filter, Search } from 'react-feather';
import './settings-trash.scss';

const TrashSettings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [activeFiltersCount] = useState(1); // e.g. "Deleted by" active
    const [filterDeletedBy] = useState('AS'); // initials for "Deleted by" filter

    return (
        <Container fluid className="settings-trash-page">
            <div className="settings-trash-content">
                <div className="settings-trash-inner">
                    <h1 className="settings-trash-title">Trash</h1>
                    <p className="settings-trash-description">
                        Items shown below will be automatically deleted forever after 30 days.
                    </p>

                    <div className="settings-trash-toolbar">
                        <InputGroup className="settings-trash-search-wrap">
                            <InputGroup.Text className="settings-trash-search-icon">
                                <Search size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="settings-trash-search-input"
                            />
                        </InputGroup>

                        <Dropdown
                            show={showFilterMenu}
                            onToggle={(isOpen) => setShowFilterMenu(isOpen)}
                            align="end"
                            className="settings-trash-filter-dropdown"
                        >
                            <Dropdown.Toggle
                                variant="light"
                                size="sm"
                                className="settings-trash-filter-btn"
                                id="trash-filter-toggle"
                            >
                                <Filter size={18} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="settings-trash-filter-menu">
                                <div className="settings-trash-filter-menu-title">Add filter</div>
                                <Dropdown.Item as="button" className="settings-trash-filter-option">
                                    Type
                                </Dropdown.Item>
                                <Dropdown.Item as="button" className="settings-trash-filter-option settings-trash-filter-option--deleted-by">
                                    Deleted by
                                    {filterDeletedBy && (
                                        <span className="settings-trash-filter-initials">{filterDeletedBy}</span>
                                    )}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="settings-trash-empty">
                        <p className="settings-trash-empty-text">No items found for your search.</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default TrashSettings;
