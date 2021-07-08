const authRoute = require("./auth");
const initialFormRoute = require("./initialForm");
const getDataUserRoute = require("./getDataUser");

const routes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/initialform", initialFormRoute);
  app.use("/api/getDataUser", getDataUserRoute);
};

module.exports = routes;
