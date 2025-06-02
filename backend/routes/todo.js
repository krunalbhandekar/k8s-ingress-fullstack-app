const express = require("express");
const Todo = require("../models/todo");

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ status: "success", todos });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

todoRouter.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await Todo.create({ title });
    res.status(200).json({ status: "success", todo });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

todoRouter.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const todo = await Todo.deleteOne({ _id });
    res.status(200).json({ status: "success", todo });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = todoRouter;
