import { SAVE_ALBUM, DELETE_ALBUM } from '../constants'

export const library = (state = [], action) => {
    switch (action.type) {
        case SAVE_ALBUM:
            return [...state, action.payload ]
        case DELETE_ALBUM:
            return [...state.filter(album => album.url !== action.payload.url)]
        default:
            return state
    }
}