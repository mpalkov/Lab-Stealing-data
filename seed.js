const mongoose = require('mongoose');
const Character = require("./Character.model");
const { log } = require("console");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> {
        console.log("connected to DB")
        return fetch("https://rickandmortyapi.com/api/character");
    })
    .then(data => data.json())
    // jsonData.results[]
    .then(jsonData => {
       // console.log(jsonData)
        const cleanedData = jsonData.results.map((element) => {
            return ({name: element.name, imageUrl: element.image});
        });
        return cleanedData;
    })
    .then(cleanedData => Character.insertMany(cleanedData))
    .then(() => {
        console.log("Created all the documents in the DB\nDisconnecting...");
        return mongoose.disconnect();
    })
    .catch(error => console.log(error));