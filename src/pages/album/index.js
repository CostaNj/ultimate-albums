import React from 'react'
import { parse } from 'query-string'
import {Redirect} from "react-router-dom";

export const Album = ({ location }) => {

    const query = parse(location?.search)

    if(!query?.id) {
        return <Redirect to="/error"/>
    }

    return (
        <div>{`Album: ${query?.id}`}</div>
    )
}