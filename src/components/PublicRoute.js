import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PublicRoute(props) {
    const { user } = useAuth()

    return (
        <Route
            path={props.path}
            render={_ => {
                return user === null ? <props.component {...props} /> : <Redirect to="/" />
            }}
        ></Route>
    )
}
