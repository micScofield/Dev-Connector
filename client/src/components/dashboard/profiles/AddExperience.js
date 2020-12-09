import { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import useForm from '../../../hooks/useForm'
import Input from '../../UIElements/Input'
//import { AddExperience } from '../../../store/actions'

const AddExperience = props => {

    //param1 = name, param2 = validation rules, param3= info/subscript, param4 = options | returns form, overall validity, onChangeHandler
    //for dropdown inputs please provide options also

    const [formData, isFormValid, onChangeHandler] = useForm([
        { name: 'jobtitle', validation: { required: true } },
        { name: 'company', validation: { required: true } },
        { name: 'location' },
        { name: 'fromdate', info: 'From Date' },
        { name: 'currentjob', checkbox: false },
        { name: 'todate', info: 'To Date' },
        { name: 'jobdescription' }
    ])

    const AddExperienceHandler = () => {
        event.preventDefault();

        //converting formData to the form we expect at the backend {status: '', company: '', ...}
        let userFormData = {}
        for (let userInputIdentifier in formData) {
            let name = formData[userInputIdentifier].id
            userFormData[name] = formData[userInputIdentifier].config.value
        }
        console.log(userFormData)
        //props.AddExperience(userFormData, props.history)
    }

    //converting object format to an array to loop through and map each one to an input field
    const formArray = []
    for (let key in formData) {
        formArray.push(formData[key])
    }

    //popping the todate field if currentjob is checked...(took 3 hours. Was earlier trying to disable the field but couldnt, instead popping it is elegant and easier)
    for (let key in formData) {
        if (formData[key].id === 'currentjob') {
            if (formData[key].config.checked) {
                const index = formArray.findIndex(element => element.id === 'todate')
                formArray.splice(index, 1)
            }
        }
    }

    let AddExperienceButtonClasses = ['btn', 'btn-large', 'btn-primary']
    if (!isFormValid) {
        AddExperienceButtonClasses.push('btn-disabled')
    }

    return <Fragment>
        <div className='container'>
            <h1 className='large primary-color'>Add an Experience</h1>
            <p className='medium'><i className='fas fa-code-branch'></i> Add any developer/programming positions that you have had in the past</p>
            <div style={{ marginTop: '10px' }}>* = required fields</div>

            <form onSubmit={AddExperienceHandler}>
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
                            checked={i.config.checked}
                        />
                    })}
                </div>
                {props.alertMsg ? <p className='alert alert-dark'>{props.alertMsg}</p> : null}
                <div>
                    <input type='submit' disabled={!isFormValid} className={AddExperienceButtonClasses.join(' ')} />
                    <Link to='/profiles' className='btn btn-dark'> Go Back </Link>
                </div>
            </form>
        </div>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        alertMsg: state.alert.msg
    }
}

export default connect(mapStateToProps)(withRouter(AddExperience))