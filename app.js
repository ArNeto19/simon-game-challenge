//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
mongoose.connect(`mongodb+srv://admin-${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.wx5ya.mongodb.net/simonGameDB`, {
  useNewUrlParser: true
});

const playerSchema = new mongoose.Schema({
  name: String,
  level: Number
});
const Player = mongoose.model('player', playerSchema);

//- Routes

app.route('/')
  .get((req, res) => {

    Player.find({}, (err, foundItems) => {
      if (err) {
        console.log(err);
      } else {
        res.render('index', {
          allPlayers: foundItems
        });
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

    res.redirect('/');
  });


//- Server
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running smoothly');
});
