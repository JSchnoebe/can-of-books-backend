'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('connected to mongo!');
});

// import our Mongoose model
const Book = require('./models/book');

const app = express();
app.use(cors()); 

// Route handlers
app.get('/books', async (req, res) => {
  const books = await Book.find();

  res.send(books);
})

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
