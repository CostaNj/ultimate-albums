import { createSelector } from 'reselect'
import { getState } from './'

export const getLibrary = createSelector(getState, (state) => state?.library)
