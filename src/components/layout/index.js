import React from 'react'

import styles from './layout.css'

export const Layout = ({ children }) => (
    <div className={styles.main}>
        <div className={styles.container}>
            {children}
        </div>
    </div>

)