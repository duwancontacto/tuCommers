const express = require("express");
const next = require("next");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const routes = require("./Routes/index");
const dbConnect = require("./config/dbConnect");

nextApp
  .prepare()
  .then(() => {
    //Active Req.body
    app.use(express.json({ extended: true }));
    app.use(cors())

    //Connect to DB
    dbConnect();

    //Routes
    routes(app);

    //Frontend
    app.get("*", (req, res) => {
      return handle(req, res);
    });

    //Server Up
    app.listen(port, (err) => {
      if (err) throw err;

      console.log(` > Server Listen in port: ${port} `);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
