# Todolist 3-tiers

Ce projet est une application todolist découpée en 3 services :

- **Frontend** : React (Vite)
- **Backend** : Node.js/Express
- **BDD** : MySQL

## Lancement

1. Placez-vous à la racine du projet.
2. Lancez :
   docker-compose up --build
3. Se rendre dans le dossier frontend (cd frontend) :
   npm run dev
4. Accédez à l'application sur [http://localhost:5174](http://localhost:5174)

## Fonctionnalités

- Liste, ajout, modification, suppression de tâches
- 2 pages côté frontend
- Inversion de dépendances via un service React Context
