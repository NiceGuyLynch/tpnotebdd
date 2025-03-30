document.addEventListener('DOMContentLoaded', () => {
  // Récupérer toutes les tâches dès le chargement
  loadTasks();

  // Soumettre le formulaire pour ajouter une tâche
  const form = document.getElementById('taskForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titre = document.getElementById('titre').value;
    const description = document.getElementById('description').value;
    const echeance = document.getElementById('echeance').value;
    const statut = document.getElementById('statut').value;
    const priorite = document.getElementById('priorite').value;

    const newTask = {
      titre: titre,
      description: description,
      echeance: echeance,
      statut: statut,  // Utilisation du statut sélectionné
      priorite: priorite,  // Utilisation de la priorité sélectionnée
      auteur: { nom: 'Doe', prenom: 'John', email: 'johndoe@example.com' },
      categorie: 'travail',  // Par défaut, catégorie "travail"
      etiquettes: ['urgent'],
      sousTaches: [],
      commentaires: []
    };

    // Envoi de la nouvelle tâche à l'API
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    if (response.ok) {
      loadTasks(); // Rafraîchir la liste des tâches
    } else {
      alert('Erreur lors de l\'ajout de la tâche');
    }
  });

  // Application des filtres
  document.getElementById('applyFilter').addEventListener('click', () => {
    loadTasks();
  });
});

// Fonction pour afficher les tâches avec filtrage
async function loadTasks() {
  const statusFilter = document.getElementById('filterStatus').value;
  const priorityFilter = document.getElementById('filterPriority').value;

  let url = 'http://localhost:5000/tasks';
  
  // Ajouter les filtres à l'URL si nécessaire
  if (statusFilter || priorityFilter) {
    url += `?status=${statusFilter}&priority=${priorityFilter}`;
  }

  try {
    const response = await fetch(url);
    const tasks = await response.json();

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Vide la liste actuelle des tâches

    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = `
        <h3>${task.titre}</h3>
        <p>${task.description}</p>
        <p>Statut: ${task.statut}</p>
        <p>Priorité: ${task.priorite}</p>
        <button onclick="deleteTask('${task._id}')">Supprimer</button>
        <button onclick="showTaskDetails('${task._id}')">Voir détails</button>
      `;
      taskList.appendChild(taskItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Fonction pour supprimer une tâche
async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la tâche');
    }

    const data = await response.json();
    alert(data.message); // Affiche un message de confirmation ou d'erreur

    // Actualiser la liste des tâches après suppression
    loadTasks();
  } catch (error) {
    console.error('Error:', error);
    alert('Erreur lors de la suppression de la tâche');
  }
}

// Fonction pour afficher les détails d'une tâche
async function showTaskDetails(taskId) {
  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`);
    const task = await response.json();

    // Affichage des sous-tâches et commentaires
    let taskDetails = `
      <h2>Détails de la tâche : ${task.titre}</h2>
      <p>${task.description}</p>
      <p>Statut: ${task.statut}</p>
      <p>Priorité: ${task.priorite}</p>
      <h3>Sous-tâches</h3>
      <ul>
    `;
    
    task.sousTaches.forEach(subtask => {
      taskDetails += `<li>${subtask.titre} - ${subtask.statut}</li>`;
    });
    
    taskDetails += '</ul><h3>Commentaires</h3><ul>';
    
    task.commentaires.forEach(comment => {
      taskDetails += `<li>${comment.auteur.nom} ${comment.auteur.prenom}: ${comment.contenu}</li>`;
    });

    taskDetails += '</ul>';

    // Ajouter les commentaires et sous-tâches
    taskDetails += `
      <h4>Ajouter un commentaire :</h4>
      <textarea id="newComment"></textarea>
      <button onclick="addComment('${task._id}')">Ajouter</button>
      <h4>Ajouter une sous-tâche :</h4>
      <input type="text" id="subtaskTitle" placeholder="Titre de la sous-tâche">
      <button onclick="addSubtask('${task._id}')">Ajouter sous-tâche</button>
    `;

    document.getElementById('task-list').innerHTML = taskDetails;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Ajouter un commentaire à une tâche
async function addComment(taskId) {
  const comment = document.getElementById('newComment').value;

  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contenu: comment })
    });

    if (response.ok) {
      showTaskDetails(taskId); // Rafraîchir les détails de la tâche
    } else {
      alert('Erreur lors de l\'ajout du commentaire');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Ajouter une sous-tâche à une tâche
async function addSubtask(taskId) {
  const subtaskTitle = document.getElementById('subtaskTitle').value;

  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}/subtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titre: subtaskTitle })
    });

    if (response.ok) {
      showTaskDetails(taskId); // Rafraîchir les détails de la tâche
    } else {
      alert('Erreur lors de l\'ajout de la sous-tâche');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


