import React from 'react'
import { AlbumCard } from '../'

import styles from './library.css'

export const Library = ({ albums, onClickShowInfo, onClickLibraryAction }) => (
    <section>
        <div className={styles.libraryContainer}>
            {
                albums.map((album) =>
                    <AlbumCard
                        key={album?.url}
                        album={album}
                        onClickShowInfo={onClickShowInfo}
                        onClickLibraryAction={onClickLibraryAction}
                    />)
            }
        </div>
    </section>
)

export default Library