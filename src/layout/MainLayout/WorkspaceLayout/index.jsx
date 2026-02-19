import React, { useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import PageFooter from '../../Footer/PageFooter';
import TopNav from '../../Header/TopNav';
import IconSidebar from '../../Sidebar/IconSidebar';
import WorkspaceSidebar from '../../Sidebar/WorkspaceSidebar';
import SettingsSidebar from '../../Sidebar/SettingsSidebar';
import { useWindowWidth } from '@react-hook/window-size';
import './workspace-layout.scss';

const WorkspaceLayout = ({ children, maximize }) => {
    const [sidebarShow, setSidebarShow] = useState(false);
    const [workspaceSidebarCollapsed, setWorkspaceSidebarCollapsed] = useState(false);
    const appRoutes = useRouteMatch('/apps/');
    const settingsRoutes = useRouteMatch('/settings');
    const errro404Route = useRouteMatch('/error-404');
    const windowWidth = useWindowWidth();
    const isSettingsPage = !!settingsRoutes;

    const toggleSidebar = () => {
        setSidebarShow(!sidebarShow);
    };

    const toggleWorkspaceSidebar = () => {
        setWorkspaceSidebarCollapsed(!workspaceSidebarCollapsed);
    };

    return (
        <div
            className={classNames("hk-wrapper workspace-layout", {
                "dual-sidebar": true,
                "hk-pg-auth": errro404Route,
                "hk__email__backdrop": maximize,
                "workspace-collapsed": workspaceSidebarCollapsed
            })}
            data-layout="workspace"
            data-menu="dark"
            data-footer="simple"
        >
            {/* Icon Sidebar (Left) */}
            <IconSidebar 
                showExpandButton={workspaceSidebarCollapsed}
                onExpandWorkspace={toggleWorkspaceSidebar}
            />
            
            {/* Workspace Sidebar (Secondary) */}
            {!workspaceSidebarCollapsed && (
                isSettingsPage ? (
                    <SettingsSidebar
                        show={sidebarShow}
                        toggleSidebar={toggleSidebar}
                        onCollapse={toggleWorkspaceSidebar}
                    />
                ) : (
                    <WorkspaceSidebar 
                        show={sidebarShow} 
                        toggleSidebar={toggleSidebar}
                        onCollapse={toggleWorkspaceSidebar}
                    />
                )
            )}
            
            {/* Mobile Backdrop */}
            {windowWidth <= 1199 && sidebarShow && (
                <div className="workspace-backdrop" onClick={toggleSidebar} />
            )}

            {/* Main Content */}
            <div className="workspace-main-content">
                {/* Top Navbar */}
                <TopNav />
                
                <div className={classNames("hk-pg-wrapper", { "pb-0": appRoutes })}>
                    {children}
                    {!appRoutes && <PageFooter />}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ emailReducer }) => {
    const { maximize } = emailReducer;
    return { maximize };
};

export default connect(mapStateToProps)(WorkspaceLayout);
