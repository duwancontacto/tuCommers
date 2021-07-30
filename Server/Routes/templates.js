import { Router } from "express";
import TemplateController from "../Controller/TemplateController";
import { check } from "express-validator"
const routes = Router()


routes.get('/', TemplateController.getTemplate)

routes.get('/:id', TemplateController.getTemplateById)

routes.post('/', [
    check("name", "El nombre es requerido").not().isEmpty(),
],
    TemplateController.setTemplate)

routes.delete('/:id', TemplateController.deleteTemplate)

routes.patch('/:id', TemplateController.editTemplate)


export default routes