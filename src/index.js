import React from 'react'
import ReactDOM from 'react-dom'

import './reset.css'

import styles from './styles.css'

const App = () => {
    return <div className={styles.main}>Albums!</div>
}

ReactDOM.render(<App />, document.querySelector('#root'))