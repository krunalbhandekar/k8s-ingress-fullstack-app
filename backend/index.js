require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const todoRouter = require("./routes/todo");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

(async () => {
  const dbPool = await db(); // this gives you the promisePool

  // Pass the dbPool to router
  app.use("/todo", todoRouter(dbPool));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
