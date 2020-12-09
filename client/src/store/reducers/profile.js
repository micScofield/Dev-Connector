import * as actiontypes from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.FETCH_PROFILE_START:
            return { ...state, loading: true }
        case actiontypes.LOAD_CURRENT_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.profile }
        case actiontypes.CLEAR_PROFILE: 
            return {...state, profile: null}
        case actiontypes.PROFILE_ERROR:
            return { ...state, loading: false }
        default:
            return state
    }
}

export default reducer