// service-livres/server.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

// Modèle Livre
const Book = sequelize.define('Book', {
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  location: { 
      type: DataTypes.STRING, 
      defaultValue: 'Rayon A - Étagère 1' // Valeur par défaut
  },
  publisher: {
      type: DataTypes.STRING,
      defaultValue: 'Édition inconnue'
  },
  summary: {
      type: DataTypes.TEXT,
      defaultValue: 'Aucun résumé disponible pour ce livre.'
  },
  available: { type: DataTypes.BOOLEAN, defaultValue: true }
});

sequelize.sync({ alter: true }).then(() => console.log('Table Books synchronisée'));

// Get Book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Livre non trouvé');
    res.json(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// List Books
app.get('/books', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// Create Book
app.post('/books', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.json(newBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/books/:id/availability', async (req, res) => {
    try {
        const { available } = req.body; // On attend { "available": false }
        const book = await Book.findByPk(req.params.id);
        
        if (!book) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }

        book.available = available;
        await book.save(); // Sauvegarde dans Postgres

        res.json({ message: 'Statut mis à jour', book });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(8001, () => console.log('Service Livres (Postgres) running on port 8001'));