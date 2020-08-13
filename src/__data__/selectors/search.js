import { createSelector } from 'reselect'
import { getState } from './'

export const getSearchData = createSelector(getState, (state) => state?.searchData)
export const getSearchLine = createSelector(getSearchData, (state) => state?.searchLine)
export const getAutocompleteData = createSelector(getSearchData, (state) => state?.autocompleteData)
export const getFoundAlbums = createSelector(getSearchData, (state) => state?.foundAlbums)
export const getPages = createSelector(getSearchData, (state) => state?.pages)
export const getLoadedPages = createSelector(getSearchData, (state) => state?.loadedPages)

