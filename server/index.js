const axios = require("axios");
const express = require("express");
const path = require("path");
const db = require('../database/index')
const PORT = 8080;
const app = express();
const config = {
  headers: {
  'Authorization': TOKEN,
  'Content-Type': 'application/json'
  }
}

app.use(express.json());
app.use(express.urlencoded());

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


app.listen(PORT, () => {
  console.log(`I'm listening on port ${PORT}`);
});