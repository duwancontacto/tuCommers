const express = require("express");
const next = require("next");

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const app = express();

    app.get("/api/prueba", (req, res) => {
      return res.end("hiii");
    });

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, (err) => {
      if (err) throw err;

      console.log(` > Server Listen in port: ${port} `);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
