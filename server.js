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
const { response } = require('express');

const app = express();
app.use(cors()); 

// Route handlers
app.get('/books', (req, res) => {
    Book.find((err, bookResponse) => {
    console.log(bookResponse);
    res.send(bookResponse);
  });
  
})

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
