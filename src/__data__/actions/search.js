import {
    baseUrl,
    SEARCH_LOADING,
    SEARCH_FAILED,
    SEARCH_SUCCESS,
    ADD_NEW_DATA_SEARCH,
    AUTOCOMPLETE_SEARCH_LOADING,
    AUTOCOMPLETE_SEARCH_SUCCESS,
    AUTOCOMPLETE_SEARCH_FAILED
} from '../constants'
import axios from 'axios'

export const searchAction = (query, limit, page) => (dispatch) => {

    dispatch({
        type: page ? SEARCH_LOADING : AUTOCOMPLETE_SEARCH_LOADING,
        payload: {
            searchLine: query
        }
    })
    if (query) {
        axios({
            method: 'GET',
            url: `${baseUrl}&method=album.search&album=${query}${limit ? `&limit=${limit}` : ''}${page ? `&page=${page}` : ''}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response?.data) {
                    if (page) {
                        dispatch({
                            type: page === 1 ? SEARCH_SUCCESS : ADD_NEW_DATA_SEARCH,
                            payload: {
                                foundAlbums: response?.data?.results?.albummatches?.album.filter((album) => album?.url.replace('https://www.last.fm/music/', '')),
                                pages: response?.data?.results['opensearch:totalResults'] / response?.data?.results['opensearch:itemsPerPage']
                            }
                        })
                    } else {
                        dispatch({
                            type: AUTOCOMPLETE_SEARCH_SUCCESS,
                            payload: {
                                autocompleteData: response?.data?.results?.albummatches?.album.filter((album) => album?.url.replace('https://www.last.fm/music/', ''))
                            }
                        })
                    }
                } else {
                    dispatch({
                        type: page ? SEARCH_FAILED : AUTOCOMPLETE_SEARCH_FAILED
                    })
                }
            })
            .catch(() => {
                dispatch({
                    type: page ? SEARCH_FAILED : AUTOCOMPLETE_SEARCH_FAILED
                })
            })
    }
}