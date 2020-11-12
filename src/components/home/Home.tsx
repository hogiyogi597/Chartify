import { Flex } from '@chakra-ui/core'
import React from 'react'
import { useAuth } from '../../hooks/use-auth'
import { ProvideGlobalContext } from '../../hooks/use-global-context'
import UserLogin from '../login/UserLogin'
import PlaylistManager from '../playlist-manager/PlaylistManager'
import TabulatedStats from '../tabulated-stats/TabulatedStats'

const Home = () => {
    const { isLoggedIn } = useAuth()

    return !isLoggedIn ? <UserLogin /> : (
        <ProvideGlobalContext>
            <Flex justifyContent='space-between'>
                <PlaylistManager />
                <TabulatedStats />
            </Flex>
        </ProvideGlobalContext>
    )
}


export default Home