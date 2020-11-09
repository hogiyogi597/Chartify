import React from 'react'
import { useGlobal } from '../../../hooks/use-global-context'
import classNames from 'classnames'

const Playlist = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
    const { images, name, tracks, description, id } = playlist
    const { selectedPlaylist, setSelectedPlaylist } = useGlobal()

    const image: SpotifyApi.ImageObject | undefined = images[0] || images[1] || images[2]
    return (
        <div className={classNames("playlist-item", selectedPlaylist?.id === id && "playlist-item--selected")} onClick={() => setSelectedPlaylist(playlist)}>
            <img src={image?.url} height={image?.height} width={image?.width} alt="" />
            <div className="playlist-item__info">
                <h2>{name}</h2>
                <h3>Tracks: {tracks.total}</h3>
                <p>{description === null || description === "" ? "No description available" : description}</p>
            </div>
        </div>
    )
}

export default Playlist