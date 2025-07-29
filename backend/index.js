const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "todolist",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, title, description });
    }
  );
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const { title, description } = req.body;
  db.query(
    "UPDATE tasks SET title=?, description=? WHERE id=?",
    [title, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, title, description });
    }
  );
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`API running on port ${PORT}`));
