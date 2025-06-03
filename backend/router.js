const todoRouter = require("./routes/todo");

const routerInit = (app) => {
  app.get("/api/", async (_, res) => {
    res.status(200).send({
      status: "success",
      name: "K8S-Ingress-Fullstack-App",
      version: "0.0.1",
      description: "This is a backend project of k8s ingress fullstack app",
      client: "/",
      author: {
        name: "Krunal Bhandekar",
        designation: "Full Stack Web Developer",
        email: "krunalbhandekar10@gmail.com",
      },
    });
  });
  app.use("/api/todo", todoRouter);
};

module.exports = routerInit;
