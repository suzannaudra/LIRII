require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request")




var spotify = new Spotify(
  keys.spotify
 );




 function music (param){ 
   console.log(param)
  if (param === '') {
    param = "The Sign";
  }
  spotify
  .search({ type: 'track', query: param, limit: 1 })
  .then(function(response) {
    console.log(response.tracks.items);
    console.log("resultsreturned")
    var tableArray = [];

    
    for (var i = 0; i < response.tracks.items.length; i++ ) {
        var result = {
            artist : response.tracks.items[i].album.artists[0].name,
            album_name : response.tracks.items[i].album.name,
            song_name : response.tracks.items[i].name,
            preview_url : response.tracks.items[i].preview_url 
        }
        tableArray.push(result);
        console.table(tableArray);
      }
  })
  .catch(function(err) {
    console.log("err");
  });

 }
  
   
console.log(process.argv)

var command = process.argv[2]
var param = process.argv.slice(3).join(' ')
console.log (command)
console.log (param)

function runAction(command, param) {
  switch (command) {
      case "concert-this":
          concert(param)
          break
      case "spotify-this":
          music(param)
          break
      case "do-what-it-says":
          doWhatItSays()
          break 
      default:
      ("That is not a command that I recognize, please try again.") 
  }
}
runAction(command,param)

 


  

  function concert(artist){
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp" 
    
   
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Save parsed body in a new variable for easier use
            var concertInfo = JSON.parse(body)
            console.log('DATA', concertInfo)
            console.log(artist + " concert information:")

            for (i=0; i < concertInfo.length; i++) {
                
                region = concertInfo[i].venue.region
                if (region === "") {
                    region = concertInfo[i].venue.country
                }
                
                console.log("Venue: " + concertInfo[i].venue.name)
                console.log("Location: " + concertInfo[i].venue.city + ", " + region);
                console.log("Date: " + concertInfo[i].datetime);
            }
        }
    })
  }
      function doWhatItSays() {
      fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
  
        var dataArr = data.split(',')
  
        runAction(dataArr[0],dataArr[1])
      });
    }
