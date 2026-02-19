import React, { Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LayoutClassic from '../layout/MainLayout/ClassicLayout'
import WorkspaceLayout from '../layout/MainLayout/WorkspaceLayout'
import { routes } from './RouteList'

const AppRoutes = (props) => {

    const { match, layoutType } = props;

    // Choose layout based on Redux state (defaults to workspace)
    const Layout = layoutType === 'classic' ? LayoutClassic : WorkspaceLayout;

    return (
        <Suspense
            fallback={
                <div className="preloader-it">
                    <div className="loader-pendulums" />
                </div>
            }>
            <Layout>
                <Switch>

                    {
                        routes.map((obj, i) => {
                            return (obj.component) ? (
                                <Route
                                    key={i}
                                    exact={obj.exact}
                                    path={match.path + obj.path}
                                    render={matchProps => (
                                        <obj.component {...matchProps} />
                                    )}
                                />) : (null)
                        })
                    }
                    <Route path="*">
                        <Redirect to="/error-404" />
                    </Route>
                </Switch>
            </Layout>
        </Suspense>
    )
}

const mapStateToProps = ({ theme }) => {
    const { layoutType } = theme;
    return { layoutType }
};

export default connect(mapStateToProps)(AppRoutes)
