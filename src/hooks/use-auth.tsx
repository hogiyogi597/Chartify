import { error } from "console";
import React, { useState, useEffect, useContext, createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useSpotify } from "./use-spotify";

type IAuthContext = {
    isLoggedIn: boolean,
    createAuthUrl: () => URL,
    handleAccessToken: (accessToken: string, cb: () => any) => any
}

const initialState: IAuthContext = {
    isLoggedIn: false,
    createAuthUrl: () => { throw new Error("No AuthProvider") },
    handleAccessToken: () => { throw new Error("No AuthProvider") }
}

const authContext = createContext<IAuthContext>(initialState);

export function ProvideAuth({ children }: { children: React.ReactNode }) {
    const { spotifyClient } = useSpotify()
    const auth = useProvideAuth(spotifyClient);
    return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth(spotifyClient: SpotifyWebApi.SpotifyWebApiJs) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const createAuthUrl = () => {
        const baseUrl = new URL("https://accounts.spotify.com/authorize")
        // TODO: hide client ID in an .env file
        baseUrl.searchParams.append("client_id", "393d247301384a6c82e120b9502b388e")
        baseUrl.searchParams.append("redirect_uri", "http://localhost:3000/auth")
        baseUrl.searchParams.append("scope", "user-read-private,user-read-email")
        baseUrl.searchParams.append("response_type", "token")
        baseUrl.searchParams.append("state", "123")
        return baseUrl
    }

    const handleAccessToken = (accessToken: string, cb: () => any) => {
        setIsLoggedIn(true)
        spotifyClient.setAccessToken(accessToken)
        cb()
    }

    return {
        isLoggedIn,
        createAuthUrl,
        handleAccessToken,
    };
}