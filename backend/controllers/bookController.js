const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

const createBook = async (req, res) => {
  const { title, author } = req.body;
  const book = new Book({ title, author });
  await book.save();
  res.status(201).json(book);
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Livre non trouvé' });
  }
};

const updateBook = async (req, res) => {
  const { title, author } = req.body;
  const book = await Book.findById(req.params.id);
  if (book) {
    book.title = title;
    book.author = author;
    await book.save();
    res.json(book);
  } else {
    res.status(404).json({ message: 'Livre non trouvé' });
  }
};

const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.remove();
    res.json({ message: 'Livre supprimé' });
  } else {
    res.status(404).json({ message: 'Livre non trouvé' });
  }
};

module.exports = {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
