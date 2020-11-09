import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'

const AuthHandler = () => {
    const history = useHistory()
    const location = useLocation()
    const auth = useAuth()

    const hashParams = location.hash.slice(1).split("&").map(paramPair => paramPair.split("="))
    const params = Object.fromEntries(hashParams)

    useEffect(() => {
        auth.handleAccessToken(params["access_token"], () => history.push("/"))
    })

    return null;
}

export default AuthHandler