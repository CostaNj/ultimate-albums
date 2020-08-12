import { SEARCH_LOADING, SEARCH_SUCCESS, SEARCH_FAILED } from '../constants'

const initialState = {
    searchLine: '',
    autocompleteData: [],
    isLoading: false,
    isFailed: false
}

export const searchData = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_LOADING:
            return {...state, searchLine: action.payload.searchLine, isFailed: false, isLoading: true }
        case SEARCH_SUCCESS:
            return {...state, autocompleteData: action.payload.autocompleteData, isFailed: false, isLoading: false }
        case SEARCH_FAILED:
            return {...state, autocompleteData: [], isFailed: true, isLoading: false }
        default:
            return state
    }
}