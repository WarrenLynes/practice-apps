require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require('./db.js');
const { wordRoutes } = require('./wordRoutes');

const app = express();
app.use(express.json());

// Serves up all static and generated assets in in a specified folder.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/words', wordRoutes(db));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
