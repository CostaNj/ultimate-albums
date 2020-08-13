import { createSelector } from 'reselect'
import { getState } from './'

export const getAlbumInfo = createSelector(getState, (state) => state?.albumInfo)
export const getTracks = createSelector(getAlbumInfo, (state) => state?.tracks?.track)
export const getWiki = createSelector(getAlbumInfo, (state) => state?.wiki)
export const getImage = createSelector(getAlbumInfo, (state) => state?.image)
export const getLoadingStatus = createSelector(getAlbumInfo, (state) => state?.isLoading)

