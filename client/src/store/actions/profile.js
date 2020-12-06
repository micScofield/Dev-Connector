import axios from 'axios'
import { Redirect } from 'react-router-dom'

import * as actionTypes from './types'
import { setAuthToken } from '../../utility/setAuthToken'
import { setAlert } from './alert'
//import { response } from 'express'

const fetchProfileStart = () => { return { type: actionTypes.FETCH_PROFILE_START } }
const loadCurrentProfileSuccess = (profile) => { return { type: actionTypes.LOAD_CURRENT_PROFILE_SUCCESS, profile: profile } }
const profileError = () => { return { type: actionTypes.PROFILE_ERROR } }

export const currentProfile = () => async dispatch => {
    dispatch(fetchProfileStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        let res = await axios.get('http://localhost:5000/api/profiles/me')
        console.log('profile exists')
        dispatch(loadCurrentProfileSuccess(res.data.profile))
    } catch (error) {
        console.log(error)
        dispatch(profileError())
        dispatch(setAlert('danger', error.response.data.msg))
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    dispatch(fetchProfileStart())

    console.log(formData)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        setAuthToken(localStorage.getItem('token'))
        console.log('sending data', formData)
        let res = await axios.post('http://localhost:5000/api/profiles', JSON.stringify(formData), config)

        if (res.status === 200) dispatch(setAlert('success', edit ? 'Profile updated successfully !' : 'Profile created successfully !'))

        dispatch(loadCurrentProfileSuccess(res.data.profile))
        history.push('/dashboard')
    } catch (error) {
        dispatch(profileError())
        if (error.response) {
            error.response.data.errors.forEach(error => {
                dispatch(setAlert('danger', error.msg))
            });
        }
        console.log('some unknown error occurred !')
    }
}





