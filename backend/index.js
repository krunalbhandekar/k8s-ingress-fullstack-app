const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ status: "success", todos: [{ title: "first" }] });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
