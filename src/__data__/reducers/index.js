import { combineReducers } from 'redux'
import { searchData } from './search'
import { library } from './library'

export const reducers = combineReducers({
    searchData,
    library
})