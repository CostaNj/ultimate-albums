import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from '../../__data__/selectors/search'
import { searchAction } from '../../__data__/actions'

import { SearchBar } from '../../components'

import styles from './home.css'

const Home = ({ searchLine, autocompleteData, handleChangeSearch, history }) => {
    useEffect(() => {

    }, [])

    const handleOnSubmit = useCallback(() => {

    }, [searchLine])

    const handleOnClickAlbum = useCallback((id) => {
        history.push(`/album?id=${id}`)
    }, [searchLine])

    return (
        <>
            <div className={styles.searchBarContainer}>
                <SearchBar
                    searchLine={searchLine}
                    onChange={handleChangeSearch}
                    onSubmit={handleOnSubmit}
                    autocompleteData={autocompleteData}
                    onClickAlbum={handleOnClickAlbum}
                />
            </div>
            <h1>Home</h1>
            <p>{searchLine}</p>

        </>
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