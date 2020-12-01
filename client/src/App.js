import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Lander from './components/layout/Lander'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import Profile from './components/dashboard/profiles/Profile'
import CreateProfile from './components/dashboard/profiles/CreateProfile'
import { loadUser } from './store/actions'
import './App.css';

const App = props => {

  useEffect(() => {
    props.LOAD_USER()
  }, [])

  const routes = (
    <Switch>
      <Route path='/register' exact component={Register} />
      <Route path='/login' exact component={Login} />
      <PrivateRoute path='/logout' exact component={Logout} />
      <PrivateRoute path='/dashboard' exact component={Dashboard} />
      <Route path='/profiles' exact component={Profile} />
      <Route path='/create-profile' exact component={CreateProfile} />
      <Route path='/' exact component={Lander} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <Router>
      <Fragment>
        <Navbar />
        {routes}
      </Fragment>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    LOAD_USER: () => dispatch(loadUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)