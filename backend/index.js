require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routerInit = require("./router");

const app = express();
app.use(express.json());
app.use(cors());

routerInit(app);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server Running on port ${port}`);
});
