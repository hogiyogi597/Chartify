import React, { useEffect, useState } from 'react'
import { useGlobal } from '../../hooks/use-global-context'
import { useSpotify } from '../../hooks/use-spotify'
import { AccumulatedAverages, AccumulatedAveragesM } from '../../models/accumulatedAverages'
import StatsComparison from './stats-sections/StatsComparison'
import StatsOverview from './stats-sections/StatsOverview'
import classnames from 'classnames'

const TabulatedStats = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const { spotifyClient, isAuthenticated } = useSpotify()
    const { selectedPlaylist, setAveragedAnalyses } = useGlobal()

    const tabs = [{
        displayName: "Overview",
        component: StatsOverview
    }, {
        displayName: "Breakdown",
        component: StatsComparison
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

        if (isAuthenticated && selectedPlaylist?.id) {
            gatherTrackAnalysesRec(selectedPlaylist.id, 0, AccumulatedAveragesM.empty)
                .then(setAveragedAnalyses)
        }
    }, [selectedPlaylist])

    return (
        <div className="stats">
            <div className={classnames("stats__nav", "tab-nav")}>
                {tabs.map((tab, index) => {
                    return <div className={classnames(selectedTabIndex === index && 'tab-nav--selected')} key={index} onClick={() => setSelectedTabIndex(index)}>{tab.displayName}</div>
                })}
            </div>
            <div className="stats__section">
                {tabs[selectedTabIndex].component()}
            </div>
        </div>
    )
}

export default TabulatedStats