import React, { useContext, createContext, useState } from "react";
import { AccumulatedAverages } from "../models/accumulatedAverages";
import { ChartData } from "../models/radarChartData";

type IGlobalContext = {
    selectedPlaylistsMap: Map<string, SpotifyApi.PlaylistObjectSimplified>,
    togglePlaylistFromMap: (playlist: SpotifyApi.PlaylistObjectSimplified) => void
    trackAnalyses: SpotifyApi.AudioFeaturesObject[],
    setTrackAnalyses: (trackAnalyses: SpotifyApi.AudioFeaturesObject[]) => void,
    radarChartDataMap: Map<string, ChartData[]>,
    addToRadarChartDataMap: (playlistId: SpotifyApi.PlaylistObjectSimplified, accum: AccumulatedAverages) => void
}

const initialState = {
    selectedPlaylistsMap: new Map(),
    togglePlaylistFromMap: (_: SpotifyApi.PlaylistObjectSimplified) => { },
    trackAnalyses: [],
    setTrackAnalyses: () => { },
    radarChartDataMap: new Map(),
    addToRadarChartDataMap: (_: SpotifyApi.PlaylistObjectSimplified, __: AccumulatedAverages) => { }
}

const GlobalContext = createContext<IGlobalContext>(initialState);

export function ProvideGlobalContext({ children }: { children: React.ReactNode }) {
    const global = useGlobalProvider()

    return <GlobalContext.Provider value={global}> {children} </GlobalContext.Provider>;
}

export const useGlobal = () => {
    return useContext(GlobalContext);
};

const useGlobalProvider = () => {
    const [selectedPlaylistsMap, setSelectedPlaylistsMap] = useState<Map<string, SpotifyApi.PlaylistObjectSimplified>>(new Map())
    const [trackAnalyses, setTrackAnalyses] = useState<SpotifyApi.AudioFeaturesObject[]>([])
    const [radarChartDataMap, setRadarChartDataMap] = useState<Map<string, ChartData[]>>(new Map())

    const MAX_NUMBER_OF_PLAYLISTS = 5

    const togglePlaylistFromMap = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        const newMap = new Map(selectedPlaylistsMap)
        const canSelect = Array.from(selectedPlaylistsMap.keys()).length < MAX_NUMBER_OF_PLAYLISTS

        if (newMap.get(playlist.id)) {
            newMap.delete(playlist.id)
            setSelectedPlaylistsMap(newMap)
            removeChartDataFromMap(playlist.id)
        }
        else if (canSelect) {
            newMap.set(playlist.id, playlist)
            setSelectedPlaylistsMap(newMap)
        }
    }

    const addToRadarChartDataMap = (playlist: SpotifyApi.PlaylistObjectSimplified, averagedAnalyses: AccumulatedAverages) => {
        const chartData: ChartData[] = Object.keys(averagedAnalyses).map((key, index) => {
            return {
                'analysisFeature': key,
                [playlist.name]: (Object.values(averagedAnalyses)[index] as number).toFixed(2)
            }
        })

        setRadarChartDataMap(new Map(radarChartDataMap.set(playlist.id, chartData)))
    }

    const removeChartDataFromMap = (playlistId: string) => {
        const newMap = new Map(radarChartDataMap)
        newMap.delete(playlistId)
        setRadarChartDataMap(newMap)
    }

    return {
        selectedPlaylistsMap,
        togglePlaylistFromMap,
        trackAnalyses,
        setTrackAnalyses,
        radarChartDataMap,
        addToRadarChartDataMap
    }
}