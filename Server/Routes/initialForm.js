const express = require("express");
const routes = express.Router();
const { check } = require("express-validator");
const InitialFormController = require("../Controller/InitialFormController");
const auth = require("../middleware/auth");

routes.patch("/",
    auth,
    [
        check("personalData", "La informacion personal es requerida").not().isEmpty(),
        check("bussinessData", "La Informacion de tu empresa es requerida").not().isEmpty(),
    ],
    InitialFormController.setInitialForm);

module.exports = routes;
