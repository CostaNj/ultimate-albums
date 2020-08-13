import { combineReducers } from 'redux'
import { searchData } from './search'
import { library } from './library'
import { albumInfo } from './album'

export const reducers = combineReducers({
    searchData,
    library,
    albumInfo
})