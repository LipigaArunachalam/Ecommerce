const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config({ path: "../.env" });
const MONGODB = process.env.MONGODB;

mongoose.connect(MONGODB)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const routes = require("./routes");
app.use("/api", routes);

app.listen(5000, (req,res)=>{
    console.log("server running in 5000...")
});