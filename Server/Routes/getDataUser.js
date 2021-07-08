const express = require("express");
const routes = express.Router();
const getDataUserController = require("../Controller/getDataUserController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

routes.get(
    "/",
    auth,
    getDataUserController.getDataUser
);

routes.patch(
    "/",
    auth,
    [
        check("personalData", "La informacion personal es requerida").not().isEmpty(),
        check("bussinessData", "La Informacion de tu empresa es requerida").not().isEmpty(),
    ],
    getDataUserController.updateDataUser
);


module.exports = routes;
