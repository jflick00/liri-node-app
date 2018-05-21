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
    if (optuserInput) {
        displaySpotify(optuserInput);
    }
    if (!optuserInput) {
        console.log("Artist(s): Ace of Base\n" + "Song Title: The Sign\n" + "Album: Happy Nation");
    }
    break;

case "movie-this":
    if (optuserInput) {
        displayOmdb(optuserInput);
    }
    if (!optuserInput) {
        optuserInput = "Mr Nobody";
        displayOmdb(optuserInput);
    }
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

//  If userInput equals "spotify-this-song"
function displaySpotify(query) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: query, limit: 1 }, function(err, data) {
        if (err) {
            return console.log("Artist(s): Ace of Base\n" + "Song Title: The Sign\n" + "Album: Happy Nation");
        }
        
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name + "\n");
        console.log("Song Title: " + data.tracks.items[0].name + "\n");
        console.log("Preview Link: " + data.tracks.items[0].preview_url + "\n");
        console.log("Album: " + data.tracks.items[0].album.name);
        
    });
}

//  If userInput equals "movie-this"
function displayOmdb(optuserInput) {

    var omdb = keys.omdb.api_key + optuserInput;
    
    request(omdb, function(error, response, body) {

        var jsonData = JSON.parse(body);
        
        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Log the Title
            console.log("Title: " + jsonData.Title);
            // Log the Year
            console.log("Release Year: " + jsonData.Year);
            // Log the IMDB Rating
            console.log("IMDB Rating: " + jsonData.imdbRating);
            // Log the Rotten Tomatoes Rating
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
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

//  If userInput equals "do-what-it-says"
function doWhatitsays() {

}