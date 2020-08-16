import { SAVE_ALBUM, DELETE_ALBUM } from '../constants'
import { saveState, loadState } from '../../utils/local-storage'
const persistedLibrary = loadState()
const initialState = persistedLibrary || []

export const library = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ALBUM:
            const increasedLibrary = [...state, action.payload ]
            saveState(increasedLibrary)
            return increasedLibrary
        case DELETE_ALBUM:
            const reducedLibrary = [...state.filter(album => album.url !== action.payload.url)]
            saveState(reducedLibrary)
            return reducedLibrary
        default:
            return state
    }
}