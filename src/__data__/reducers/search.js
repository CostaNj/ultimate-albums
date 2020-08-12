
import { SEARCH } from '../constants'

const initialState = {
    title: 'old search data'
}

export const searchData = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return action.payload
        default:
            return state
    }
}