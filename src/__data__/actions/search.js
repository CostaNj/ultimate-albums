import { baseUrl, SEARCH_FAILED, SEARCH_LOADING, SEARCH_SUCCESS } from '../constants'
import axios from 'axios'

export const searchAction = (query, limit, page ) => (dispatch) => {

    dispatch({
        type: SEARCH_LOADING,
        payload: {
            searchLine: query
        }
    })

    axios({
        method: 'GET',
        url: `${baseUrl}&method=album.search&album=${query}${limit ? `&limit=${limit}` : ''}${page  ? `&limit=${page }` : ''}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if(response?.data) {
                if(limit) {
                    dispatch({
                        type: SEARCH_SUCCESS,
                        payload: {
                            autocompleteData: response?.data?.results?.albummatches?.album.filter((album) => album?.mbid)
                        }
                    })
                }
            } else {
                dispatch({
                    type: SEARCH_FAILED
                })
            }
        })
        .catch(()=>{
            dispatch({
                type: SEARCH_FAILED
            })
        })
}