// This application uses multiple packages



// =========================================================================================================================================

// Put NPM packages into variables
var omdb = new (require('omdbapi'))('trilogy');

var SpotifyWebApi = require('spotify-web-api-node');

//spotifyapi credentials just in case
/*var spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: '',
    redirectUri: '#'
})
spotifyApi.setAccessToken('<your_access_token>');*/

var bandsintown = require('bandsintown')(APP_ID);