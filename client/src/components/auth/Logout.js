import { useEffect } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { logout } from '../../store/actions'

const signout = props => {
    useEffect(() => {
        props.logout()
    }, [])

    return <Redirect to='/' />
}

export default connect(null, {logout})(signout)