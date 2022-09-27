const express = require("express");
const cors = require("cors");

const beasts = require("./beasts");
const logRoute = require("./route-logger")

// Make a basic server
const app = express();
// Allow requests from other origins
app.use(cors())
// Tell express to always read the body of POST requests
app.use(express.json())
// Add middleware to log routes
app.use(logRoute);

// Set up the server routes
app.get("/", (req, res) => {
    res.send("Welcome to the Bestiary!");
});


app.get("/beasts", (req, res) => {
    res.send(beasts);
})


app.get("/beasts/random", (req, res) => {
    let randId = Math.floor(Math.random() * beasts.length)
    const randBeast = beasts.filter((b) => b.id == randId);
    res.send(randBeast[0]);
})


app.get("/beasts/:id", (req, res) => {

    try{
        // Attempt to do something - stop if there is an error

        // Convert id into an int (which possibly makes a NaN)
        const id = parseInt(req.params.id);

        // If id is NaN or other bad value
        if (isNaN(id)) {
            // Exit try as there is a problem 
            throw "Invalid input!"

            // If id is outside reasonable boundaries
        } else if(0 > id || id >= beasts.length) {
            // Exit the try as there is a problem
            throw "No such beast!"
        }
        // If all good, return relevant beast
        const filtered = beasts.filter((beast) => beast.id == req.params.id);
        res.send(filtered[0]);
// If there was a problem anywhere in the try, take the error information 
    } catch (e){
        // Send a response explaining the issue
        res.status(404).send({error: e});

    }

})


app.post("/beasts", (req, res) => {
    //Grab the beast data
    const newBeast = req.body;

    //Select an id for the beast
    newBeast["id"] = beasts.length;

    //Add it to the list of beast
    beasts.push(newBeast);

    //Return a message saying it worked
    res.status(201).send(newBeast);
})


module.exports = app;
