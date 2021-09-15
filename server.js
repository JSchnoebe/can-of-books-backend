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

app.post('/books', postBooks);

const PORT = process.env.PORT || 3001;


async function postBooks(req, res) {
  console.log('headers', req.headers);
  console.log('body', req.body);

  const newBook = await Book.create(req.body);
  res.send(newBook);
}

async function deleteBook(req, res) {
  let id = req.params.id

  try {
    await Book.findByIdAndDelete(id);
    res.status(204).send();
  }
  catch (err) {
    handleError(err, res);
  }
}

function handleError(err, res) {
  console.error(err);
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
