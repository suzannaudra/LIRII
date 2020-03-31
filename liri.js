require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');



var spotify = new Spotify(
  keys.spotify
 );
 
   spotify
 .search({ type: 'track', query: songName || 'The Sign', limit: 1 })
 .then(function(response) {
   console.log(response.tracks.items);
   console.log("resultsreturned")
 })
 .catch(function(err) {
   console.log("err");
 });
console.log(process.argv)

var command = process.argv[2]
var songName = process.argv.slice(3).join(' ')
console.log (command)
console.log (songName)

if (songName == undefined) {
  songName = " ";
  var tableArray = [];

  for (var i = 0; i < data.tracks.items.length; i++ ) {
      var result = {
          artist : data.tracks.items[i].album.artists[0].name,
          album_name : data.tracks.items[i].album.name,
          song_name : data.tracks.items[i].name,
          preview_url : data.tracks.items[i].preview_url 
      }
      tableArray.push(result);
      tableArray.printInfo(random.txt);
  }}

