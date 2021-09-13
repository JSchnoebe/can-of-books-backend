const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost/test');

const Book = require('./models/book');

async function seed() {
  await Book.deleteMany({});
  const myBook = new Book({
    title: 'Hatchet',
    description: 'Boy survives plane crash with only a hatchet',
    available: true,
    email: 'jarenschnoebelen@yahoo.com',
  })
  myBook.save();

  await Book.create({
    title: 'The Covid Killer',
    description: 'One man goes out on an adventure to destroy Covid',
    available: true,
    email: 'jarenschnoebelen@yahoo.com',
  })

  await Book.create({
    title: 'Tommy Boy',
    description: 'Fat guy in little coat',
    available: true,
    email: 'jarenschnoebelen@yahoo.com',
  })

  mongoose.disconnect();
}

seed();