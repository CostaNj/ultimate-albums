import React, { useCallback } from 'react'
import classnames from 'classnames'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import styles from './album-card.css'
import { saveAlbum, deleteAlbum } from "../../__data__/actions"
import * as selectors from '../../__data__/selectors/library'

const AlbumCard = ({ album, myAlbums, saveIntoLibrary, deleteFromLibrary, history }) => {
    const imageInfo = album?.image.find((img) => img.size === 'large')
    const isMyAlbum = myAlbums.find(currentAlbum => currentAlbum?.url.replace('https://www.last.fm/music/', '') === album?.url.replace('https://www.last.fm/music/', ''))

    const handleClickCardAction = useCallback(() => {
        isMyAlbum ? deleteFromLibrary(album) : saveIntoLibrary(album)
    }, [album, isMyAlbum ])

    const handleClickShowInfo = useCallback(() => {
        history.push(`/album?id=${album?.url.replace('https://www.last.fm/music/', '')}`)
    }, [album, isMyAlbum ])

    return (
        <div className={styles.albumCardContainer} >
            <img src={imageInfo['#text']} alt={album?.name}/>
            <div className={classnames(styles.albumCardInfo,styles.albumCardTitle)}>{album?.name}</div>
            <div className={classnames(styles.albumCardInfo,styles.albumCardArtist)}>{album?.artist}</div>
            <div className={styles.albumCardContainerHover}>
                <div className={styles.albumCardBtn} onClick={handleClickShowInfo}>
                    Show album info
                </div>
                <div className={styles.albumCardBtn} onClick={handleClickCardAction}>
                    { isMyAlbum ? 'Delete from library': 'Save into library'}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlbumCard))