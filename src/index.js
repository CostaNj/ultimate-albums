import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './reset.css'

import { store } from './__data__/store'
import { Router } from './router'

const App = () => (
    <Provider store={store}>
        <Router/>
    </Provider>
)

ReactDOM.render(<App />, document.querySelector('#root'))