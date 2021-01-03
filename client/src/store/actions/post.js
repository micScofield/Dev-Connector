import axios from 'axios'

import * as actionTypes from './types'
import { setAuthToken } from '../../utility/setAuthToken'

const postsStart = () => ({ type: actionTypes.LOAD_POSTS_START })
const postsError = error => ({ type: actionTypes.POSTS_ERROR, error: error })
const storePosts = posts => ({ type: actionTypes.LOAD_POSTS, posts: posts })

export const loadPosts = () => async dispatch => {
    dispatch(postsStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        const res = await axios.get('http://localhost:5000/api/posts')
        dispatch(storePosts(res.data))
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}

export const addPost = text => async dispatch => {
    dispatch(postsStart())

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        setAuthToken(localStorage.getItem('token'))
        let res = await axios.post('http://localhost:5000/api/posts', JSON.stringify(text), config)
        console.log(res)
    } catch (error) {
        console.log(error, error.response)
    }
}
