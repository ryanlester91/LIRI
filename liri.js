// This application uses multiple packages
//Require and configure dotenv.
require('dotenv').config()

var fs = require("fs");
var keys = require("./keys.js");
//require for momentjs
var moment = require('moment');
moment().format();
// =========================================================================================================================================

// Put NPM packages into variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//variable for input
var command = process.argv[2];
var input = process.argv[3];
  
        
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// * `movie-this`
function movieIt (movieQuery) {

  //If the user does not type in a movie, the program defaults to data for the movie 'Cool as Ice'
  if (movieQuery === undefined || null) {
    movieQuery = "Cool as Ice";
  }

// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t= " + movieQuery + " &y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data);
  }
);



//   BandsInTown
var band = '';

axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log("Stuff about this band: " + response);
    }
)



//     * `spotify-this-song`
function spotifyIt(musicSearch) {

  //  * If no song is provided then your program will default to "The Sign" by Ace of Base.
  if (musicSearch === undefined || null) {
      musicSearch = "Echoes Pink Floyd";
  }

  spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
      if (err) {
          return console.log('Error occurred: ' + err);
      }
                  
      else {
          for (i = 0; i < data.tracks.items.length && i < 5; i++){
          
              var musicQuery = data.tracks.items[i];
              // console.log("===============================");
               // * Artist(s)
              console.log("Artist: " + musicQuery.artists[0].name +
              // * The song's name
              "\nSong Name: " + musicQuery.name +
              //* A preview link of the song from Spotify
              "\nLink to Song: " + musicQuery.preview_url +
              //* The album that the song is from
              "\nAlbum Name: " + musicQuery.album.name +
              "\n===============================");
          }
      };  
  });
}
// spotifyIt(); for testing


//console.log(JSON.stringify(data, null, 2));
//});
}