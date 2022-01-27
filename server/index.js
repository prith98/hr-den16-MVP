const axios = require("axios");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require('../database/index')
const Schema = mongoose.Schema;
const path = require("path");
const PORT = 3000;
const app = express();
const {TOKEN, URL} = require('../config.js')

const config = {
  headers: {
  'Authorization': TOKEN,
  'Content-Type': 'application/json'
  }
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post('/addTeam', db.addTeam);

app.get('/getTeams', (req, res) => {
  db.Trainer.find()
    .then((results) => {
      console.log('Successfully retrieved teams');
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/moves/:pokemon', (req, res) => {
  axios
    .get(req.originalUrl)
    .then((data) => {
      console.log('success')
      res.send(data);
    })
    .catch((err) => {
      console.log(err)
      res.send(err);
    })
});

app.get('/pokeapi/moves', (req, res) => {
  const {pokemon} = req.query;
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, config)
    .then((data) => {
      res.send(data.data.moves);
    })
    .catch((err) => {
      console.log(err);
      res.send(err)
    })
})

app.get('/getTeam', (req, res) => {
  Trainer.findById()
})

app.listen(PORT, () => {
  console.log(`I'm listening on port ${PORT}`);
});