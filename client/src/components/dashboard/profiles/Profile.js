import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = props => {

    let content = null
    if (!props.profile) {
        content = (
            <div className='container'>
                <h2>No profile found for your user. Create one ? <Link className='btn btn-primary' to='/create-profile'>Create Profile</Link> </h2>
            </div>
        )
    } else {
        content = <div>Profile Data</div>
    }

    return <Fragment>
        {content}
    </Fragment>
}

const mapStateToProps = state => {
    return {
        loading: state.profile.loading,
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps)(Profile)