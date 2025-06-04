require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

(async () => {
  const dbPool = await db();
  app.get("/", async (req, res) => {
    try {
      const [rows] = await dbPool.query("SELECT * FROM todos");
      res.status(200).json({ status: "success", todos: rows });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

  app.post("/", async (req, res) => {
    try {
      const { title } = req.body;
      await dbPool.query("INSERT INTO todos (title) VALUES (?)", [title]);
      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

  app.put("/:id", async (req, res) => {
    try {
      const { title } = req.body;
      await dbPool.query("UPDATE todos SET title = ? WHERE id = ?", [
        title,
        req.params.id,
      ]);
      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

  app.delete("/:id", async (req, res) => {
    try {
      await dbPool.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
