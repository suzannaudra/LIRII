require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
 console.log (keys)
 var dateFormat = require("dateFormat")
 var fs = require("fs")


var spotify = new Spotify(
  keys.spotify
 );
 
  var getspotify = function (song){

 
    spotify
 .search({ type: 'track', query: song || 'The Sign', limit: 1 })
 .then(function(response) {
   console.log(response.tracks.items);
 })
 .catch(function(err) {
   console.log(err);
 })};

console.log(process.argv)

var command = process.argv[2]
var params = process.argv.slice(3).join(' ')
console.log (command)
console.log (params)

var songInfo = data.tracks.items[0]
        outputData(songInfo.artists[0].name)
        outputData(songInfo.name)
        outputData(songInfo.album.name)
        outputData(songInfo.preview_url)

var axios = require("axios");
var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

var concertThis = function(artist){
    var region = ""
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"
    
    
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Save parsed body in a new variable for easier use
            var concertInfo = JSON.parse(body)
            
            outputData(artist + " concert information:")

            for (i=0; i < concertInfo.length; i++) {
                
                region = concertInfo[i].venue.region
                 //handle Canadian venues
                if (region === "") {
                    region = concertInfo[i].venue.country
                }

                // Need to return Name of venue, Venue location, Date of event (MM/DD/YYYY)
                outputData("Venue: " + concertInfo[i].venue.name)
                outputData("Location: " + concertInfo[i].venue.city + ", " + region);
                outputData("Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy"))
            }
        }
    })
}