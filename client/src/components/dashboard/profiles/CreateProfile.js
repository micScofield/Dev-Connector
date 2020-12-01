import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import useForm from '../../../hooks/useForm'
import Input from '../../UIElements/Input'

const CreateProfile = props => {

    //param1 = name, param2 = validation, param3= info/subscript  | returns form, overall validity, onChangeHandler
    //for dropdown inputs please provide options also
    const statusOptions = ['* Select Professional Status', 'Developer', 'Junior Developer', 'Senior Developer', 'Manager', 'Student or Learning', 'Instructor', 'Intern', 'Other']

    const [formData, isFormValid, onChangeHandler, toggleOptionalFields] = useForm([
        { name: 'status', validation: { required: true }, info: 'Give us an idea of where you are at in your career', options: statusOptions },
        { name: 'company', info: 'Could be your own company or one you work for' },
        { name: 'website', info: 'Could be your own or a company website' },
        { name: 'location', info: 'City & state suggested (eg. Boston, MA)' },
        { name: 'skills', validation: { required: true }, info: 'Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)' },
        { name: 'githubusername', info: 'If you want your latest repos and a Github link, include your username' },
        { name: 'bio', info: 'Tell us a little about yourself' },
        { name: 'twitter' },
        { name: 'facebook' },
        { name: 'youtube' },
        { name: 'linkedIn' },
        { name: 'instagram' }
    ])

    //cant do optional stuff inside hook because we are not managing the field via state. 
    //we have custom dynamic JS object field for each input field, manage state here itself for optional cases.

    const createProfileHandler = () => {
        console.log(formData)
        event.preventDefault();
    }

    const formArray = []
    for (let key in formData) {
        formArray.push(formData[key])
    }

    return <Fragment>
        <div className='container'>
            <h1 className='large primary-color'>Create Your Profile</h1>
            <p className='medium'><i className='fas fa-user'></i> Let's get some information to make your profile stand out</p>
            <div style={{ marginTop: '10px' }}>* = required fields</div>

            <form onSubmit={createProfileHandler}>
                <div>
                    {formArray.map(i => {
                        return <Input
                            key={i.id}
                            invalid={!i.config.valid}
                            touched={i.config.touched}
                            elementType={i.config.elementType}
                            elementConfig={i.config.elementConfig}
                            changed={onChangeHandler.bind(this, i.id, i.config.validation)}
                            value={i.config.value}
                            info={i.config.info}
                            icon={i.config.icon}
                        />
                    })}
                </div>
                <div>
                    <input type='submit' className='btn btn-large btn-primary' />
                    <Link to='/profiles' className='btn btn-dark'> Go Back </Link>
                </div>
            </form>
        </div>
    </Fragment>
}

export default CreateProfile