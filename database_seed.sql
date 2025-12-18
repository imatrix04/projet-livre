-- FICHIER DE DONNÉES DE TEST (SEED)
-- À exécuter dans pgAdmin pour peupler la base de données rapidement.

-- 1. Nettoyage (Optionnel : vide les tables avant d'insérer pour éviter les doublons)
TRUNCATE TABLE "Books" CASCADE;
TRUNCATE TABLE "Users" CASCADE;
-- Note : On ne vide pas "Loans" (Emprunts) car le TRUNCATE CASCADE le fait souvent automatiquement si lié.

-- 2. Insertion des LIVRES (15 Livres variés)
INSERT INTO "Books" ("title", "author", "publisher", "location", "summary", "available", "createdAt", "updatedAt") VALUES
('1984', 'George Orwell', 'Gallimard', 'Rayon SF - E3', 'Un monde totalitaire...', true, NOW(), NOW()),
('Le Seigneur des Anneaux', 'J.R.R. Tolkien', 'Bourgois', 'Rayon Fantasy - E2', 'Frodon et l''anneau...', true, NOW(), NOW()),
('Harry Potter 1', 'J.K. Rowling', 'Gallimard', 'Rayon Jeunesse - E1', 'Le sorcier à lunettes...', true, NOW(), NOW()),
('L''Étranger', 'Albert Camus', 'Folio', 'Rayon Classique - A', 'Aujourd''hui, maman est morte...', true, NOW(), NOW()),
('Dune', 'Frank Herbert', 'Laffont', 'Rayon SF - E5', 'Le dormeur doit se réveiller.', true, NOW(), NOW()),
('Orgueil et Préjugés', 'Jane Austen', 'Penguin', 'Rayon Roman - B', 'Amour et classe sociale.', true, NOW(), NOW()),
('Le Petit Prince', 'St-Exupéry', 'Gallimard', 'Rayon Jeunesse - E2', 'Dessine-moi un mouton.', true, NOW(), NOW()),
('Les Misérables', 'Victor Hugo', 'Poche', 'Rayon Classique - C', 'Jean Valjean et Cosette.', true, NOW(), NOW()),
('Da Vinci Code', 'Dan Brown', 'Lattès', 'Rayon Thriller - E4', 'Complot au Louvre.', true, NOW(), NOW()),
('L''Alchimiste', 'Paulo Coelho', 'Carrière', 'Rayon Philo - E1', 'Légende personnelle.', true, NOW(), NOW()),
('Fahrenheit 451', 'Ray Bradbury', 'Denoël', 'Rayon SF - E3', 'Les pompiers brûlent les livres.', true, NOW(), NOW()),
('La Nuit des temps', 'René Barjavel', 'Presses', 'Rayon SF - E2', 'Amour éternel sous la glace.', false, NOW(), NOW()), -- Indisponible !
('Le Nom de la Rose', 'Umberto Eco', 'Grasset', 'Rayon Policier - E1', 'Meurtre à l''abbaye.', true, NOW(), NOW()),
('Shining', 'Stephen King', 'Albin', 'Rayon Horreur - E6', 'Hôtel hanté.', true, NOW(), NOW()),
('Fondation', 'Isaac Asimov', 'Denoël', 'Rayon SF - E5', 'Chute de l''Empire galactique.', true, NOW(), NOW());

-- 3. Insertion des ABONNÉS (10 Utilisateurs)
INSERT INTO "Users" ("name", "email", "createdAt", "updatedAt") VALUES
('Thomas Durand', 'thomas.d@gmail.com', NOW(), NOW()),
('Sophie Martin', 'sophie.m@orange.fr', NOW(), NOW()),
('Lucas Bernard', 'lucas.b@yahoo.fr', NOW(), NOW()),
('Emma Petit', 'emma.p@outlook.com', NOW(), NOW()),
('Gabriel Richard', 'gabriel.r@gmail.com', NOW(), NOW()),
('Bruce Wayne', 'batman@gotham.com', NOW(), NOW()),
('Clark Kent', 'superman@dailyplanet.com', NOW(), NOW()),
('Peter Parker', 'spiderman@queens.com', NOW(), NOW()),
('Lara Croft', 'lara@tombraid.com', NOW(), NOW()),
('James Bond', '007@mi6.uk', NOW(), NOW());

-- Fin du script