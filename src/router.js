import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home, Album, ErrorPage } from '../src/pages'

export const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/album" component={Album} exact/>
                <Route component={ErrorPage}/>
            </Switch>
        </BrowserRouter>
    )
}