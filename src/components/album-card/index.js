import React, { useCallback } from 'react'
import classnames from 'classnames'

import styles from './album-card.css'

export const AlbumCard = ({ album, onClickShowInfo, onClickLibraryAction }) => {
    const imageInfo = album.image.find((img) => img.size === 'large')

    const handleClickCardAction = useCallback(() => {
        onClickLibraryAction(album)
    }, [album])

    const handleClickShowInfo = useCallback(() => {
        onClickShowInfo(album)
    }, [album])

    return (
        <div className={styles.albumCardContainer} >
            <img src={imageInfo['#text']} alt={album.name}/>
            <div className={classnames(styles.albumCardInfo,styles.albumCardTitle)}>{album.name}</div>
            <div className={classnames(styles.albumCardInfo,styles.albumCardArtist)}>{album.artist}</div>
            <div className={styles.albumCardContainerHover}>
                <div className={styles.albumCardBtn} onClick={handleClickShowInfo}>
                    Show album info
                </div>
                <div className={styles.albumCardBtn} onClick={handleClickCardAction}>
                    { album?.isMyLibraryAlbum ? 'Delete from library': 'Save into library'}
                </div>
            </div>
        </div>
    )
}