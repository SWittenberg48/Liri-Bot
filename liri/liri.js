import { spotify } from "./keys";

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
var inquirer = require("inquirer");    
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var band = require("band-in-town")
var movieName = require("omdb")
var spotify = reuire(Node-Spotify-API);


var spotify = new spotify(keys.spotify);

    // user command choice( process.argv prompt inquirer)
    // var userCommand = process.argv[2];
    // var secondCommand = process.argv[3];
// userChoice for movie/song/concert
var userChoice = {
    type: 'list',
    name: 'command',
    message: 'What would you like me to do?',
    choices: [
        {
            name: 'Check Band in Town?',
            value: 'concert-thi'
        },
        {
            name: 'Spotify this Song?',
            value: 'spotify-this-song'
        },
        {
            name: 'Movie This?',
            value: 'movie-this'
        },
        {
            name: 'Do What It Says?',
            value: 'do-what-it-says'
        }
    ]
};
// check for user command
    // if or switch
        // cond(concert-this)
            // create function concert(userChoice)
        //  cond(spotify-this-song)
            // create function spotify()
        // cond(movie-this)
            // create function movie()
        // cond(do-what-it-says)
            // create function doWhatItSays()


// concert()
    // have to use axios
    // use this url `"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`
    // grab "name of venue" "location" "date of event MM/DD/YYY"


//  dowhatitsays()
    // fs.readfile
        // data.split(', ')[1]
        // spotify(data.split(', ')[1])