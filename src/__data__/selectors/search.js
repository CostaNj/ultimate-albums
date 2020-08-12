import { createSelector } from 'reselect'
import { getState } from './'

export const getSearchData = createSelector(getState, (state) => state?.searchData)
