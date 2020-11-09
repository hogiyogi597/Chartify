import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useSpotify } from '../../hooks/use-spotify'
import Playlist from './playlist/Playlist'
import classnames from 'classnames'

const PlaylistManager = () => {
    const { isLoggedIn } = useAuth()
    const { spotifyClient } = useSpotify()
    const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>()
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const tabs = [{
        displayName: "My Playlists",
        request: () => {
            return spotifyClient.getUserPlaylists().then(userPlaylists => {
                setPlaylists(userPlaylists.items)
            })
        }
    }, {
        displayName: "Featured Playlists",
        request: () => {
            return spotifyClient.getFeaturedPlaylists().then(featuredPlaylists => {
                setPlaylists(featuredPlaylists.playlists.items)
            })
        }
    },
    {
        displayName: "Liked Songs",
        request: () => {
            console.log('not implemented')
        }
    }]

    useEffect(() => {
        if (isLoggedIn) {
            tabs[selectedTabIndex].request()
        }
    }, [isLoggedIn, selectedTabIndex])

    return (
        <div className="playlist-manager">
            <div className={classnames("playlist__nav", "tab-nav")}>
                {tabs.map((tab, index) => {
                    return <div className={classnames(selectedTabIndex === index && 'tab-nav--selected')} key={index} onClick={() => setSelectedTabIndex(index)}>{tab.displayName}</div>
                })}
            </div>
            <div className="playlist">
                {playlists?.map(playlist => {
                    return <Playlist key={playlist.id} {...playlist} />
                })}
            </div>
        </div>
    )
}

export default PlaylistManager;