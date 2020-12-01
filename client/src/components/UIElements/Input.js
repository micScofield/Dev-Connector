import { Fragment } from 'react'

import './Input.css'

const Input = props => {
    const { invalid, elementType, elementConfig, touched, changed, value, info, icon } = props

    let cssClasses = ['input']
    if (invalid && touched) {
        cssClasses.push('invalid')
    }

    let inputElement

    if (elementType === 'input') {
        inputElement = (
            <Fragment>
                {icon === 'null' ? null : icon}
                <input className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} />
                <small>{info}</small>
            </Fragment>
        )
    } else if (elementType === 'textarea') {
        inputElement = (
            <Fragment>
                <textarea className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} />
                <small>{info}</small>
            </Fragment>
        )
    } else if (elementType === 'select') {
        inputElement = (
            <Fragment>
                <select className={cssClasses.join(' ')} onChange={changed}>
                    {elementConfig.options.map(option => {
                        return (
                            <option key={option.value} value={option.value} >{option.displayValue}</option>
                        )
                    })}
                </select>
                <small>{info}</small>
            </Fragment>
        )
    }

    const mainDivCss = ['form-group']
    if (icon) {
        mainDivCss.push('social-input')
    }
    return <div className={mainDivCss.join(' ')}>{inputElement}</div>
}

export default Input