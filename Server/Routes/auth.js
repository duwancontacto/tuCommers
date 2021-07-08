const express = require("express");
const routes = express.Router();
const { check } = require("express-validator");
const AuthController = require("../Controller/AuthController");
const auth = require("../middleware/auth");


routes.post(
  "/register",
  [
    check("email", "El email es requerido").isEmail(),
    check(
      "password",
      "La Password es requerida con al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  AuthController.registerUser
);
routes.post(
  "/login",
  [
    check("email", "El email es requerido").isEmail(),
    check(
      "password",
      "La Password es requerida con al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  AuthController.getUser
);
routes.post(
  "/forgotPassword",
  [
    check("email", "El email es requerido").isEmail(),
  ],
  AuthController.forgotPassword
);

routes.patch(
  "/restartPassword",
  auth,
  [
    check(
      "password",
      "La Password es requerida con al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  AuthController.restardPassword
);

module.exports = routes;
