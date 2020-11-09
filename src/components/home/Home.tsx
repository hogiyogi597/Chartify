import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import { ProvideGlobalContext } from '../../hooks/use-global-context'
import UserLogin from '../login/UserLogin'
import PlaylistManager from '../playlist-manager/PlaylistManager'
import TabulatedStats from '../tabulated-stats/TabulatedStats'

const Home = () => {
    const { isLoggedIn } = useAuth()

    return !isLoggedIn ? <UserLogin /> : (
        <ProvideGlobalContext>
            <div className="main">
                <PlaylistManager />
                <TabulatedStats />
            </div>
        </ProvideGlobalContext>
    )
}


export default Home