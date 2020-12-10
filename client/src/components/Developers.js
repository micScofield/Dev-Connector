import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import Spinner from './UIElements/Spinner'
import { getProfiles } from '../store/actions'

const Developers = props => {

    useEffect(() => {
        props.getProfiles()
    }, [])

    let content = (
        <Fragment>
            <div className='container'>
                <h1 className='primary-color large'>Developers</h1>
                <p className='medium'><i className='fab fa-connectdevelop'></i> Browse and Connect with Developers</p>
                {console.log(props.profiles)}
            </div>
        </Fragment>
    )

    if (props.loading) content = <Spinner />

    return content
}

const mapStateToProps = state => {
    return {
        loading: state.profile.loading,
        profiles: state.profile.profiles
    }
}

export default connect(mapStateToProps, { getProfiles })(Developers)