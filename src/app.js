//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(`mongodb+srv://admin-${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.wx5ya.mongodb.net/simonGameDB`, {
  useNewUrlParser: true
});

const playerSchema = new mongoose.Schema({
  name: String,
  level: Number
});
const Player = mongoose.model('player', playerSchema);

//- Routes

app.route('/api/v1/players-scores')

  .get((req, res) => {

    Player.find({}, (err, foundItems) => {
      if (err) {
        console.log(err);
      } else {
        res.send(foundItems);
      }
    });
  })

  .post((req, res) => {

    let level = req.body.level;
    let playerName = req.body.playerName;

    let player = new Player({
      name: playerName,
      level: level
    });
    player.save();

  });


//- Server
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running smoothly');
});
