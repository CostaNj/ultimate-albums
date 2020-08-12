import React from 'react'

import styles from './layout.css'

export const Layout = ({ children }) => (
    <div className={styles.mainContainer}>
        {children}
    </div>
)