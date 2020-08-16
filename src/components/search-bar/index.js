import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import styles from './search-bar.css'

export const SearchBar = ({ searchLine, onChange, autocompleteData, onSubmit, onClickAlbum }) => {

    const [isFocused, setFocus] = useState(false)
    const [isDisabled, setDisabled] = useState(false)

    const handleSubmit = useCallback((e) => {
        setFocus(false)
        if(!isDisabled && searchLine) {
            onSubmit(searchLine)
            setDisabled(true)
        }
        e.preventDefault();
    }, [searchLine])

    const handleChange = useCallback((e) => {
        e.preventDefault()
        setFocus(true)
        setDisabled(false)
        onChange(e.target.value)
    }, [])

    const handleBlur = useCallback(() => {
        setFocus(false)
    }, [searchLine])

    const handleFocus = useCallback(() => {
        setFocus(true)
    }, [searchLine])

    const handleClickAlbum = useCallback((name, artist) => () => {
        onClickAlbum(name, artist)
    }, [searchLine])

    return (
        <div className={styles.searchContainer}>
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
                        disabled={isDisabled}
                        className={styles.searchBtn}>
                        <span>Search</span>
                    </button>
                </div>
                {
                    isFocused && searchLine && autocompleteData.length > 0 &&
                    <div className={styles.autocompleteContainer}>
                        {
                            autocompleteData.map(album => {
                                const imageInfo = album.image.find((img) => img.size === 'small')
                                return (
                                    <button
                                        onMouseDown={handleClickAlbum(album.name, album.artist)}
                                        key={album.url}
                                        className={styles.autocompleteItem}
                                    >
                                        <img src={imageInfo['#text']}/>
                                        <span>{`${album.name} - ${album.artist}`}</span>
                                    </button>
                            )})
                        }
                    </div>
                }
            </form>
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