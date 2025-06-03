const express = require("express");

const todoRouter = (db) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM todos");
      res.status(200).json({ status: "success", todos: rows });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { title } = req.body;
      await db.query("INSERT INTO todos (title) VALUES (?)", [title]);
      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await db.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

  return router;
};

module.exports = todoRouter;
