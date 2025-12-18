const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

// Chemin vers ton dossier front-end
const FRONT_PATH = path.join(__dirname, '../../front-end');

// 1. Servir les fichiers statiques (CSS, JS, Images)
// On garde ça pour que style.css puisse être chargé
app.use(express.static(FRONT_PATH));

// 2. Définir les routes propres (Routing)

// Route Accueil (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(FRONT_PATH, 'index.html'));
});

// Route Catalogue (/catalogue)
app.get('/catalogue', (req, res) => {
    res.sendFile(path.join(FRONT_PATH, 'catalogue.html'));
});

// Route Admin Livres (/admin-books)
app.get('/admin-books', (req, res) => {
    res.sendFile(path.join(FRONT_PATH, 'admin-books.html'));
});

// Route Admin Users (/admin-users)
app.get('/admin-users', (req, res) => {
    res.sendFile(path.join(FRONT_PATH, 'admin-users.html'));
});

// Lancement
app.listen(PORT, () => {
    console.log(`🌍 Site Web accessible sur : http://localhost:${PORT}`);
});