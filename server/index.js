const axios = require("axios");
const express = require("express");
const path = require("path");
const db = require('../database/index')
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());






app.listen(PORT, () => {
  console.log(`I'm listening on port ${PORT}`);
});