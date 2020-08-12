import React from 'react'
import { AlbumCard } from '../'

import styles from './library.css'

const Library = ({ albums }) => (
    <section>
        <div className={styles.libraryContainer}>
            {
                albums.map((album) => <AlbumCard key={album?.mbid} album={album}/>)
            }
        </div>
    </section>
)

export default Library