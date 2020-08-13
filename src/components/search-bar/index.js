import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik }  from 'formik'

import styles from './search-bar.css'

export const SearchBar = ({ searchLine, onChange, autocompleteData, onSubmit, onClickAlbum }) => {

    const [isFocused, setFocus] = useState(false)

    const handleSubmit = useCallback((values, actions) => {
        setFocus(false)
        onSubmit(values.search, searchLine)
        actions.setSubmitting(false)
    }, [])

    const handleRules = useCallback((values) => {
        let errors = {}
        setFocus(true)
        onChange(values.search)

        if(!values.search) {
            errors.search = 'Required'
        }

        return errors
    }, [])

    const handleBlur = useCallback(() => {
        setFocus(false)
    }, [searchLine])

    const handleFocus = useCallback(() => {
        setFocus(true)
    }, [searchLine])


    const handleClickAlbum = useCallback((id) => () => {
        console.log(id)
        onClickAlbum(id)
    }, [searchLine])

    return (
        <div className={styles.searchContainer}>
            <Formik
                initialValues={{ search: '' }}
                validate={handleRules}
                onSubmit={handleSubmit}
            >
                {
                    ({
                         handleSubmit,
                         handleChange,
                         isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.searchForm}>
                                <input
                                    className={styles.searchInput}
                                    placeholder="Enter album title"
                                    size="4"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    required=""
                                    type="text"
                                    autoFocus
                                    name="search"
                                    value={searchLine}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={styles.searchBtn}>
                                    <span>Search</span>
                                </button>
                            </div>
                            {
                                isFocused && searchLine && autocompleteData.length > 0 &&
                                <div className={styles.autocompleteContainer}>
                                    {
                                        autocompleteData.map(releaseInfo => {
                                            const imageInfo = releaseInfo?.image.find((img) => img.size === 'small')
                                            return (
                                                <button
                                                    onMouseDown={handleClickAlbum(releaseInfo?.mbid)}
                                                    key={releaseInfo?.mbid}
                                                    className={styles.autocompleteItem}
                                                >
                                                    <img src={imageInfo['#text']}/>
                                                    <span>{`${releaseInfo?.name} - ${releaseInfo?.artist}`}</span>
                                                </button>
                                        )})
                                    }
                                </div>
                            }
                        </form>
                    )
                }
            </Formik>
        </div>
    )
}

SearchBar.propTypes = {
    searchLine: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClickAlbum: PropTypes.func.isRequired,
    autocompleteData: PropTypes.array.isRequired
}