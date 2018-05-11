import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BroserRouter as Router, withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, UserSummary, PersonalityQuiz, Navbar } from './index.js'
import { me } from '../store'
// import { MuiThemeProvider } from 'material-ui/styles/MuiThemeProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// , {createMuiTheme } from 'material-ui/styles/MuiThemeProvider';
//'material-ui/styles'
import { withStyles } from 'material-ui/styles';

//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import MyAwesomeReactComponent from './components/MyAwesomeReactComponent'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import { orange500 } from 'material-ui/styles/colors';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';

/**
 * COMPONENT
 */
// injectTapEventPlugin();
// const theme = createMuiTheme();
// theme={theme}
class Main extends Component {


    componentDidMount() {
        this.props.loadInitialData()
    }


    render() {
        const { isLoggedIn } = this.props

        return (

          <MuiThemeProvider >
              <div className="container">
                  {/*<AppBar title="Material-UI" />*/}
                   <Navbar />
                  <main>
                      <Switch>
                          {/* Routes placed here are available to all visitors */}
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/signup" component={Signup} />
                          <Route path="/personalityQuiz" component={PersonalityQuiz} />
                          {
                              isLoggedIn &&
                              <Switch>
                                  {/* Routes placed here are only available after logging in */}
                                  {/* <Route path="/home" component={UserHome} /> */}
                                  <Route exact path="/home" component={UserSummary} />
                                  <Route exact path="/single" component={UserHome} />


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
        // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
        // Otherwise, state.user will be an empty object, and state.user.id will be falsey
        isLoggedIn: !!state.user.id
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
