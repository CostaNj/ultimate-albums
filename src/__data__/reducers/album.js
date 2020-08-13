import {
    GET_ALBUM_INFO_LOADING,
    GET_ALBUM_INFO_SUCCESS,
    GET_ALBUM_INFO_FAILED
} from '../constants'

const initialState = {
    isLoading: false,
    isFailed: false,
}

export const albumInfo = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALBUM_INFO_LOADING:
            return {...state, isFailed: false, isLoading: true }
        case GET_ALBUM_INFO_SUCCESS:
            return {...state, ...payload.album, isFailed: false, isLoading: false }
        case GET_ALBUM_INFO_FAILED:
            return {...state, isFailed: true, isLoading: false }
        default:
            return state
    }
}