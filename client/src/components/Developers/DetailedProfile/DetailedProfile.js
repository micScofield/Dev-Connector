import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Spinner from '../../UIElements/Spinner'
import { getProfileBUserId } from '../../../store/actions'
import { getGithubRepos } from '../../../store/actions'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileRepos from './ProfileRepos'

const DetailedProfile = props => {

    //fetching profile from database
    useEffect(() => {
        props.getProfileBUserId(props.match.params.userId)
    }, [])

    !props.loading && console.log(props.profile)

    //rendering either profile or spinner
    let profile = <Spinner />
    if (props.profile) profile = (
        <Fragment>
            <div className='container'>
                <button className='btn btn-light btn-large' onClick={() => props.history.goBack()}>Back To Profiles</button>

                <div className='profile-grid'>
                    <div className='profile-top'>
                        <ProfileTop profile={props.profile} />
                    </div>
                    <div className='profile-about'>
                        <ProfileAbout profile={props.profile} />
                    </div>
                    <div className='profile-exp'>
                        <ProfileExperience experience={props.profile.experience} />
                    </div>
                    <div className='profile-edu'>
                        <ProfileEducation education={props.profile.education} />
                    </div>
                    <div className='profile-github'>
                        <ProfileRepos username={props.profile.githubUsername} />
                    </div>
                </div>

            </div>
        </Fragment>
    )
    return profile
}

const mapStateToProps = state => {
    return {
        loading: state.profile.loading,
        profile: state.profile.profile,
        repos: state.profile.repos
    }
}

export default connect(mapStateToProps, { getProfileBUserId, getGithubRepos })(withRouter(DetailedProfile))