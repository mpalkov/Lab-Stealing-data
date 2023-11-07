const mongoose = require('mongoose');
const Character = require("./Character.model");
const { log } = require("console");
require('dotenv').config();

let cleanedData = null;

fetch("https://rickandmortyapi.com/api/character")
    .then((data) => data.json())
    // jsonData.results[]
    .then((jsonData) => {
       // console.log(jsonData)
        cleanedData = jsonData.results.map((element) => {
            return ({name: element.name, imageUrl: element.image});
        });
        //console.log(cleanedData);
        return mongoose.connect(process.env.MONGODB_URI) // add the name of the database at the end
    })
    .then(()=> {
        console.log("connected to DB");
        return Character.insertMany(cleanedData);
    })
    .then(()=> {
        console.log("Created all the documents in the DB\nDisconnecting");
        return mongoose.disconnect();
    })
    .catch((error) => console.log(error));