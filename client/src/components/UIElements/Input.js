import { Fragment } from 'react'

import './Input.css'

const Input = props => {
    const { invalid, elementType, elementConfig, touched, changed, value } = props

    let cssClasses = ['input']
    if (props.invalid && props.touched) {
        cssClasses.push('invalid')
    }

    let inputElement

    if (elementType === 'input') {
        inputElement = <input className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} />
    } else if (elementType === 'input-email') {
        inputElement = (
            <Fragment>
                <input className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} /><br />
                <small>This site uses gravatar, so if you want to have a profile image, use that one.</small>
            </Fragment>
        )
    }

    return <div className='form-group'>{inputElement}</div>
}

export default Input