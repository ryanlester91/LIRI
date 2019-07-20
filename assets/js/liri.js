// This application uses multiple packages
//Require and configure dotenv.
require('dotenv').config()

//require for momentjs
var moment = require('moment');
moment().format();
// =========================================================================================================================================

// Put NPM packages into variables
var Spotify = require('node-spotify-api');

//spotifyapi credentials just in case
var spotify = new Spotify({
    id: "<your spotify client id>",
    secret: "<your spotify client secret>"
  });
   
  spotify
    .search({ type: 'track', query: '' })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log('Error occurred: ' + err);;
    });
        
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Then run a request with axios to the OMDB API with the movie specified
var movie = '';

axios.get("http://www.omdbapi.com/?t= " + movie + " &y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data);
  }
);
var artist = '';

axios.get("https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp").then(
    function(response) {
        console.log("Stuff about this band: " + response);
    }
)