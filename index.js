import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'book_notes',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

db.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to database');
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Log the views directory path for debugging
console.log('Views directory:', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home page - list all books
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books ORDER BY id ASC');
    const books = result.rows;
    res.render('index.ejs', { books });
  } catch (err) {
    console.log(err);
  }
});

// Show favorite books
app.get('/favorites', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books WHERE favorite = true ORDER BY id ASC');
    const books = result.rows;
    res.render('index.ejs', { books });
  } catch (err) {
    console.log(err);
  }
});

// Show "to read" books
app.get('/to-read', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books WHERE to_read = true ORDER BY id ASC');
    const books = result.rows;
    res.render('index.ejs', { books });
  } catch (err) {
    console.log(err);
  }
});

// Add new book - show form
app.get('/add', (req, res) => {
  res.render('add.ejs');
});

// Add new book - handle form submission
app.post('/add', async (req, res) => {
  const { title, author, rating, read_date, isbn, favorite, to_read } = req.body;
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  try {
    await db.query(
      'INSERT INTO books (title, author, rating, read_date, cover_url, isbn, favorite, to_read) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [title, author, rating, read_date, coverUrl, isbn, favorite || false, to_read || false]
    );
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

// Edit book - show form
app.get('/edit/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
    const book = result.rows[0];
    res.render('edit.ejs', { book });
  } catch (err) {
    console.log(err);
  }
});

// Edit book - handle form submission
app.post('/edit/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, rating, read_date, isbn, favorite, to_read } = req.body;
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  try {
    await db.query(
      'UPDATE books SET title = $1, author = $2, rating = $3, read_date = $4, cover_url = $5, isbn = $6, favorite = $7, to_read = $8 WHERE id = $9',
      [title, author, rating, read_date, coverUrl, isbn, favorite || false, to_read || false, bookId]
    );
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
