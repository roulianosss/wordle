const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Game = require('../models/games')
const randomWordFR = require('random-word-fr')



router.get("/", (req, res) => {
    console.log('test')
})
router.get("/new", (req, res) => {
    let newWord 
    function newWordGenerator(word) {
        if(word.length <= 6 && /^[A-Za-z]*$/.test(word)) return word
        return newWordGenerator(randomWordFR().toUpperCase())
    }
    newWord = newWordGenerator(randomWordFR().toUpperCase())

    const newGame = new Game ({
        result: true,
        gameId: new mongoose.mongo.ObjectId(),
        wordLength: newWord.length,
        word: newWord
    })
    newGame.save().then(data => res.json(data))

});
  
module.exports = router