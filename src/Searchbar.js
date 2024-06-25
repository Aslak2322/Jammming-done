import React, { useState } from 'react';
import Spotify from './Spotify';
import track from './Track';

function Searchbar({ onSearchChange, accessToken, addToPlaylist, setAudioPlay, audioPlay }) {
    const [searchTerminology, setSearchTerminology] = useState('');

    const handleInputChange = (e) => {
        setSearchTerminology(e.target.value)
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            try {
                const searchTerm = searchTerminology.trim().toLowerCase();
                console.log(accessToken)

                const trackIdResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
                    headers: {
                        Authorization : `Bearer ${accessToken}`
                    }})
                    const trackIdData = await trackIdResponse.json();
                    const trackId = trackIdData.tracks.items[0].id

                const trackResponse = await fetch(`
                https://api.spotify.com/v1/tracks/${trackId}`, {
                    headers: {
                        Authorization : `Bearer ${accessToken}`
                    }
                })
                const trackData = await trackResponse.json();

                console.log(trackData)

                const previewUrl = trackData.preview_url
                console.log(previewUrl)

                addToPlaylist(trackData.name)
                setAudioPlay(previewUrl)
                console.log(audioPlay)

                if (!trackId.ok) {
                    throw new Error('Network response was not ok');
                }
            }
            catch (error) {
            console.error('Error searching', error.message);
        }
    }
    }


    return (
        <div>
            <label htmlFor="searchInput">Searchbar</label>
            <input
              type='text'
              id='searchInput'
              value={searchTerminology}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default Searchbar;