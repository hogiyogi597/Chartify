import React from 'react'
import { useGlobal } from '../../../hooks/use-global-context'
import RadarChart from './charts/RadarChart'

const StatsOverview = () => {
    const { averagedAnalyses, selectedPlaylist } = useGlobal()

    const preppedData = averagedAnalyses && selectedPlaylist ?
        Object.keys(averagedAnalyses).map((key, index) => {
            return {
                'analysisFeature': key,
                [selectedPlaylist.name]: (Object.values(averagedAnalyses)[index] as number).toFixed(2)
            }
        }) : undefined

    return (
        <>
            {preppedData && selectedPlaylist ? <RadarChart data={preppedData} playlistName={selectedPlaylist.name} /> : <div>No data</div>}
        </>
    )
}

export default StatsOverview