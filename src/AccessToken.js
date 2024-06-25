import React from "react";
const requestToken = () => {
  const clientId = 'aa38b3585e8e4fc789d0138e8cf5b69d';
  const clientSecret = '97a62bb72e034ee68e0f1626b8367509';

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  })
  .then(response => {return response.json()})
  .then(data => {
    if (data.access_token) {
        return data.access_token
    } else {
        throw new Error('Access token not found in response')
    }
  })
  .catch(error => {console.error('Error:', error)
  });
};

export default requestToken;