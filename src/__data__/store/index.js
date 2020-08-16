import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { reducers } from '../reducers'
import { loadState } from '../../utils/local-storage'

const persistedState = loadState()

export const store = createStore(reducers, persistedState || {}, applyMiddleware(thunk))
