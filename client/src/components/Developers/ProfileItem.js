import { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const ProfileItem = ({ profile, history }) => {
    // console.log(profile)
    const src1 = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
    return <Fragment>
        <div className='card'>
            <div className='avatar'>
                <img src={src1} alt='Cant load image' />
            </div>
            <div className='profile'>
                <h3>{profile.user.name}</h3>
                <p>{profile.bio}</p>
                <p>{profile.location}</p>
                <button onClick={() => history.push(`/user/${profile.user._id}`)} className='btn btn-primary btn-large' style={{ marginTop: '0.5rem' }}>View Profile</button>
            </div>
            <div className='profileSkills'>
                <ul>
                    {profile.skills.map(skill => (
                        <li key={skill}>
                            <h3 className='primary-color'><i className='fas fa-check'>{skill}</i></h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Fragment>
}

export default withRouter(ProfileItem)