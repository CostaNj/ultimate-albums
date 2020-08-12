import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from '../../__data__/selectors/search'
import { searchAction } from '../../__data__/actions'

const Home = ({ dispatch, searchData }) => {
    useEffect(() => {
        dispatch(searchAction())
    }, [])
    return (
        <div>
            <p>Home</p>
            {searchData?.title}
        </div>
    )
}

const mapStateToProps = () => createStructuredSelector({
    searchData: selectors.getSearchData
})

export default connect(mapStateToProps)(Home)