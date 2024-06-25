import React, { useState } from 'react';
import SearchBar from './Searchbar';
import track from './Track';

function SearchResults({ addToPlaylist, searchTerm, handleSearchChange, clearPlaylist, tracks, accessToken, setAudioPlay, audioPlay }) {

    const handleAddToPlaylist = (track) => {
            addToPlaylist(track.data);
    }

    const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.album.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeFromPlaylist = () => {

    }
    
    return (
        <div>
            <SearchBar audioPlay={audioPlay} onSearchChange={handleSearchChange} tracks={tracks} accessToken={accessToken} addToPlaylist={addToPlaylist} setAudioPlay={setAudioPlay} />
            {searchTerm && (
                <div>
                    <p>Search Result: {searchTerm}</p>
                
                    {filteredTracks.map(track => (
                        <div key={track.id}>
                            <p>{track.name} - {track.artist} - {track.album}</p>
                            <button onClick={() => handleAddToPlaylist(track)}>Add to Playlist</button>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={clearPlaylist}>Clear Playlist</button>
        </div>
    )
}

export default SearchResults;