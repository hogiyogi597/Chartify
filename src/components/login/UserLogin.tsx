import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'

const UserLogin = () => {
    const auth = useAuth()

    return (
        <div>
            <h1>First, log in to spotify</h1>
            <Link to="/login">Log in</Link>
        </div>
    )
}

export default UserLogin