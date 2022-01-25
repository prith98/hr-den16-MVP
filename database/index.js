const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = 'mongodb://127.0.0.1:27017/PokemonMaster';

mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const trainerSchema = new Schema({

  trainer: {
    type: String,
    required: true
  },
  imgurl: String,
  team: {
    type: Schema.Types.Mixed,
    required: true
  }

}, { timestamps: true});

const Trainer = mongoose.model('Trainer', trainerSchema);

const addTeam = (req, res) => {

  let trainer = new Trainer({
    "trainer": req.body.trainer,
    "team": req.body.team,
    "imgurl": req.body.imgurl
  })
  trainer.save()
    .then((result) => {
      console.log('Successfully added team')
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })

}

module.exports = {
  db,
  Trainer,
  addTeam,
}