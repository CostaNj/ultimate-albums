import React from 'react'
import { AlbumCard } from '../'

import styles from './library.css'

const Library = ({ albums }) => (
    <section>
        <div className={styles.libraryContainer}>
            {
                albums.map((album) => <AlbumCard key={album?.url.replace('https://www.last.fm/music/', '')} album={album}/>)
            }
        </div>
    </section>
)

export default Library