import React, { useState, useCallback, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { createStructuredSelector } from 'reselect'
import * as searchSelectors from '../../__data__/selectors/search'
import * as librarySelectors from '../../__data__/selectors/library'
import { deleteAlbum, saveAlbum, searchAction } from '../../__data__/actions'

import { Loader } from '../../components'
import { useEventListener } from '../../utils/event-hook'

const Library = lazy(() => import('../../components/library'));
const SearchBar = lazy(() => import('../../components/search-bar'));

import styles from './home.css'

const Home = (props) => {

    const {
        searchLine,
        autocompleteData,
        foundAlbums,
        handleChangeSearch,
        handleSubmitSearch,
        history,
        myAlbums,
        pages,
        loadedPages,
        saveIntoLibrary,
        deleteFromLibrary
    } = props

    const [isShowAllAlbums, setShowAlbums] = useState(false)

    const handler = () => {
        if ((window.scrollY + window.innerHeight) >= document.body.scrollHeight + 50) {
            if(isShowAllAlbums && loadedPages < pages) {
                handleOnLoadedMore()
            }
        }
    }

    useEventListener('scroll', handler);

    const handleOnSubmit = useCallback((submittedSearchLine) => {
        handleSubmitSearch(submittedSearchLine, 1)
        setShowAlbums(true)
    }, [searchLine])

    const handleOnLoadedMore = useCallback(() => {
        handleSubmitSearch(searchLine, loadedPages + 1)
    }, [searchLine, loadedPages, pages])

    const handleOnClickAlbum = useCallback((name, artist) => {
        history.push(`/album?name=${name}&artist=${artist}`)
    }, [searchLine])

    const handleAllAlbumsClick = useCallback(() => {
        setShowAlbums(true)
    }, [searchLine, isShowAllAlbums])

    const handleMyAlbums = useCallback(() => {
        setShowAlbums(false)
    }, [searchLine, isShowAllAlbums])

    const handleClickLibraryAction = useCallback((album) => {
        album?.isMyLibraryAlbum ? deleteFromLibrary(album) : saveIntoLibrary(album)
    }, [myAlbums])

    const handleClickShowInfo = useCallback((album) => {
        history.push(`/album?name=${album.name}&artist=${album.artist}`)
    }, [myAlbums])

    const myAlbumsUrls = myAlbums.map(album => album.url)
    const albumsData = isShowAllAlbums ?
        foundAlbums.map(currentAlbum => ({...currentAlbum, isMyLibraryAlbum: myAlbumsUrls.includes(currentAlbum.url) })) :
        myAlbums.map(currentAlbum => ({...currentAlbum, isMyLibraryAlbum: true}))

    return (
        <div className={styles.homeContainer}>
            <Suspense fallback={<Loader/>}>
                <SearchBar
                    searchLine={searchLine}
                    onChange={handleChangeSearch}
                    onSubmit={handleOnSubmit}
                    autocompleteData={autocompleteData}
                    onClickAlbum={handleOnClickAlbum}
                />
            </Suspense>
            <div className={styles.btnContainer}>
                <button
                    className={
                        classnames(
                            styles.libraryBtn,
                            styles.libraryBtnLeft,
                            !isShowAllAlbums && styles.libraryBtnActive
                        )
                    }
                    onClick={handleMyAlbums}
                >
                    <span>My library</span>
                </button>
                <button
                    className={
                        classnames(
                            styles.libraryBtn,
                            styles.libraryBtnRight,
                            isShowAllAlbums && styles.libraryBtnActive
                        )
                    }
                    onClick={handleAllAlbumsClick}
                >
                    <span>All albums</span>
                </button>
            </div>
            {
                <Suspense fallback={<Loader/>}>
                    <div className={styles.albumGallery}>
                        {
                            albumsData.length === 0 ? <h2>Not found</h2> :
                                <>
                                    <h1>{isShowAllAlbums ? 'All found albums' : 'My library'}</h1>
                                    <Library
                                        albums={albumsData}
                                        onClickShowInfo={handleClickShowInfo}
                                        onClickLibraryAction={handleClickLibraryAction}
                                    />
                                </>
                        }
                    </div>
                </Suspense>
            }
        </div>
    )
}

const mapStateToProps = () => createStructuredSelector({
    searchLine: searchSelectors.getSearchLine,
    autocompleteData: searchSelectors.getAutocompleteData,
    pages: searchSelectors.getPages,
    loadedPages: searchSelectors.getLoadedPages,
    foundAlbums: searchSelectors.getFoundAlbums,
    myAlbums: librarySelectors.getLibrary,
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeSearch: (searchLine) => dispatch(searchAction(searchLine, 10)),
        handleSubmitSearch: (searchLine, page) => dispatch(searchAction(searchLine, 12, page)),
        saveIntoLibrary: (album) => dispatch(saveAlbum(album)),
        deleteFromLibrary: (album) => dispatch(deleteAlbum(album))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)