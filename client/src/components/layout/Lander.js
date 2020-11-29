import { Link } from 'react-router-dom'

import './Lander.css'

const Lander = () => {
    return <section className='landing'>
        <div className='landingOverlay'>
            <div className='landingInner'>
                <h1 className='x-large'>DevConnector</h1>
                <p className='large'>Create a developer profile/portfolio, share posts and get help from other developers</p>
                <div className='buttons'>
                    <Link to='/register' className='btn btn-primary'>Signup</Link>
                    <Link to='/login' className='btn btn-light'>Login</Link>
                </div>
            </div>
        </div>
    </section>
}

export default Lander