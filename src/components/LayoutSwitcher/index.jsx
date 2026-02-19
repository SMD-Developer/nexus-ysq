import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLayoutType } from '../../redux/action/Theme';
import { Layout, Sidebar } from 'react-feather';
import './layout-switcher.scss';

const LayoutSwitcher = ({ layoutType, setLayoutType }) => {
    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 className="mb-1">Layout Style</h5>
                        <p className="text-muted mb-0">Choose your preferred layout style</p>
                    </div>
                </div>
                <ButtonGroup className="w-100 layout-switcher-group">
                    <Button
                        variant={layoutType === 'workspace' ? 'primary' : 'outline-primary'}
                        onClick={() => setLayoutType('workspace')}
                        className="layout-switcher-btn"
                    >
                        <Sidebar size={20} className="mb-2" />
                        <div className="layout-name">Workspace</div>
                        <small className="layout-desc">Modern workspace sidebar</small>
                    </Button>
                    <Button
                        variant={layoutType === 'classic' ? 'primary' : 'outline-primary'}
                        onClick={() => setLayoutType('classic')}
                        className="layout-switcher-btn"
                    >
                        <Layout size={20} className="mb-2" />
                        <div className="layout-name">Classic</div>
                        <small className="layout-desc">Traditional sidebar menu</small>
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = ({ theme }) => {
    const { layoutType } = theme;
    return { layoutType };
};

export default connect(mapStateToProps, { setLayoutType })(LayoutSwitcher);
