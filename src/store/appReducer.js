import api from '../api/api'
const APP_SET_OWNER = "APP_SET_OWNER";
const APP_SET_REPO = "APP_SET_REPO";
const APP_SET_DATA = "APP_SET_DATA";
const TOGGLE_LOADING = "TOGGLE_LOADING";
const APP_SET_CURRENT = "APP_SET_CURRENT";

export const setOwner = text => {
    return {
        type: APP_SET_OWNER,
        payload: text
    }
}
export const setRepo = text => {
    return {
        type: APP_SET_REPO,
        payload: text
    }
}

export const setLoading = type => {
    return {
        type: TOGGLE_LOADING,
        payload: type
    }
}

const setData = data => {
    return {
        type: APP_SET_DATA,
        payload: data
    }
}

export const getData = (owner, repo, page=1) => {
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await api.get(`${owner}/${repo}/forks?page=${page}`)
            const resWithKey = res?.data?.map(e=> {return {...e, key:e.id}})
            dispatch(setData(resWithKey))
            dispatch(setLoading(false))
            return res
        } catch (e) {
            dispatch(setLoading(false))
            return e
        }
    }
}

const initialState = {
    loading: false,
    owner: '',
    repo: '',
    data: [],
    current: 1

}

const appReducer = (state= initialState, action) => {
    switch (action.type) {
        case APP_SET_OWNER:
            return {
                ...state,
                owner: action.payload
            }
        case APP_SET_REPO:
            return {
                ...state,
                repo: action.payload
            }
        case APP_SET_DATA:
            return {
                ...state,
                data: action.payload
            }
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case APP_SET_CURRENT:
            return {
                ...state,
                currnet: action.payload
            }
        default:
            return state

    }
}

export default appReducer