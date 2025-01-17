require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

app.get('/artist-search', (req, res) => {
    spotifyApi
      .searchArtists(req.query.artist)
      .then(data => {
      console.log('The received data from the API: ', data.body.name);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
     
      })
      .catch(err => console.log('The error while searching artists occurred: ', err))
  });
  
  

// Our routes go here:

app.get("/home", (req, res) => res.render("home"));
app.get('/artist-search-results', (req, res) => res.render('artist-search-results'));
app.get('/albums', (req, res) => res.render('albums'));


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
