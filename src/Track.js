import React from 'react';

const track = ({ track, addToPlaylist }) => {
    const { id, name, artist, album} = track;

    const handleAddToPlaylist = () => {
        addToPlaylist(track)
    }

    const removeFromPlaylist = () => {

    }

    return (
        <div>
            <h3>{name}</h3>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
            <button onClick={handleAddToPlaylist}>Add to Playlist</button>
            <button onClick={removeFromPlaylist}>Remove From Playlist</button>
        </div>
    )
}

export default track;