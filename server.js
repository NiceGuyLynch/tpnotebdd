const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const Task = require('./models/Task');  // Importez le modèle Task

const app = express();

// Servir les fichiers statiques depuis le dossier "public"
app.use(express.static('public')); 

mongoose.connect('mongodb://localhost:27017/task_manager', { useNewUrlParser: true, useUnifiedTopology: true }) // Connexion à MongoDB
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);  // Gérer la route pour les tâches

// Si vous voulez servir "index.html" à la racine, ajoutez ceci
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// Route pour ajouter une sous-tâche à une tâche
app.post('/tasks/:taskId/subtask', async (req, res) => {
  const taskId = req.params.taskId; // ID de la tâche
  const { titre } = req.body; // Titre de la sous-tâche envoyé par le frontend

  try {
    // Recherche de la tâche par son ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Ajout de la sous-tâche dans le tableau sousTaches de la tâche
    const newSubtask = { titre, statut: 'à faire' }; // Statut par défaut "à faire"
    task.sousTaches.push(newSubtask);

    // Sauvegarde de la tâche mise à jour
    await task.save();

    // Réponse avec la tâche mise à jour
    return res.status(201).json({ message: 'Sous-tâche ajoutée avec succès', task });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la sous-tâche:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
