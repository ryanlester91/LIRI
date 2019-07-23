// This application uses multiple packages
//Require and configure dotenv.
require('dotenv').config()

var fs = require("fs");
var keys = require("./keys.js");
//require for momentjs
var moment = require('moment');
moment().format();
// =========================================================================================================================================
//var request = require("request");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Put NPM packages into variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


//=====================================================
//variables for input into the terminal
var command = process.argv[2];
var input = process.argv[3];
var array = [];
  
//Loop through and join name of arguments after file name (ERROR located at the '.length' part)
for (var i = 3; i < input.length; i++) {
    array.push(input[i]);
    array.push("+");
}        
array.splice(-1); //Get rid of last plus sign, if left errors caused
var finalSearch = array.join(""); //Joining together to form string

// Switch for commands for all functions (an "...is not defined" error)
var ask = function (command){
    switch(command) {
        case 'concert-this':
            concertThis();
            break;
        case 'movie-this' :
            movieThis();
            break;    
        case 'spotify-this-song':
            spotifyThis(); 
            break;
        case 'do-what-it-says':
            doWhatItSays(); 
            break;
            
        // instructions for a first-time user lurking around on the command line
        default:
        console.log("\n" + "type any command after 'node liri.js': " + "\n" +
        "spotify-this-song 'any song title'" + "\n" +
        "movie-this 'any movie title' " + "\n" +
        "do-what-it-says " + "\n" +
        "Use quotes for multiword titles!");
    }
}
  
  // asigns args to ask for switch case
  ask (command);






// node liri.js concert-this
function concertThis() {
    if (finalSearch === "") {
        console.log('\n')
        console.log("No Artist entered. Please enter an Artist")
        console.log('\n')
    } else {
        axios.get("https://rest.bandsintown.com/artists/" + finalSearch + "/events?app_id=codingbootcamp").then(
    function(response) {
        if(response.data.length <= 0) {
            console.log("Nope. Found nothing on this Artist")
        } else {
            for(var i = 0; i < response.data.length; i++) {
                var currData = `\n
                Venue: ${response.data[i].venue.name}
                Location: ${response.data[i].venue.city + ", " + response.data[0].venue.region}
                Event Date: ${moment(response.data[i].datetime).format('LL')}
                `
                console.log(currData);
            }
        }
        dataLog(currData);
    }
    );   

    // node liri.js spotify-this-song
    function spotifyThis() {
        
        if (finalSearch === "") {
            finalSearch = "gogglebox+banana+splits"
        }
        spotify.search({
            type: 'artist,track',
            query: finalSearch
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log('\n')
    
            var currData = `\n
        Artist: ${data.tracks.items[0].artists[0].name}
        Track: ${data.tracks.items[0].name}
        Preview: ${data.tracks.items[0].preview_url}
        Album: ${data.tracks.items[0].album.name}
                `
                console.log(currData)
                dataLog(currData)
    
        });
    }
  
    
    // node liri.js movie-this
function movieThis () {

  //If the user does not type in a movie, the program defaults to data for the movie 'Cool as Ice'
  if (finalSearch === undefined || null) {
    finalSearch = "cool+as+ice";
  }

// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t= " + finalSearch + " &y=&plot=short&apikey=trilogy").then(
  function(response) {
    
    var currData = `\n
    Title: ${response.data.Title}
    Released: ${response.data.Year}
    IMDB Rating: ${response.data.imdbRating}
    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
    Country: ${response.data.Country}
    Language: ${response.data.Language}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}
    `
    console.log(currData);
    dataLog(currData);
    }
    );
}}


spotifyThis(); 
//for testing


movieThis(); 
//for testing


function doWhatItSays()  {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }

        var dataArr = data.split(",");
      
        finalSearch = dataArr[1];
        spotifyThis();
      });
}
doWhatItSays();

//Input Logger - see log.txt

var logQuery = query.splice(0,2)
logQuery =  "\n" + query.join(" ") + "\n"
console.log(logQuery)

fs.appendFile("log.txt", logQuery, function(err) {

    if (err) {
      console.log(err);
    } else {
      console.log("Log Updated");
    }
  
  });

//Data Logger - see log.txt

function dataLog(data) {
    fs.appendFile("log.txt", data, function(err) {

        if (err) {
          console.log(err);
        } else {
          console.log("Log Updated");
        }
      
      });
    }
  }