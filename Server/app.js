import express from "express"
import next from "next"
import cors from "cors"
import routes from "./Routes/index"
import dbConnect from "./config/dbConnect"
import fileUpload from "express-fileupload"

const app = express();


const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    //Active Req.body
    app.use(express.json({ extended: true }));
    app.use(cors())

    //Connect to DB
    dbConnect();

    app.use(fileUpload({
      tempFileDir: '/temp'
    }))
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
