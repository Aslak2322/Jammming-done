import React, { useState, useEffect } from 'react';
import './App.css';
import SearchResults from './Searchresults';
import PlayList from './PlayList';
import requestToken from './AccessToken';

function App() {

  const CLIENT_ID = "aa38b3585e8e4fc789d0138e8cf5b69d";
  const CLIENT_SECRET = "97a62bb72e034ee68e0f1626b8367509";

  const [searchTerm, setSearchTerm] = useState('');
  const [playList, setPlayList] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [isPlaylistSaved, setIsPlaylistSaved] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userToken, setUserToken] = useState('')
  const [audioPlay, setAudioPlay] = useState('')
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)


  useEffect(() => {

    var authParameters = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
}, [])

  console.log(accessToken)

  const tracks = [
    {id: 1, name: 'Moonlight', artist: 'D1MA', album: 'EV1GT og ALT1D'},
    {id: 2, name: 'Back to Black', artist: 'Amy Winehouse', album: 'Rehab'},
    {id: 3, name: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Smells Like Teen Spirit'},
    {id: 4, name: 'Breed', artist: 'Nirvana', album: 'Smells Like Teen Spirit'},
    {id: 5, name: 'Rape Me', artist: 'Nirvana', album: 'Smells Like Teen Spirit'},
  ];

    useEffect(() => {
      requestToken()
        .then(token => setAccessToken(token))
        .catch(error => console.error('Error fetching access token:', error));
    }, [])

    const addToPlaylist = (trackName) => {
        if (trackName.trim !== '') {
          setPlayList([...playList, trackName]);
          setSearchTerm('')
        }
    }

    const playAudio = (e) => {
    }

    const clearPlaylist = () => {
      setPlayList([])
    }

    const movePlaylist = () => {
      setIsPlaylistSaved(true)
    }

    const exportToSpotify = async () => {
      const userParameters = {
        method: 'GET',
        client_id: `${CLIENT_ID}`,
        respons_type:'code',
        redirect_uri:'http://localhost:3000/'
      }

   const redirectUri = 'http://localhost:3000/'; // Make sure this matches your app's registered redirect URI
   const scopes = ['user-read-private', 'playlist-modify-public']; // Adjust scopes as needed
   const state = Math.floor(Math.random()*16); // Function to generate a random string

   const authorizeUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
       client_id: CLIENT_ID,
       response_type: 'code',
       redirect_uri: redirectUri,
       scope: scopes.join(' '),
       state: state
   });

   window.location.href = authorizeUrl;

      
      
      const userName = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization : `Bearer ${userToken}`
        }
      })

      const userData = await userName.json()
      const userId = userData.id
      const newPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization : `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Name',
          description: 'Description',
          public: true
        })
      })
      const newPlaylistData = await newPlaylistResponse.json()
      console.log('New playlist created:', newPlaylistData);
    }

    let audio = new Audio (audioPlay)

  return (
    <div className="App">
      <header>
      </header>
      <h1>Jammming App</h1>
      <SearchResults addToPlaylist={addToPlaylist} searchTerm={searchTerm} 
      clearPlaylist={clearPlaylist} tracks={filteredTracks} accessToken={accessToken} setAudioPlay={setAudioPlay} audioPlay={audioPlay} />

      <div className='flex'>
        <div>
          <h1>Create PlayList</h1>
          {isPlaylistSaved===false && <PlayList playlist={playList} setPlaylist={setPlayList} setAudioPlay={setAudioPlay} audio={audio} />}
          <button onClick={movePlaylist}>Save</button>
        </div>

        {isPlaylistSaved && <div> <PlayList playlist={playList} setPlaylist={setPlayList} setAudioPlay={setAudioPlay} audio={audio} />
        <button onClick={exportToSpotify}>Save to Spotify</button></div>}
      </div>

    </div>
  );
}

export default App;
