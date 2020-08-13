import {
    AUTOCOMPLETE_SEARCH_LOADING,
    AUTOCOMPLETE_SEARCH_SUCCESS,
    AUTOCOMPLETE_SEARCH_FAILED,
    SEARCH_LOADING,
    SEARCH_SUCCESS,
    SEARCH_FAILED, ADD_NEW_DATA_SEARCH
} from '../constants'

const initialState = {
    searchLine: '',
    autocompleteData: [],
    isAutocompleteLoading: false,
    isAutocompleteFailed: false,
    isLoading: false,
    isFailed: false,
    foundAlbums: [],
    totalResults: 0,
    pages: 0,
    loadedPages: 0
}

export const searchData = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTOCOMPLETE_SEARCH_LOADING:
            return {...state, searchLine: payload.searchLine, loadedPages: 0, isAutocompleteFailed: false, isAutocompleteLoading: true }
        case AUTOCOMPLETE_SEARCH_SUCCESS:
            return {...state, autocompleteData: payload.autocompleteData, isAutocompleteFailed: false, isAutocompleteLoading: false }
        case AUTOCOMPLETE_SEARCH_FAILED:
            return {...state, autocompleteData: [], isAutocompleteFailed: true, isAutocompleteLoading: false }
        case SEARCH_LOADING:
            return {...state, searchLine: payload.searchLine, isFailed: false, isLoading: true }
        case SEARCH_SUCCESS:
            return {
                ...state,
                foundAlbums: payload.foundAlbums,
                pages: payload.pages,
                loadedPages: 1,
                isFailed: false,
                isLoading: false
            }
        case ADD_NEW_DATA_SEARCH:
            return {
                ...state,
                foundAlbums: [...state.foundAlbums, ...payload.foundAlbums],
                pages: payload.pages,
                loadedPages: state.loadedPages + 1,
                isFailed: false,
                isLoading: false
            }
        case SEARCH_FAILED:
            return {...state, foundAlbums: [], isFailed: true, isLoading: false }
        default:
            return state
    }
}