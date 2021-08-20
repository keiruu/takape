import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth()

    // a simple way to avoid going to the home page (/) when there's no user
    return (
        <Route
        {...rest}
        render = {props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
        }}>
           
        </Route>
    )
}
