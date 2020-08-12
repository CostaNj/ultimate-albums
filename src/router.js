import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Loader } from '../src/components'

const Home = lazy(() => import('../src/pages/home'));
const Album = lazy(() => import('../src/pages/album'));
const ErrorPage = lazy(() => import('../src/pages/404'));

export const Router = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader/>}>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/album" component={Album} exact/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}