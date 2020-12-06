import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from '../UIElements/Spinner'
import { currentProfile } from '../../store/actions'

const Dashboard = props => {

  useEffect(() => {
    props.LOAD_CURRENT_USER()
  }, [])

  const alertClasses = ['alert']
  if (props.alertType === 'success') alertClasses.push('alert-primary')
  else alertClasses.push('alert-dark')

  let dashboard = (
    <div className='container'>
      <h1 className='primary-color'>Dashboard</h1>
      <p className='medium'><i className='fas fa-user'></i> Welcome {props.user && props.user.name}</p>
      {!props.profile && <Fragment>
        <h3>No profile found for your user. Create one ?</h3> <Link className='btn btn-primary' to='/create-profile'>Create Profile</Link>
      </Fragment>
      }

      {props.alertMsg ? <p className={alertClasses.join(' ')}>{props.alertMsg}</p> : null}

      {props.profile && <div>
        <Link to='/edit-profile' className='btn btn-light'>Edit Profile</Link>
      </div>}
    </div>
  )
  if (props.loading) dashboard = <Spinner />

  return dashboard
}

const mapStateToProps = state => {
  return {
    loading: state.profile.loading,
    user: state.auth.user,
    profile: state.profile.profile,
    alertMsg: state.alert.msg,
    alertType: state.alert.type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    LOAD_CURRENT_USER: () => dispatch(currentProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)