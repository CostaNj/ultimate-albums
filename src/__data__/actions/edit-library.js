import { SAVE_ALBUM, DELETE_ALBUM } from '../constants'

export const saveAlbum = (album) => ({
    type: SAVE_ALBUM,
    payload: album
})

export const deleteAlbum = (album) => ({
    type: DELETE_ALBUM,
    payload: album
})