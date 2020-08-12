import { SAVE_ALBUM, DELETE_ALBUM } from '../constants'

const initialState = []

export const library = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ALBUM:
            return [...state, action.payload ]
        case DELETE_ALBUM:
            return [...state.filter(album => album?.mbid !== action.payload?.mbid)]
        default:
            return state
    }
}