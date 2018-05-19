//  Grab all the npm packages
var env = require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


var nodeArgs = process.argv;

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

    client.request("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=darealbobbricks&count=20", function(error, response, body) {

        // If the request was successful
        if (!error && response.statusCode === 200) {
          // Display the tweets
          console.log(JSON.parse(body).count);
        }
    });
}

function displaySpotify() {

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

            // Log the Title
            console.log("Title: " + JSON.parse(body).Title);
            // Log the Year
            console.log("Release Year: " + JSON.parse(body).Year);
            // Log the IMDB Rating
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            // Log the Rotten Tomatoes Rating
            // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            // Log the Country
            console.log("Produced in: " + JSON.parse(body).Country);
            // Log the Language
            console.log("Language: " + JSON.parse(body).Year);
            // Log the Plot
            console.log("Plot: " + JSON.parse(body).Plot);
            // Log the Actors
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

}

function doWhatitsays() {

}