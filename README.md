Gestion des Tâches - API

Description

Ce projet est une application de gestion des tâches avec une API RESTful construite en Node.js et MongoDB. Il permet d'ajouter, modifier, supprimer des tâches, ainsi que de gérer des sous-tâches et des commentaires. L'API permet également de filtrer et trier les tâches en fonction de leur statut ou priorité.

Technologies Utilisées

Backend : Node.js, Express.js, MongoDB, Mongoose

Frontend : HTML, CSS, JavaScript

Outils : Postman (pour tester l'API), Nodemon (pour le développement)



Installation

Installez les dépendances :

npm install

Démarrez le serveur :

npm start

L'API sera accessible sur http://localhost:5000

Modèle de Données (MongoDB)

Chaque tâche suit cette structure :

{
  "_id": "ObjectId",
  "titre": "Nom de la tâche",
  "description": "Détails sur la tâche",
  "statut": "à faire | en cours | terminée",
  "priorite": "basse | moyenne | haute",
  "commentaires": [
    {
      "auteur": { "nom": "John", "prenom": "Doe" },
      "contenu": "Texte du commentaire",
      "date": "2024-03-31T12:00:00Z"
    }
  ],
  "sousTaches": [
    { "titre": "Sous-tâche 1", "statut": "à faire" }
  ]
}




Routes de l'API

1. Gérer les Tâches

Récupérer toutes les tâches : GET /tasks

Récupérer une tâche par ID : GET /tasks/:taskId

Ajouter une nouvelle tâche : POST /tasks

{
  "titre": "Nouvelle Tâche",
  "description": "Détails de la tâche",
  "statut": "à faire",
  "priorite": "haute"
}

Mettre à jour une tâche : PUT /tasks/:taskId

Supprimer une tâche : DELETE /tasks/:taskId

2. Gérer les Sous-Tâches

Ajouter une sous-tâche : POST /tasks/:taskId/subtask

{ "titre": "Nouvelle Sous-Tâche" }

3. Ajouter des Commentaires

Ajouter un commentaire à une tâche : POST /tasks/:taskId/comment

{
  "auteur": { "nom": "John", "prenom": "Doe" },
  "contenu": "Texte du commentaire"
}

4. Filtrer et Trier les Tâches

Filtrer par statut : GET /tasks?statut=terminée

Filtrer par priorité : GET /tasks?priorite=haute

Trier par date d'échéance : GET /tasks?sort=echeance



Test de l'API

Vous pouvez tester l'API avec Postman en envoyant des requêtes aux différentes routes ci-dessus.



Auteur

Enzo GONZALEZ - Développeur
