import React from 'react';

const SpotifyLogin = () => {
  const clientId = 'aa38b3585e8e4fc789d0138e8cf5b69d';
  const redirectUri = 'http://localhost:3000/';

  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-private%20user-read-email`;
  };

  return (
    <div>
      <h2>Spotify Login</h2>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyLogin;