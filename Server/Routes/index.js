import authRoute from "./auth"

import initialFormRoute from "./initialForm"
import getDataUserRoute from "./getDataUser"
import groupsRoute from "./groups"
import templatesRoute from "./templates"

const routes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/initialform", initialFormRoute);
  app.use("/api/getDataUser", getDataUserRoute);
  app.use("/api/groups", groupsRoute);
  app.use("/api/templates", templatesRoute);
};

export default routes;
