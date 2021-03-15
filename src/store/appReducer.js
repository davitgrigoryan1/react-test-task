import api from '../api/api'
const APP_SET_OWNER = "APP_SET_OWNER";
const APP_SET_REPO = "APP_SET_REPO";
const APP_SET_DATA = "APP_SET_DATA";
const TOGGLE_LOADING = "TOGGLE_LOADING";
const APP_SET_CURRENT = "APP_SET_CURRENT";
const APP_SET_FORKS_COUNT = "APP_SET_FORKS_COUNT";
const APP_SET_PAGE = "APP_SET_PAGE";

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

const setForksCount = count => {
    return {
        type: APP_SET_FORKS_COUNT,
        payload: count
    }
}

const setPage = page => {
    return {
        type: APP_SET_PAGE,
        payload: page
    }
}

export const getData = (owner, repo, page= 1,per_page = 10, type='get') => {
    return async (dispatch, getState) => {
        dispatch(setLoading(true))
        try {
            if(type === 'get') {
                const forks = await api.get(`${owner}/${repo}`)
                const {forks_count} = forks.data
                if(!forks_count) {
                    return new Error(' Forks count is 0')
                }
                dispatch(setForksCount(forks_count))
            }
            dispatch(setPage(page))
            const res = await api.get(`${owner}/${repo}/forks?page=${page}&per_page=${per_page}`)
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
    current: 1,
    page: 1,
    per_page: 10,
    forks_count: 0,
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
                current: action.payload
            }
        case APP_SET_FORKS_COUNT:
            return {
                ...state,
                forks_count: action.payload
            }
        case APP_SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state

    }
}

export default appReducer