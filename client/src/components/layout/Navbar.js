import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Navbar.css'

const Navbar = props => {

    let navLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    if (props.isAuth) {
        navLinks = (
            <ul>
                <li><Link to="/profiles">Developers</Link></li>
                <li><Link to="/dashboard"><i className="fas fa-user"></i> Dashboard</Link></li>
                <li><Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
            </ul>
        )
    }

    return <Fragment>
        <nav className='navbar'>
            <h1>
                <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {navLinks}
        </nav>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(Navbar)