import React, { useContext, createContext, useState } from "react";
import { AccumulatedAverages } from "../models/accumulatedAverages";

type IGlobalContext = {
    selectedPlaylist: SpotifyApi.PlaylistObjectSimplified | undefined,
    setSelectedPlaylist: (playlist: SpotifyApi.PlaylistObjectSimplified) => void
    trackAnalyses: SpotifyApi.AudioFeaturesObject[],
    setTrackAnalyses: (trackAnalyses: SpotifyApi.AudioFeaturesObject[]) => void,
    averagedAnalyses: AccumulatedAverages | undefined,
    setAveragedAnalyses: (accum: AccumulatedAverages) => void
}

const initialState = {
    selectedPlaylist: undefined,
    setSelectedPlaylist: () => { },
    trackAnalyses: [],
    setTrackAnalyses: () => { },
    averagedAnalyses: undefined,
    setAveragedAnalyses: () => { }
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
    const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyApi.PlaylistObjectSimplified>()
    const [trackAnalyses, setTrackAnalyses] = useState<SpotifyApi.AudioFeaturesObject[]>([])
    const [averagedAnalyses, setAveragedAnalyses] = useState<AccumulatedAverages | undefined>()

    return {
        selectedPlaylist,
        setSelectedPlaylist,
        trackAnalyses,
        setTrackAnalyses,
        averagedAnalyses,
        setAveragedAnalyses
    }
}