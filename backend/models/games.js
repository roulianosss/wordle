const mongoose = require('mongoose')

// const gameSchema = mongoose.Schema({
//     row1: String,
//     row2: String,
//     row3: String,
//     row4: String,
//     row5: String,
//     row6: String,
// });

const gameSchema = mongoose.Schema({
  result: Boolean,
  gameId: mongoose.ObjectId, 
  wordLength: Number,
  word: String
})

const Game = mongoose.model('games', gameSchema);

module.exports = Game
