import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewUrl from './pages/NewUrl'
import SignIn from './pages/SignIn'
import UrlList from './pages/UrlList'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={ SignIn } />
                <Route path="/list" exact component={ UrlList } />
                <Route path="/" exact component={ NewUrl } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
