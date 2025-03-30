const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET /tasks : récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /tasks/:id : récupérer une tâche par son ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks : ajouter une nouvelle tâche
router.post('/', async (req, res) => {
  const task = new Task({
    titre: req.body.titre,
    description: req.body.description,
    echeance: req.body.echeance,
    statut: req.body.statut,
    priorite: req.body.priorite,
    auteur: req.body.auteur,
    categorie: req.body.categorie,
    etiquettes: req.body.etiquettes
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /tasks/:id : modifier une tâche existante
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task.titre = req.body.titre || task.titre;
    task.description = req.body.description || task.description;
    task.statut = req.body.statut || task.statut;
    task.priorite = req.body.priorite || task.priorite;
    // Mettre à jour d'autres champs si nécessaire
    
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId); // Cherche et supprime la tâche par son ID
    
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

module.exports = router;
