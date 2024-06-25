import React from 'react';
import Track from './Track';

const Tracklist = ({ tracks, addToPlaylist }) => {
    return (
        <div>
            <h2>Track List</h2>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        <Track track={track} addToPlaylist={addToPlaylist} />
                    </li>
                ))}
            </ul>
        </div>
    )
};


export default Tracklist;