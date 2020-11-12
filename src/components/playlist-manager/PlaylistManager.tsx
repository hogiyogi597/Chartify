import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useSpotify } from '../../hooks/use-spotify'
import Playlist from './playlist/Playlist'
import classnames from 'classnames'
import { Flex, Box, Tabs, TabList, TabPanel, TabPanels, Tab } from '@chakra-ui/core'
import Pagination from '../utils/Pagination'

const PlaylistManager = () => {
    const { isLoggedIn } = useAuth()
    const { spotifyClient } = useSpotify()
    const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>()
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [paginationData, setPaginationData] = useState({ total: 0, currentOffset: 0, pageSize: 15, hasPrev: false, hasNext: false })

    function resetPaginationData() {
        setPaginationData({ total: 0, currentOffset: 0, pageSize: 15, hasPrev: false, hasNext: false })
    }

    function updatePaginationData<T>(paginatedObject: SpotifyApi.PagingObject<T>) {
        setPaginationData({
            total: paginatedObject.total,
            currentOffset: paginatedObject.offset + paginatedObject.items.length,
            pageSize: paginationData.pageSize,
            hasPrev: paginatedObject.previous !== null,
            hasNext: paginatedObject.next !== null
        })
    }

    const tabs = [{
        displayName: "My Playlists",
        renderPanel: (index: number) => (
            <TabPanel
                key={index}
            >
                {playlists?.map(playlist => {
                    return <Playlist key={playlist.id} {...playlist} />
                })}
            </TabPanel>
        ),
        request: ({ offset }: { offset: number }) => {
            return spotifyClient.getUserPlaylists(undefined, { limit: paginationData.pageSize, offset: offset }).then(userPlaylists => {
                setPlaylists(userPlaylists.items)
                updatePaginationData(userPlaylists)
            })
        }
    }, {
        displayName: "Featured Playlists",
        renderPanel: (index: number) => (
            <TabPanel key={index} height='90rem'>
                {playlists?.map(playlist => {
                    return <Playlist key={playlist.id} {...playlist} />
                })}
            </TabPanel>
        ),
        request: ({ offset }: { offset: number }) => {
            return spotifyClient.getFeaturedPlaylists({ limit: paginationData.pageSize, offset: offset }).then(featuredPlaylists => {
                setPlaylists(featuredPlaylists.playlists.items)
                updatePaginationData(featuredPlaylists.playlists)
            })
        }
    },
    {
        displayName: "Liked Songs",
        renderPanel: (index: number) => (
            <TabPanel key={index}>

            </TabPanel>
        ),
        request: ({ offset }: { offset: number }) => {
            console.log('not implemented')
        }
    }]

    useEffect(() => {
        if (isLoggedIn) {
            tabs[selectedTabIndex].request({ offset: paginationData.currentOffset })
        }
    }, [isLoggedIn, selectedTabIndex])

    return (
        <Box
            overflowY='scroll'
            borderWidth='.3rem'
            borderColor='brand.darkest'
            width='30%'
        >
            <Tabs isFitted onChange={(index: number) => {
                setSelectedTabIndex(index)
                resetPaginationData()
            }}>
                <TabList>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                        >
                            {tab.displayName}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {tabs.map((tab, index) => tab.renderPanel(index))}
                </TabPanels>
            </Tabs>
            {/* <Pagination
                hasPrev={paginationData.hasPrev}
                hasNext={paginationData.hasNext}
                onPrevious={() => tabs[selectedTabIndex].request({ offset: paginationData.currentOffset - paginationData.pageSize })}
                onNext={() => tabs[selectedTabIndex].request({ offset: paginationData.currentOffset + paginationData.pageSize })} /> */}
        </Box>
    )
}

export default PlaylistManager;