import React from 'react'
import { ScaleLoader } from 'react-spinners'

import styles from './loader.css'

export const Loader = () => (
    <div className={styles.loaderContainer}>
        <ScaleLoader
            color={'rgba(222,13,23, 0.25)'}
            loading
            width={10}
        />
    </div>
)