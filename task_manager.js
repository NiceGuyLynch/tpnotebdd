const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: String,
  description: String,
  dateCreation: { type: Date, default: Date.now },
  echeance: Date,
  statut: { type: String, enum: ['à faire', 'en cours', 'terminée', 'annulée'] },
  priorite: { type: String, enum: ['basse', 'moyenne', 'haute', 'critique'] },
  auteur: {
    nom: String,
    prenom: String,
    email: String
  },
  categorie: String,
  etiquettes: [String],
  sousTaches: [{
    titre: String,
    statut: { type: String, enum: ['à faire', 'en cours', 'terminée', 'annulée'] },
    echeance: Date
  }],
  commentaires: [{
    auteur: String,
    date: { type: Date, default: Date.now },
    contenu: String
  }],
  historiqueModifications: [{
    champModifie: String,
    ancienneValeur: String,
    nouvelleValeur: String,
    date: { type: Date, default: Date.now }
  }]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
