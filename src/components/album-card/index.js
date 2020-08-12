import React, { useCallback } from 'react'
import classnames from 'classnames'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import styles from './album-card.css'
import { saveAlbum, deleteAlbum } from "../../__data__/actions"
import * as selectors from '../../__data__/selectors/library'

const AlbumCard = ({ album, myAlbums, saveIntoLibrary, deleteFromLibrary }) => {
    const imageInfo = album?.image.find((img) => img.size === 'large')
    const isMyAlbum = myAlbums.find(currentAlbum => currentAlbum?.mbid === album?.mbid)

    const handleClickCard = useCallback(() => {
        isMyAlbum ? deleteFromLibrary(album) : saveIntoLibrary(album)
    }, [album, isMyAlbum ])

    return (
        <div className={styles.albumCardContainer} onClick={handleClickCard}>
            <img src={imageInfo['#text']} alt={album?.name}/>
            <div className={classnames(styles.albumCardInfo,styles.albumCardTitle)}>{album?.name}</div>
            <div className={classnames(styles.albumCardInfo,styles.albumCardArtist)}>{album?.artist}</div>
            <div className={styles.albumCardContainerHover}>{ isMyAlbum ? 'Delete from library': 'Save into library'}</div>
        </div>
    )
}

const mapStateToProps = () => createStructuredSelector({
    myAlbums: selectors.getLibrary
})

const mapDispatchToProps = (dispatch) => ({
    saveIntoLibrary: (album) => dispatch(saveAlbum(album)),
    deleteFromLibrary: (album) => dispatch(deleteAlbum(album))
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCard)