import {
    baseUrl,
    GET_ALBUM_INFO_LOADING,
    GET_ALBUM_INFO_SUCCESS,
    GET_ALBUM_INFO_FAILED
} from '../constants'

import axios from 'axios'

export const getAlbumInfoAction = (name, artist) => (dispatch) => {

    if (name && artist) {
        dispatch({
            type: GET_ALBUM_INFO_LOADING,
        })

        axios({
            method: 'GET',
            url: `${baseUrl}&method=album.getInfo&album=${name}&artist=${artist}&api_key=57ee3318536b23ee81d6b27e36997cde&format=json`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response?.data) {
                    console.log(response?.data)
                    dispatch({
                        type: GET_ALBUM_INFO_SUCCESS,
                        payload: {
                            album: response?.data?.album
                        }
                    })
                } else {
                    dispatch({
                        type: GET_ALBUM_INFO_FAILED
                    })
                }
            })
            .catch(() => {
                dispatch({
                    type: GET_ALBUM_INFO_FAILED
                })
            })
    }
}