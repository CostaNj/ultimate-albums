import React from 'react'
import { AlbumCard } from '../'

import styles from './library.css'

export const Library = ({ albums }) => (
    <section>
        <div className={styles.libraryContainer}>
            {
                albums.map((album) => <AlbumCard album={album}/>)
            }
        </div>
    </section>
)