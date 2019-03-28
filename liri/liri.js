// import { spotify } from "./keys";

// Pseudocode
// install all the given packages
// require("dotenv").config();
// require keys.js
// var keys = require("./keys.js");
// * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

// * [Axios](https://www.npmjs.com/package/axios)

//   * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

// * [Moment](https://www.npmjs.com/package/moment)

// * [DotEnv](https://www.npmjs.com/package/dotenv)

require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
// var movieName = require("omdb");
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify);
var moment = require("moment");

// user command choice( process.argv prompt inquirer)
var userCommand = process.argv[2];
var userChoice = process.argv.slice(3).join(" ");
// userChoice for movie/song/concert
// var userChoice = {
//     type: 'list',
//     name: 'command',
//     message: 'What would you like me to do?',
//     choices: [
//         {
//             name: 'Check Band in Town?',
//             value: 'concert-this'
//         },
//         {
//             name: 'Spotify this Song?',
//             value: 'spotify-this-song'
//         },
//         {
//             name: 'Movie This?',
//             value: 'movie-this'
//         },
//         {
//             name: 'Do What It Says?',
//             value: 'do-what-it-says'
//         }
//     ]
// };
// check for user command
// if or switch
switch (userCommand) {
  case "Do-What-It-Says":
    doWhatItSays();
    break;

  case "Concert-this":
    concertThis();
    break;

  case "Spotify-this":
    spotifyThis();
    break;

  case "Movie-this":
    movieThis();
    break;
}
// cond(concert-this)
// create function concert(userChoice)
//  cond(spotify-this-song)
// create function spotify()
console.log(userChoice);
function spotifyThis() {
  if (!userChoice) {
    userChoice = "The Sign";
  }

  spotify.search(
    {
      type: "track",
      query: userChoice
    },
    function(err, data) {
      if (err) {
        return console.log("ERROR" + err);
      }
      for (song in data.tracks.items) {
        console.log(
          "----------------------------------------------------------"
        );
        console.log(
          `Artist Name: ${data.tracks.items[song].album.artists[0].name}`
        );
        console.log(`Album Name: ${data.tracks.items[song].album.name}`);
        console.log(`Song Name: ${data.tracks.items[song].name}`);
        console.log(
          `Album Release Date: ${moment(
            data.tracks.items[song].album.release_date
          ).format("MM/DD/YYYY")}`
        );
        console.log(`Song Preview: ${data.tracks.items[song].preview_url}`);
        console.log(
          "----------------------------------------------------------"
        );
      }
    }
  );
}
// cond(movie-this)
// create function movie()
function movieThis() {
  if (!userChoice) {
    userChoice = `Mr. Nobody`;
  }
  var requestURL = `http://www.omdbapi.com/?t=${userChoice}&y=&plot=short&apikey=trilogy`;
  axios
    .get(requestURL)
    .then(function(response) {
      console.log("----------------------------------------------------------");
      console.log(`Movie Title: ${response.data.Title}`);
      console.log(`Year Released: ${response.data.Year}`);
      console.log(`Movie Director(s): ${response.data.Director}`);
      console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
      console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
      console.log(`Movie Language(s): ${response.data.Language}`);
      console.log(`Movie Actor(s): ${response.data.Actors}`);
      console.log(`Movie Genre(s): ${response.data.Genre}`);
      console.log(`Movie Plot: ${response.data.Plot}`);
      console.log("----------------------------------------------------------");
    })
    .catch(function(err) {
      console.log("ERROR" + err);
    });
}

// concert()
// have to use axios
// use this url `"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`
// grab "name of venue" "location" "date of event MM/DD/YYY"
function concertThis() {
  console.log(userChoice);
}
var concertURL = `https://rest.bandsintown.com/artists/=${userChoice}/events?app_id=320433d2-5e97-4df9-9378-c85ca8698a68`;
axios
  .get(concertURL)

  .then(function(response) {
    for (art in response.data) {
      console.log("----------------------------------------------------");
      console.log(`Venue Name: ${response.data[art].venue.name}`);
      console.log(
        `Venue Date: ${moment(response.data[art].datetime).format(
          "MM/DD/YYYY"
        )}`
      );
      console.log(
        `Venue Location: ${response.data[art].venue.city}, ${
          response.data[art].venue.region
        }, ${response.data[art].venue.country}`
      );
      console.log("----------------------------------------------------");
    }
  })
  .catch(function(err) {
    console.log("ERROR" + err);
  });
//  dowhatitsays()
// fs.readfile
// Reads 'random.txt'
// data.split(', ')[1]
// spotify(data.split(', ')[1])
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log("ERROR" + err);
    }
    var whatItSays = data.split(",");
    userCommand = whatItSays[0];
    userChoice = whatItSays.slice(1).join(" ");
    data = {
      command: data[0],
      query: data[1]
    };
  });
}
