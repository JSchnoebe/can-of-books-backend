'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo!');
});

// import our Mongoose model
const Book = require('./models/book');
const { response } = require('express');

const app = express();
app.use(cors()); 

app.use(express.json());

// Route handlers
app.get('/books', (req, res) => {
    Book.find((err, bookResponse) => {
    console.log(bookResponse);
    res.send(bookResponse);

  });
  
})

app.post('/books', postBooks);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', putBook);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

async function postBooks(req, res) {
  console.log('headers', req.headers);
  console.log('body', req.body);

  const newBook = await Book.create(req.body);
  res.send(newBook);
}

async function deleteBook(req, res) {
  console.log('this is my request', req);
  let id = req.params.id;

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
  res.status(500).send('oops!');
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

async function putBook(req, res) {
  let id = req.params.id;
  let bookUpdate = req.body;

  let options = {
    new: true,
    overwrite: true,
  }

  try {
    let updatedBook = await Book.findByIdAndUpdate(id, bookUpdate, options)
    res.send(updatedBook);

  } catch (err) {
    handleError(err, res);
  }
}


