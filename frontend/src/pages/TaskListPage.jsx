import React, { useEffect, useState } from "react";
import { useTaskService } from "../context/TaskServiceContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function TaskListPage() {
  const service = useTaskService();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    service
      .getTasks()
      .then((data) => {
        console.log("API /tasks response:", data);
        setTasks(data);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des tâches:", err);
      });
  }, [service, location]);

  const handleDelete = async (id) => {
    await service.deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };
  console.log(tasks);
  return (
    <div>
      <h1>Liste des tâches</h1>
      <button onClick={() => navigate("/add")}>Ajouter une tâche</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <b>{task.title}</b> - {task.description}
            <button
              onClick={() => navigate(`/edit/${task.id}`)}
              className="edit-button"
            >
              Modifier
            </button>
            <button onClick={() => handleDelete(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
