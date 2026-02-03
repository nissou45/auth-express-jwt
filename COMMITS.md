# Historique pédagogique du projet Auth Express JWT

Ce fichier décrit les étapes de développement du projet afin de
montrer la compréhension progressive des concepts abordés.

---

## Étape 1 – Initialisation du projet

- Initialisation du projet Node.js avec npm
- Installation des dépendances : express, bcrypt, jsonwebtoken
- Mise en place du serveur Express
- Configuration du middleware express.json()

---

## Étape 2 – Modélisation des utilisateurs

- Création d’un modèle simple d’utilisateurs
- Stockage initial en mémoire
- Préparation à la persistance des données

---

## Étape 3 – Inscription (/register)

- Création de la route POST /register
- Vérification de l’unicité de l’email
- Hashage du mot de passe avec bcrypt
- Enregistrement des utilisateurs

---

## Étape 4 – Connexion (/login)

- Création de la route POST /login
- Vérification des identifiants
- Génération d’un token JWT avec expiration

---

## Étape 5 – Sécurité et bonnes pratiques

- Utilisation de Helmet
- Gestion des variables d’environnement
- Mise en place du fichier .gitignore
- Séparation des routes

---

## Étape 6 – Persistance des données

- Création du fichier users.json
- Lecture et écriture des données utilisateurs
- Passage d’un stockage en mémoire à un stockage persistant

---

## Étape 7 – Versionnement avec Git

- Initialisation du dépôt Git
- Création du premier commit global
- Publication du projet sur GitHub
