import React, { useEffect, useState } from "react";
import { useTaskService } from "../context/TaskServiceContext";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskEditPage() {
  const service = useTaskService();
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (id) {
      service.getTasks().then((tasks) => {
        const t = tasks.find((t) => t.id === Number(id));
        if (t) setTask({ title: t.title, description: t.description });
      });
    }
  }, [id, service]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await service.updateTask(id, task);
    } else {
      await service.addTask(task);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>{id ? "Modifier" : "Ajouter"} une tâche</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Titre"
          required
        />
        <input
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">{id ? "Modifier" : "Ajouter"}</button>
        <button type="button" onClick={() => navigate("/")}>
          Annuler
        </button>
      </form>
    </div>
  );
}
