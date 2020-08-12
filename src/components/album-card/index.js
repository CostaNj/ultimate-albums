import React from 'react'
import classnames from 'classnames'

import styles from './album-card.css'

export const AlbumCard = ({ album }) => {
    const imageInfo = album?.image.find((img) => img.size === 'large')

    return (
        <div className={styles.albumCardContainer}>
            <img src={imageInfo['#text']}/>
            <div className={classnames(styles.albumCardInfo,styles.albumCardTitle)}>{album?.name}</div>
            <div className={classnames(styles.albumCardInfo,styles.albumCardArtist)}>{album?.artist}</div>
        </div>
    )
}