const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://roulianos:bikett@cluster0.okzcmrm.mongodb.net/wordle';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));
