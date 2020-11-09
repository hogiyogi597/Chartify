import React, { useContext, createContext } from "react";
import SpotifyWebClient from 'spotify-web-api-js'

type ISpotifyContext = { spotifyClient: SpotifyWebClient.SpotifyWebApiJs, setAccessToken: (accessToken: string) => void, isAuthenticated: boolean }

const SpotifyContext = createContext<ISpotifyContext>({ spotifyClient: new SpotifyWebClient(), setAccessToken: () => { }, isAuthenticated: false });

export function ProvideSpotify({ children }: { children: React.ReactNode }) {
    const spotifyClient = new SpotifyWebClient()

    const isAuthenticated = () => spotifyClient.getAccessToken() !== null || spotifyClient.getAccessToken() !== ""

    return <SpotifyContext.Provider value={
        {
            spotifyClient: spotifyClient,
            setAccessToken: (accessToken: string) => spotifyClient.setAccessToken(accessToken),
            isAuthenticated: isAuthenticated()
        }
    }> {children} </SpotifyContext.Provider>;
}

export const useSpotify = () => {
    return useContext(SpotifyContext);
};