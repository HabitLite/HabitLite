import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BroserRouter as Router, withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, UserSummary, Personality, Navbar, Group, Resources, Recipes } from './index.js'
import { me } from '../store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { withStyles } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import { orange500 } from 'material-ui/styles/colors';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';


class Main extends Component {

    componentDidMount() {
        this.props.loadInitialData()
    }

    render() {
        const { isLoggedIn } = this.props

        return (
            <MuiThemeProvider >
                <div className="container">
                    <Navbar />
                    <main>
                        <Switch>
                            {/* <div className="wrap"> */}
                            {/* Routes placed here are available to all visitors */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route path="/personality/profile/:userId" component={Personality} />
                            {/* </div> */}
                            {
                                isLoggedIn &&
                                <Switch>
                                    {/* Routes placed here are only available after logging in */}
                                    {/* <Route path="/home" component={UserHome} /> */}
                                    <Route exact path="/home/" component={UserSummary} />
                                    <Route exact path="/:userId/:categoryId/" component={UserHome} />
                                    <Route exact path="/group" component={Group} />
                                    <Route exact path="/resources" component={Recipes} />
                                </Switch>
                            }
                            {/* Displays our Login component as a fallback */}
                            <Route component={Login} />
                        </Switch>
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id,
        userId: state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me())
        }
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}
