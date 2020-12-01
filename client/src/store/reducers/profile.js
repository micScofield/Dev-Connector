import * as actiontypes from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default reducer