// service-abonnes/server.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Connexion à Postgres (Container Docker)
// Format: 'postgres://user:pass@host:port/database_name'
// On utilise la db par défaut 'postgres' pour simplifier le TP
const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

// Définition du Modèle User (Table 'Users')
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
});

// Synchronisation (Crée la table si elle n'existe pas)
sequelize.sync().then(() => console.log('Table Users synchronisée'));

// Endpoint: Récupérer un user par ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // findByPk = Find By Primary Key
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint: Créer un user
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Récupère tout le monde
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // On supprime l'utilisateur dont l'ID correspond
        const deletedCount = await User.destroy({
            where: { id: id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        // Attention : Si l'utilisateur a des emprunts en cours, la base de données
        // peut bloquer la suppression (Foreign Key constraint).
        res.status(500).json({ error: "Impossible de supprimer (vérifiez s'il a des emprunts en cours)" });
    }
});

app.listen(8002, () => console.log('Service Abonnés (Postgres) running on port 8002'));