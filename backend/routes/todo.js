const express = require("express");
const db = require("../db");

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      return res.status(500).json({ status: "error", error: err.message });
    }
    res.status(200).json({ status: "success", todos: result });
  });
});

todoRouter.post("/", async (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO todos (title) VALUES (?)", [title], (err) => {
    if (err) {
      return res.status(500).json({ status: "error", error: err.message });
    }
    res.status(200).json({ status: "success" });
  });
});

todoRouter.delete("/:id", async (req, res) => {
  db.query("DELETE FROM todos WHERE ID = ?", [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ status: "error", error: err.message });
    }
    res.status(200).json({ status: "success" });
  });
});

module.exports = todoRouter;
