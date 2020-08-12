import React, { useState, useCallback, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { createStructuredSelector } from 'reselect'
import * as searchSelectors from '../../__data__/selectors/search'
import * as librarySelectors from '../../__data__/selectors/library'
import { searchAction } from '../../__data__/actions'

import {Loader, SearchBar} from '../../components'

const Library = lazy(() => import('../../components/library'));

import styles from './home.css'

const Home = ({ searchLine, autocompleteData, handleChangeSearch, history, myAlbums }) => {

    const [isShowAllAlbums, setShowAlbums] = useState(false)

    const handleOnSubmit = useCallback(() => {
        setShowAlbums(true)
    }, [searchLine])

    const handleOnClickAlbum = useCallback((id) => {
        history.push(`/album?id=${id}`)
    }, [searchLine])

    const handleAllAlbumsClick = useCallback(() => {
        setShowAlbums(true)
    }, [searchLine, isShowAllAlbums])

    const handleMyAlbums = useCallback(() => {
        setShowAlbums(false)
    }, [searchLine, isShowAllAlbums])

    const albumsData = isShowAllAlbums ? autocompleteData : myAlbums

    return (
        <div className={styles.homeContainer}>
            <SearchBar
                searchLine={searchLine}
                onChange={handleChangeSearch}
                onSubmit={handleOnSubmit}
                autocompleteData={autocompleteData}
                onClickAlbum={handleOnClickAlbum}
            />

            <div className={styles.btnContainer}>
                <button
                    className={
                        classnames(
                            styles.libraryBtn,
                            styles.libraryBtnLeft,
                            isShowAllAlbums && styles.libraryBtnActive
                        )
                    }
                    onClick={handleAllAlbumsClick}
                >
                    <span>Found albums</span>
                </button>
                <button
                    className={
                        classnames(
                            styles.libraryBtn,
                            styles.libraryBtnRight,
                            !isShowAllAlbums && styles.libraryBtnActive
                        )
                    }
                    onClick={handleMyAlbums}
                >
                    <span>My albums</span>
                </button>
            </div>
            {
                <Suspense fallback={<Loader/>}>
                    <div className={styles.albumGallery}>
                        {
                            albumsData.length === 0 ? <h2>Not found</h2> :
                                <>
                                    <h1>{isShowAllAlbums ? 'Found albums' : 'My albums'}</h1>
                                    <Library albums={albumsData}/>
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
    myAlbums: librarySelectors.getLibrary
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeSearch: (searchLine) => dispatch(searchAction(searchLine, 10))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)