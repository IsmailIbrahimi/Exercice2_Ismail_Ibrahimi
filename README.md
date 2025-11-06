# Exercice2_Ismail_Ibrahimi | ToDoList API - Express, PostgreSQL & MongoDB

## 1. Description

Ce projet est une API REST de gestion de tâches (ToDoList) développée
avec **Express.js**.
Elle prend en charge **deux systèmes de stockage** :
- **PostgreSQL**, via le module `pg`
- **MongoDB**, via `mongoose`

Le choix du moteur de base de données se fait dans le fichier `.env`
grâce à la variable `DRIVER`.

------------------------------------------------------------------------

## 2. Installation

### Prérequis

-   Node.js ≥ 18
-   PostgreSQL ≥ 14
-   MongoDB ≥ 6

### Étapes d'installation

1.  Cloner le dépôt ou copier les fichiers du projet.

2.  Installer les dépendances :

    ``` bash
    npm install
    ```

3.  Créer un fichier `.env` à la racine et renseigner les variables :

    ``` env
    DRIVER=postgres        # ou mongo
    PORT=3000

    # PostgreSQL
    DATABASE_URL=postgres://postgres:motdepasse@localhost:5432/todosdb

    # MongoDB
    MONGO_URL=mongodb://localhost:27017/todosdb
    ```

4.  Lancer le serveur :

    ``` bash
    npm run dev
    ```

    ou

    ``` bash
    npm start
    ```

------------------------------------------------------------------------

## 3. Structure du projet

    todolist-api/
    │
    ├── server.js
    ├── .env
    ├── package.json
    └── src/
        ├── config/
        │   ├── init.js
        │   ├── pg.js
        │   └── mongo.js
        │
        ├── controllers/
        │   └── todoController.js
        │
        ├── models/
        │   ├── todoModel.js
        │   └── adapters/
        │       ├── postgresTodoStore.js
        │       └── mongoTodoStore.js
        │
        └── routes/
            └── todoRoutes.js

------------------------------------------------------------------------

## 4. Endpoints

  ----------------------------------------------------------------------------------
  Méthode      Route               Description              Corps attendu / Réponse
  ------------ ------------------- ------------------------ ------------------------
  **GET**      `/api/todos`        Liste toutes les tâches  Renvoie un tableau JSON

  **POST**     `/api/todos`        Ajoute une nouvelle      `{ "title": "texte" }`
                                   tâche                    

  **DELETE**   `/api/todos/:id`    Supprime une tâche par   Objet JSON supprimé
                                   son ID                   
  ----------------------------------------------------------------------------------

------------------------------------------------------------------------

## 5. Test rapide

Dans Postman ou curl :

``` bash
POST http://localhost:3000/api/todos
Body raw (JSON) → { "title": "Acheter du pain" }

GET http://localhost:3000/api/todos
DELETE http://localhost:3000/api/todos/1
```

------------------------------------------------------------------------

## 6. Auteur

Projet réalisé par **Ibrahimi Ismail** dans le cadre du cours de
développement backend.
ChatGPT a contribué à la structuration du code, à la configuration des
environnements et à la rédaction du README.
