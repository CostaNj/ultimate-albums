import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './reset.css'

import { store } from './__data__/store'
import { Router } from './router'
import { Layout } from '../src/components'

const App = () => (
    <Provider store={store}>
        <Layout>
            <Router/>
        </Layout>
    </Provider>
)

ReactDOM.render(<App />, document.querySelector('#root'))