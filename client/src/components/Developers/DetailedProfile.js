import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import Spinner from '../UIElements/Spinner'
import { getProfileBUserId } from '../../store/actions'

const DetailedProfile = props => {

    useEffect(() => {
        props.getProfileBUserId(props.match.params.userId)
    }, [])

    !props.loading && console.log(props.profile)

    const socialUrlArray = []
    if (!props.loading && props.profile) {
        for (let key in props.profile.social) {
            switch (key) {
                case 'twitter': socialUrlArray.push({ type: 'twitter', url: props.profile.social[key] })
                case 'facebook': socialUrlArray.push({ type: 'facebook', url: props.profile.social[key] })
                case 'instagram': socialUrlArray.push({ type: 'instagram', url: props.profile.social[key] })
                case 'linkedIn': socialUrlArray.push({ type: 'linkedIn', url: props.profile.social[key] })
                case 'youtube': socialUrlArray.push({ type: 'youtube', url: props.profile.social[key] })
                default:
                    break;
            }
        }
    }

    const displaySocialLinks = (
        !socialUrlArray ? null : <Fragment>
            {socialUrlArray.map(social => <span  onClick={() => console.log('clicked !')}>
                    {social.type === 'twitter' ? <i className="fab fa-twitter fa-2x"></i> : null}
                    {social.type === 'facebook' ? <i className="fab fa-facebook fa-2x"></i> : null}
                    {social.type === 'instagram' ? <i className="fab fa-instagram fa-2x"></i> : null}
                    {social.type === 'linkedIn' ? <i className="fab fa-linkedIn fa-2x"></i> : null}
                    {social.type === 'youtube' ? <i className="fab fa-youtube fa-2x"></i> : null}
            </span>)}
        </Fragment>
    )

    let profile = <Spinner />
    if (props.profile) profile = (
        <Fragment>
            <div className='container'>
                <button className='btn btn-light btn-large' onClick={() => props.history.goBack()}>Back To Profiles</button>
                <div className='profile-detail'>
                    <img src={props.profile.user.avatar} />
                    <h2>{props.profile.user.name}</h2>
                    <p>{props.profile.bio}</p>
                    <p>{props.profile.location}</p>
                    {displaySocialLinks}
                </div>
            </div>
        </Fragment>
    )

    //if (props.loading) profile = <Spinner />

    return profile

}

const mapStateToProps = state => {
    return {
        loading: state.profile.loading,
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps, { getProfileBUserId })(withRouter(DetailedProfile))