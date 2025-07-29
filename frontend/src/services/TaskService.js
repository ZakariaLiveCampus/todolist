export class TaskService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getTasks() {
    const res = await fetch(`${this.apiUrl}/tasks`).catch((err) => {
      console.error("Erreur réseau ou API:", err);
      throw err;
    });
    return res.json();
  }

  async addTask(task) {
    const res = await fetch(`${this.apiUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Erreur API (addTask): ${res.status} ${error}`);
    }
    return res.json();
  }

  async updateTask(id, task) {
    const res = await fetch(`${this.apiUrl}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Erreur API (updateTask): ${res.status} ${error}`);
    }
    return res.json();
  }

  async deleteTask(id) {
    const res = await fetch(`${this.apiUrl}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Erreur API (deleteTask): ${res.status} ${error}`);
    }
    return res.json();
  }
}
