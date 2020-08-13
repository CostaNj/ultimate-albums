import { SAVE_ALBUM, DELETE_ALBUM } from '../constants'

const initialState = []

export const library = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ALBUM:
            return [...state, action.payload ]
        case DELETE_ALBUM:
            return [...state.filter(album => album?.url.replace('https://www.last.fm/music/', '') !== action.payload?.url.replace('https://www.last.fm/music/', ''))]
        default:
            return state
    }
}