import React, { useEffect, useState } from 'react'

import styles from './layout.css'

export const Layout = ({ children }) => {

    const [rotate, setRotate] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setRotate(rotate + 1)
        }, 500);
        return () => clearInterval(interval);
    });

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <header>
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto',
                            marginBottom: '32px',
                            transform: `rotate(${Math.sin(rotate) < 0 ? '15deg' : '-15deg'})`,
                            transition: 'all linear 2s'
                        }}
                    >
                        <a href="https://www.ultimate-guitar.com">
                            <svg width="80" height="80" viewBox="0 0 80 80" className="HmV5v _8Fvw9">
                                <path
                                    transform="scale(2)"
                                    d="M38.438 18.97c.053.568.038 1.394.038 1.975.025 10.502-8.57 19.032-19.195 19.055C8.657 40.023.023 31.53 0 21.03A18.894 18.894 0 0 1 5.707 7.475L3.76 5.63V0l5.146 4.958a19.462 19.462 0 0 1 20.79.079L34.998 0v5.631L32.875 7.58a18.9 18.9 0 0 1 4.716 7.674h-4.306C30.102 7.612 21.254 3.97 13.522 7.115 5.789 10.263 2.103 19.007 5.288 26.65c3.183 7.64 12.032 11.284 19.764 8.136 4.915-2 8.409-6.4 9.204-11.596H21.604l-4.015-4.22h20.849z"
                                    fillRule="nonzero"
                                />
                            </svg>
                        </a>
                    </div>
                </header>
                {children}
            </div>
        </div>
    )
}