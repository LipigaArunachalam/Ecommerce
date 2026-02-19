const mongoose = require('mongoose');
const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config();

app.use(express.json());

app.use('/api', routes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("database connected successfully");
})
.catch((error) => {
    console.log(error.message);
})

app.listen(3000,() =>{
    console.log("server running on the port 3000");
} )