## 📚 Application de Gestion de Bibliothèque (Micro-services)

Application distribuée composée de 3 micro-services (Node.js) et d'une base de données relationnelle (PostgreSQL).

---

## 📋 Prérequis

Avant de lancer l'application, assurez-vous d'avoir :
1.  **Node.js** installé sur votre machine.
2.  **PostgreSQL** lancé localement.
    * *Configuration par défaut utilisée :* User: `postgres` / Password: `root` / Port: `5432`.

---

## 🚀 Installation et Lancement Rapide (Windows)

Un script d'automatisation est fourni pour installer les dépendances et lancer les 3 services simultanément.

1.  À la racine du projet, double-cliquez sur le fichier :
    👉 **`start_all.bat`**

2.  Le script va ouvrir 3 fenêtres de terminal (une pour chaque service), installer les modules (`npm install`) et démarrer les serveurs.

3.  Une fois que les fenêtres affichent *"Server running on port..."*, ouvrez le fichier `front-end/index.html` dans votre navigateur.

---

## ⚙️ Lancement Manuel (Mac/Linux ou cas d'erreur)

Si le script `.bat` ne fonctionne pas sur votre environnement, voici la procédure manuelle :

Ouvrez 3 terminaux distincts et exécutez les commandes suivantes :

**Terminal 1 : Service Livres**
```bash
cd service-livres
npm install
node server.js
# Tourne sur http://localhost:8001

**Terminal 2 : Service Abonnés**
```bash
cd service-abonnes
npm install
node server.js
# Tourne sur http://localhost:8002

**Terminal 3 : Service Emprunts**
```bash
cd service-emprunts
npm install
node server.js
# Tourne sur http://localhost:8003

---

## ✅ Fonctionnalités Implémentées
1. Gestion des Ressources
Livres : Ajout (Titre, Auteur, Éditeur, Emplacement), Consultation, Recherche.

Abonnés : Ajout, Liste, Suppression.

2. Logique Métier (Service Emprunts)
Réservation : Mise à jour instantanée de la disponibilité (Communication inter-services).

Retour : Remise en stock du livre.

Règles de gestion strictes :

❌ Interdiction d'emprunter plus de 3 livres simultanément.

❌ Blocage de l'emprunt si l'utilisateur a un livre en retard (> 30 jours).

3. Interface Front-end
Accueil : Dashboard général.

Catalogue : Recherche dynamique de livres.

Administration : Gestion complète des livres et adhérents.


---

## 🛠 Stack Technique
Backend : Node.js, Express.

Base de données : PostgreSQL, Sequelize (ORM).

Communication : Axios (HTTP REST).

Frontend : HTML5, CSS3, JavaScript Vanilla.