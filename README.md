# ToDoList API – Gestion des tâches et des utilisateurs (Express, MongoDB, PostgreSQL, JWT)

## 1. Description

Cette application expose une API REST complète développée avec Express.js, permettant :

- la gestion d’une ToDoList (ajout, suppression, affichage des tâches),
- la gestion des utilisateurs (inscription et connexion),
- la génération de jetons JWT pour l’authentification.

Les tâches peuvent être stockées soit dans MongoDB, soit dans PostgreSQL, selon la configuration choisie.
Les utilisateurs sont stockés dans MongoDB et reçoivent un token JWT après la connexion.

## 2. Installation et configuration

### Installation des dépendances

```bash
npm install
```

### Configuration du fichier .env

Créer un fichier .env à la racine du projet :

```env
DRIVER=mongo          # mongo ou postgres
PORT=3000
DATABASE_URL=postgres://postgres:motdepasse@localhost:5432/todosdb
MONGO_URL=mongodb://localhost:27017/todosdb
JWT_SECRET=secretkeyappearshere
JWT_EXPIRES_IN=1h
```

## 3. Lancement de l’application

```bash
npm run dev
```

Après avoir lancer l'application, une documentation complète et interactive de l’API est disponible grâce à Swagger UI.  
Elle permet de tester directement les routes (`/signup`, `/login`, `/api/todos`, etc.) depuis l’interface :  
**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

## 4. Gestion des utilisateurs (Auth + JWT)

Pour tester l'application il est consseillé d'utilsier Postman.

### Inscription (POST /signup)

Crée un nouvel utilisateur et renvoie un token JWT.

Requête :
```
POST http://localhost:3000/signup
Content-Type: application/json (vérifier qu'il est bien présent et coché dans la partie headers)
```

Body (en raw):
```json
{
  "name": "Ismail",
  "email": "test@test.com",
  "password": "123456"
}
```

Réponse attendue :
```json
{
  "success": true,
  "data": {
    "userId": "6740f4f5b1...",
    "email": "test@test.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Connexion (POST /login)

Renvoie un nouveau token JWT si les identifiants sont valides.

Requête :
```
POST http://localhost:3000/login
Content-Type: application/json (vérifier qu'il est bien présent et coché dans la partie headers)
```

Body (en raw):
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

Réponse :
```json
{
  "success": true,
  "data": {
    "userId": "6740f4f5b1...",
    "email": "test@test.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

## 5. Gestion des tâches (ToDoList)

Les routes todos sont préfixées par /api/todos.

### Lister toutes les tâches

```
GET http://localhost:3000/api/todos
```

Réponse :
```json
[
  { "id": 1, "title": "Faire les courses", "done": false },
  { "id": 2, "title": "Réviser Node.js", "done": true }
]
```

### Ajouter une tâche

```
POST http://localhost:3000/api/todos
Content-Type: application/json (vérifier qu'il est bien présent et coché dans la partie headers)
```

Body (en raw):
```json
{ "title": "Apprendre PostgreSQL" }
```

Réponse :
```json
{ "id": 3, "title": "Apprendre PostgreSQL", "done": false }
```

### Supprimer une tâche

```
DELETE http://localhost:3000/api/todos/:id
```

Exemple :
```
DELETE http://localhost:3000/api/todos/3
```

Réponse :
```json
{ "id": 3, "title": "Apprendre PostgreSQL", "done": false }
```

## 6. Vérifier les données dans MongoDB Compass

Pour vérifier que les données ont bien été saisis dans la bdd mongo, suivez ces étapes pour vérifier via MongoDB Compass:

1. Ouvrir MongoDB Compass
2. Se connecter avec : mongodb://localhost:27017
3. Sélectionner la base todosdb
4. Vous devriez voir :
   - une collection users contenant les comptes créés via /signup
   - une collection todos si vous utilisez Mongo comme DRIVER

## 7. Vérifier les données dans PostgreSQL

Si vous avez mis DRIVER=postgres :

1. Se connecter avec psql :
```bash
psql -U postgres -d todosdb
```
2. Vérifier la table :
```sql
SELECT * FROM todos;
```

## 8. Exemple de test complet (Postman)

1. POST /signup → crée un utilisateur et récupère le token
2. POST /login → vérifie le compte et obtient un nouveau token
3. POST /api/todos → ajoute une tâche
4. GET /api/todos → liste toutes les tâches
5. DELETE /api/todos/:id → supprime une tâche
6. Vérifier dans MongoDB Compass ou PostgreSQL que les données existent

## 9. Structure du projet

```
 EXERCICE2_IBRAHIMI_ISMAIL
 ┣ src
 ┃ ┣ config
 ┃ ┃ ┣ init.js
 ┃ ┃ ┣ mongo.js
 ┃ ┃ ┗ pg.js
 ┃ ┣ controllers
 ┃ ┃ ┗ todoController.js
 ┃ ┣ models
 ┃ ┃ ┣ adapters
 ┃ ┃ ┃ ┣ mongoToDoStore.js
 ┃ ┃ ┃ ┗ postgresToDoStore.js
 ┃ ┃ ┣ todoModel.js
 ┃ ┃ ┗ userModel.js
 ┃ ┗ routes
 ┃   ┗ todoRoutes.js
 ┣ .env
 ┣ package.json
 ┣ README.md
 ┗ server.js
```

## 10. Technologies utilisées

- Node.js
- Express.js
- MongoDB / Mongoose
- PostgreSQL
- JWT (jsonwebtoken)
- Nodemon
- Postman
- MongoDB Compass

## 11. Auteur

Projet développé par [Ismail Ibrahimi](https://github.com/IsmailIbrahimi) avec l'aide de chatGPT pour mettre en place un switch de bdd, apporté une bonne architecture au projet, la rédaction d'une partie du README et la génération du fichier swagger.json.
API REST complète avec gestion multi-base et authentification JWT.