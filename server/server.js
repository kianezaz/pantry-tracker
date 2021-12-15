const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlEncodedParser);

app.use(cors());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
    .then(console.log("Successfully connected to database"));

app.use("/pantry", require('./routes/pantryRouter'));
app.use("/recipes", require('./routes/recipeRouter'));
app.use("/user", require('./routes/userRouter'));

const connection = mongoose.connection;

connection.on("error", err => {
    console.log("Error: " + err);
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`process is running on port ${port}`));