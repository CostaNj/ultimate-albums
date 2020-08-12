import { baseUrl, SEARCH_FAILED, SEARCH_LOADING, SEARCH_SUCCESS } from '../constants'
import axios from 'axios'

export const searchAction = (query, limit, offset) => (dispatch) => {

    dispatch({
        type: SEARCH_LOADING,
        payload: {
            searchLine: query
        }
    })

    axios({
        method: 'GET',
        url: `${baseUrl}/release/?fmt=json&query=${query}${limit ? `&limit=${limit}` : ''}${offset ? `&limit=${offset}` : ''}`,
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
                            autocompleteData: response?.data?.releases
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