import { useEffect } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { logout } from '../../store/actions'

const signout = ({ logout }) => {
    useEffect(() => {
        logout()
    }, [])

    return <Redirect to='/' />
}

export default connect(null, {logout})(signout)