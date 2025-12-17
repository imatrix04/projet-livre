// service-emprunts/server.js
const express = require('express');
const axios = require('axios');
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

// Modèle Emprunt (Loan)
const Loan = sequelize.define('Loan', {
  userId: DataTypes.INTEGER, // Les IDs en SQL sont souvent des entiers
  bookId: DataTypes.INTEGER,
  status: { type: DataTypes.STRING, defaultValue: 'RESERVED' },
  // Sequelize gère automatiquement createdAt et updatedAt
});

sequelize.sync().then(() => console.log('Table Loans synchronisée'));

app.post('/reservations', async (req, res) => {
    console.log("--- [DEBUG] Début de la requête de réservation ---");
    const { userId, bookId } = req.body;

    try {
        // 1. Vérifier User
        console.log("[DEBUG] 1. Vérification User...");
        try {
            // Utilisation de 127.0.0.1 au lieu de localhost pour éviter les bugs réseaux
            await axios.get(`http://127.0.0.1:8002/users/${userId}`);
        } catch (e) { 
            console.log("[DEBUG] Erreur User");
            return res.status(404).json({ error: 'Utilisateur introuvable' }); 
        }

        // 2. Vérifier Livre
        console.log("[DEBUG] 2. Vérification Livre...");
        let bookData;
        try {
            const response = await axios.get(`http://127.0.0.1:8001/books/${bookId}`);
            bookData = response.data;
        } catch (e) { 
            console.log("[DEBUG] Erreur Livre");
            return res.status(404).json({ error: 'Livre introuvable' }); 
        }

        if (!bookData.available) {
            return res.status(400).json({ error: 'Livre non disponible' });
        }

        // 3. Vérifier Retard
        console.log("[DEBUG] 3. Vérification Retards...");
        const userActiveLoans = await Loan.findAll({ where: { userId: userId, status: 'RESERVED' } });
        const now = new Date();
        let hasLateBook = false;

        for (let loan of userActiveLoans) {
            const loanDate = new Date(loan.createdAt);
            const diffDays = Math.ceil(Math.abs(now - loanDate) / (1000 * 60 * 60 * 24));
            if (diffDays > 30) { hasLateBook = true; break; }
        }

        if (hasLateBook) return res.status(400).json({ error: "Interdit : Livres en retard !" });

        // 4. Vérifier Quota
        const count = await Loan.count({ where: { userId: userId, status: 'RESERVED' } });
        if (count >= 3) return res.status(400).json({ error: 'Erreur: Trop de livres empruntés' });

        // 5. Sauvegarder
        console.log("[DEBUG] 5. Création de l'emprunt dans la DB...");
        const newLoan = await Loan.create({ userId, bookId });
        console.log("[DEBUG] -> Emprunt créé avec succès (ID: " + newLoan.id + ")");

        // 6. Mettre à jour le livre (étape critique)
        console.log("[DEBUG] 6. Contact du Service Livres pour mise à jour...");
        try {
            await axios.put(`http://127.0.0.1:8001/books/${bookId}/availability`, {
                available: false
            });
            console.log("[DEBUG] -> Service Livres mis à jour !");
        } catch (updateError) {
            // ICI on log l'erreur mais on NE FAIT PAS PLANTER la requête
            console.error("[ATTENTION] Le Service Livres n'a pas répondu :", updateError.message);
        }
        
        // 7. Réponse finale
        console.log("[DEBUG] 7. Envoi de la réponse au client (201).");
        return res.status(201).json({ message: 'Réservation OK', reservation: newLoan });

    } catch (err) {
        console.error("[CRASH TOTAL] :", err);
        if (!res.headersSent) res.status(500).json({ error: 'Erreur serveur interne' });
    }
});

// NOUVELLE ROUTE : Rendre un livre
app.post('/returns', async (req, res) => {
    const { bookId } = req.body;

    try {
        // 1. Trouver l'emprunt actif (RESERVED) pour ce livre
        const loan = await Loan.findOne({ 
            where: { bookId: bookId, status: 'RESERVED' } 
        });

        if (!loan) {
            return res.status(404).json({ error: 'Aucun emprunt actif trouvé pour ce livre' });
        }

        // 2. Mettre à jour le statut de l'emprunt
        loan.status = 'RETURNED';
        await loan.save();

        // 3. Prévenir le Service Livres que le livre est de nouveau disponible
        try {
            await axios.put(`http://localhost:8001/books/${bookId}/availability`, {
                available: true // <--- On remet à TRUE
            });
        } catch (apiError) {
            console.error("Erreur communication Service Livres:", apiError.message);
        }

        res.json({ message: 'Livre rendu avec succès', loan });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.get('/loans', async (req, res) => {
    try {
        const loans = await Loan.findAll({
            where: { status: 'RESERVED' }
        });
        res.json(loans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(8003, () => console.log('Service Emprunts (Postgres) running on port 8003'));