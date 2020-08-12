import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from '../../__data__/selectors/search'
import { searchAction } from '../../__data__/actions'

import { SearchBar } from '../../components'

import styles from './home.css'

const Home = ({ dispatch, searchData }) => {
    useEffect(() => {
        dispatch(searchAction())
    }, [])
    return (
        <>
            <div className={styles.searchBarContainer}>
                <SearchBar/>
            </div>
            <p>Home</p>
            {searchData?.title}
        </>
    )
}

const mapStateToProps = () => createStructuredSelector({
    searchData: selectors.getSearchData
})

export default connect(mapStateToProps)(Home)