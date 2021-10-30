const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
    .then(console.log("Successfully connected to database"));

app.use("/pantry", require('./routes/pantryRouter'));
app.use("/recipes", require('./routes/recipeRouter'));

const connection = mongoose.connection;

connection.on("error", err => {
    console.log("Error: " + err);
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`process is running on port ${port}`));