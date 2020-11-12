import React, { useEffect, useState } from 'react'
import { useGlobal } from '../../hooks/use-global-context'
import { useSpotify } from '../../hooks/use-spotify'
import { AccumulatedAverages, AccumulatedAveragesM } from '../../models/accumulatedAverages'
import StatsComparison from './stats-sections/StatsComparison'
import StatsOverview from './stats-sections/StatsOverview'
import classnames from 'classnames'
import { Flex, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/core'

const TabulatedStats = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const { spotifyClient, isAuthenticated } = useSpotify()
    const { selectedPlaylistsMap, addToRadarChartDataMap } = useGlobal()

    const tabs = [{
        displayName: "Overview",
        renderPanel: StatsOverview,
    }, {
        displayName: "Breakdown",
        renderPanel: StatsComparison
    }]

    useEffect(() => {
        // TODO: Possibly keep all the track things instead of just the averages
        async function gatherTrackAnalysesRec(playlistId: string, offset: number, accumulatedAverages: AccumulatedAverages): Promise<AccumulatedAverages> {
            const trackResponse = await spotifyClient.getPlaylistTracks(playlistId, { limit: 100, offset: offset })
            const multipleAudioFeatures = await spotifyClient.getAudioFeaturesForTracks(trackResponse.items.map(playlistTrack => playlistTrack.track.id))
            const sanitizedAnalyses = multipleAudioFeatures.audio_features.map(audioFeatures => {
                return {
                    acousticness: audioFeatures.acousticness,
                    danceability: audioFeatures.danceability,
                    energy: audioFeatures.energy,
                    instrumentalness: audioFeatures.instrumentalness,
                    loudness: 1 - (audioFeatures.loudness / -60),
                    speechiness: audioFeatures.speechiness,
                    valence: audioFeatures.valence,
                }
            })
            const combinedAverages = AccumulatedAveragesM.combine(AccumulatedAveragesM.combineAll(sanitizedAnalyses), accumulatedAverages)
            if (trackResponse.next)
                return gatherTrackAnalysesRec(playlistId, trackResponse.items.length + offset, combinedAverages)
            else
                return AccumulatedAveragesM.average(combinedAverages, trackResponse.total)
        }

        if (isAuthenticated) {
            selectedPlaylistsMap.forEach((playlist, id) => {
                gatherTrackAnalysesRec(id, 0, AccumulatedAveragesM.empty)
                    .then(accumulatedAverages => addToRadarChartDataMap(playlist, accumulatedAverages))
            })
        }
    }, [selectedPlaylistsMap])

    return (
        <Flex
            flexGrow={1}
            direction='column'
            justifyContent='space-between'
            marginLeft='1rem'
        >
            <Tabs variant='enclosed'>
                <TabList>
                    {tabs.map((tab, index) => <Tab key={index}>{tab.displayName}</Tab>)}
                </TabList>
                <TabPanels>
                    {tabs.map((tab, index) => (
                        <TabPanel height='90rem' key={index} >
                            {tab.renderPanel()}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Flex>
    )
}

export default TabulatedStats