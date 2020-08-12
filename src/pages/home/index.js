import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { createStructuredSelector } from 'reselect'
import * as selectors from '../../__data__/selectors/search'
import { searchAction } from '../../__data__/actions'

import { Library, SearchBar } from '../../components'

import styles from './home.css'

const Home = ({ searchLine, autocompleteData, handleChangeSearch, history }) => {

    const [isShowAllAlbums, setShowAlbums] = useState(true)

    const handleOnSubmit = useCallback(() => {

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
                    <span>All albums</span>
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
            <Library albums={autocompleteData}/>
        </div>
    )
}

const mapStateToProps = () => createStructuredSelector({
    searchLine: selectors.getSearchLine,
    autocompleteData: selectors.getAutocompleteData
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeSearch: (searchLine) => dispatch(searchAction(searchLine, 10))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)