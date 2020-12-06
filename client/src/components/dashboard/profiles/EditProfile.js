import { Fragment, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import useForm from '../../../hooks/useForm'
import Input from '../../UIElements/Input'
import { createProfile, currentProfile } from '../../../store/actions'

const EditProfile = ({ history, loading, createProfile, profile }) => {

    //param1 = name, param2 = validation, param3= info/subscript  | returns form, overall validity, onChangeHandler
    //for dropdown inputs please provide options also
    const statusOptions = ['* Select Professional Status', 'Developer', 'Junior Developer', 'Senior Developer', 'Manager', 'Student or Learning', 'Instructor', 'Intern', 'Other']

    const [formData, isFormValid, onChangeHandler] = useForm([
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

    //fill existing profile data using useEffect
    useEffect(() => {
        currentProfile()
        console.log('from hook', formData)
        for (let key in formData) {
            if (profile) {
                for (let profileItem in profile) {
                    if (formData[key].id === profileItem) {
                        console.log(profile[profileItem])
                        console.log(formData[key].id)
                        formData[key].config.value = profile[profileItem]
                    }
                }
            }
        }
    }, [profile])


    const createProfileHandler = () => {
        event.preventDefault();

        //converting formData to the form we expect at the backend {status: '', company: '', ...}
        let userFormData = {}
        for (let userInputIdentifier in formData) {
            let name = formData[userInputIdentifier].id
            userFormData[name] = formData[userInputIdentifier].config.value
        }
        createProfile(userFormData, history, true)
    }

    //converting object format to an array to loop through and map each one to an input field
    const formArray = []
    for (let key in formData) {
        // if (profile) {
        //     for (let profileItem in profile) {
        //         if (formData[key].id === profileItem) {
        //             formData[key].config.value = profile[profileItem]
        //         }
        //     }
        // }
        formArray.push(formData[key])
    }

    let editProfileButtonClasses = ['btn', 'btn-large', 'btn-primary']
    if (!isFormValid) {
        editProfileButtonClasses.push('btn-disabled')
    }

    return <Fragment>
        <div className='container'>
            <h1 className='large primary-color'>Edit Your Profile</h1>
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
                    <input type='submit' disabled={!isFormValid} className={editProfileButtonClasses.join(' ')} />
                    <Link to='/profiles' className='btn btn-dark'> Go Back </Link>
                </div>
            </form>
        </div>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        loading: state.profile.loading,
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps, { createProfile })(withRouter(EditProfile))