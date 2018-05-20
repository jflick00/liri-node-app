require("dotenv").config();
var keys = require("./keys.js");

//  Grab all the npm packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

//  Variable for which function the user chooses
var userInput = process.argv[2];

//  Optional user input
var optuserInput = process.argv[3];

// The switch-case will direct which function gets run
switch (userInput) {
case "my-tweets":
    displayTweets();
    break;

case "spotify-this-song":
    displaySpotify();
    break;

case "movie-this":
    displayOmdb();
    break;

case "do-what-it-says":
    doWhatitsays();
    break;
}

//  If userInput equals "my-tweets"
function displayTweets() {
    var client = new Twitter(keys.twitter);
    
    var params = {screen_name: 'darealbobbricks', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i=0; i < params.count; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

function displaySpotify(query) {
    var spotify = new Spotify(keys.spotify);
    
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data); 
    });
}

function displayOmdb() {

    // Create an empty variable for holding the movie name
    var movieName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 2; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            // Log the Title
            console.log("Title: " + jsonData.Title);
            // Log the Year
            console.log("Release Year: " + jsonData.Year);
            // Log the IMDB Rating
            console.log("IMDB Rating: " + jsonData.imdbRating);
            // Log the Rotten Tomatoes Rating
            // console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
            // Log the Country
            console.log("Produced in: " + jsonData.Country);
            // Log the Language
            console.log("Language: " + jsonData.Year);
            // Log the Plot
            console.log("Plot: " + jsonData.Plot);
            // Log the Actors
            console.log("Actors: " + jsonData.Actors);
        }
    });

}

function doWhatitsays() {

}